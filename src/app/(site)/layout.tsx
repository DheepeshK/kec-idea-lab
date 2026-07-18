import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ViewTransitionsProvider from '@/components/layout/ViewTransitionsProvider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text selection:bg-accent/30 selection:text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <ViewTransitionsProvider>{children}</ViewTransitionsProvider>
      </main>
      <Footer />
    </div>
  );
}
