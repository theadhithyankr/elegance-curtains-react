import { motion } from 'framer-motion';

const CURTAINS = [
  { name: 'Sheer Curtain',    img: '/products/sheer-curtain.png',    desc: 'Diffuses light into a soft, ambient glow' },
  { name: 'Blackout Curtain', img: '/products/blackout-curtain.png', desc: 'Complete light block for restful sleep' },
  { name: 'Pleated Curtain',  img: '/products/pleated-curtain.png',  desc: 'Tailored folds for a structured silhouette' },
  { name: 'Layered Curtain',  img: '/products/layered-curtain.png',  desc: 'Sheer and blackout combined in one track' },
  { name: 'Motorized Curtain',img: '/products/motorized-curtain.png', desc: 'Smart automation at the touch of a button' },
  { name: 'Roman Curtains',   img: '/products/roman-blinds.png',     desc: 'Soft fabric folds, timeless and versatile' },
];

const BLINDS = [
  { name: 'Venetian Blinds', img: '/products/venetian-blind-1.png', desc: 'Precise light control through angled slats' },
  { name: 'Vertical Blinds', img: '/products/vertical-blind-1.png', desc: 'Floor-to-ceiling coverage for wide windows' },
  { name: 'Roman Blinds',    img: '/products/roman-blinds.png',     desc: 'Elegant stacked folds for a refined finish' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

function ProductCard({ name, img, desc, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative overflow-hidden rounded-sm bg-coal shrink-0 w-[75vw] sm:w-auto"
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        {img ? (
          <motion.img
            src={img}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-smoke to-coal">
            <span className="font-serif text-4xl text-champagne/30 tracking-widest select-none" aria-hidden="true">
              {name.split(' ').map((w) => w[0]).join('')}
            </span>
            <span className="mt-4 text-[10px] uppercase tracking-widest text-warmwhite/25 font-sans">
              Image coming soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="px-5 py-4">
        <h3 className="font-serif text-lg text-champagne leading-snug">{name}</h3>
        <p className="mt-1 text-xs font-sans text-warmwhite/60 leading-relaxed">{desc}</p>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] bg-champagne scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
    </motion.div>
  );
}

function GroupHeading({ label, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="flex items-center gap-6 mb-4"
    >
      <span className="font-sans text-[10px] uppercase tracking-widest2 text-champagne">
        {label}
      </span>
      <div className="flex-1 h-px bg-champagne/25" />
    </motion.div>
  );
}

function SwipeRow({ items, startIndex }) {
  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, i) => (
        <ProductCard key={item.name} {...item} index={startIndex + i} />
      ))}
    </div>
  );
}

export default function OurCollections() {
  return (
    <section
      id="collections"
      className="relative bg-onyx py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-16 md:mb-20"
      >
        <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne mb-4">
          What We Offer
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warmwhite leading-tight max-w-lg">
          Our Collections
        </h2>
      </motion.div>

      <div className="space-y-12 md:space-y-16">
        <div>
          <GroupHeading label="Curtains" index={1} />
          <SwipeRow items={CURTAINS} startIndex={2} />
        </div>

        <div>
          <GroupHeading label="Blinds" index={CURTAINS.length + 2} />
          <SwipeRow items={BLINDS} startIndex={CURTAINS.length + 3} />
        </div>
      </div>
    </section>
  );
}
