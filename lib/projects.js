export const demoProjects = [
  {
    id: 'northstar',
    title: 'Northstar',
    tagline: 'A calmer way to find your next place.',
    description: 'A considered search experience for the people and places that make a city feel like home. I led the product build from early prototype through launch.',
    tech_stack: ['Next.js', 'TypeScript', 'Mapbox', 'Supabase'],
    live_link: 'https://example.com',
    github_link: 'https://github.com',
    image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    style_variant: 'split',
    status: 'published',
    published_at: '2025-02-15',
  },
  {
    id: 'fieldnotes',
    title: 'Fieldnotes',
    tagline: 'Small observations, made useful.',
    description: 'A lightweight research journal for teams working close to the real world. Designed to capture the details that usually get lost between interviews.',
    tech_stack: ['React', 'Node.js', 'Postgres', 'Figma'],
    live_link: 'https://example.com',
    github_link: 'https://github.com',
    image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    style_variant: 'editorial',
    status: 'published',
    published_at: '2024-10-02',
  },
];

export async function getPublishedProjects() {
  const { createServerClient } = await import('./supabase/server');
  const supabase = await createServerClient();
  if (!supabase) return demoProjects;
  const { data, error } = await supabase.from('projects').select('*').eq('status', 'published').order('published_at', { ascending: false });
  if (error || !data) return demoProjects;
  return data;
}
