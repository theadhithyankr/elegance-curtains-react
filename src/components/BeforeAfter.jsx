import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const BEFORE = '/before-after/before.png';
const AFTER = '/before-after/after.jpg';

export default function BeforeAfter() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromPoint = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setFromPoint(x);
    };
    const stop = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [dragging, setFromPoint]);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  const beforeImg = { src: BEFORE };
  const afterImg = { src: AFTER };

  return (
    <section className="relative bg-obsidian py-20 px-6 sm:py-24 sm:px-10 md:py-28 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12">
          <p className="mb-2 font-serif italic text-champagne text-sm sm:text-base">
            — A bare window, dressed —
          </p>
          <h2 className="font-serif text-[10vw] leading-[0.95] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.5vw]">
            Before. <span className="italic font-light text-champagne">After.</span>
          </h2>
        </div>

        <motion.div
          ref={wrapRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/10] w-full select-none overflow-hidden bg-coal ring-1 ring-champagne/25"
          onMouseDown={(e) => {
            setDragging(true);
            setFromPoint(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            setFromPoint(e.touches[0].clientX);
          }}
        >
          {/* BEFORE — full background */}
          <img
            {...beforeImg}
            alt="A bare window, undressed"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span className="absolute left-4 top-4 z-10 border border-warmwhite/30 bg-void/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-warmwhite/90 backdrop-blur-sm">
            Before
          </span>

          {/* AFTER — clipped from the left by `pos%` */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              {...afterImg}
              alt="The same window, dressed in linen sheers"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>

          <span className="absolute right-4 top-4 z-10 border border-champagne/60 bg-void/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-champagne backdrop-blur-sm">
            After
          </span>

          {/* Handle */}
          <div
            role="slider"
            aria-label="Before / After reveal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKey}
            onMouseDown={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
            style={{ left: `${pos}%` }}
            className="absolute top-0 bottom-0 z-20 -translate-x-1/2 cursor-ew-resize"
          >
            <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-champagne shadow-[0_0_10px_rgb(var(--c-champagne)/0.6)]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-void/80 ring-1 ring-champagne backdrop-blur-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A55C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 6 3 12 9 18" />
                <polyline points="15 6 21 12 15 18" />
              </svg>
            </span>
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-warmwhite/65 sm:mt-8">
          Drag to reveal — every window we touch carries its own story before and after.
        </p>
      </div>
    </section>
  );
}
