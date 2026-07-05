'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Card from '@/components/ui/Card';
import { MapPin, HardDrive, Inbox } from 'lucide-react';

interface EquipmentItem {
  _id: string;
  name: string;
  category?: string;
  description: string;
  specs?: { label: string; value: string }[];
  imageUrl?: string;
  image?: string;
  quantity: number;
  available: number;
  location?: string;
}

interface PinnedShowcaseProps {
  items: EquipmentItem[];
}

const TABS = ['All', 'Rapid Prototyping', 'Machining', 'Electronics & IoT'];

const matchesTab = (category: string, activeTab: string) => {
  if (activeTab === 'All') return true;
  return (category || '').toLowerCase().trim() === activeTab.toLowerCase().trim();
};

function EquipmentPlaceholderImage({ category, name }: { category: string; name: string }) {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradients = [
    'from-brand-red/20 via-bg-elevated to-brand-navy/20',
    'from-brand-navy/20 via-bg-elevated to-brand-green/20',
    'from-brand-green/20 via-bg-elevated to-brand-amber/20',
    'from-brand-amber/20 via-bg-elevated to-brand-red/20',
  ];
  const grad = gradients[Math.abs(hash) % gradients.length];

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${grad} flex flex-col items-center justify-center p-6 overflow-hidden`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
      <div className="absolute h-32 w-32 rounded-full border border-accent/10 scale-[1.5] pointer-events-none" />
      <div className="absolute h-32 w-32 rounded-full border border-accent/5 scale-[2.2] pointer-events-none" />
      <div className="relative z-10 p-4 rounded-full bg-bg-elevated/80 border border-border text-accent shadow-xl shadow-black/40 mb-3 group-hover:scale-105 transition-transform duration-300">
        <HardDrive className="h-7 w-7 text-accent" />
      </div>
      <span className="relative z-10 label text-text-secondary text-center">
        {category || 'Equipment'}
      </span>
    </div>
  );
}

export default function PinnedShowcase({ items }: PinnedShowcaseProps) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = items.filter((item) => matchesTab(item.category || '', activeTab));

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-sans font-bold tracking-wider rounded-full border transition-all duration-300 uppercase focus:outline-none ${
              activeTab === tab
                ? 'bg-accent text-white border-accent/60 shadow-md shadow-accent/20 scale-103'
                : 'bg-bg-elevated/40 text-text-secondary border-border hover:text-text hover:border-text-secondary/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Equipment Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            const displayImage = item.imageUrl || item.image;
            return (
              <ScrollReveal key={item._id} direction="up" delay={idx * 0.04}>
                <Card
                  className="h-full flex flex-col p-0 overflow-hidden group"
                  hoverEffect={true}
                >
                  {/* Image Section */}
                  <div className="relative h-40 sm:h-52 w-full bg-bg-elevated overflow-hidden shrink-0">
                    {displayImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={displayImage}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <EquipmentPlaceholderImage category={item.category || ''} name={item.name} />
                    )}

                  </div>

                  {/* Content Section */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-text group-hover:text-accent transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-text-secondary">
                      <span><span className="text-accent">Type:</span> {item.category || 'General'}</span>
                      <span><span className="text-accent">Available:</span> {item.available}/{item.quantity}</span>
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-border rounded-3xl bg-bg-elevated/20 max-w-xl mx-auto space-y-4">
            <div className="p-4 rounded-full bg-bg-elevated text-text-secondary border border-border">
              <Inbox className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-text">No Equipment Found</h3>
              <p className="text-xs text-text-secondary max-w-sm leading-normal">
                No equipment in this category yet. Try selecting a different filter.
              </p>
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
