'use client';

import { useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

// Smooth easeInOutQuad gives a gentle start, steady climb, and graceful deceleration
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function Counter({ end, duration = 3.8, prefix = '', suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    let startTime: number | null = null;
    let raf: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animated.current = true;
          raf = requestAnimationFrame(function animate(ts: number) {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / (duration * 1000), 1);
            el!.textContent = `${prefix}${Math.round(easeInOutQuad(p) * end)}${suffix}`;
            if (p < 1) raf = requestAnimationFrame(animate);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, duration, prefix, suffix]);

  return (
    <span ref={ref} className="font-bold tracking-tight tabular-nums contain">
      {prefix}0{suffix}
    </span>
  );
}
