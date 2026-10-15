import PinnedShowcase from '@/components/labs/PinnedShowcase';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { getAll } from '@/lib/store';
import { Image as ImageIcon, Sparkles, Layers, Cpu, Wrench, Users } from 'lucide-react';

export const metadata = {
  title: 'LABS | AICTE IDEA Lab @ KEC',
  description:
    'Explore our specialized centres — Digital Fabrication, Mechanical Fabrication, Electronics & IoT, and Student Development Centres.',
};

// Cache the public page briefly instead of rebuilding it for every visitor.
export const revalidate = 60;

// The 4 Primary Laboratories of AICTE IDEA Lab @ KEC
export interface LabCentre {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  keyCapabilities: string[];
  image: string; // Insert image path here (e.g. '/labs/digital-fab.jpg')
  icon: any;
  colorTheme: {
    cardBg: string;
    border: string;
    shadow: string;
    badgeBg: string;
    dot: string;
    tagBg: string;
    placeholderBorder: string;
    placeholderBg: string;
    placeholderIcon: string;
  };
}

const FOUR_LABS: LabCentre[] = [
  {
    id: 'digital-fabrication',
    title: 'Digital Fabrication Centre',
    badge: '01 · Digital Fabrication',
    tagline: 'High-Precision 3D Printing & Additive Manufacturing',
    description:
      'Houses advanced additive manufacturing infrastructure including industrial FDM & SLA 3D printers, precision CO2 laser cutters, and optical 3D scanners. Accelerates the conversion of complex CAD models into physical prototypes with micrometric accuracy.',
    keyCapabilities: [
      'Industrial FDM & SLA 3D Printing',
      'CO2 High-Speed Laser Cutting & Engraving',
      'High-Resolution Optical 3D Scanning',
      'Rapid Prototyping & Material Validation',
    ],
    image: '/images/labs/digital-fabrication.png',
    icon: Layers,
    colorTheme: {
      cardBg: 'bg-gradient-to-br from-sky-50/90 via-white to-blue-50/50',
      border: 'border-sky-200/80 hover:border-sky-300',
      shadow: 'shadow-xl shadow-sky-950/[0.05] hover:shadow-2xl hover:shadow-sky-900/10',
      badgeBg: 'bg-sky-100/90 text-sky-800 border-sky-300/70',
      dot: 'bg-sky-600',
      tagBg: 'bg-sky-100/60 text-sky-900 border-sky-200/80',
      placeholderBorder: 'border-sky-300/80',
      placeholderBg: 'bg-sky-100/25',
      placeholderIcon: 'text-sky-600',
    },
  },
  {
    id: 'mechanical-fabrication',
    title: 'Mechanical Fabrication Centre',
    badge: '02 · Mechanical Fabrication',
    tagline: 'Subtractive Machining & Heavy Engineering',
    description:
      'Equipped with industrial-grade 3-axis CNC routers, high-precision lathe machines, drill presses, and sheet-metal forming apparatus. Provides robust subtractive manufacturing capabilities for metals, woods, acrylics, and structural polymers.',
    keyCapabilities: [
      'Heavy-Duty 3-Axis CNC Routing',
      'Precision Lathe Turning & Shaping',
      'Sheet Metal Forming, Bending & Cutting',
      'Structural Framing & Heavy Fabrication',
    ],
    image: '/images/labs/mechanical-fabrication.png',
    icon: Wrench,
    colorTheme: {
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50',
      border: 'border-amber-200/80 hover:border-amber-300',
      shadow: 'shadow-xl shadow-amber-950/[0.05] hover:shadow-2xl hover:shadow-amber-900/10',
      badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-300/70',
      dot: 'bg-amber-600',
      tagBg: 'bg-amber-100/60 text-amber-900 border-amber-200/80',
      placeholderBorder: 'border-amber-300/80',
      placeholderBg: 'bg-amber-100/25',
      placeholderIcon: 'text-amber-600',
    },
  },
  {
    id: 'electronics-iot',
    title: 'Electronics & IoT Centre',
    badge: '03 · Electronics & IoT',
    tagline: 'Smart Embedded Systems & Sensor Prototyping',
    description:
      'A dedicated clean testbench area for PCB design, chemical etching, surface-mount soldering (SMD), and embedded hardware testing. Features mixed-signal digital oscilloscopes, spectrum analyzers, and micro-soldering stations for smart connected IoT devices.',
    keyCapabilities: [
      'PCB Rapid Prototyping & Etching',
      'SMD Hot-Air Rework & Micro-Soldering',
      'Mixed-Signal 100MHz Digital Oscilloscopes',
      'Sensor Integration & Embedded IoT Testbenches',
    ],
    image: '/images/labs/electronics-iot.png',
    icon: Cpu,
    colorTheme: {
      cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50',
      border: 'border-emerald-200/80 hover:border-emerald-300',
      shadow: 'shadow-xl shadow-emerald-950/[0.05] hover:shadow-2xl hover:shadow-emerald-900/10',
      badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/70',
      dot: 'bg-emerald-600',
      tagBg: 'bg-emerald-100/60 text-emerald-900 border-emerald-200/80',
      placeholderBorder: 'border-emerald-300/80',
      placeholderBg: 'bg-emerald-100/25',
      placeholderIcon: 'text-emerald-600',
    },
  },
  {
    id: 'student-development',
    title: 'Student Development Centre',
    badge: '04 · Student Innovation',
    tagline: 'Collaborative Ideation, Incubation & Hackathons',
    description:
      'An inspiring open-plan innovation hub designed for interdisciplinary student collaboration, technical mentorship, design sprints, and startup incubation. Connects student inventors with faculty guides and industry practitioners to develop market-ready hardware.',
    keyCapabilities: [
      'Collaborative Ideation & Brainstorming Zones',
      'Mentor-Led Design Sprints & Hackathons',
      'Early-Stage Startup Incubation Support',
      'Cross-Discipline Hardware Problem Solving',
    ],
    image: '/images/labs/student-development.png',
    icon: Users,
    colorTheme: {
      cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/50',
      border: 'border-purple-200/80 hover:border-purple-300',
      shadow: 'shadow-xl shadow-purple-950/[0.05] hover:shadow-2xl hover:shadow-purple-900/10',
      badgeBg: 'bg-purple-100/90 text-purple-900 border-purple-300/70',
      dot: 'bg-purple-600',
      tagBg: 'bg-purple-100/60 text-purple-900 border-purple-200/80',
      placeholderBorder: 'border-purple-300/80',
      placeholderBg: 'bg-purple-100/25',
      placeholderIcon: 'text-purple-600',
    },
  },
];

