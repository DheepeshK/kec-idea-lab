import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute top-[15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-navy/5 blur-[100px] pointer-events-none" />

      <div className="relative space-y-6 max-w-lg">
        <span className="label text-accent block">404 · Page Not Found</span>
        <h1 className="text-5xl sm:text-6xl font-display font-extrabold">
          This page <span className="text-gradient-brand">got lost</span>
        </h1>
        <p className="body-text text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or never made it out of the lab. Head back
          home to explore the IDEA Lab.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent hover:bg-accent/80 text-white shadow-lg shadow-accent/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent"
          >
            Back to Home
          </Link>
          <Link
            href="/facilities"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-border/60 bg-transparent hover:border-accent/40 hover:text-accent text-text-secondary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent"
          >
            Explore Facilities
          </Link>
        </div>
      </div>
    </div>
  );
}
