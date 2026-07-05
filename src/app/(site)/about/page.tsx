export const metadata = {
  title: 'About | AICTE IDEA Lab @ KEC',
  description: 'Learn about the AICTE-KEC IDEA Lab — our mission, vision, and the team behind the innovation ecosystem at Kongu Engineering College.',
};

import ScrollReveal from '@/components/motion/ScrollReveal';
import Card from '@/components/ui/Card';
import RelationshipDiagram from '@/components/motion/RelationshipDiagram';
import { 
  GraduationCap, 
  Wrench, 
  Cpu, 
  Eye, 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Compass,
  Laptop,
  Rocket,
  AlertCircle
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10 animate-gradient" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">
              AICTE-Established Facility
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">
              About the IDEA Lab
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              Kongu Engineering College is chosen by the All India Council for Technical Education (AICTE) to establish the state-of-the-art IDEA Lab. We empower engineering students with modern digital tools to transition theoretical logic into commercial physical prototypes.
            </p>
          </ScrollReveal>
        </div>

        {/* AFFILIATION LOGOS STRIP */}
        <section className="py-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">The Contributors</span>
              <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
                {[
                  { src: '/AICTE.png', alt: 'AICTE' },
                  { src: '/KEC_new2.png', alt: 'KEC' },
                  { src: '/IDEALab.png', alt: 'IDEA Lab' },
                  { src: '/IIC.png', alt: 'IIC' },
                  { src: '/EMDC.png', alt: 'EMDC' },
                  { src: '/TBI.png', alt: 'TBI' },
                ].map((logo) => (
                  <div key={logo.alt} className="relative h-16 sm:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity">
                    <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 1: AICTE Scheme Intent */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <ScrollReveal direction="up">
              <span className="label text-accent block">Pedagogical Framework</span>
              <h2 className="text-text">
                The IDEA Scheme Intent
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="text-text-secondary text-xs sm:text-sm">
                How we channel technical curiosity from initial principles to real-world industrial systems.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <ScrollReveal direction="up" delay={0.0}>
              <div className="bg-bg-elevated/40 border border-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-brand-navy/50 hover:shadow-lg hover:shadow-brand-navy/10 transition-all duration-500">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-base font-bold text-text flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    STEM Fundamentals
                  </h3>
                  <p className="body-text text-xs sm:text-sm">
                    Strengthening basic science and engineering logic. Translating lecture-hall lessons into conceptual mechanical and mathematical equations.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal direction="up" delay={0.08}>
              <div className="bg-bg-elevated/40 border border-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-brand-red/50 hover:shadow-lg hover:shadow-brand-red/10 transition-all duration-500">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-base font-bold text-text flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-accent" />
                    Hands-on Learning
                  </h3>
                  <p className="body-text text-xs sm:text-sm">
                    Bridging theory through active fabrication. Operating standard 3D printers, laser engravers, and electronics rework stations under trained supervisor lines.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal direction="up" delay={0.16}>
              <div className="bg-bg-elevated/40 border border-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-brand-green/50 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-500">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-base font-bold text-text flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-accent" />
                    Prototyping
                  </h3>
                  <p className="body-text text-xs sm:text-sm">
                    Formulating actual functional components. Developing circuit boards, structural models, and packaging files into integrated mechanical-software modules.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal direction="up" delay={0.24}>
              <div className="bg-bg-elevated/40 border border-border rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-brand-amber/50 hover:shadow-lg hover:shadow-brand-amber/10 transition-all duration-500">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                    04
                  </div>
                  <h3 className="text-base font-bold text-text flex items-center gap-2">
                    <Eye className="h-4 w-4 text-accent" />
                    Product Visualization
                  </h3>
                  <p className="body-text text-xs sm:text-sm">
                    Refining designs for potential marketing presentation. Polishing functional aspects to pitch ideas before accelerators, state grants, and industrial stakeholders.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION 2: Mission framed around the 5 Es */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <ScrollReveal direction="up">
              <span className="label text-accent block">The 5-E Mission Matrix</span>
              <h2 className="text-text">
                Our Operational Mission
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="text-text-secondary text-xs sm:text-sm">
                Five dynamic developmental vectors defining student growth pathways inside the facility.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Engage */}
            <ScrollReveal direction="up" delay={0.0}>
              <div className="bg-bg-elevated/20 border border-border/60 p-5 rounded-xl space-y-4 h-full hover:border-accent/15 hover:scale-[1.02] transition-all">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="label">01. Engage</h3>
                  <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                    Spur initial interest among standard students through active hardware bootcamps, custom open houses, and collaborative tool workshops.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Explore */}
            <ScrollReveal direction="up" delay={0.06}>
              <div className="bg-bg-elevated/20 border border-border/60 p-5 rounded-xl space-y-4 h-full hover:border-accent/15 hover:scale-[1.02] transition-all">
                <div className="h-8 w-8 rounded-lg bg-accent-2/10 flex items-center justify-center text-accent-2">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="label">02. Explore</h3>
                  <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                    Provide structural guidelines to investigate alternative machinery setups, materials, advanced CAD suites, and micro-controller architectures.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal direction="up" delay={0.12}>
              <div className="bg-bg-elevated/20 border border-border/60 p-5 rounded-xl space-y-4 h-full hover:border-accent/15 hover:scale-[1.02] transition-all">
                <div className="h-8 w-8 rounded-lg bg-accent-3/10 flex items-center justify-center text-accent-3">
                  <Laptop className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="label">03. Experience</h3>
                  <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                    Engage in concrete physical prototyping. Experience real hardware limits, tolerances, sub-millimeter fits, and standard circuit board soldering.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Express */}
            <ScrollReveal direction="up" delay={0.18}>
              <div className="bg-bg-elevated/20 border border-border/60 p-5 rounded-xl space-y-4 h-full hover:border-accent/15 hover:scale-[1.02] transition-all">
<div className="h-8 w-8 rounded-lg bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                  <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="label">04. Express</h3>
                  <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                    Channel lessons into high-fidelity products. Express individual ideas as actual robust structures suitable for real operations.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Excel */}
            <ScrollReveal direction="up" delay={0.24}>
              <div className="bg-bg-elevated/20 border border-border/60 p-5 rounded-xl space-y-4 h-full hover:border-accent/15 hover:scale-[1.02] transition-all">
                <div className="h-8 w-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Rocket className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="label">05. Excel</h3>
                  <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                    Accelerate development towards patents, incubators, state enterprise schemes, and venture funding for global recognition.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION 3: Animated Relationship Diagram */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <ScrollReveal direction="up">
              <span className="label text-accent-3 block">Institutional Synergies</span>
              <h2 className="text-text text-gradient-brand">
                Forum Connectivity Diagram
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="text-text-secondary text-xs sm:text-sm">
                How our fabrication lab acts in concert with other business and ranking wings at Kongu Engineering College.
              </p>
            </ScrollReveal>
          </div>

          <div className="w-full">
            <RelationshipDiagram />
          </div>
        </section>

        {/* SECTION 4: Faculty Coordinator placeholder block */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <ScrollReveal direction="up">
              <span className="label text-accent block">Administration</span>
              <h2 className="text-text">
                Laboratory Leadership
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <p className="text-text-secondary text-xs sm:text-sm">
                For administrative requests, academic research partnerships, or official equipment bookings.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.12}>
            <div className="max-w-xl mx-auto relative group">
              <div className="bg-bg-elevated/30 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-[0.02] pointer-events-none">
                  <AlertCircle className="h-44 w-44 text-warn" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-extrabold text-text">Dr. R. Parameshwaran</h3>
                      <p className="text-xs sm:text-sm text-accent mt-0.5">Chief Mentor, AICTE-KEC IDEA Lab</p>
                    </div>
                    <div className="bg-accent/10 text-accent p-2.5 rounded-xl border border-accent/15 shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="body-text text-xs sm:text-sm">
                    Dr. R. Parameshwaran is a distinguished academician and researcher with extensive experience in engineering education and innovation. As the principal (Head of the institution), he serves as the Chief Mentor of the AICTE-KEC IDEA Lab, overseeing its strategic direction and ensuring it functions as a hub for student creativity, hands-on learning, and industry collaboration. His leadership fosters an environment where students can transform theoretical knowledge into practical applications, preparing them for successful careers in engineering and technology.
                  </p>
                </div>

                <div className="border-t border-border/60 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-text-secondary">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-accent" />
                    <a href="mailto:princip@kongu.ac.in" className="hover:text-text transition-colors">principal@kongu.ac.in</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>04294226555</span>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>Principal office, Kongu Engineering College</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