// Fallback equipment list for catalog
const fallbackEquipment = [
  {
    _id: '1',
    name: 'Industrial FDM 3D Printer',
    category: 'Rapid Prototyping',
    description:
      'High-precision dual-extruder 3D printer for ABS, PLA, and Carbon Fiber composite filament fabrication.',
    quantity: 3,
    available: 3,
    location: 'Digital Fabrication Centre',
    image: 'https://images.unsplash.com/photo-1615840287214-7fe58a8f3685?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Build Volume', value: '305 x 305 x 300 mm' },
      { label: 'Layer Resolution', value: '0.01 - 0.4 mm' },
      { label: 'Extruder Temp', value: 'Up to 300°C' },
      { label: 'Filaments', value: 'PLA, ABS, PETG, TPU, Carbon Fiber' },
    ],
  },
  {
    _id: '2',
    name: 'CO2 Laser Cutter & Engraver',
    category: 'Machining',
    description: '100W high-power CO2 laser cutter for precise wood, acrylic, fabric, and sheet metal engraving.',
    quantity: 1,
    available: 1,
    location: 'Digital Fabrication Centre',
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Laser Power', value: '100W CO2 Gas Laser' },
      { label: 'Work Area', value: '900 x 600 mm' },
      { label: 'Max Cutting Depth', value: '15mm Acrylic, 12mm Wood' },
      { label: 'Positioning Accuracy', value: '< 0.01 mm' },
    ],
  },
  {
    _id: '3',
    name: 'Smart Soldering & SMD Station',
    category: 'Electronics & IoT',
    description:
      'State-of-the-art SMD rework station with hot-air guns, smart micro-soldering irons, and digital microscopes.',
    quantity: 10,
    available: 8,
    location: 'Electronics & IoT Centre',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Temperature Range', value: '100°C - 500°C' },
      { label: 'Hot Air Flow Rate', value: '120 L/min (Max)' },
      { label: 'Display Type', value: 'Dual LED Digital Readouts' },
    ],
  },
  {
    _id: '4',
    name: 'High Frequency CNC Router',
    category: 'Machining',
    description: 'High-frequency 3-axis CNC router for precise milling of acrylic plaques, woods, and soft metals.',
    quantity: 1,
    available: 1,
    location: 'Mechanical Fabrication Centre',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Spindle Speed', value: '24,000 RPM Max' },
      { label: 'Axis Travel (X/Y/Z)', value: '1200 x 1200 x 150 mm' },
      { label: 'Drive System', value: 'Hybrid Leadshine Stepper System' },
    ],
  },
  {
    _id: '5',
    name: 'Mixed Signal Digital Oscilloscope',
    category: 'Electronics & IoT',
    description:
      '4-channel 100MHz digital oscilloscope with built-in logic analyzers for debugging complex IoT circuit boards.',
    quantity: 5,
    available: 5,
    location: 'Electronics & IoT Centre',
    image: 'https://images.unsplash.com/photo-1551893086-c024b2156497?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Bandwidth', value: '100 MHz (4 Channels)' },
      { label: 'Sample Rate', value: '1 GSa/s Real-Time' },
      { label: 'Memory Depth', value: '24 Mpts' },
    ],
  },
];

