import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ViewTransitionsProvider from '@/components/layout/ViewTransitionsProvider';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text selection:bg-accent/30 selection:text-text">
      <Navbar />
      <main className="flex-grow">
        <ViewTransitionsProvider>
          {children}
        </ViewTransitionsProvider>
      </main>
      <Footer />
    </div>
  );
}
