import { redirect } from 'next/navigation';
import { createServerClient } from '../../lib/supabase/server';
import { Dashboard } from '../../components/admin/dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createServerClient();
  if (!supabase) redirect('/admin/login?setup=required');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== 'admin') redirect('/admin/login');
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return <Dashboard projects={data || []}/>;
}
