'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        className="relative glass mt-2 w-full border-y border-border/60 transition-colors duration-300"
        id="site-navbar"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand area */}
            <div className="flex items-center gap-3">
              {/* <Link href="https://www.kongu.ac.in/" className="flex items-center gap-2.5 group">
              <div className="relative w-11 h-11 shrink-0">
                <img src="/KEC_new2.png" alt="KEC logo" className="w-full h-full object-contain" />
              </div>
            </Link> */}
              {/* <div className="flex flex-col">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-text leading-none">
                  AICTE IDEA Lab <span className="text-accent">@ KEC</span>
                </span>
              </div> */}
              {/* Partner logo strip */}

              <a
                href="https://www.kongu.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-10 sm:left-20 top-12 z-20 flex w-fit -translate-y-1/2 items-center rounded-xl border border-border/60 bg-white px-6 py-2.5 shadow-xl shadow-black/20 transition-transform duration-200 hover:-translate-y-[55%]"
                aria-label="Visit Kongu Engineering College website"
              >
                <img src="/KEC_new2.png" alt="Kongu Engineering College" className="h-20 sm:h-16 w-60 object-contain" />
              </a>
            </div>

            {/* Desktop Nav links */}
            <div className="hidden md:flex ml-auto items-center justify-end gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`py-1.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                      active ? 'text-accent' : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-accent rounded-full" />}
                  </Link>
                );
              })}
            </div>

            {/* Action Area (Theme & Portal) */}
            <div className="hidden md:flex items-center gap-3"></div>

            {/* Mobile Actions and Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg border border-border text-text-secondary hover:text-text hover:bg-border/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav-menu"
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
          </div>
        )}
      </nav>
    </div>
  );
}
