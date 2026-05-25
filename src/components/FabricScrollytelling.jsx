import { motion } from 'framer-motion';

const MATERIALS = [
  {
    name: 'Linen',
    category: 'Curtain Fabric',
    description: 'Breathable texture that softens daylight into a warm, natural glow.',
    image: '/materials/curtain-linen-material-image.jpg',
  },
  {
    name: 'Velvet',
    category: 'Curtain Fabric',
    description: 'A heavier fabric with depth, softness and a richer fall.',
    image: '/materials/curtain-velvet-material-image.jpg',
  },
  {
    name: 'Silk',
    category: 'Curtain Fabric',
    description: 'Light, refined and luminous for formal rooms and statement windows.',
    image: '/materials/curtain-silk-material-image.jpg',
  },
  {
    name: 'Blackout Fabric',
    category: 'Curtain Fabric',
    description: 'Dense weave for bedrooms, media rooms and stronger heat control.',
    image: '/materials/curtain-blackout-fabric-material-image.jpg',
  },
  {
    name: 'Cotton',
    category: 'Curtain Fabric',
    description: 'Soft, practical and familiar for everyday curtain use.',
    image: '/materials/curtain-cotton-material-image.jpg',
  },
  {
    name: 'Sheer Fabric',
    category: 'Curtain Fabric',
    description: 'Light voile that filters brightness while keeping rooms open.',
    image: '/materials/curtain-sheer-fabric-material-image.jpg',
  },
  {
    name: 'Wood',
    category: 'Blind Material',
    description: 'Warm slats for privacy and natural texture.',
    image: '/materials/blind-wood-material-image.jpg',
  },
  {
    name: 'Aluminium',
    category: 'Blind Material',
    description: 'Slim, durable slats for clean modern interiors.',
    image: '/materials/blind-aluminum-material-image.jpg',
  },
  {
    name: 'Bamboo',
    category: 'Blind Material',
    description: 'Organic texture that lets light filter through naturally.',
    image: '/materials/blind-bamboo-material-image.jpg',
  },
  {
    name: 'Faux Wood',
    category: 'Blind Material',
    description: 'Wood look with better moisture resistance for kitchens and bathrooms.',
    image: '/materials/blind-faux-wood-material-image.jpg',
  },
  {
    name: 'PVC / Vinyl',
    category: 'Blind Material',
    description: 'Waterproof and wipe-clean for high-humidity spaces.',
    image: '/materials/blind-pvc-vinyl-material-image.jpg',
  },
  {
    name: 'Solar Screen',
    category: 'Blind Material',
    description: 'Reduces glare and UV while preserving the outside view.',
    image: '/materials/blind-solar-screen-mesh-material-image.jpg',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};

export default function FabricScrollytelling() {
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MATERIALS.map((item, i) => (
            <motion.article
              key={item.name}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="group overflow-hidden bg-coal"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.name} ${item.category.toLowerCase()}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="img-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 border border-champagne/45 bg-void/60 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="font-serif text-2xl leading-tight text-warmwhite">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-warmwhite/62">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
