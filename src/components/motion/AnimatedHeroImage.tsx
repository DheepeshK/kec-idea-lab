'use client';

import { useState, useRef } from 'react';

export default function AnimatedHeroImage() {
  const [tilt, setTilt] = useState<string | null>(null);
  const [glowOffset, setGlowOffset] = useState<string | null>(null);
  const raf = useRef(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      setTilt(`perspective(800px) rotateX(${py * 6}deg) rotateY(${px * 8}deg)`);
      setGlowOffset(`translate(${px * -8}px, ${py * -8}px)`);
    });
  };

  const handleLeave = () => {
    if (raf.current) { cancelAnimationFrame(raf.current); raf.current = 0; }
    setTilt(null);
    setGlowOffset(null);
  };

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto cursor-default">
      <div
        className="absolute -inset-8 rounded-full blur-[120px] opacity-20 pointer-events-none z-0 animate-organic-glow"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-2) 40%, transparent 70%)',
          transform: glowOffset ?? undefined,
          animation: glowOffset ? 'none' : undefined,
        }}
      />

      <div
        className="relative w-full h-full z-10"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div
          className="w-full h-full animate-organic-float"
          style={{
            transformStyle: 'preserve-3d',
            transform: tilt ?? undefined,
            animation: tilt ? 'none' : undefined,
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/40 via-accent-2/30 to-accent-3/40 p-[2.5px] shadow-2xl shadow-accent/20">
            <div className="w-full h-full rounded-2xl bg-bg-elevated flex items-center justify-center p-6">
              <img
                src="/IDEALab.png"
                alt="AICTE IDEA Lab"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-accent/50 rounded-tl" />
          <div className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-accent-2/50 rounded-tr" />
          <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-accent-3/50 rounded-bl" />
          <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-accent/50 rounded-br" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-sparkle"
            style={{
              left: `${(i * 47 + 13) % 100}%`,
              top: `${(i * 73 + 7) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              backgroundColor: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--accent-2)' : 'var(--accent-3)',
              animationDelay: `${i * 0.3}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
