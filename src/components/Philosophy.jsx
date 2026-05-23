import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section
      id="studio"
      ref={ref}
      className="relative bg-obsidian py-24 px-6 sm:py-32 sm:px-10 md:py-40 md:px-16"
    >
      {/* Subtle radial glow behind the headline for warmth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,165,92,0.08) 0%, rgba(7,7,8,0) 60%)',
        }}
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl">
        <p className="mb-8 font-serif italic text-sm text-champagne md:mb-10">
          — Our Philosophy —
        </p>
        <h2 className="font-serif text-[9vw] leading-[1.05] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.5vw]">
          The window is not{' '}
          <span className="italic font-light text-warmwhite/80">
            a hole in the wall.
          </span>
          <br />
          It is the room&apos;s{' '}
          <span className="italic font-light text-champagne">
            first impression.
          </span>
        </h2>

        <div className="mt-12 grid gap-10 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-12">
          {[
            {
              k: '01',
              t: 'Understanding Your Space',
              d: 'We take time to listen. Every window, every room, every lifestyle is different — we make sure your curtains reflect exactly what you need.',
            },
            {
              k: '02',
              t: 'The Right Fit',
              d: 'From style and fabric to size and colour, we guide you through every choice and handle everything from selection to fitting.',
            },
            {
              k: '03',
              t: 'Clean Installation',
              d: 'Professional, precise fitting — every panel hung perfectly, every track aligned, your space left exactly as you imagined it.',
            },
          ].map((item) => (
            <div
              key={item.k}
              className="border-t border-champagne/20 pt-6 md:border-none md:pt-0"
            >
              <p className="font-serif italic text-champagne">{item.k}</p>
              <h3 className="mt-2 font-serif text-2xl text-warmwhite">
                {item.t}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-warmwhite/65">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
