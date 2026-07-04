'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Check support for the View Transitions API
    // @ts-ignore
    const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;

    if (!supportsViewTransitions) {
      return;
    }

    const handleLinkClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor) {
        return;
      }

      // Check for modifier keys (CMD, Ctrl, Shift, Alt click to open in new tab etc.)
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const href = anchor.getAttribute('href');

      // Only transition internal, relative links that don't open in new window
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.getAttribute('target') === '_blank'
      ) {
        return;
      }

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return;
      }

      // Intercept the click event
      e.preventDefault();

      // Start the view transition
      // @ts-ignore
      document.startViewTransition(() => {
        router.push(href);
      });
    };

    document.addEventListener('click', handleLinkClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, [router]);

  return <div className="transition-wrapper">{children}</div>;
}
