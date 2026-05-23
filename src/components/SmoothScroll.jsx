import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/* Lenis-driven smooth scroll. Lenis writes back to window.scrollY so every
 * Framer Motion useScroll/useTransform hook in the project keeps working
 * untouched — no Lenis-aware wrappers needed. */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // native touch — Lenis on mobile causes jank with pinned sections
    });
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);
  return null;
}
