'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track resolved theme from DOM attribute (handles "system" mode correctly)
  useEffect(() => {
    const update = () => {
      const attr = document.documentElement.getAttribute('data-theme');
      setIsDark(attr !== 'light');
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Team', href: '/team' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('idealab-theme', next);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/60 transition-colors duration-300" id="site-navbar">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand area */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-accent/20 group-hover:border-accent/40 transition-all duration-300 shrink-0 bg-bg-elevated">
                <img
                  src="/IDEALab.png"
                  alt="IDEA Lab"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-text leading-none">
                  IDEA Lab <span className="text-accent">@ KEC</span>
                </span>
                <span className="label text-text-secondary mt-1 leading-none">
                  IEF @ KEC
                </span>
              </div>
            </Link>
            {/* Partner logo strip */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border/40">
              {[
                { src: '/AICTE.png', alt: 'AICTE' },
                { src: '/KEC_new2.png', alt: 'KEC' },
                { src: '/IIC.png', alt: 'IIC' },
                { src: '/EMDC.png', alt: 'EMDC' },
                { src: '/TBI.png', alt: 'TBI' },
              ].map((logo) => (
                <div key={logo.alt} className="relative w-10 h-10 rounded overflow-hidden opacity-85 hover:opacity-100 transition-opacity bg-bg-elevated border border-border/20">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                    active 
                      ? 'text-accent' 
                      : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Area (Theme & Portal) */}
          <div className="hidden md:flex items-center gap-3">
              {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border/60 text-text-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                aria-label="Toggle Theme"
                id="navbar-theme-toggle"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-warn" />
                ) : (
                  <Moon className="h-4 w-4 text-accent" />
                )}
              </button>
            )}

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 bg-bg/50 border border-border/60 hover:border-accent-3/40 hover:bg-accent-3/5 text-text-secondary hover:text-accent-3 px-3 py-1.5 rounded-lg text-xs font-sans tracking-wider uppercase transition-all duration-300"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-accent-3" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border text-text hover:bg-border/20 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-warn" />
                ) : (
                  <Moon className="h-4 w-4 text-accent" />
                )}
              </button>
            )}

            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-border text-text-secondary hover:text-text hover:bg-border/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slidedown/fadein */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden border-t border-border bg-bg-elevated px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
          id="mobile-nav-menu"
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-accent/10 text-accent font-semibold border-l-2 border-accent'
                      : 'text-text-secondary hover:bg-accent/5 hover:text-accent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border">
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-bg border border-border hover:bg-border/10 text-text py-2.5 rounded-lg text-sm font-sans tracking-wider uppercase transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-accent-2" />
              <span>Admin Workspace</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
