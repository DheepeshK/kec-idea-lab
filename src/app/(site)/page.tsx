export const metadata = {
  title: 'Home | AICTE IDEA Lab @ KEC',
  description: 'Innovation and Entrepreneurship Development Lab at Kongu Engineering College — fostering creativity, hands-on learning, and industry collaboration.',
};

import Link from 'next/link';
import { 
  ArrowRight, 
  Layers, 
  Scissors, 
  Cpu, 
  Wrench, 
  Activity, 
  Rocket, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Workflow
} from 'lucide-react';
import Counter from '@/components/motion/Counter';
import ScrollReveal from '@/components/motion/ScrollReveal';
import BlueprintGrid from '@/components/ui/BlueprintGrid';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AnimatedHeroImage from '@/components/motion/AnimatedHeroImage';
import MagneticButton from '@/components/motion/MagneticButton';
import { getAll } from '@/lib/store';

// Helper to slugify equipment names to match the facilities anchors
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Helper to map equipment categories/names to standard Lucide icons
function getEquipmentIcon(name: string, category?: string) {
  const lowerName = name.toLowerCase();
  const lowerCat = (category || '').toLowerCase();
  if (lowerName.includes('3d printer') || lowerName.includes('printing') || lowerCat.includes('print') || lowerCat.includes('rapid')) {
    return Layers;
  }
  if (lowerName.includes('laser') || lowerName.includes('cutter') || lowerCat.includes('subtractive')) {
    return Scissors;
  }
  if (lowerName.includes('soldering') || lowerName.includes('smd') || lowerCat.includes('electronics') || lowerCat.includes('iot')) {
    return Cpu;
  }
  if (lowerName.includes('cnc') || lowerName.includes('router') || lowerName.includes('milling')) {
    return Wrench;
  }
  if (lowerName.includes('oscilloscope') || lowerName.includes('testing') || lowerName.includes('signal')) {
    return Activity;
  }
  return Wrench; // fallback
}

interface HomeEquipment {
  _id: string;
  name: string;
  description: string;
  category: string;
}

interface HomeEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
}

const fallbackEquipment: HomeEquipment[] = [
  {
    _id: 'fallback-1',
    name: 'Industrial FDM 3D Printer',
    description: 'High-precision dual-extruder 3D printer for ABS, PLA, and Carbon Fiber composite filament fabrication.',
    category: 'Rapid Prototyping',
  },
  {
    _id: 'fallback-2',
    name: 'CO2 Laser Cutter & Engraver',
    description: '100W high-power CO2 laser cutter for wood, acrylic, fabric, and sheet metal engraving.',
    category: 'Machining',
  },
  {
    _id: 'fallback-3',
    name: 'Smart Soldering & SMD Station',
    description: 'State-of-the-art SMD rework station with hot-air guns, smart micro-soldering irons, and digital microscope.',
    category: 'Electronics & IoT',
  },
  {
    _id: 'fallback-4',
    name: 'High Frequency CNC Router',
    description: 'High-frequency 3-axis CNC router for precise milling of acrylic plaques, woods, and soft metals.',
    category: 'Machining',
  },
  {
    _id: 'fallback-5',
    name: 'Mixed Signal Digital Oscilloscope',
    description: '4-channel 100MHz digital oscilloscope with built-in logic analyzers for debugging complex IoT circuit boards.',
    category: 'Electronics & IoT',
  },
];

const fallbackEvents: HomeEvent[] = [
  {
    _id: 'fallback-evt-1',
    title: '3D Printer Operation & Maintenance Bootcamp',
    description: 'Learn the fundamentals of slicer configurations, bed leveling, advanced dual-extrusion, and standard FDM hardware troubleshooting in this certified hands-on lab.',
    date: '2026-07-15T09:00:00.000Z',
    time: '09:00 AM - 04:00 PM',
    location: 'AICTE-KEC Idea Lab, 3D Printing Zone',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'fallback-evt-2',
    title: 'Industrial Laser Cutting SOP Workshop',
    description: 'Safety-first instruction on operating CO2 Laser cutters. Participants will learn material limitations, vector paths, and engrave their custom wood designs.',
    date: '2026-07-22T10:00:00.000Z',
    time: '10:00 AM - 01:00 PM',
    location: 'Heavy Machinery Room, Idea Lab',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'fallback-evt-3',
    title: 'IoT Embedded Systems & Micro-Soldering Hack',
    description: 'An intense 24-hour hardware hackathon targeting agricultural and health problems. Free development boards provided for selected student project teams.',
    date: '2026-08-05T08:30:00.000Z',
    time: '08:30 AM onwards',
    location: 'Idea Lab Main Hall & PCB Bay',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
  },
];

