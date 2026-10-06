import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Team', href: '/team' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const relatedOrgs = [
    {
      name: 'AICTE',
      desc: 'All India Council for Technical Education',
      href: 'https://www.aicte.gov.in/',
    },
    {
      name: 'IDEALNET',
      desc: 'AICTE IDEA Lab Network',
      href: 'https://idealnet.aicte.gov.in/',
    },
    {
      name: 'Kongu Engineering College',
      desc: 'Perundurai, Erode — TN',
      href: 'https://www.kongu.ac.in',
    },
  ];

  return (
    <footer
      className="bg-bg-elevated text-text-secondary border-t border-border/60 py-12 px-6 transition-colors duration-300 relative overflow-hidden"
      id="site-footer"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-accent-3/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {/* Branding */}
        <div className="md:col-span-4 space-y-5">
          <div className="flex items-center gap-2.5 text-text">
            <div className="relative w-11 h-11 shrink-0">
              <img src="/IDEALab.png" alt="IDEA Lab" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-extrabold text-base tracking-tight">
              IDEA Lab <span className="text-accent">@ KEC</span>
            </span>
          </div>

          <p className="text-xs leading-relaxed max-w-sm">
            AICTE-funded hardware fabrication and rapid-prototyping lab at Kongu Engineering College — part of the IEF @
            KEC innovation ecosystem.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            {[
              { src: '/AICTE.png', alt: 'AICTE', href: 'https://www.aicte.gov.in/', size: 'w-16 h-16' },
              { src: '/KEC_new2.png', alt: 'KEC', href: 'https://www.kongu.ac.in', size: 'w-40 h-16' },
            ].map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative ${logo.size} opacity-90 hover:opacity-100 transition-opacity`}
                aria-label={`Visit ${logo.alt} website`}
              >
                <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-text font-display font-bold text-xs tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Related organizations */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-text font-display font-bold text-xs tracking-wider uppercase">Related Organizations</h3>
          <ul className="space-y-3">
            {relatedOrgs.map((org) => (
              <li key={org.name}>
                <a href={org.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <p className="font-semibold text-text group-hover:text-accent transition-colors">{org.name}</p>
                  <p className="text-[11px] text-text-secondary/70">{org.desc}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-text font-display font-bold text-xs tracking-wider uppercase">Contact & Visit</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>AICTE-IDEA Lab, Kongu Engineering College, Perundurai, Erode — 638060, TN, India.</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <span>+91 4294 226555</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <span>kecidealab@kongu.ac.in</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {currentYear} AICTE - IDEA Lab. Built for co-creation.</p>
        <p className="text-text-secondary/70">Affiliated to Anna University &amp; approved by AICTE.</p>
      </div>
    </footer>
  );
}
