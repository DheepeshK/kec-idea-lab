'use client';

import { useState } from 'react';

export default function TeamMemberImage({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return <AvatarPlaceholder name={name} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      referrerPolicy="no-referrer"
    />
  );
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = getInitials(name);
  const colorClass = getAccentGradient(name);
  return (
    <div className={`h-full w-full bg-gradient-to-br ${colorClass} flex items-center justify-center font-mono font-bold text-lg tracking-wider relative overflow-hidden shadow-inner`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent)] pointer-events-none" />
      <div className="absolute h-12 w-12 rounded-full border border-white/5 scale-[1.7] pointer-events-none opacity-45" />
      <div className="absolute h-12 w-12 rounded-full border border-white/5 scale-[2.4] pointer-events-none opacity-20" />
      <div className="absolute h-4 w-4 bg-white/15 rotate-45 top-1 right-2 rounded-sm pointer-events-none blur-[0.5px]" />
      <span className="relative z-10 select-none drop-shadow-md">{initials}</span>
    </div>
  );
}

const gradientColors = [
  'from-indigo-600 to-blue-500 text-indigo-100',
  'from-violet-600 to-fuchsia-500 text-violet-100',
  'from-rose-600 to-orange-500 text-rose-100',
  'from-emerald-600 to-teal-500 text-emerald-100',
  'from-cyan-600 to-sky-500 text-cyan-100',
  'from-amber-600 to-yellow-500 text-amber-100',
];

function getAccentGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradientColors.length;
  return gradientColors[index];
}

function getInitials(name: string) {
  const parts = name.split(' ').filter(p => !p.toLowerCase().includes('.') && p.trim().length > 0);
  if (parts.length === 0) {
    const cleaned = name.replace(/[^A-Za-z\s]/g, '').trim().split(/\s+/);
    if (cleaned.length > 0 && cleaned[0].length > 0) {
      return (cleaned[0][0] + (cleaned[1]?.[0] || '')).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  const first = parts[0][0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase();
}
