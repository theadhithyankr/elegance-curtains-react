/* Builds an Unsplash src + srcset with sensible breakpoints, so phones
 * don't have to download 2400-wide hero images. */
export function unsplashImage(base, sizes = '100vw', { quality = 80 } = {}) {
  const widths = [600, 1000, 1600, 2400];
  const url = (w, q = quality) =>
    `${base}?auto=format&fit=crop&w=${w}&q=${q}`;
  return {
    src: url(2400),
    srcSet: widths.map((w) => `${url(w, w < 1200 ? 75 : quality)} ${w}w`).join(', '),
    sizes,
  };
}
