import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox.jsx';

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

function ProductCard({ name, img, desc, index, onPreview }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative overflow-hidden bg-coal"
    >
      <button
        type="button"
        onClick={onPreview}
        className="flex w-full text-left"
        aria-label={`View ${name}`}
      >
        {/* Image */}
        <div className="relative shrink-0 w-48 sm:w-64 md:w-80 aspect-[3/4] overflow-hidden">
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
          <span className="absolute bottom-3 right-3 border border-champagne/45 bg-void/65 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            View
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-champagne leading-snug">{name}</h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-warmwhite/60 leading-relaxed max-w-xs">{desc}</p>
        </div>
      </button>

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

function SwipeRow({ items, startIndex, galleryOffset, onPreview }) {
  return (
    <div className="flex flex-col divide-y divide-champagne/10">
      {items.map((item, i) => (
        <ProductCard
          key={item.name}
          {...item}
          index={startIndex + i}
          onPreview={() => onPreview(galleryOffset + i)}
        />
      ))}
    </div>
  );
}

export default function OurCollections() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const galleryItems = [
    ...CURTAINS.map((item) => ({ ...item, title: item.name, image: item.img, category: 'Curtains' })),
    ...BLINDS.map((item) => ({ ...item, title: item.name, image: item.img, category: 'Blinds' })),
  ];

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  return (
    <>
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
            <SwipeRow items={CURTAINS} startIndex={2} galleryOffset={0} onPreview={openPreview} />
          </div>

          <div>
            <GroupHeading label="Blinds" index={CURTAINS.length + 2} />
            <SwipeRow
              items={BLINDS}
              startIndex={CURTAINS.length + 3}
              galleryOffset={CURTAINS.length}
              onPreview={openPreview}
            />
          </div>
        </div>
      </section>

      <ImageLightbox
        open={previewOpen}
        items={galleryItems}
        index={previewIndex}
        onClose={() => setPreviewOpen(false)}
        onIndexChange={setPreviewIndex}
      />
    </>
  );
}
