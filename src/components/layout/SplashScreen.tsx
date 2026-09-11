'use client';

import { useEffect } from 'react';

const MIN_DISPLAY_MS = 800;
const STORAGE_KEY = 'splash-shown';

export default function SplashScreen() {
  useEffect(() => {
    const el = document.getElementById('splash');
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    if (prefersReducedMotion || alreadyShown) {
      el.remove();
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, '1');
    el.style.visibility = 'visible';

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
