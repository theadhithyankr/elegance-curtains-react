import { useState } from 'react';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError('Incorrect email or password.');
    setBusy(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6">
      <form onSubmit={submit} className="w-full max-w-sm border border-champagne/20 bg-coal p-8">
        <p className="font-sans text-[10px] uppercase tracking-widest2 text-champagne">
          Elegants Studio
        </p>
        <h1 className="mt-2 font-serif text-3xl text-warmwhite">Admin sign in</h1>

        <label className="mt-8 block">
          <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-[10px] uppercase tracking-widest2 text-warmwhite/55">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="mt-2 w-full border border-champagne/25 bg-void px-3 py-2.5 text-sm text-warmwhite outline-none transition-colors focus:border-champagne"
          />
        </label>

        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full bg-champagne px-4 py-3 text-[11px] uppercase tracking-widest2 text-obsidian transition-colors hover:bg-warmwhite disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}