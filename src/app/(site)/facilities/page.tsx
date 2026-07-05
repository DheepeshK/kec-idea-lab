import PinnedShowcase from '@/components/facilities/PinnedShowcase';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { getAll } from '@/lib/store';

export const metadata = {
  title: 'Facilities | AICTE IDEA Lab @ KEC',
  description: 'Explore our state-of-the-art equipment — 3D printers, laser cutters, CNC routers, PCB fabrication, and electronics testing tools.',
};

// High-fidelity fallback list of 5 equipments with complete specifications (including placeholder warning indicators)
const fallbackEquipment = [
  {
    _id: '1',
    name: 'Industrial FDM 3D Printer',
    category: 'Rapid Prototyping',
    description: 'High-precision dual-extruder 3D printer for ABS, PLA, and Carbon Fiber composite filament fabrication.',
    quantity: 3,
    available: 3,
    location: '3D Printing Zone',
    image: 'https://images.unsplash.com/photo-1615840287214-7fe58a8f3685?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Build Volume', value: '305 x 305 x 300 mm' },
      { label: 'Layer Resolution', value: '0.01 - 0.4 mm' },
      { label: 'Extruder Temp', value: 'Up to 300°C' },
      { label: 'Filaments', value: 'PLA, ABS, PETG, TPU, Carbon Fiber' },
      { label: 'Operational Status', value: '[PLACEHOLDER: Verify Calibration]' }
    ]
  },
  {
    _id: '2',
    name: 'CO2 Laser Cutter & Engraver',
    category: 'Machining',
    description: '100W high-power CO2 laser cutter for precise wood, acrylic, fabric, and sheet metal engraving.',
    quantity: 1,
    available: 1,
    location: 'Heavy Machinery Room',
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Laser Power', value: '100W CO2 Gas Laser' },
      { label: 'Work Area', value: '900 x 600 mm' },
      { label: 'Max Cutting Depth', value: '15mm Acrylic, 12mm Wood' },
      { label: 'Cooling System', value: 'Industrial Water Chiller [PLACEHOLDER: Check Flow Rate]' },
      { label: 'Positioning Accuracy', value: '< 0.01 mm' }
    ]
  },
  {
    _id: '3',
    name: 'Smart Soldering & SMD Station',
    category: 'Electronics & IoT',
    description: 'State-of-the-art SMD rework station with hot-air guns, smart micro-soldering irons, and digital microscopes.',
    quantity: 10,
    available: 8,
    location: 'PCB Lab Area',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Temperature Range', value: '100°C - 500°C' },
      { label: 'Hot Air Flow Rate', value: '120 L/min (Max)' },
      { label: 'Display Type', value: 'Dual LED Digital Readouts' },
      { label: 'Calibration', value: '[PLACEHOLDER: Pending NABL Certification]' },
      { label: 'ESD Safety', value: 'Fully Grounded, ESD Safe' }
    ]
  },
  {
    _id: '4',
    name: 'High Frequency CNC Router',
    category: 'Machining',
    description: 'High-frequency 3-axis CNC router for precise milling of acrylic plaques, woods, and soft metals.',
    quantity: 1,
    available: 1,
    location: 'Heavy Machinery Room',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Spindle Speed', value: '24,000 RPM Max' },
      { label: 'Axis Travel (X/Y/Z)', value: '1200 x 1200 x 150 mm' },
      { label: 'Collet Size', value: 'ER20 (3.175mm to 12.7mm)' },
      { label: 'Drive System', value: 'Hybrid Leadshine Stepper System' },
      { label: 'Lubrication', value: 'Manual [PLACEHOLDER: Oil Level Low]' }
    ]
  },
  {
    _id: '5',
    name: 'Mixed Signal Digital Oscilloscope',
    category: 'Electronics & IoT',
    description: '4-channel 100MHz digital oscilloscope with built-in logic analyzers for debugging complex IoT circuit boards.',
    quantity: 5,
    available: 5,
    location: 'PCB Lab Area',
    image: 'https://images.unsplash.com/photo-1551893086-c024b2156497?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Bandwidth', value: '100 MHz (4 Channels)' },
      { label: 'Sample Rate', value: '1 GSa/s Real-Time' },
      { label: 'Memory Depth', value: '24 Mpts' },
      { label: 'Trigger Types', value: 'Edge, Pulse, Runt, Windows' },
      { label: 'Firmware', value: 'v2.41 [PLACEHOLDER: Needs Patch]' }
    ]
  }
];

export default async function FacilitiesPage() {
  const dbEquipment = getAll<any>('equipment', (a, b) => a.order - b.order);
  const finalEquipment = dbEquipment.length > 0 ? dbEquipment : fallbackEquipment;

  return (
    <div className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      {/* Animated decorative blobs using all 4 brand colors */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full bg-brand-navy/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-brand-green/5 blur-[90px] pointer-events-none -z-10" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[10%] right-[-12%] w-[450px] h-[450px] rounded-full bg-brand-amber/5 blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">
              State-of-the-Art Infrastructure
            </span>
            <h1>
              Facilities &amp; Machinery
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              Browse our inventory of high-precision fabrication and testing equipment.
              Filter by category to inspect hardware specifications and check real-time availability.
            </p>
          </ScrollReveal>

          {/* Affiliation logos */}
          <ScrollReveal direction="up" delay={0.14}>
            <div className="flex items-center justify-center gap-6 pt-2 flex-nowrap">
              {[
                { src: '/AICTE.png', alt: 'AICTE' },
                { src: '/KEC_new2.png', alt: 'KEC' },
                { src: '/IDEALab.png', alt: 'IDEA Lab' },
                { src: '/IIC.png', alt: 'IIC' },
                { src: '/EMDC.png', alt: 'EMDC' },
                { src: '/TBI.png', alt: 'TBI' },
              ].map((logo) => (
                <div key={logo.alt} className="relative h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Equipment Showcase Grid */}
        <div className="w-full">
          <PinnedShowcase items={finalEquipment} />
        </div>
      </div>
    </div>
  );
}
