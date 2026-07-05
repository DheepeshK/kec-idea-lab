import EventsFilterableGrid from '@/components/events/EventsFilterableGrid';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { getAll } from '@/lib/store';

export const metadata = {
  title: 'Events | AICTE IDEA Lab @ KEC',
  description: 'Workshops, hackathons, ideathons, and open lab days at the AICTE IDEA Lab, Kongu Engineering College.',
};

// High-fidelity fallback list representing each of the 4 categories
const fallbackEvents = [
  {
    _id: 'fallback-event-1',
    title: '3D Printer Operation & Maintenance Bootcamp',
    description: 'Learn slicer configurations, bed leveling, dual-extrusion, and standard FDM hardware troubleshooting.',
    date: '2026-07-15T09:00:00.000Z',
    time: '09:00 AM - 04:00 PM',
    location: 'AICTE-KEC Idea Lab, 3D Printing Zone',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1615840287214-7fe58a8f3685?auto=format&fit=crop&q=80&w=600',
    status: 'published',
  },
  {
    _id: 'fallback-event-2',
    title: 'Industrial Laser Cutting SOP Workshop',
    description: 'Safety-first instruction on operating CO2 Laser cutters, material limitations, and vector pathways.',
    date: '2026-07-22T10:00:00.000Z',
    time: '10:00 AM - 01:00 PM',
    location: 'Heavy Machinery Room, Idea Lab',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=600',
    status: 'published',
  },
  {
    _id: 'fallback-event-3',
    title: 'IoT Embedded Systems & Micro-Soldering Hack',
    description: 'A 24-hour hardware hackathon targeting agriculture and healthcare challenges. Micro-controllers provided.',
    date: '2026-08-05T08:30:00.000Z',
    time: '08:30 AM onwards',
    location: 'Idea Lab Main Hall & PCB Bay',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    status: 'published',
  },
  {
    _id: 'fallback-event-4',
    title: 'Smart Cities & Assistive Tech Ideathon',
    description: 'Brainstorm and design hardware-centered IoT products for smart cities, renewable energy, and disability aid.',
    date: '2026-08-19T09:30:00.000Z',
    time: '09:30 AM - 05:00 PM',
    location: 'Seminar Hall II, Kongu Campus',
    category: 'Ideathon',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    status: 'published',
  },
  {
    _id: 'fallback-event-5',
    title: 'Public Open House & Machinery Showcase',
    description: 'Open Lab Days for school pupils and industrial visitors to witness automated printing and CNC router demos.',
    date: '2026-09-10T10:00:00.000Z',
    time: '10:00 AM - 04:00 PM',
    location: 'Entire AICTE-KEC Idea Lab Facility',
    category: 'Open Lab Day',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    status: 'published',
  },
];

export default async function EventsPage() {
  const dbEvents = getAll<any>('events', (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const published = dbEvents.filter((e: any) => e.status !== 'draft');
  const finalEvents = published.length > 0 ? published : fallbackEvents;

  return (
    <div className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative radial gradients inside background layer */}
      <div className="absolute top-[15%] left-[-15%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] right-[-15%] w-[600px] h-[600px] rounded-full bg-accent-3/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Head Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">
              Active Knowledge Sharing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text tracking-tight leading-none">
              Lab Events & Bootcamps
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              Accelerate your product engineering and design skills. Register for our hands-on hardware training workshops, collaborative hackathons, ideation camps, and open lab days.
            </p>
          </ScrollReveal>

          {/* Affiliation logos */}
          <ScrollReveal direction="up" delay={0.14}>
            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 flex-nowrap">
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

        {/* Filterable Tab Grid Container */}
        <div className="w-full">
          <EventsFilterableGrid events={finalEvents} />
        </div>
      </div>
    </div>
  );
}