export default async function HomePage() {
  const dbEquipment = getAll<any>('equipment', (a, b) => a.order - b.order);
  const dbEvents = getAll<any>('events', (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const equipmentList: HomeEquipment[] = dbEquipment.length > 0 ? dbEquipment : fallbackEquipment;
  const eventsList: HomeEvent[] = dbEvents.length > 0 ? dbEvents : fallbackEvents;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Upcoming Date';
    }
  };

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
                  IDEA Lab @ KEC is Kongu Engineering College&apos;s AICTE-established  facility — under the Innovation & Entrepreneurship Forum @ KEC. We bridge the gap between imagination and physical engineering.
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
              { src: '/AICTE.png', alt: 'AICTE' },
              { src: '/KEC_new2.png', alt: 'KEC' },
              { src: '/IDEALab.png', alt: 'IDEA Lab' },
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div key={logo.alt} className="relative h-16 sm:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain"
                />
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
            <div className="flex flex-col relative overflow-hidden">
              <span className="stat-value text-accent">
                <Counter end={25} suffix="+" />
              </span>
              <span className="label text-text-secondary mt-1">Equipments</span>
              <div className="h-0.5 w-3/4 bg-accent/40 rounded-full mt-2" />
            </div>
            <div className="flex flex-col relative overflow-hidden">
              <span className="stat-value text-accent-2">
                <Counter end={1200} suffix="+" />
              </span>
              <span className="label text-text-secondary mt-1">Trained</span>
              <div className="h-0.5 w-3/4 bg-accent-2/40 rounded-full mt-2" />
            </div>
            <div className="flex flex-col relative overflow-hidden">
              <span className="stat-value text-accent-3">
                <Counter end={45} suffix="+" />
              </span>
              <span className="label text-text-secondary mt-1">Prototypes</span>
              <div className="h-0.5 w-3/4 bg-accent-3/40 rounded-full mt-2" />
            </div>
            <div className="flex flex-col relative overflow-hidden">
              <span className="stat-value text-brand-navy">
                <Counter end={12} suffix="+" />
              </span>
              <span className="label text-text-secondary mt-1">Startups</span>
              <div className="h-0.5 w-3/4 bg-brand-navy/40 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE DO — 4-card grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">Our Pillars</span>
            <h2>Rapid Fabrication Ecosystem</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              We guide hardware concepts from raw ideation, through certified training and machine access, into commercially viable products.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Prototype */}
          <ScrollReveal direction="up" delay={0.0}>
            <Card className="h-full flex flex-col justify-between group shadow-lg shadow-accent/5">
              <div className="space-y-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-110">
                  <Workflow className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">Prototype</h3>
                <p className="body-text text-xs sm:text-sm">
                  Turn your raw concepts into functional hardware models. Access advanced CAD workstations and expert engineering guidance to refine your designs.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Card 2: Fabricate */}
          <ScrollReveal direction="up" delay={0.08}>
            <Card className="h-full flex flex-col justify-between group shadow-lg shadow-accent-2/5">
              <div className="space-y-4">
                <div className="bg-accent-2/10 text-accent-2 p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-110">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent-2 transition-colors">Fabricate</h3>
                <p className="body-text text-xs sm:text-sm">
                  Leverage industrial-grade FDM/SLA 3D printers, CO2 laser engravers, high-speed CNC routers, and micro-soldering bays to build with sub-millimeter precision.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Card 3: Incubate */}
          <ScrollReveal direction="up" delay={0.16}>
            <Card className="h-full flex flex-col justify-between group shadow-lg shadow-accent-3/5">
              <div className="space-y-4">
                <div className="bg-accent-3/10 text-accent-3 p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-110">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-accent-3 transition-colors">Incubate</h3>
                <p className="body-text text-xs sm:text-sm">
                  Bridge the gap between working prototype and commercial product. Receive seed-funding guidance, corporate connections, and direct support for patent filing.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Card 4: Mentor */}
          <ScrollReveal direction="up" delay={0.24}>
            <Card className="h-full flex flex-col justify-between group shadow-lg shadow-brand-navy/5">
              <div className="space-y-4">
                <div className="bg-brand-navy/10 text-brand-navy p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-brand-navy transition-colors">Mentor</h3>
                <p className="body-text text-xs sm:text-sm">
                  Gain custom 1-on-1 advice from AICTE-trained faculty members, core student mentors, and hardware industry specialists to cross execution hurdles.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: FEATURED EQUIPMENT TEASER */}
      <section className="bg-bg-elevated/40 border-y border-border py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Equipment Teaser Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-xl text-left">
              <ScrollReveal direction="up">
                <span className="label text-accent block">Featured Laboratory Machinery</span>
                <h2 className="mt-1">Advanced Prototyping Assets</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.08}>
                <p className="body-text">
                  Operate industrial-grade machinery in a controlled, educational environment under expert guidance. Check live booking states in each link.
                </p>
              </ScrollReveal>
            </div>
            <div className="shrink-0 text-left">
              <ScrollReveal direction="up" delay={0.12}>
                <Link href="/facilities" className="label text-accent hover:text-accent font-semibold flex items-center gap-1.5 border border-accent/20 px-4 py-2 rounded-lg hover:bg-accent/5 transition-all">
                  Full Machinery Catalog <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* 5-Equipment Horizontal Teaser Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {equipmentList.map((item, idx) => {
              const IconComponent = getEquipmentIcon(item.name, item.category);
              const targetSlug = slugify(item.name);
              return (
                <ScrollReveal key={item._id} direction="up" delay={idx * 0.08}>
                  <Link href={`/facilities#${targetSlug}`} className="block h-full group">
                    <Card className="h-full p-5 flex flex-col justify-between transition-all duration-300 border-border/60 bg-bg/60 group-hover:border-accent/30 group-hover:bg-bg-elevated/40 group-hover:shadow-accent/5">
                      <div className="space-y-4">
                        <div className={`bg-bg-elevated border border-border ${['text-accent', 'text-accent-2', 'text-accent-3', 'text-brand-navy'][idx % 4]} p-2.5 rounded-lg w-fit transition-all duration-300 ${['group-hover:bg-accent/10 group-hover:border-accent/20', 'group-hover:bg-accent-2/10 group-hover:border-accent-2/20', 'group-hover:bg-accent-3/10 group-hover:border-accent-3/20', 'group-hover:bg-brand-navy/10 group-hover:border-brand-navy/20'][idx % 4]}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="label text-text-secondary block mb-0.5">{item.category}</span>
                          <h3 className="text-sm font-bold text-text group-hover:text-accent transition-colors line-clamp-1">{item.name}</h3>
                        </div>
                        <p className="body-text text-xs line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-1 label text-accent/80 group-hover:text-accent transition-colors">
                        View Spec sheet <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* LATEST EVENTS TEASER */}
          <div className="border-t border-border/60 pt-16 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-3 max-w-xl text-left">
                <ScrollReveal direction="up">
                  <span className="label text-warn block">Lab Activities</span>
                  <h2 className="mt-1">Upcoming Events & Bootcamps</h2>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.08}>
                <p className="body-text">
                    Check out our latest hands-on training workshops, national hackathons, and certifications designed to expand your practical knowledge.
                  </p>
                </ScrollReveal>
              </div>
              <div className="shrink-0 text-left">
                <ScrollReveal direction="up" delay={0.12}>
                  <Link href="/events" className="label text-warn hover:text-warn font-semibold flex items-center gap-1.5 border border-warn/20 px-4 py-2 rounded-lg hover:bg-warn/5 transition-all">
                    All Events Calendar <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </ScrollReveal>
              </div>
            </div>

            {/* Event Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsList.map((evt, idx) => (
                <ScrollReveal key={evt._id} direction="up" delay={idx * 0.08}>
                  <Card className="h-full flex flex-col justify-between p-0 overflow-hidden group group-hover:shadow-lg group-hover:shadow-warn/10">
                    <div>
                      {/* Photo banner */}
                      <div className="relative h-44 w-full bg-bg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="label bg-warn/90 text-slate-950 px-2 py-0.5 rounded">
                            {evt.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-text group-hover:text-warn transition-colors line-clamp-1">
                          {evt.title}
                        </h3>
                        <p className="body-text text-xs line-clamp-2">
                          {evt.description}
                        </p>

                        <div className="space-y-1.5 pt-2 label text-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-warn" />
                            <span>{formatDate(evt.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-warn" />
                            <span className="line-clamp-1">{evt.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-border/60">
                      <span className="label text-text-secondary">Registrations Open</span>
                      <a href="mailto:idealab@kongu.ac.in" className="label text-warn font-semibold hover:text-warn inline-flex items-center gap-1.5">
                        Register <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
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
                The AICTE IDEA Lab @ KEC operates alongside core development cells under the <strong>Innovation & Entrepreneurship Forum (IEF) @ KEC</strong> to fuel comprehensive innovation and entrepreneurial pipelines.
              </p>
            </ScrollReveal>
            <div className="pt-2">
              <ScrollReveal direction="up" delay={0.12}>
                <Link href="/about" className="label text-accent hover:text-accent font-semibold inline-flex items-center gap-1.5">
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
                    <div className="relative w-15 h-12 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0">
                      <img src="/IIC.png" alt="IIC" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="label text-accent">IIC @ KEC</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">Institution&apos;s Innovation Council</h3>
                  <p className="body-text text-xs">
                    Fosters an active, vibrant local hardware and software startup culture. Directs national hackathons, ideations, and coordinates national innovation rankings.
                  </p>
                </Card>
              </ScrollReveal>

              {/* EMDC Card */}
              <ScrollReveal direction="up" delay={0.08}>
                <Card className="p-5 border-border/50 bg-bg-elevated/30 hover:border-accent-2/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-18 h-12 rounded-md overflow-hidden bg-bg border border-border/30 shrink-0">
                      <img src="/EMDC.png" alt="EMDC" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="label text-accent">EMDC @ KEC</span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">Entrepreneurship Development Centre</h3>
                  <p className="body-text text-xs">
                    Provides comprehensive training on modern management, patent regulations, legal procedures, marketing strategies, and startup operational basics.
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
                    Establishes physical workspace, administrative services, and technical support. Directs funding channels and guides pre-incubation stages into viable entities.
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
                    Provides the heavy machinery, 3D printing equipment, raw CNC tools, and hands-on validation expertise required to manufacture the actual hardware.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
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
              Join our equipment orientation workshops, partner with a core student mentor, and start operating industrial-grade machinery safely and confidently.
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
