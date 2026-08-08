import { useState } from 'react';
import { supabase, BUCKET, isSupabaseConfigured } from '../lib/supabase.js';
import { compressImageFile } from '../lib/compressImage.js';
import MediaUploader, { ExistingMedia } from './MediaUploader.jsx';

const CATEGORIES = [
  { value: 'Curtains', label: 'Curtains — shows in Our Collections (curtain group)' },
  { value: 'Blinds', label: 'Blinds — shows in Our Collections (blind group)' },
  { value: 'Fabrics', label: 'Fabrics — shows in the materials gallery' },
];

const empty = {
  title: '',
  category: 'Curtains',
  description: '',
  bestFor: '',
  benefits: '',
  materials: '',
  notesSeed: '',
};

function toCommaTags(value) {
  return value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function WorkForm({ work, onDone, onCancel }) {
  const isEdit = Boolean(work);
  const [fields, setFields] = useState(() =>
    work
      ? {
          title: work.title,
          category: work.category,
          description: work.description || '',
          bestFor: work.bestFor || '',
          benefits: (work.benefits || []).join(', '),
          materials: (work.materials || []).join(', '),
          notesSeed: work.notesSeed || '',
        }
      : empty
  );
  const [files, setFiles] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState('');
  const [error, setError] = useState('');

  const existing = (work?.work_media || []).filter((m) => !removed.some((r) => r.id === m.id));

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!fields.title.trim()) {
      setError('Please add a title.');
      return;
    }
    if (files.length + existing.length === 0) {
      setError('Add at least one image or video.');
      return;
    }

    setBusy(true);
    try {
      const workId = work?.id || crypto.randomUUID();

      setPhase('Uploading files…');
      const mediaRows = [];
      for (const file of files) {
        const processed = await compressImageFile(file);
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
        const storagePath = `${workId}/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(storagePath, processed, {
            contentType: processed.type,
          });
        if (uploadError) throw uploadError;
        mediaRows.push({
          id: crypto.randomUUID(),
          work_id: workId,
          media_type: processed.type.startsWith('video/') ? 'video' : 'image',
          path: storagePath,
          position: existing.length + mediaRows.length,
        });
      }

      setPhase('Saving work…');
      const { error: workError } = await supabase.from('works').upsert({
        id: workId,
        title: fields.title.trim(),
        category: fields.category,
        description: fields.description.trim() || null,
        best_for: fields.bestFor.trim() || null,
        benefits: toCommaTags(fields.benefits),
        materials: toCommaTags(fields.materials),
        notes_seed: fields.notesSeed.trim() || null,
        image_fit: 'cover',
      });
      if (workError) throw workError;

      if (mediaRows.length) {
        const { error: mediaError } = await supabase.from('work_media').insert(mediaRows);
        if (mediaError) throw mediaError;
      }

      if (removed.length) {
        const paths = removed.map((m) => m.path);
        await supabase.storage.from(BUCKET).remove(paths);
        const { error: removeError } = await supabase
          .from('work_media')
          .delete()
          .in('id', removed.map((m) => m.id));
        if (removeError) throw removeError;
      }

      onDone();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong — please try again.');
      setBusy(false);
      setPhase('');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-champagne/20 pb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest2 text-champagne">
            {isEdit ? 'Edit work' : 'New work'}
          </p>
          <h2 className="mt-1 font-serif text-3xl text-warmwhite">
            {isEdit ? work.title : 'Add a work'}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="border border-champagne/40 px-5 py-2.5 text-[10px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne/10 disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={busy}
            className="bg-champagne px-6 py-2.5 text-[10px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite disabled:opacity-60"
          >
            {busy ? phase || 'Saving…' : 'Save work'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 space-y-8">
        <section className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Title *
            </span>
            <input
              value={fields.title}
              onChange={set('title')}
              placeholder="e.g. Roman Blind — Bedroom"
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Where it appears
            </span>
            <select
              value={fields.category}
              onChange={set('category')}
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
            Short description
          </span>
          <textarea
            value={fields.description}
            onChange={set('description')}
            rows={3}
            placeholder="One or two lines shown under the title."
            className="mt-2 w-full resize-y border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
          />
        </label>

        <section>
          <h3 className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
            Photos &amp; video
          </h3>
          <p className="mt-1 text-xs font-light text-warmwhite/45">
            Add every photo of this work — the lightbox cycles through them. One video per work is
            ideal; it appears in the videos section with the work's title.
          </p>
          <div className="mt-4">
            {existing.length > 0 && (
              <ExistingMedia media={existing} onRemove={(m) => setRemoved((r) => [...r, m])} />
            )}
            <MediaUploader files={files} onChange={setFiles} />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Best for <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input
              value={fields.bestFor}
              onChange={set('bestFor')}
              placeholder="e.g. Bedrooms, media rooms"
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Benefits <span className="normal-case tracking-normal">(comma separated)</span>
            </span>
            <input
              value={fields.benefits}
              onChange={set('benefits')}
              placeholder="Soft light, Privacy"
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            />
          </label>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Materials <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input
              value={fields.materials}
              onChange={set('materials')}
              placeholder="Curtain materials: Blackout Fabric"
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
              Enquiry note <span className="normal-case tracking-normal">(optional)</span>
            </span>
            <input
              value={fields.notesSeed}
              onChange={set('notesSeed')}
              placeholder="Prefilled when a client asks about this work"
              className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
            />
          </label>
        </section>
      </div>
    </form>
  );
}