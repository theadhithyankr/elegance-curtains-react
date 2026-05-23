import { motion, useScroll, useSpring } from 'framer-motion';

/* A 1px champagne hairline on the right edge of the viewport, filling
 * top-to-bottom as the user scrolls the page. Desktop only. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  return (
    <div
      className="pointer-events-none fixed right-0 top-0 z-[55] hidden h-screen w-px md:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-warmwhite/10" />
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute inset-0 bg-champagne"
      />
    </div>
  );
}
