/**
 * One-time migration: optimizes the existing static catalog
 * (public/products/*, public/materials/*) and uploads it to Supabase.
 *
 * Images are resized/converted to WebP via sharp before upload, so the
 * site never needs paid image transformations.
 *
 * Usage:
 *   1. cp .env.example .env   (fill SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
 *   2. npm run seed
 *
 * Requires the schema from supabase/schema.sql to be applied first.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'node:url';

const __dirname = join(fileURLToPath(import.meta.url), '..');

import { PRODUCTS } from '../src/data/collections.js';
import { MATERIALS } from '../src/data/materials.js';

const MAX_DIM = 1600;
const WEBP_QUALITY = 82;

function loadEnv() {
  const file = join(__dirname, '..', '.env');
  const env = { ...process.env };
  try {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in env)) env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env — rely on process env */
  }
  return env;
}

/** Deterministic UUID (uuidv5-style) from a seed string. */
function uuid(seed) {
  const hex = createHash('sha256').update(seed).digest('hex').slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-8${hex.slice(17, 20)}-${hex.slice(20)}`;
}

const PUBLIC_DIR = join(__dirname, '..', 'public');
const BUCKET = 'works';

function slugify(list, map) {
  return list.map((item, i) => {
    const id = uuid(`seed:${item.name}`);
    const fileName = item.image.split('/').pop();
    const filePath = join(PUBLIC_DIR, item.image.replace(/^\//, ''));
    const webpName = fileName.replace(/\.[^.]+$/, '') + '.webp';
    return {
      work: {
        id,
        ...map(item),
      },
      media: [
        {
          id: uuid(`${id}:image:0`),
          work_id: id,
          media_type: 'image',
          path: `${id}/${webpName}`,
          position: 0,
        },
      ],
      file: { filePath, storagePath: `${id}/${webpName}` },
    };
  });
}

const toSeed = [
  ...slugify(PRODUCTS, (p) => ({
    title: p.name,
    category: p.category,
    description: p.desc,
    best_for: p.bestFor,
    benefits: p.benefits,
    materials: p.materials,
    notes_seed: p.notesSeed,
    automation: p.automation || null,
    image_fit: p.imageFit || 'cover',
  })),
  ...slugify(MATERIALS, (m) => ({
    title: m.name,
    category: 'Fabrics',
    description: m.description,
    best_for: null,
    benefits: [],
    materials: [],
    notes_seed: null,
    automation: null,
    image_fit: 'cover',
  })),
];

const env = loadEnv();
const supabase = createClient(
  env.SUPABASE_URL || env.VITE_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { count, error: countError } = await supabase
    .from('works')
    .select('id', { count: 'exact', head: true });
  if (countError) throw new Error(`Can't reach the works table: ${countError.message}`);
  if (count > 0) {
    console.log(`works table already has ${count} rows — skipping seed.`);
    console.log('(Run with --force to re-seed.)');
    if (!process.argv.includes('--force')) return;
  }

  let done = 0;
  for (const { work, media, file } of toSeed) {
    const overwrite = process.argv.includes('--force');

    const optimized = await sharp(readFileSync(file.filePath))
      .rotate()
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    const { data, error: storageError } = await supabase.storage
      .from(BUCKET)
      .upload(file.storagePath, optimized, {
        contentType: 'image/webp',
        upsert: overwrite,
      });
    if (storageError) {
      if (storageError.statusCode === 409 && !overwrite) {
        console.log(`skip  ${file.storagePath} (already uploaded)`);
      } else {
        console.error(`FAIL  ${file.storagePath}: ${storageError.message}`);
        process.exitCode = 1;
        continue;
      }
    } else if (data) {
      console.log(`up    ${file.storagePath}`);
    }

    const { error: workError } = await supabase
      .from('works')
      .upsert([work], { onConflict: 'id', ignoreDuplicates: !overwrite });
    if (workError) throw new Error(`works insert failed for ${work.title}: ${workError.message}`);

    const { error: mediaError } = await supabase
      .from('work_media')
      .upsert(media, { onConflict: 'id', ignoreDuplicates: !overwrite });
    if (mediaError) throw new Error(`work_media insert failed for ${work.title}: ${mediaError.message}`);

    done++;
  }

  console.log(`\nSeeded ${done}/${toSeed.length} items.`);
  if (!process.exitCode) console.log('Next: delete public/products and public/materials, then deploy.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});