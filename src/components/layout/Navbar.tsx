'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav
        className={`relative w-full border-b transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-scrolled border-border/70 shadow-lg shadow-black/[0.04]'
            : 'glass-nav border-border/40 shadow-sm shadow-black/[0.02]'
        }`}
        id="site-navbar"
      >
        {/* Subtle Ambient Top Rim Light */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Brand area */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.kongu.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-10 sm:left-20 top-12 z-20 flex w-fit -translate-y-1/2 items-center rounded-2xl border border-white/80 bg-white/85 backdrop-blur-xl px-6 py-2.5 shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-[55%] hover:shadow-2xl hover:bg-white ring-1 ring-black/[0.04]"
                aria-label="Visit Kongu Engineering College website"
              >
                <img
                  src="/KEC_new2.png"
                  alt="Kongu Engineering College"
                  className="h-20 sm:h-16 w-60 object-contain drop-shadow-sm"
                />
              </a>
            </div>

            {/* Desktop Nav links inside frosted glass capsule */}
            <div className="hidden md:flex ml-auto items-center justify-end gap-1.5 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.03]">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 relative ${
                      active
                        ? 'text-accent bg-accent/10 border border-accent/25 shadow-sm shadow-accent/10'
                        : 'text-text-secondary hover:text-accent hover:bg-white/70 hover:shadow-sm border border-transparent'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions and Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl border border-border/60 bg-white/70 backdrop-blur-md text-text hover:text-accent hover:bg-white/95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 shadow-sm"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav-menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slidedown/fadein with frosted glass */}
        {isOpen && (
          <div
            ref={menuRef}
            className="md:hidden border border-border/60 bg-white/85 backdrop-blur-2xl px-5 py-4 space-y-2 rounded-2xl mx-4 my-3 shadow-2xl shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/60"
            id="mobile-nav-menu"
          >
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-accent/15 text-accent border border-accent/20 shadow-sm'
                        : 'text-text-secondary hover:bg-accent/[0.06] hover:text-accent'
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
