'use client';

import { useEffect } from 'react';

const MIN_DISPLAY_MS = 1800;

export default function SplashScreen() {
  useEffect(() => {
    const el = document.getElementById('splash');
    if (!el) return;

    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 600);
      }, remaining);
    };

    dismiss();
  }, []);

  return null;
}
