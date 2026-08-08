import { useCallback, useEffect, useState } from 'react';
import { supabase, BUCKET, assetUrl, imgUrl } from '../lib/supabase.js';
import WorkForm from './WorkForm.jsx';

export default function WorksManager() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('works')
      .select('*, work_media(*)')
      .order('created_at', { ascending: false })
      .order('position', { referencedTable: 'work_media', ascending: true });
    if (error) {
      console.error(error);
      setWorks([]);
    } else {
      setWorks(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const signOut = () => supabase.auth.signOut();

  const removeWork = async (work) => {
    if (!window.confirm(`Delete “${work.title}”? This removes its photos and videos too.`)) return;
    setDeleting(work.id);
    const paths = work.work_media.map((m) => m.path);
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    await supabase.from('works').delete().eq('id', work.id);
    setDeleting(null);
    load();
  };

  if (creating || editing) {
    return (
      <main className="min-h-screen bg-obsidian px-6 py-12 md:px-12">
        <WorkForm
          work={editing}
          onDone={() => {
            setCreating(false);
            setEditing(null);
            load();
          }}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian px-6 py-12 md:px-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-champagne/20 pb-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest2 text-champagne">
            Elegants Studio · Admin
          </p>
          <h1 className="mt-1 font-serif text-3xl text-warmwhite sm:text-4xl">Works</h1>
          <p className="mt-2 text-xs font-light text-warmwhite/55">
            Add new products, extra photos or videos. Changes go live immediately.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={signOut}
            className="border border-champagne/40 px-5 py-2.5 text-[10px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne/10"
          >
            Sign out
          </button>
          <button
            onClick={() => setCreating(true)}
            className="bg-champagne px-6 py-2.5 text-[10px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite"
          >
            + Add work
          </button>
        </div>
      </header>

      {loading && <p className="py-16 text-center text-sm font-light text-warmwhite/50">Loading…</p>}

      {!loading && works.length === 0 && (
        <div className="border border-champagne/20 bg-coal p-12 text-center">
          <p className="font-serif text-2xl text-warmwhite">No works yet</p>
          <p className="mt-2 text-sm font-light text-warmwhite/55">
            Click “Add work” to publish the first one — it appears on the site instantly.
          </p>
        </div>
      )}

      <ul className="divide-y divide-champagne/10">
        {works.map((work) => (
          <WorkRow
            key={work.id}
            work={work}
            deleting={deleting === work.id}
            onEdit={() => setEditing(work)}
            onDelete={() => removeWork(work)}
          />
        ))}
      </ul>
    </main>
  );
}

const CATEGORY_LABEL = { Curtains: 'Curtains', Blinds: 'Blinds', Fabrics: 'Fabric' };

function WorkRow({ work, deleting, onEdit, onDelete }) {
  const cover = work.work_media[0];
  const images = work.work_media.filter((m) => m.media_type === 'image').length;
  const videos = work.work_media.filter((m) => m.media_type === 'video').length;

  return (
    <li
      className={`flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-6 ${
        deleting ? 'opacity-40' : ''
      }`}
    >
      <div className="h-20 w-full shrink-0 overflow-hidden bg-coal sm:h-16 sm:w-24">
        {cover ? (
          cover.media_type === 'video' ? (
            <video
              src={assetUrl(cover.path)}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={imgUrl(cover.path, 300)}
              alt=""
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest2 text-warmwhite/30">
            No media
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-serif text-xl text-warmwhite">{work.title}</h3>
          <span className="border border-champagne/30 px-2 py-0.5 text-[9px] uppercase tracking-widest2 text-champagne">
            {CATEGORY_LABEL[work.category] || work.category}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-light text-warmwhite/50">
          {images} image{images === 1 ? '' : 's'} · {videos} video{videos === 1 ? '' : 's'} · edited{' '}
          {new Date(work.updated_at || work.created_at).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="flex shrink-0 gap-3">
        <button
          onClick={onEdit}
          disabled={deleting}
          className="border border-champagne/40 px-4 py-2 text-[10px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne/10 disabled:opacity-40"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="border border-red-400/40 px-4 py-2 text-[10px] uppercase tracking-widest2 text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-40"
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </li>
  );
}