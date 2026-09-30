'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '../../lib/supabase/server';

async function requireAdmin() {
  const supabase = await createServerClient();
  if (!supabase) throw new Error('Add Supabase environment variables to enable the admin panel.');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== 'admin') throw new Error('Admin access required.');
  return supabase;
}

export async function signIn(formData) {
  const supabase = await createServerClient();
  if (!supabase) redirect('/admin/login?setup=required');
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/admin/login?error=credentials');
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.app_metadata?.role !== 'admin') {
    await supabase.auth.signOut();
    redirect('/admin/login?error=unauthorized');
  }
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function saveProject(formData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id') || '');
  const project = {
    title: String(formData.get('title') || '').trim(),
    tagline: String(formData.get('tagline') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    tech_stack: String(formData.get('tech_stack') || '').split(',').map((x) => x.trim()).filter(Boolean),
    image_url: String(formData.get('image_url') || '').trim(),
    live_link: String(formData.get('live_link') || '').trim(),
    github_link: String(formData.get('github_link') || '').trim(),
    style_variant: String(formData.get('style_variant') || 'split'),
    status: 'draft',
  };
  if (!project.title) throw new Error('A project title is required.');
  if (id) {
    const { error } = await supabase.from('projects').update(project).eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('projects').insert(project);
    if (error) throw new Error(error.message);
  }
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function setProjectStatus(formData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));
  if (!['draft', 'published'].includes(status)) throw new Error('Invalid project status.');
  const { error } = await supabase.from('projects').update({ status, published_at: status === 'published' ? new Date().toISOString() : null }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProject(formData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from('projects').delete().eq('id', String(formData.get('id')));
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}