export default async function LabsPage() {
  const dbEquipment = getAll<any>('equipment', (a, b) => a.order - b.order);
  const finalEquipment = dbEquipment.length > 0 ? dbEquipment : fallbackEquipment;

  return (
    <div className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient decorative lighting */}
      <div
        className="absolute top-[8%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-navy/5 blur-[120px] pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute top-[35%] right-[-8%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none -z-10" />
      <div
        className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-green/5 blur-[110px] pointer-events-none -z-10"
        style={{ animationDuration: '6s' }}
      />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-amber/5 blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">An Industrial Infrastructure</span>
            <h1 className="text-text font-display">LABORATORIES</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text text-base sm:text-lg">High-tech labs for rapid prototyping and industrial design</p>
          </ScrollReveal>
        </div>

        {/* SECTION: 4 LAB CENTRES IN BLOCK VIEW BANNERS */}
        <section className="space-y-10" id="lab-centres">
          {FOUR_LABS.map((lab, index) => {
            const IconComponent = lab.icon;
            return (
              <ScrollReveal key={lab.id} direction="up" delay={index * 0.08}>
                <div
                  className={`group relative rounded-3xl border ${lab.colorTheme.cardBg} ${lab.colorTheme.border} ${lab.colorTheme.shadow} p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
                >
                  {/* Subtle top rim highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Details & Capabilities */}
                    <div className="lg:col-span-7 space-y-5 text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`label inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${lab.colorTheme.badgeBg} shadow-sm`}
                        >
                          <span className={`h-2 w-2 rounded-full ${lab.colorTheme.dot} animate-pulse`} />
                          {lab.badge}
                        </span>
                        <span className="text-xs font-mono font-medium text-text-secondary/70">
                          AICTE IDEA Lab @ KEC
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-text tracking-tight">
                          {lab.title}
                        </h2>
                        <p className="text-sm font-semibold text-text-secondary font-sans">{lab.tagline}</p>
                      </div>

                      <p className="body-text text-sm sm:text-base leading-relaxed text-text/90">{lab.description}</p>

                      {/* Capabilities Tags */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary block">
                          Key Equipment &amp; Capabilities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {lab.keyCapabilities.map((cap) => (
                            <span
                              key={cap}
                              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all shadow-sm ${lab.colorTheme.tagBg}`}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Image Placeholder Slot */}
                    <div className="lg:col-span-5 w-full">
                      {lab.image ? (
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 shadow-lg group-hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5">
                          <img
                            src={lab.image}
                            alt={lab.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl border-2 border-dashed ${lab.colorTheme.placeholderBorder} ${lab.colorTheme.placeholderBg} flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:bg-white/80 group-hover:border-solid shadow-inner`}
                        >
                          {/* Center Icon badge */}
                          <div
                            className={`p-4 rounded-2xl bg-white shadow-md ${lab.colorTheme.placeholderIcon} mb-3 ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <ImageIcon className="w-8 h-8" />
                          </div>

                          <span className="text-xs font-bold font-mono tracking-wider uppercase text-text mb-1">
                            {lab.title}
                          </span>
                          <p className="text-[11px] text-text-secondary max-w-xs font-medium">
                            Insert your lab photo here
                          </p>

                          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-black/5 text-[10px] font-mono text-text-secondary shadow-sm">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Recommended: 16:9 or 4:3 Image</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </section>
      </div>
    </div>
  );
}
