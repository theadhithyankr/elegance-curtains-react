import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** null until VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are configured. */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

export const BUCKET = 'works';

/** Public storage URL for a media path. */
export function assetUrl(path) {
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`;
}

/**
 * Alias kept for call-site readability. Uploads are pre-optimized
 * (client-side compression in the admin, sharp in the seed script),
 * so images are served directly without on-the-fly transformations
 * — which require a paid Supabase plan.
 */
export const imgUrl = assetUrl;