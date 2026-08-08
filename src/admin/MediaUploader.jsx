import { useEffect, useRef, useState } from 'react';
import { assetUrl, imgUrl } from '../lib/supabase.js';

const VIDEO_SIZE_HINT = 50 * 1024 * 1024;

function Preview({ file }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (file.type.startsWith('video/')) {
    return (
      <video src={url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
    );
  }
  return <img src={url} alt="" className="h-full w-full object-cover" />;
}

/**
 * Drag-and-drop uploader for images + videos.
 * state: array of File objects; onChange receives the full ordered list.
 */
export default function MediaUploader({ files, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (list) => {
    const incoming = Array.from(list || []).filter((f) =>
      f.type.startsWith('image/') || f.type.startsWith('video/')
    );
    if (incoming.length) onChange([...files, ...incoming]);
  };

  const remove = (index) => onChange(files.filter((_, i) => i !== index));

  const videos = files.filter((f) => f.type.startsWith('video/')).length;
  const oversized = files.some(
    (f) => f.type.startsWith('video/') && f.size > VIDEO_SIZE_HINT
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`cursor-pointer border border-dashed p-6 text-center transition-colors ${
          dragging
            ? 'border-champagne bg-champagne/10'
            : 'border-champagne/30 hover:border-champagne/60'
        }`}
      >
        <p className="text-sm font-light text-warmwhite/70">
          Drop images or videos here, or click to browse.
        </p>
        <p className="mt-1 text-[11px] text-warmwhite/45">
          The first image becomes the card cover · videos play in the video section
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {oversized && (
        <p className="mt-3 text-[11px] text-amber-300/90">
          One or more videos are larger than 50 MB — the free Supabase plan rejects files over 50
          MB. Compress the video (e.g. H.264, 720p) before uploading.
        </p>
      )}
      {videos > 0 && (
        <p className="mt-2 text-[11px] text-warmwhite/45">
          {videos} video{videos > 1 ? 's' : ''} selected — will appear in the videos section.
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="group relative aspect-[4/3] overflow-hidden border border-champagne/15 bg-void">
              <Preview file={file} />
              {file.type.startsWith('video/') && (
                <span className="absolute left-2 top-2 flex items-center gap-1 bg-void/80 px-2 py-1 text-[9px] uppercase tracking-widest2 text-champagne backdrop-blur-sm">
                  ▶ Video
                </span>
              )}
              {i === 0 && file.type.startsWith('image/') && (
                <span className="absolute bottom-2 left-2 bg-champagne/90 px-2 py-1 text-[9px] uppercase tracking-widest2 text-obsidian">
                  Cover
                </span>
              )}
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => remove(i)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-void/80 text-warmwhite/80 backdrop-blur transition-colors hover:bg-red-500/80 hover:text-white"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Existing media from storage (editing an existing work), with remove support. */
export function ExistingMedia({ media, onRemove, disabled }) {
  if (!media.length) return null;
  return (
    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {media.map((m) => (
        <li key={m.id} className="group relative aspect-[4/3] overflow-hidden border border-champagne/15 bg-void">
          {m.media_type === 'video' ? (
            <video src={assetUrl(m.path)} muted playsInline preload="metadata" className="h-full w-full object-cover" />
          ) : (
            <img src={imgUrl(m.path, 300)} alt="" className="h-full w-full object-cover" />
          )}
          {m.media_type === 'video' && (
            <span className="absolute left-2 top-2 flex items-center gap-1 bg-void/80 px-2 py-1 text-[9px] uppercase tracking-widest2 text-champagne backdrop-blur-sm">
              ▶ Video
            </span>
          )}
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${m.title || m.path}`}
            onClick={() => onRemove(m)}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-void/80 text-warmwhite/80 backdrop-blur transition-colors hover:bg-red-500/80 hover:text-white disabled:opacity-40"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}