import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* Wrapper that translates its child slightly toward the cursor while the
 * cursor is within `range` pixels. Touch devices and reduced-motion users
 * get a static element. */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.25,
  range = 120,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: fine)');
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, []);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > range) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * strength);
      y.set(dy * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, range, strength, x, y]);

  if (!enabled) {
    return (
      <span ref={ref} className={className} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
