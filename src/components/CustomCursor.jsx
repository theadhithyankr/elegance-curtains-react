import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

/* A champagne-dot cursor that follows the mouse. Only shows on pointer:fine
 * devices, and only intensifies (with a "Scroll" label) when hovering the
 * horizontal portfolio section. */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const cursorRgb = theme === 'light' ? '109,40,217' : '201,165,92';
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const [fine, setFine] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: fine)');
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setActive(!!el?.closest?.('#installations'));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [fine, x, y]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: active ? 84 : 10,
          height: active ? 84 : 10,
          backgroundColor: active ? `rgba(${cursorRgb},0.95)` : `rgba(${cursorRgb},1)`,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center rounded-full"
      >
        <motion.span
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[9px] uppercase tracking-widest2 text-obsidian"
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
