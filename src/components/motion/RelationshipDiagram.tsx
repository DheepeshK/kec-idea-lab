'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RelationshipDiagram() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);
  const pathCollegeRef = useRef<SVGPathElement>(null);
  const collegeNodeRef = useRef<SVGGElement>(null);
  const parentNodeRef = useRef<SVGGElement>(null);
  const child1Ref = useRef<SVGGElement>(null);
  const child2Ref = useRef<SVGGElement>(null);
  const child3Ref = useRef<SVGGElement>(null);
  const child4Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const paths = [pathCollegeRef.current, path1Ref.current, path2Ref.current, path3Ref.current, path4Ref.current];
    const nodes = [child1Ref.current, child2Ref.current, child3Ref.current, child4Ref.current];
    const collegeNode = collegeNodeRef.current;
    const parentNode = parentNodeRef.current;
    const container = containerRef.current;

    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(collegeNode, { scale: 1, opacity: 1, transformOrigin: '50% 50%' });
      gsap.set(parentNode, { scale: 1, opacity: 1, transformOrigin: '50% 50%' });
      nodes.forEach((node) => {
        if (node) gsap.set(node, { scale: 1, opacity: 1, transformOrigin: '50% 50%' });
      });
      paths.forEach((path) => {
        if (path) gsap.set(path, { strokeDashoffset: 0 });
      });
      return;
    }

    paths.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    gsap.set(collegeNode, { scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(parentNode, { scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
    nodes.forEach((node) => {
      if (node) gsap.set(node, { scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(collegeNode, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
    tl.to(parentNode, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');
    tl.to(paths, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.out', stagger: 0.1 }, '-=0.2');
    tl.to(nodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }, '-=0.8');
  }, []);

  const c = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    bgElevated: isDark ? '#1e293b' : '#e2e8f0',
    text: isDark ? '#f1f5f9' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#475569',
    border: isDark ? '#475569' : '#cbd5e1',
    kec: isDark ? '#3b82f6' : '#1d4ed8',
    ief: isDark ? '#8b5cf6' : '#6d28d9',
    iic: isDark ? '#0ea5e9' : '#0369a1',
    emdc: isDark ? '#10b981' : '#047857',
    tbi: isDark ? '#f59e0b' : '#b45309',
    aicte: isDark ? '#f97316' : '#c2410c',
    idealab: isDark ? '#818cf8' : '#4f46e5',
    line: isDark ? '#6366f1' : '#818cf8',
  };

  return (
    <div ref={containerRef} className="w-full rounded-2xl border border-border p-4 md:p-8 relative overflow-hidden bg-bg-elevated/40">
      <div className="absolute top-4 left-4 label text-accent flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        IEF Structural Relationship
      </div>
      <div className="relative w-full max-w-4xl mx-auto mt-8">
        <svg
          viewBox="0 0 800 480"
          className="w-full h-auto select-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={c.line} floodOpacity="0.15" />
            </filter>
            <filter id="glow-hl" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor={c.idealab} floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Connectors */}
          <path ref={pathCollegeRef} d="M 400 122 L 400 145" fill="none" stroke={c.line} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
          <path ref={path1Ref} d="M 400 235 C 400 270, 107 270, 107 310" fill="none" stroke={c.line} strokeWidth="2.5" strokeLinecap="round" />
          <path ref={path2Ref} d="M 400 235 C 400 270, 302 270, 302 310" fill="none" stroke={c.line} strokeWidth="2.5" strokeLinecap="round" />
          <path ref={path3Ref} d="M 400 235 C 400 270, 497 270, 497 310" fill="none" stroke={c.line} strokeWidth="2.5" strokeLinecap="round" />
          <path ref={path4Ref} d="M 400 235 C 400 270, 695 270, 695 310" fill="none" stroke={c.line} strokeWidth="2.5" strokeLinecap="round" />

          {/* College Node */}
          <g ref={collegeNodeRef} filter="url(#glow)">
            <rect x="180" y="12" width="440" height="110" rx="14" fill={c.bg} stroke={c.kec} strokeWidth="2.5" />
            <rect x="340" y="2" width="120" height="20" rx="10" fill={c.bgElevated} stroke={c.border} strokeWidth="1" />
            <text x="400" y="16" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="2">INSTITUTION</text>
            <image href="/KEC_new2.png" x="325" y="4" width="150" height="110" />
            <text x="400" y="100" textAnchor="middle" fill={c.text} fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">Kongu Engineering College</text>
            <text x="400" y="115" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif" fontWeight="500">(Autonomous) Affiliated to Anna University &amp; approved by AICTE</text>
          </g>

          {/* IEF Parent Node */}
          <g ref={parentNodeRef} filter="url(#glow)">
            <rect x="230" y="155" width="340" height="80" rx="16" fill={c.bg} stroke={c.ief} strokeWidth="2.5" />
            <rect x="350" y="145" width="100" height="20" rx="10" fill={c.bgElevated} stroke={c.border} strokeWidth="1" />
            <text x="400" y="159" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">PARENT FORUM</text>
            <text x="400" y="190" textAnchor="middle" fill={c.text} fontSize="17" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">IEF @ KEC</text>
            <text x="400" y="215" textAnchor="middle" fill={c.textMuted} fontSize="11" fontFamily="sans-serif" fontWeight="500">Innovation &amp; Entrepreneurship Forum</text>
          </g>

          {/* IIC Node */}
          <g ref={child1Ref} filter="url(#glow)">
            <rect x="20" y="310" width="175" height="130" rx="14" fill={c.bg} stroke={c.iic} strokeWidth="2" />
            <image href="/IIC.png" x="50" y="300" width="100" height="100" />
            <text x="107" y="396" textAnchor="middle" fill={c.text} fontSize="15" fontWeight="bold" fontFamily="sans-serif">IIC @ KEC</text>
            <text x="107" y="416" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Institution&apos;s Innovation</text>
            <text x="107" y="432" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Council (Fosters culture)</text>
          </g>

          {/* EMDC Node */}
          <g ref={child2Ref} filter="url(#glow)">
            <rect x="215" y="310" width="175" height="130" rx="14" fill={c.bg} stroke={c.emdc} strokeWidth="2" />
            <image href="/EMDC.png" x="277" y="322" width="52" height="52" />
            <text x="302" y="396" textAnchor="middle" fill={c.text} fontSize="15" fontWeight="bold" fontFamily="sans-serif">EMDC @ KEC</text>
            <text x="302" y="416" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Entrepreneurship &amp; Management</text>
            <text x="302" y="432" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Development Centre (Training)</text>
          </g>

          {/* TBI Node */}
          <g ref={child3Ref} filter="url(#glow)">
            <rect x="410" y="310" width="175" height="130" rx="14" fill={c.bg} stroke={c.tbi} strokeWidth="2" />
            <image href="/TBI.png" x="445" y="295" width="100" height="100" />
            <text x="497" y="396" textAnchor="middle" fill={c.text} fontSize="15" fontWeight="bold" fontFamily="sans-serif">TBI @ KEC</text>
            <text x="497" y="416" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Technology Business</text>
            <text x="497" y="432" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif">Incubator (Incubation &amp; Funding)</text>
          </g>

          {/* IDEA Lab Node */}
          <g ref={child4Ref} filter="url(#glow-hl)">
            <rect x="605" y="310" width="180" height="130" rx="14" fill={c.bg} stroke={c.idealab} strokeWidth="2.5" />
            <rect x="660" y="300" width="70" height="18" rx="9" fill={c.bgElevated} stroke={c.border} strokeWidth="1" />
            <text x="695" y="313" textAnchor="middle" fill={c.idealab} fontSize="8" fontFamily="monospace" fontWeight="bold">NEW FACILITY</text>
            <image href="/AICTE.png" x="655" y="324" width="40" height="40" />
            <image href="/IDEALab.png" x="701" y="324" width="40" height="40" />
            <text x="695" y="390" textAnchor="middle" fill={c.text} fontSize="15" fontWeight="bold" fontFamily="sans-serif">AICTE IDEA LAB</text>
            <text x="695" y="412" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily="sans-serif" fontWeight="500">Product Development Hub</text>
            <text x="695" y="428" textAnchor="middle" fill={c.idealab} fontSize="10" fontFamily="monospace" fontWeight="bold">(All types of fabrication)</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
