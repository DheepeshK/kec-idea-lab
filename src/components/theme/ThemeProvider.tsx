'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const STORAGE_KEY = 'idealab-theme';

function ThemeSync() {
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');

    const apply = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || stored === 'system') {
        document.documentElement.setAttribute(
          'data-theme',
          mq.matches ? 'light' : 'dark',
        );
      }
    };

    const handler = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || stored === 'system') {
        document.documentElement.setAttribute(
          'data-theme',
          mq.matches ? 'light' : 'dark',
        );
        localStorage.setItem(STORAGE_KEY, 'system');
      }
    };

    apply();

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return null;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem={true}
      storageKey={STORAGE_KEY}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
