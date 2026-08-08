-- Elegants — Supabase schema
-- Run once in the Supabase Dashboard → SQL Editor.
-- Note: on-the-fly image transformations are NOT required. The site
-- serves pre-optimized images (admin compresses uploads in the browser;
-- the seed script converts the catalog to WebP via sharp).

-- ============================================================
-- Tables
-- ============================================================

create table if not exists public.works (
  id uuid primary key,
  title text not null,
  category text not null check (category in ('Curtains', 'Blinds', 'Fabrics')),
  description text,
  best_for text,
  benefits text[] not null default '{}',
  materials text[] not null default '{}',
  notes_seed text,
  image_fit text not null default 'cover' check (image_fit in ('cover', 'contain')),
  automation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_media (
  id uuid primary key,
  work_id uuid not null references public.works (id) on delete cascade,
  media_type text not null check (media_type in ('image', 'video')),
  path text not null,
  position integer not null default 0,
  title_override text,
  created_at timestamptz not null default now()
);

create index if not exists work_media_work_id_idx on public.work_media (work_id);
create index if not exists works_category_idx on public.works (category);

-- ============================================================
-- updated_at trigger
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists works_set_updated_at on public.works;
create trigger works_set_updated_at
  before update on public.works
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
-- Trust model: signups are DISABLED in Auth settings. The only
-- authenticated users are the internal admin account(s), so
-- "authenticated" write access is equivalent to "admin" here.

alter table public.works enable row level security;
alter table public.work_media enable row level security;

drop policy if exists "works public read" on public.works;
create policy "works public read"
  on public.works for select
  to anon
  using (true);

drop policy if exists "works admin insert" on public.works;
create policy "works admin insert"
  on public.works for insert
  to authenticated
  with check (true);

drop policy if exists "works admin update" on public.works;
create policy "works admin update"
  on public.works for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "works admin delete" on public.works;
create policy "works admin delete"
  on public.works for delete
  to authenticated
  using (true);

drop policy if exists "work_media public read" on public.work_media;
create policy "work_media public read"
  on public.work_media for select
  to anon
  using (true);

drop policy if exists "work_media admin insert" on public.work_media;
create policy "work_media admin insert"
  on public.work_media for insert
  to authenticated
  with check (true);

drop policy if exists "work_media admin update" on public.work_media;
create policy "work_media admin update"
  on public.work_media for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "work_media admin delete" on public.work_media;
create policy "work_media admin delete"
  on public.work_media for delete
  to authenticated
  using (true);

-- Explicit grants (required when the Data API setting only exposes
-- tables selected in the dashboard; harmless otherwise).
grant select on public.works, public.work_media to anon;
grant select, insert, update, delete on public.works, public.work_media to authenticated;

-- ============================================================
-- Storage (bucket "works")
-- ============================================================
-- Creates the "works" bucket automatically. If the dashboard asks
-- you to create buckets via the UI instead, do: Storage → New
-- bucket → name: "works" → public: ON.

insert into storage.buckets (id, name, public)
values ('works', 'works', true)
on conflict (id) do nothing;

-- Public bucket: objects are served via their public URLs with NO
-- storage.objects policies. Do NOT add SELECT policies here — they
-- would let anyone list all files via the storage API. The site
-- never lists the bucket; file paths live in the work_media table.

drop policy if exists "works bucket public read" on storage.objects;
drop policy if exists "works bucket anon-read" on storage.objects;

drop policy if exists "works bucket admin insert" on storage.objects;
create policy "works bucket admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'works');

drop policy if exists "works bucket admin update" on storage.objects;
create policy "works bucket admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'works')
  with check (bucket_id = 'works');

drop policy if exists "works bucket admin delete" on storage.objects;
create policy "works bucket admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'works');