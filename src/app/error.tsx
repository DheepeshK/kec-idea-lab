'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute top-[15%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-amber/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />

      <div className="relative space-y-6 max-w-lg">
        <span className="label text-accent block">Something went wrong</span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold">
          The lab <span className="text-gradient-brand">experienced an issue</span>
        </h1>
        <p className="body-text text-text-secondary">
          An unexpected error occurred while loading this page. Try again, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent hover:bg-accent/80 text-white shadow-lg shadow-accent/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-border/60 bg-transparent hover:border-accent/40 hover:text-accent text-text-secondary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
