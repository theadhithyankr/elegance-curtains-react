/*
 * Wordmark — the brand lockup. "Elegant" sits on top in italic Playfair
 * Display champagne gold; "Curtains and Blinds" stacks underneath at about
 * a quarter the size, in tracked-out uppercase Inter.
 *
 * When `hoverable` is true, a champagne underline draws in beneath
 * "Elegant" on group-hover — used for the Navigation link, not for
 * passive signature placements.
 */
export default function Wordmark({
  className = '',
  size = 'sm',
  as: Tag = 'span',
  hoverable = false,
}) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-[8vw] md:text-[4vw]',
    xl: 'text-[14vw] md:text-[8vw]',
  };
  return (
    <Tag
      className={`group/wm font-sans inline-flex flex-col items-center leading-none ${sizes[size]} ${className}`}
    >
      <span className="relative font-serif italic font-medium text-champagne">
        Elegant
        {hoverable && (
          <span
            className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/wm:scale-x-100"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="mt-1 text-[0.26em] uppercase tracking-widest2 font-light whitespace-nowrap">
        Curtains <span className="opacity-60">and</span> Blinds
      </span>
    </Tag>
  );
}
