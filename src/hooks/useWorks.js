import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { assetUrl, imgUrl } from '../lib/supabase.js';

/**
 * Loads every work with its media into a single object tree.
 * A work maps to:
 *   - "Curtains" | "Blinds"  -> OurCollections product card
 *   - "Fabrics"              -> materials grid card
 *   - videos in its media    -> VideoShowcase rail
 */
export function useWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured for this site.');
      setWorks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: err } = await supabase
      .from('works')
      .select('*, work_media(*)')
      .order('created_at', { ascending: false })
      .order('position', { referencedTable: 'work_media', ascending: true });

    if (err) {
      setError(err.message);
      setWorks([]);
    } else {
      setError(null);
      setWorks(data.map(normalizeWork));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { works, loading, error, reload };
}

function normalizeWork(row) {
  const media = (row.work_media || []).map((m) => ({
    id: m.id,
    type: m.media_type,
    title: m.title_override,
    path: m.path,
    url: assetUrl(m.path),
    img: m.media_type === 'image' ? imgUrl(m.path, 900) : assetUrl(m.path),
  }));

  const images = media.filter((m) => m.type === 'image');
  const videos = media.filter((m) => m.type === 'video');

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    projectType: row.category === 'Fabrics' ? '' : row.category,
    name: row.title,
    description: row.description,
    bestFor: row.best_for,
    benefits: row.benefits || [],
    materials: row.materials || [],
    notesSeed: row.notes_seed,
    imageFit: row.image_fit || 'cover',
    automation: row.automation,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    media,
    images,
    videos,
    raw: row,
  };
}

export function workCover(work) {
  const [first] = work.media;
  return first || null;
}

export function workBookingContext(work) {
  const cover = workCover(work);
  return {
    productName: work.name,
    projectType: work.projectType,
    sourceCategory: work.category,
    sourceTitle: work.name,
    sourceImage: cover && cover.type === 'image' ? imgUrl(cover.path, 800) : '',
    materials: work.materials || [],
    automation: work.automation || 'No',
    notesSeed:
      work.notesSeed || `I am interested in ${work.name.toLowerCase()} for my space.`,
  };
}