import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBooking } from '../context/BookingContext.jsx';

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -56 : 56,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ImageLightbox({ open, items, index, onClose, onIndexChange }) {
  const [dir, setDir] = useState(1);
  const { openBooking } = useBooking();
  const item = items[index];

  const go = (next) => {
    const wrapped = (next + items.length) % items.length;
    setDir(wrapped > index || (index === items.length - 1 && wrapped === 0) ? 1 : -1);
    onIndexChange(wrapped);
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, items.length]);

  if (!item) return null;

  const handleBook = () => {
    openBooking({
      sourceTitle: item.title || item.name,
      sourceCategory: item.category,
      projectType: item.category === 'Blinds' ? 'Blinds' : item.category === 'Curtains' ? 'Curtains' : '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 px-0 backdrop-blur-md sm:items-center sm:px-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title || item.name} preview`}
        >
          <motion.div
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative grid max-h-[94svh] w-full overflow-hidden bg-obsidian text-warmwhite ring-1 ring-champagne/25 sm:max-w-6xl sm:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] sm:rounded-sm"
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center bg-obsidian/70 text-champagne backdrop-blur transition-colors hover:text-warmwhite"
            >
              <span className="relative block h-px w-5 rotate-45 bg-current" />
              <span className="absolute h-px w-5 -rotate-45 bg-current" />
            </button>

            <div className="relative h-[58svh] overflow-hidden bg-coal sm:h-[78vh]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={item.image || item.img}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={item.image || item.img}
                  alt={item.title || item.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  onPanEnd={(_, info) => {
                    if (info.offset.x < -50) next();
                    if (info.offset.x > 50) prev();
                  }}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/15" />

              {items.length > 1 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className="flex h-10 w-10 items-center justify-center border border-champagne/35 bg-obsidian/65 text-champagne backdrop-blur transition-colors hover:bg-champagne hover:text-obsidian"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className="flex h-10 w-10 items-center justify-center border border-champagne/35 bg-obsidian/65 text-champagne backdrop-blur transition-colors hover:bg-champagne hover:text-obsidian"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            <aside className="flex max-h-[36svh] flex-col justify-between gap-8 overflow-y-auto px-6 py-7 sm:max-h-none sm:px-8 sm:py-10">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne/80">
                  {item.category || 'Preview'} · {String(index + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-warmwhite sm:text-4xl">
                  {item.title || item.name}
                </h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-warmwhite/70">
                  {item.type || item.desc}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleBook}
                  className="bg-champagne px-6 py-3 text-[11px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite"
                >
                  Book Consultation
                </button>
                <p className="text-[11px] leading-relaxed text-warmwhite/45">
                  We will include this selection in your enquiry so the consultation starts with the right reference.
                </p>
              </div>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
