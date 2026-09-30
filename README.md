# Alex Morgan portfolio

A light, editorial developer portfolio built with Next.js App Router, React, Tailwind CSS, Motion, and Supabase.

## Run locally

1. Install packages with `npm install`.
2. Copy `.env.example` to `.env.local` and set the Supabase project URL and anon key.
3. Apply `supabase/migrations/202609300001_projects.sql` in the Supabase SQL editor.
4. Create a Supabase Auth user and set its **app_metadata** claim to `{"role":"admin"}` using a trusted server or Supabase dashboard. Do not use user-editable `user_metadata` for authorization.
5. Run `npm run dev`.

Without Supabase environment variables the public homepage uses the two sample projects in `lib/projects.js`. The admin panel stays locked and shows the setup instructions.

## Features

- Published-only public query, technology filters, project detail dialog, and live/repository links.
- A4 landscape PDF export through the browser print dialog. Choose “Save as PDF”.
- Authenticated admin routes require a valid Supabase session and `app_metadata.role === 'admin'`.
- Draft-first editor, publish/unpublish controls, and page revalidation after mutations.
- RLS policies allow anonymous reads of published rows and admin-only access to all project mutations.

Replace the sample name, copy, social URLs, project links, and images with your own details before publishing.
