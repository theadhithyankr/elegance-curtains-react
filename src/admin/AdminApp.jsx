import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import AdminLogin from './AdminLogin.jsx';
import WorksManager from './WorksManager.jsx';

function ConfigNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6">
      <div className="max-w-sm border border-champagne/20 bg-coal p-8">
        <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne">
          Elegants Studio
        </p>
        <h1 className="mt-2 font-serif text-3xl text-warmwhite">Admin is not configured</h1>
        <p className="mt-4 text-sm font-light leading-relaxed text-warmwhite/60">
          Add the Supabase env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) and deploy, then
          visit this page again.
        </p>
      </div>
    </main>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <ConfigNotice />;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <span className="font-serif italic text-champagne/70">Studio · loading</span>
      </div>
    );
  }

  return session ? <WorksManager /> : <AdminLogin />;
}