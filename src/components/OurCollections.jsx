import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import ImageLightbox from './ImageLightbox.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { useWorks, workBookingContext } from '../hooks/useWorks.js';
import { imgUrl } from '../lib/supabase.js';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

function ProductCard({ product, cover, index, onPreview, onAsk }) {
  const preserveFullImage = product.imageFit === 'contain';

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative overflow-hidden bg-coal"
    >
      <div className="flex w-full flex-col text-left sm:flex-row">
        <button
          type="button"
          onClick={onPreview}
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden text-left sm:aspect-[3/4] sm:w-64 md:w-80"
          aria-label={`View ${product.name}`}
        >
          {cover && cover.type === 'video' ? (
            <video
              src={cover.url}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <motion.img
              src={cover ? cover.img : ''}
              alt={product.name}
              loading="lazy"
              className={`h-full w-full ${
                preserveFullImage ? 'object-contain p-3 sm:p-4' : 'object-cover'
              }`}
              whileHover={{ scale: preserveFullImage ? 1.01 : 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <span className="absolute bottom-3 right-3 border border-champagne/45 bg-void/65 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-champagne opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            View
          </span>
        </button>

        <div className="flex flex-1 flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
          <p className="mb-2 text-[10px] uppercase tracking-widest2 text-warmwhite/35">
            {product.category}
          </p>
          <h3 className="font-serif text-xl leading-snug text-champagne sm:text-2xl md:text-3xl">
            {product.name}
          </h3>
          {product.desc && (
            <p className="mt-2 max-w-xs text-xs font-sans leading-relaxed text-warmwhite/60 sm:text-sm">
              {product.desc}
            </p>
          )}
          {product.bestFor && (
            <p className="mt-4 max-w-md text-xs font-light leading-relaxed text-warmwhite/75 sm:text-sm">
              <span className="font-serif italic text-champagne">Best for: </span>
              {product.bestFor}
            </p>
          )}
          {product.benefits?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="border border-champagne/25 px-3 py-1.5 text-[10px] uppercase tracking-widest text-warmwhite/65"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onAsk}
              className="bg-champagne px-4 py-2.5 text-[10px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite active:translate-y-px"
            >
              Ask about this
            </button>
            <button
              type="button"
              onClick={onPreview}
              className="border border-champagne/45 px-4 py-2.5 text-[10px] uppercase tracking-widest2 text-champagne transition-colors hover:bg-champagne hover:text-obsidian active:translate-y-px"
            >
              View larger
            </button>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-champagne transition-transform duration-500 group-hover:scale-y-100" />
    </motion.div>
  );
}

function GroupHeading({ label, summary, count, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="mb-8 grid gap-5 border-t border-champagne/25 pt-8 md:grid-cols-[0.55fr_1fr] md:items-end md:gap-12"
    >
      <div>
        <p className="mb-3 font-sans text-[10px] uppercase tracking-widest2 text-champagne">
          {String(count).padStart(2, '0')} options
        </p>
        <h3 className="font-serif text-4xl leading-tight text-warmwhite sm:text-5xl md:text-6xl">
          {label}
        </h3>
      </div>
      <p className="max-w-2xl text-sm font-light leading-relaxed text-warmwhite/65 sm:text-base">
        {summary}
      </p>
    </motion.div>
  );
}

function SwipeRow({ items, startIndex, onPreview, onAsk }) {
  return (
    <div className="flex flex-col divide-y divide-champagne/10">
      {items.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={startIndex + i}
          cover={product.media[0]}
          onPreview={() => onPreview(product)}
          onAsk={() => onAsk(product)}
        />
      ))}
    </div>
  );
}

export default function OurCollections() {
  const { works, loading, error } = useWorks();
  const [previewItems, setPreviewItems] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { openBooking } = useBooking();

  const products = useMemo(
    () => works.filter((work) => work.category === 'Curtains' || work.category === 'Blinds'),
    [works]
  );
  const curtains = useMemo(
    () => products.filter((product) => product.category === 'Curtains'),
    [products]
  );
  const blinds = useMemo(
    () => products.filter((product) => product.category === 'Blinds'),
    [products]
  );

  const openPreview = (product) => {
    if (!product.images.length) return;
    setPreviewItems(
      product.images.map((media, i) => ({
        image: imgUrl(media.path, 1600),
        title: product.name,
        category: product.category,
        type: product.desc,
        imageFit: product.imageFit,
        index: i,
        bookingContext: workBookingContext(product),
      }))
    );
    setPreviewIndex(0);
    setPreviewOpen(true);
  };

  const askAbout = (product) => {
    openBooking(workBookingContext(product));
  };

  return (
    <>
      <section
        id="collections"
        className="relative bg-onyx px-6 py-24 md:px-12 md:py-32 lg:px-20"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-4 font-sans text-[10px] uppercase tracking-widest2 text-champagne">
            What We Offer
          </p>
          <h2 className="max-w-lg font-serif text-4xl leading-tight text-warmwhite md:text-5xl lg:text-6xl">
            Our Collections
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {loading && (
            <p className="py-8 text-center text-sm font-light text-warmwhite/50">
              Loading collections…
            </p>
          )}
          {error && (
            <p className="py-8 text-center text-sm font-light text-red-300/80">
              Could not load the collection — please refresh.
            </p>
          )}

          <section id="curtains" aria-labelledby="curtains-heading">
            <GroupHeading
              label="Curtains"
              summary="Soft fabric treatments for privacy, daylight, insulation and room character. Choose this group when you want drape, texture, layered depth or a more furnished feeling."
              count={curtains.length}
              index={1}
            />
            <h4 id="curtains-heading" className="sr-only">Curtain collection</h4>
            <SwipeRow
              items={curtains}
              startIndex={2}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </section>

          <section id="blinds" aria-labelledby="blinds-heading">
            <GroupHeading
              label="Blinds"
              summary="Compact window systems for precise light control, easy operation and cleaner lines. Choose this group for offices, small windows, wide glass spans or low-maintenance rooms."
              count={blinds.length}
              index={curtains.length + 2}
            />
            <h4 id="blinds-heading" className="sr-only">Blind collection</h4>
            <SwipeRow
              items={blinds}
              startIndex={curtains.length + 3}
              onPreview={openPreview}
              onAsk={askAbout}
            />
          </section>
        </div>
      </section>

      <ImageLightbox
        open={previewOpen}
        items={previewItems}
        index={previewIndex}
        onClose={() => setPreviewOpen(false)}
        onIndexChange={setPreviewIndex}
      />
    </>
  );
}
