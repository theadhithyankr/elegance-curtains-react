import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const THEME_COLORS = { dark: '#070708', light: '#ffffff' };

function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
  }
  return 'dark';
}

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const apply = useCallback((next) => {
    const root = document.documentElement;
    // Transient transition class — smooth fade without leaving transitions on
    // during scroll-driven animations.
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[next]);
    window.setTimeout(() => root.classList.remove('theme-transition'), 320);
  }, []);

  // Keep the DOM in sync on mount (covers the case where state came from storage).
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      apply(next);
      return next;
    });
  }, [apply]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
