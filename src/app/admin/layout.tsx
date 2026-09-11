'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Users,
  Wrench,
  ClipboardList,
  MessageSquare,
  LogOut,
  Home,
  ShieldCheck,
  User,
  Menu,
  X,
} from 'lucide-react';
import { ToastProvider } from '@/components/ui/Toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [status, isLoginPage, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sidebarOpen]);

  // While checking authentication, show a premium dark loader screen
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-text">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="label text-text-secondary">Verifying Administrator Credentials...</p>
      </div>
    );
  }

  // If we are on the login page, bypass layout shell
  if (isLoginPage) {
    return <div className="bg-bg text-text min-h-screen">{children}</div>;
  }

  // If user is not logged in and not on login page, render nothing while redirect is in progress
  if (status === 'unauthenticated') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Equipment', href: '/admin/equipment', icon: Wrench },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
    { name: 'Registrations', href: '/admin/registrations', icon: ClipboardList },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  ];

  const asideContent = (
    <>
      <div className="p-6">
        <div className="mb-6 pb-4 border-b border-border space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-accent p-1.5 rounded-lg text-text">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider block text-text">ADMIN PORTAL</span>
              <span className="label text-accent block -mt-0.5">Idea Lab KEC</span>
            </div>
          </div>
          {/* Partner logos strip */}
          <div className="flex items-center gap-2 pl-1 flex-wrap">
            {[
              { src: '/AICTE.png', alt: 'AICTE' },
              { src: '/KEC_new2.png', alt: 'KEC' },
              { src: '/IDEALab.png', alt: 'IDEA Lab' },
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="relative w-10 h-10 rounded overflow-hidden opacity-75 hover:opacity-100 transition-opacity bg-bg border border-border/20"
              >
                <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain p-[2px]" />
              </div>
            ))}
          </div>
        </div>

        <nav className="space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                  active
                    ? 'bg-accent text-text font-semibold'
                    : 'text-text-secondary hover:text-text hover:bg-border/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User context footer */}
      <div className="p-6 border-t border-accent-2/20 bg-bg-elevated/40 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-border/30 flex items-center justify-center text-accent animate-pulse">
            <User className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-text truncate">{session?.user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-text-secondary truncate">{session?.user?.email || 'admin@kec.ac.in'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-accent-3/10 hover:bg-accent-3/20 text-accent-3 text-xs font-medium border border-accent-3/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-3/60"
          >
            <Home className="h-3.5 w-3.5" />
            Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-accent-2/10 hover:bg-accent-2/20 text-accent-2 text-xs font-medium border border-accent-2/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/60"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-bg-elevated border-b border-border">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded-lg text-text">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm tracking-wider text-text">ADMIN PORTAL</span>
        </div>
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarOpen}
          aria-controls="admin-sidebar"
          className="p-2 rounded-lg border border-border text-text-secondary hover:text-text hover:bg-border/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex">
        {/* Sidebar navigation */}
        <aside
          id="admin-sidebar"
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-elevated border-r border-border flex flex-col justify-between shadow-2xl shadow-accent/5 transition-transform duration-300 md:static md:translate-x-0 md:z-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="md:hidden flex justify-end p-3 pb-0">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="p-2 rounded-lg border border-border text-text-secondary hover:text-text hover:bg-border/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {asideContent}
        </aside>

        {/* Main dashboard content area */}
        <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <ToastProvider>{children}</ToastProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
