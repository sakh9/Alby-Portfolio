create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tagline text not null default '',
  description text not null default '',
  tech_stack text[] not null default '{}',
  live_link text not null default '',
  github_link text not null default '',
  image_url text not null default '',
  style_variant text not null default 'split' check (style_variant in ('split', 'card', 'editorial')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public" on public.projects
for select to anon using (status = 'published');

drop policy if exists "Admins can read all projects" on public.projects;
create policy "Admins can read all projects" on public.projects
for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects" on public.projects
for insert to authenticated with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects" on public.projects
for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects" on public.projects
for delete to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.projects (title, tagline, description, tech_stack, live_link, github_link, image_url, style_variant, status, published_at)
values
('Northstar', 'A calmer way to find your next place.', 'A considered search experience for the people and places that make a city feel like home. I led the product build from early prototype through launch.', array['Next.js','TypeScript','Mapbox','Supabase'], 'https://example.com', 'https://github.com', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85', 'split', 'published', '2025-02-15T00:00:00Z'),
('Fieldnotes', 'Small observations, made useful.', 'A lightweight research journal for teams working close to the real world. Designed to capture the details that usually get lost between interviews.', array['React','Node.js','Postgres','Figma'], 'https://example.com', 'https://github.com', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', 'editorial', 'published', '2024-10-02T00:00:00Z')
on conflict do nothing;
