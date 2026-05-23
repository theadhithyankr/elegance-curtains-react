import { motion } from 'framer-motion';

const PRESS = [
  'Architectural Digest',
  'World of Interiors',
  'House & Garden',
  'Wallpaper*',
  'Elle Decor',
  'Vogue Living',
];

const QUOTES = [
  {
    q: 'They treat fabric the way a tailor treats wool — with patience, and an almost unreasonable amount of care.',
    a: 'Architectural Digest',
  },
  {
    q: 'The most considered window treatments we have seen in a private London home this decade.',
    a: 'House & Garden, Spring Issue',
  },
  {
    q: 'A studio that understands light is a material in its own right.',
    a: 'World of Interiors',
  },
];

export default function SocialProof() {
  return (
    <section className="relative bg-obsidian py-20 px-6 sm:py-24 sm:px-10 md:py-28 md:px-16">
      {/* Press strip */}
      <div className="mx-auto max-w-6xl border-y border-champagne/15 py-8 sm:py-10">
        <p className="mb-6 text-center font-serif italic text-champagne text-sm">
          — As seen in —
        </p>
        <div className="grid grid-cols-2 items-center justify-items-center gap-y-6 gap-x-6 sm:grid-cols-3 md:grid-cols-6">
          {PRESS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.85, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
              className="text-center font-serif italic text-warmwhite/80 text-sm sm:text-base"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Quotes */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:mt-20 md:grid-cols-3 md:gap-12">
        {QUOTES.map((qt, i) => (
          <motion.figure
            key={qt.a}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block font-serif text-4xl leading-none text-champagne">
              &ldquo;
            </span>
            <blockquote className="mt-2 font-serif italic text-lg leading-snug text-warmwhite/90 sm:text-xl">
              {qt.q}
            </blockquote>
            <figcaption className="mt-4 text-[11px] uppercase tracking-widest2 text-champagne/80">
              — {qt.a}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
