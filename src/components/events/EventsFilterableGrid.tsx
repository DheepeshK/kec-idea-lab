'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Inbox, X, CheckCircle2, AlertTriangle } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  imageUrl?: string;
  category: 'Workshop' | 'Hackathon' | 'Ideathon' | 'Open Lab Day' | string;
}

interface EventsFilterableGridProps {
  events: EventItem[];
}

const TABS = ['All', 'Workshops', 'Hackathons', 'Ideathons', 'Open Lab Days'];

const matchesTab = (category: string, activeTab: string) => {
  if (activeTab === 'All') return true;
  const normalizedCategory = (category || '').toLowerCase().trim();
  const normalizedTab = activeTab.toLowerCase().trim();

  if (normalizedTab === 'workshops') {
    return normalizedCategory === 'workshop' || normalizedCategory === 'workshops';
  }
  if (normalizedTab === 'hackathons') {
    return normalizedCategory === 'hackathon' || normalizedCategory === 'hackathons';
  }
  if (normalizedTab === 'ideathons') {
    return normalizedCategory === 'ideathon' || normalizedCategory === 'ideathons';
  }
  if (normalizedTab === 'open lab days') {
    return (
      normalizedCategory === 'open lab day' ||
      normalizedCategory === 'open lab days' ||
      normalizedCategory === 'open lab' ||
      normalizedCategory === 'open-lab-day'
    );
  }
  return normalizedCategory === normalizedTab;
};

function EventImagePlaceholder({ category, title }: { category: string; title: string }) {
  const gradients = [
    'from-brand-red/20 via-bg-elevated to-brand-navy/20',
    'from-brand-navy/20 via-bg-elevated to-brand-green/20',
    'from-brand-green/20 via-bg-elevated to-brand-amber/20',
    'from-brand-amber/20 via-bg-elevated to-brand-red/20',
  ];

  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const grad = gradients[Math.abs(hash) % gradients.length];

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${grad} flex flex-col items-center justify-center p-6 overflow-hidden`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
      <div className="absolute h-32 w-32 rounded-full border border-accent/10 scale-[1.5] pointer-events-none" />
      <div className="absolute h-32 w-32 rounded-full border border-accent/5 scale-[2.2] pointer-events-none" />
      <div className="relative z-10 p-4 rounded-full bg-bg-elevated/80 border border-border text-accent shadow-xl shadow-black/40 mb-3 group-hover:scale-105 transition-transform duration-300">
        <Calendar className="h-7 w-7 text-accent" />
      </div>
      <span className="relative z-10 label text-text-secondary text-center">
        {category || 'KEC IDEA LAB'}
      </span>
    </div>
  );
}

function RegistrationModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [rollNoDept, setRollNoDept] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event._id,
          eventTitle: event.title,
          name,
          rollNoDept,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-bg border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-bold text-text text-sm">Register for Event</h3>
          <button onClick={onClose} className="p-1 hover:bg-border/20 rounded transition-colors">
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center space-y-4 py-6">
              <div className="inline-block bg-success/20 p-3 rounded-full text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-text">Registration Submitted!</h4>
                <p className="text-xs text-text-secondary">
                  You are registered for <strong className="text-accent">{event.title}</strong>. We will contact you at <strong className="font-mono">{email}</strong> with further details.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={onClose}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-accent/5 border border-accent/10 rounded-lg p-3 mb-2">
                <p className="text-xs font-bold text-text">{event.title}</p>
                <p className="text-[10px] text-text-secondary">{event.category} &middot; {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>

              {error && (
                <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adithyan S"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Roll No / Department *</label>
                <input
                  type="text"
                  required
                  value={rollNoDept}
                  onChange={(e) => setRollNoDept(e.target.value)}
                  placeholder="e.g. 21MCR001 - Mechatronics"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@kongu.edu"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsFilterableGrid({ events }: EventsFilterableGridProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  const filteredEvents = events.filter((evt) => matchesTab(evt.category, activeTab));

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-12">
      {/* Navigation Pill Filters */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            id={`filter-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-full border transition-all duration-300 uppercase focus:outline-none ${
              activeTab === tab
                ? 'bg-accent text-white border-accent/60 shadow-md shadow-accent/20 scale-103'
                : 'bg-bg-elevated/40 text-text-secondary border-border hover:text-text hover:border-text-secondary/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid List */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt, idx) => {
            const displayImage = evt.imageUrl || evt.image;
            return (
              <ScrollReveal key={evt._id} direction="up" delay={idx * 0.04}>
                <Card
                  id={`event-card-${evt._id}`}
                  className="h-full flex flex-col justify-between p-0 overflow-hidden group hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    {/* Media Display Area */}
                    <div className="relative h-52 w-full bg-bg overflow-hidden shrink-0">
                      {displayImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={displayImage}
                          alt={evt.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <EventImagePlaceholder category={evt.category} title={evt.title} />
                      )}

                      {/* Header Overlays */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="primary" id={`badge-cat-${evt._id}`}>
                          {evt.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center bg-bg-elevated/80 backdrop-blur-md border border-border/60 rounded-lg px-3 py-1.5 font-mono text-[10px] text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-accent" />
                          {formatDate(evt.date)}
                        </span>
                        {evt.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-accent" />
                            {evt.time}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors leading-snug">
                          {evt.title}
                        </h3>
                        <p className="body-text text-xs sm:text-sm line-clamp-1">
                          {evt.description}
                        </p>
                      </div>

                      {evt.location && (
                        <div className="flex items-center gap-2 text-[11px] text-text-secondary font-mono">
                          <MapPin className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-border/30">
                    <span className="text-[9px] text-text-secondary font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-accent animate-pulse" />
                      Free Registration
                    </span>
                    <button
                      id={`register-btn-${evt._id}`}
                      onClick={() => setRegisteringEvent(evt)}
                      className="text-xs text-accent font-semibold hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors focus:outline-none"
                    >
                      Apply Now <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <ScrollReveal direction="up">
          <div
            id="events-empty-state"
            className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-border rounded-3xl bg-bg-elevated/20 max-w-xl mx-auto space-y-4"
          >
            <div className="p-4 rounded-full bg-bg-elevated text-text-secondary border border-border">
              <Inbox className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-text">No Events Listed</h3>
              <p className="text-xs text-text-secondary max-w-sm leading-normal">
                No events in this category yet — check back soon for workshops, hackathons, and ideathons.
              </p>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Registration Modal */}
      {registeringEvent && (
        <RegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}
    </div>
  );
}
