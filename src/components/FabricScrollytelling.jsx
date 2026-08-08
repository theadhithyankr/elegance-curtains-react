import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useWorks } from '../hooks/useWorks.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};

export default function FabricScrollytelling() {
  const { works, loading, error } = useWorks();
  const materials = useMemo(
    () => works.filter((work) => work.category === 'Fabrics'),
    [works]
  );

  return (
    <section id="fabrics" className="relative overflow-hidden bg-obsidian px-6 py-24 sm:px-10 sm:py-28 md:px-16 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 78% 12%, var(--c-glow-md) 0%, var(--c-bg0) 58%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <p className="mb-4 font-serif italic text-sm text-champagne">
            - Materials & Blind Finishes -
          </p>
          <h2 className="font-serif text-[10vw] leading-[1.02] tracking-tight text-warmwhite sm:text-[7vw] md:text-[4.8vw]">
            See the fabrics
            <span className="block italic font-light text-champagne">before you choose.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-warmwhite/65 sm:text-base">
            Curtain fabrics and blind materials are shown as a visible gallery so every finish is easy to compare.
          </p>
        </motion.div>

        {loading && (
            <p className="py-8 text-center text-sm font-light text-warmwhite/50">
              Loading materials…
            </p>
          )}
          {error && (
            <p className="py-8 text-center text-sm font-light text-red-300/80">
              Could not load the materials — please refresh.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((item, i) => {
            const cover = item.media.find((m) => m.type === 'image') || item.media[0];
            return (
            <motion.article
              key={item.id}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="group overflow-hidden bg-coal"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {cover && cover.type === 'video' ? (
                  <video
                    src={cover.url}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={cover ? cover.img : ''}
                    alt={`${item.name} ${item.category.toLowerCase()}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 border border-champagne/45 bg-void/60 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="font-serif text-2xl leading-tight text-warmwhite">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="mt-3 text-sm font-light leading-relaxed text-warmwhite/62">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
