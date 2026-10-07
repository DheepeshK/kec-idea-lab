export const metadata = {
  title: 'Home | AICTE IDEA Lab @ KEC',
  description:
    'Innovation and Entrepreneurship Development Lab at Kongu Engineering College — fostering creativity, hands-on learning, and industry collaboration.',
};

// Cache the public page briefly instead of rebuilding it for every visitor.
export const revalidate = 60;

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Counter from '@/components/motion/Counter';
import ScrollReveal from '@/components/motion/ScrollReveal';
import BlueprintGrid from '@/components/ui/BlueprintGrid';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AnimatedHeroImage from '@/components/motion/AnimatedHeroImage';
import MagneticButton from '@/components/motion/MagneticButton';
import RelationshipDiagram from '@/components/motion/RelationshipDiagram';

export default async function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent/30 selection:text-text">
      {/* SECTION 1: HERO - full viewport height */}
      <section className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden border-b border-border/60 py-16 lg:py-0">
        {/* Engineering Blueprint background */}
        <BlueprintGrid />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent-3/5 to-accent-2/5 animate-gradient -z-5 pointer-events-none" />

        {/* Ambient glow blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-3/15 blur-[180px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-accent-2/10 blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <ScrollReveal direction="right">
                <span className="label inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 shadow-sm shadow-accent/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  KEC IDEA Hub
                </span>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.08}>
                <h1 className="text-text animate-gradient">
                  Where ideas <br className="hidden sm:inline" />
                  become <span className="text-gradient-brand">working prototypes.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.16}>
                <p className="body-text text-base sm:text-lg max-w-2xl">
                  IDEA Lab @ KEC is Kongu Engineering College&apos;s AICTE-established facility — under the Innovation &
                  Entrepreneurship Forum @ KEC. We bridge the gap between imagination and physical engineering.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.24}>
                <div className="flex flex-wrap gap-4 pt-4">
                  <MagneticButton>
                    <Link href="/facilities">
                      <Button variant="primary" size="lg" className="gap-2 text-sm uppercase tracking-wide px-6">
                        Explore Facilities <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </MagneticButton>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="text-sm uppercase tracking-wide px-6">
                      Our Info
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Animated Brand Image */}
            <div className="lg:col-span-5 w-full">
              <ScrollReveal direction="left" delay={0.15}>
                <AnimatedHeroImage />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: PARTNER LOGO STRIP */}
      <section className="bg-bg-elevated/40 border-b border-border/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
            {[
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="relative h-16 sm:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ANIMATED STAT STRIP (mono font) */}
      <section className="bg-bg-elevated/80 backdrop-blur-sm border-y border-border py-8 select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-3/5 animate-gradient pointer-events-none -z-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3 text-text-secondary shrink-0">
            <span className="h-2 w-2 rounded-full bg-accent-3 animate-pulse" />
            <span className="label text-xs sm:text-sm font-semibold">Est. under AICTE IDEA Lab scheme</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 w-full md:w-auto">
            <div className="flex flex-col relative overflow-hidden group">
              <span className="stat-value text-accent">
                <Counter end={50} suffix="+" duration={3.5} />
              </span>
              <span className="label text-text-secondary mt-1">Equipments</span>
              <div className="h-0.5 w-3/4 bg-accent/40 rounded-full mt-2 transition-all duration-500 group-hover:w-full group-hover:bg-accent" />
            </div>
            <div className="flex flex-col relative overflow-hidden group">
              <span className="stat-value text-accent-2">
                <Counter end={100} suffix="+" duration={4.5} />
              </span>
              <span className="label text-text-secondary mt-1">Trained</span>
              <div className="h-0.5 w-3/4 bg-accent-2/40 rounded-full mt-2 transition-all duration-500 group-hover:w-full group-hover:bg-accent-2" />
            </div>
            <div className="flex flex-col relative overflow-hidden group">
              <span className="stat-value text-accent-3">
                <Counter end={25} suffix="+" duration={3.5} />
              </span>
              <span className="label text-text-secondary mt-1">Prototypes</span>
              <div className="h-0.5 w-3/4 bg-accent-3/40 rounded-full mt-2 transition-all duration-500 group-hover:w-full group-hover:bg-accent-3" />
            </div>
            <div className="flex flex-col relative overflow-hidden group">
              <span className="stat-value text-brand-navy">
                <Counter end={10} suffix="+" duration={3.2} />
              </span>
              <span className="label text-text-secondary mt-1">Startups</span>
              <div className="h-0.5 w-3/4 bg-brand-navy/40 rounded-full mt-2 transition-all duration-500 group-hover:w-full group-hover:bg-brand-navy" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: IEF ECOSYSTEM STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative overflow-hidden">
        {/* Subtle grid pattern background detail */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
          <div className="lg:col-span-4 space-y-4 text-left">
            <ScrollReveal direction="up">
              <span className="label text-accent-3 block">Synergistic Alliance</span>
              <h2 className="mt-1">The IEF Ecosystem</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="body-text">
                The AICTE IDEA Lab @ KEC operates alongside core development cells under the{' '}
                <strong>Innovation & Entrepreneurship Forum (IEF) @ KEC</strong> to fuel comprehensive innovation and
                entrepreneurial pipelines.
              </p>
            </ScrollReveal>
            <div className="pt-2">
              <ScrollReveal direction="up" delay={0.12}>
                <Link
                  href="#forum-connectivity"
                  className="label text-accent hover:text-accent font-semibold inline-flex items-center gap-1.5"
                >
                  Explore IEF Ecosystem <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* IIC Card */}
              <ScrollReveal direction="up" delay={0.0}>
                <Card className="p-5 border-border/50 bg-bg-elevated/30 hover:border-accent/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0">
                      <img src="/IIC.png" alt="IIC" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="label text-accent">IIC @ KEC</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">Institution&apos;s Innovation Council</h3>
                  <p className="body-text text-xs">
                    Fosters an active, vibrant local hardware and software startup culture. Directs national hackathons,
                    ideations, and coordinates national innovation rankings.
                  </p>
                </Card>
              </ScrollReveal>

              {/* EMDC Card */}
              <ScrollReveal direction="up" delay={0.08}>
                <Card className="p-5 border-border/50 bg-bg-elevated/30 hover:border-accent-2/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-20 h-12 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0">
                      <img src="/EMDC.png" alt="EMDC" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="label text-accent">EMDC @ KEC</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">Entrepreneurship Development Centre</h3>
                  <p className="body-text text-xs">
                    Provides comprehensive training on modern management, patent regulations, legal procedures,
                    marketing strategies, and startup operational basics.
                  </p>
                </Card>
              </ScrollReveal>

              {/* TBI Card */}
              <ScrollReveal direction="up" delay={0.16}>
                <Card className="p-5 border-border/50 bg-bg-elevated/30 hover:border-accent-3/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-20 h-12 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0">
                      <img src="/TBI.png" alt="TBI" className="w-full h-full object-contain p-0.9" />
                    </div>
                    <span className="label text-accent">TBI @ KEC</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">Technology Business Incubator</h3>
                  <p className="body-text text-xs">
                    Establishes physical workspace, administrative services, and technical support. Directs funding
                    channels and guides pre-incubation stages into viable entities.
                  </p>
                </Card>
              </ScrollReveal>

              {/* IDEA Lab Card */}
              <ScrollReveal direction="up" delay={0.24}>
                <Card className="p-5 border-border/50 bg-accent/5 border-accent/30 hover:border-accent/40 shadow-md shadow-accent/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-bg border border-accent/30 shrink-0">
                      <img src="/IDEALab.png" alt="IDEA Lab" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="label text-accent">AICTE IDEA Lab</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">IDEA Hub</h3>
                  <p className="body-text text-xs">
                    Provides the heavy machinery, 3D printing equipment, raw CNC tools, and hands-on validation
                    expertise required to manufacture the actual hardware.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FORUM CONNECTIVITY DIAGRAM */}
      <section id="forum-connectivity" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <ScrollReveal direction="up">
            <span className="label text-accent-3 block">Institutional Synergies</span>
            <h2 className="text-text text-gradient-brand">Forum Connectivity Diagram</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="text-text-secondary text-xs sm:text-sm">
              How our fabrication lab acts in concert with other business and ranking wings at Kongu Engineering
              College.
            </p>
          </ScrollReveal>
        </div>

        <div className="w-full">
          <RelationshipDiagram />
        </div>
      </section>

      {/* SECTION 6: CLOSING CTA BANNER */}
      <section className="bg-gradient-to-r from-accent/20 via-bg to-accent-3/20 border-t border-border py-20 lg:py-24 relative overflow-hidden animate-gradient">
        {/* Subtle decorative background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-2/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <ScrollReveal direction="up">
            <span className="label text-accent-2 block">Start Your Journey</span>
            <h2 className="mt-2">Ready to bring your hardware ideas to life?</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text max-w-2xl mx-auto">
              Join our equipment orientation workshops, partner with a core student mentor, and start operating
              industrial-grade machinery safely and confidently.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.16}>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <MagneticButton>
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="uppercase tracking-wide px-8">
                    Get in Touch
                  </Button>
                </Link>
              </MagneticButton>
              <Link href="/facilities">
                <Button variant="outline" size="lg" className="uppercase tracking-wide px-8">
                  View Equipments
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
