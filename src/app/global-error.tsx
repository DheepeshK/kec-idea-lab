'use client';

import { useEffect } from 'react';

/**
 * Handles failures in the root layout itself, where the regular error boundary
 * cannot be rendered. Its styles are intentionally self-contained.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          background: '#0b1220',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main style={{ maxWidth: 520, textAlign: 'center' }}>
          <p style={{ color: '#f9a01b', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AICTE IDEA Lab @ KEC
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}>Something went wrong</h1>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
            Please try loading the site again. If the issue continues, return to the homepage.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <button
              type="button"
              onClick={reset}
              style={{ border: 0, borderRadius: 8, padding: '12px 18px', cursor: 'pointer', fontWeight: 700 }}
            >
              Try again
            </button>
            <a href="/" style={{ color: '#f8fafc', padding: '12px 18px' }}>
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
