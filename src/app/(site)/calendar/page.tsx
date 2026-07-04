import ScrollReveal from '@/components/motion/ScrollReveal';
import YearSchedule from '@/components/calendar/YearSchedule';

export const metadata = {
  title: 'Calendar | AICTE IDEA Lab @ KEC',
  description: 'Tentative yearly schedule of workshops, hackathons, ideathons, and open lab days at the AICTE IDEA Lab, Kongu Engineering College.',
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-bg text-text py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-3/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal direction="up">
            <span className="label text-accent block mb-1">Plan Ahead</span>
            <h1>Event Calendar</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text">
              Browse our tentative yearly schedule of workshops, hackathons, ideathons, and open lab days. Dates are subject to change — check back regularly for updates.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.12}>
          <YearSchedule />
        </ScrollReveal>
      </div>
    </div>
  );
}
