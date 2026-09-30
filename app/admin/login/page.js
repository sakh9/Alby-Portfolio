import { signIn } from '../actions';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'Admin sign in — Alex Morgan' };

export default async function Login({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  return <main className="grid min-h-screen place-items-center px-5">
    <div className="w-full max-w-sm">
      <a href="/" className="mb-14 inline-flex items-center gap-2 text-xs text-[var(--muted)]"><ArrowLeft size={14}/> Back to portfolio</a>
      <p className="mono mb-4 text-[10px] uppercase tracking-[.2em] text-[var(--accent)]">Private workspace</p>
      <h1 className="serif text-5xl tracking-[-.06em]">Welcome back.</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Sign in with your Supabase admin account.</p>
      {params?.setup && <p className="mt-6 border border-amber-300 bg-amber-50 p-3 text-xs leading-5">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then create an Auth user with the admin role.</p>}
      {error && <p className="mt-6 border border-red-200 bg-red-50 p-3 text-xs">{error === 'unauthorized' ? 'This account does not have admin access.' : 'Email or password was not accepted.'}</p>}
      <form action={signIn} className="mt-8 space-y-4"><label className="block text-xs">Email<input required type="email" name="email" autoComplete="email" className="admin-field mt-2"/></label><label className="block text-xs">Password<input required type="password" name="password" autoComplete="current-password" className="admin-field mt-2"/></label><button className="button-primary mt-2 w-full px-4 py-3 text-xs font-semibold">Sign in</button></form>
    </div>
  </main>;
}
