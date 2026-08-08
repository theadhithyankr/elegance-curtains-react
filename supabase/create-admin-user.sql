-- Creates the admin user for the #/admin panel.
-- Run once in the Supabase Dashboard → SQL Editor.
-- NOTE: placeholder credentials — change the password via
-- Dashboard → Auth → Users → admin@gmail.com → Reset password
-- before handing the panel over to the client.

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  confirmation_token, email_change, email_change_token_new, recovery_token
)
select
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@gmail.com',
  crypt('password', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  '', '', '', ''
where not exists (
  select 1 from auth.users where email = 'admin@gmail.com'
);

-- Every auth.users row needs a matching identity for sign-ins to work.
insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select
  gen_random_uuid(),
  id,
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  now(), now(), now()
from auth.users
where email = 'admin@gmail.com'
  and not exists (
    select 1 from auth.identities i
    where i.user_id = auth.users.id and i.provider = 'email'
  );