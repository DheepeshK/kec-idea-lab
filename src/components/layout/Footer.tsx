import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

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

  return (
    <footer className="bg-bg-elevated text-text-secondary border-t border-border/60 py-12 px-6 transition-colors duration-300 relative overflow-hidden" id="site-footer">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-accent-3/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Lab Branding & Meta-description */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5 text-text">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-accent/20 shrink-0 bg-bg">
              <img
                src="/IDEALab.png"
                alt="IDEA Lab"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-display font-extrabold text-base tracking-tight">
              IDEA Lab <span className="text-accent">@ KEC</span>
            </span>
          </div>
          
          <p className="text-xs leading-relaxed max-w-sm">
            AICTE-KEC IDEA Lab is a state-of-the-art co-creation, hardware fabrication, and rapid prototyping playground housed inside Kongu Engineering College. 
          </p>

          <p className="text-xs font-semibold text-text-secondary">
            IDEA Lab sits under <span className="text-text">IEF @ KEC</span> (Innovation and Entrepreneurship Forum) alongside the <span className="text-text">IIC</span> (Institution&apos;s Innovation Council) , <span className="text-text">EMDC</span> (Entrepreneurship and Management Development Center) and <span className="text-text">TBI</span> (Technology Business Incubator) to form a holistic innovation ecosystem for students and faculty.
          </p>

          {/* Partner logos */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            {[
              { src: '/AICTE.png', alt: 'AICTE' },
              { src: '/KEC_new2.png', alt: 'KEC' },
              { src: '/IDEALab.png', alt: 'IDEA Lab' },
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div key={logo.alt} className="relative w-14 h-14 rounded-md overflow-hidden opacity-85 hover:opacity-100 transition-opacity bg-bg border border-border/30">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            ))}
          </div>

          {/* Social Icons Placeholders (Clearly marked as placeholder) */}
          <div className="flex items-center gap-3 pt-2">
            {/* SOCIAL LINK PLACEHOLDER - TWITTER */}
            <a 
              href="#" 
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all duration-150"
              aria-label="Twitter / X Profile"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>

            {/* SOCIAL LINK PLACEHOLDER - LINKEDIN */}
            <a 
              href="#" 
              className="p-2 rounded-lg border border-border hover:border-accent-3 hover:text-accent-3 transition-all duration-150"
              aria-label="LinkedIn Profile"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* SOCIAL LINK PLACEHOLDER - INSTAGRAM */}
            <a 
              href="#" 
              className="p-2 rounded-lg border border-border hover:border-accent-2 hover:text-accent-2 transition-all duration-150"
              aria-label="Instagram Profile"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
            </a>

            {/* SOCIAL LINK PLACEHOLDER - GITHUB */}
            <a 
              href="#" 
              className="p-2 rounded-lg border border-border hover:border-brand-navy hover:text-brand-navy transition-all duration-150"
              aria-label="GitHub Repository"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Affiliations */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-text font-display font-bold text-xs tracking-wider uppercase">Related Organizations</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0 flex items-center justify-center p-1">
                <img src="/AICTE.png" alt="AICTE" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-text">AICTE</p>
                <p className="text-text-secondary/70">All India Council for Technical Education — governing body for technical education in India.</p>
                <a href="https://www.aicte.gov.in/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-[11px]">www.aicte.gov.in</a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0 flex items-center justify-center p-1">
                <img src="/IDEALab.png" alt="IDEALNET" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-text">IDEALNET</p>
                <p className="text-text-secondary/70">AICTE IDEA Lab Network — a pan-India network of innovation labs fostering hands-on learning.</p>
                <a href="https://idealnet.aicte.gov.in/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-[11px]">www.idealnet.aicte.gov.in</a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0 flex items-center justify-center p-1">
                <img src="/KEC_new2.png" alt="KEC" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-text">Kongu Engineering College</p>
                <a href="https://www.kongu.ac.in" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.kongu.ac.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info blocks */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-text font-display font-bold text-xs tracking-wider uppercase">Contact & Visit</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>AICTE-KEC Idea Lab, Kongu Engineering College, Perundurai, Erode - 638060, Tamil Nadu, India.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <span>+91 4294 226555</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <span>idealab@kongu.ac.in</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {currentYear} AICTE-KEC IDEA Lab. Built for co-creation.</p>
        <p className="text-text-secondary/70">
          Affiliated to Anna University &amp; approved by AICTE.
        </p>
      </div>
    </footer>
  );
}
