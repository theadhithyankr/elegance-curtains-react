import { motion } from 'framer-motion';

const POINTS = [
  {
    k: 'Guided selection',
    d: 'We narrow fabric, lining, blind type and colour based on privacy, glare, heat and daily use.',
  },
  {
    k: 'Made for the window',
    d: 'Every panel, blind and track is planned around the exact reveal, drop, wall condition and furniture layout.',
  },
  {
    k: 'Handled end to end',
    d: 'Measurement, sourcing, stitching, hardware and installation stay with one team until the room is ready.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-obsidian px-6 py-24 sm:px-10 sm:py-28 md:px-16 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            'radial-gradient(ellipse at 15% 25%, var(--c-glow-md) 0%, var(--c-bg0) 55%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="mb-5 font-serif italic text-sm text-champagne">
            - Why choose elegants -
          </p>
          <h2 className="font-serif text-[10vw] leading-[1.02] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.6vw]">
            Not just fabric.
            <span className="block italic font-light text-champagne">
              A finished room.
            </span>
          </h2>
        </div>

        <div className="divide-y divide-champagne/15 border-y border-champagne/15">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <p className="text-[10px] uppercase tracking-widest2 text-champagne">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="font-serif text-2xl text-warmwhite">{point.k}</h3>
                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-warmwhite/65">
                  {point.d}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
