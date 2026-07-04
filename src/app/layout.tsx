import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SessionWrapper from "@/components/layout/SessionWrapper";
import ThemeProvider from "@/components/theme/ThemeProvider";
import NavigationProgress from "@/components/layout/NavigationProgress";
import SplashScreen from "@/components/layout/SplashScreen";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AICTE IDEA Lab @ KEC",
  description: "Innovation and Entrepreneurship Lab at KEC",
  icons: {
    icon: "/IDEALab.png",
  },
};

const part = (i: number) => {
  const colors = ['#D2232A', '#F9A01B', '#009444', '#0B4C8C', '#94a3b8'];
  return {
    left: `${Math.random() * 100}%`,
    bottom: '-20px',
    width: `${6 + Math.random() * 14}px`,
    height: `${6 + Math.random() * 14}px`,
    borderRadius: '50%',
    background: colors[i % colors.length],
    position: 'absolute' as const,
    animation: `particle-float ${2 + Math.random() * 2}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 2}s`,
    opacity: 0,
    boxShadow: `0 0 10px ${colors[i % colors.length]}60`,
  };
};

const particles = Array.from({ length: 30 }, (_, i) => part(i));

const ringStyles = (index: number) => ({
  position: 'absolute' as const,
  borderRadius: '50%',
  border: `1.5px solid ${['color-mix(in srgb, var(--accent) 15%, transparent)', 'color-mix(in srgb, var(--accent-2) 12%, transparent)', 'color-mix(in srgb, var(--accent-3) 10%, transparent)'][index]}`,
  animation: `${index === 1 ? 'ring-rotate-reverse' : 'ring-rotate'} ${6 + index * 2}s linear infinite`,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-boot" strategy="beforeInteractive">{`
          (function() {
            var key = 'idealab-theme';
            try {
              var stored = localStorage.getItem(key);
              if (!stored || stored === 'system') {
                var mq = window.matchMedia('(prefers-color-scheme: light)');
                document.documentElement.setAttribute('data-theme', mq.matches ? 'light' : 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', stored);
              }
            } catch(e) {}
          })();
        `}</Script>
        <div id="splash" style={{
          position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)',
          transition: 'opacity 0.6s ease-out', overflow: 'hidden',
        }}>
          {/* Animated gradient bg */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-elevated) 25%, var(--bg) 50%, var(--bg-elevated) 75%, var(--bg) 100%)',
            backgroundSize: '200% 200%', animation: 'gradient-shift 8s ease infinite',
          }} />

          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Particles */}
          {particles.map((p, i) => <div key={i} style={p} />)}

          {/* Center content */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            position: 'relative', zIndex: 10, width: '100%', maxWidth: 400, padding: '0 16px',
          }}>
            {/* Orbital rings */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 400, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ ...ringStyles(0), width: '100%', height: '100%' }} />
              <div style={{ ...ringStyles(1), width: '77.5%', height: '77.5%' }} />
              <div style={{ ...ringStyles(2), width: '55%', height: '55%' }} />

              {/* Floating dots on rings */}
              <div style={{
                position: 'absolute', width: 'clamp(10px, 3.5vw, 14px)', height: 'clamp(10px, 3.5vw, 14px)', borderRadius: '50%',
                background: 'var(--accent)', top: 0, left: '50%', transform: 'translateX(-50%)',
                animation: 'ring-rotate 10s linear infinite', boxShadow: '0 0 16px color-mix(in srgb, var(--accent) 70%, transparent)',
              }} />
              <div style={{
                position: 'absolute', width: 'clamp(7px, 2.5vw, 10px)', height: 'clamp(7px, 2.5vw, 10px)', borderRadius: '50%',
                background: 'var(--accent-2)', bottom: 0, right: '50%', transform: 'translateX(50%)',
                animation: 'ring-rotate-reverse 14s linear infinite', boxShadow: '0 0 12px color-mix(in srgb, var(--accent-2) 60%, transparent)',
              }} />
              <div style={{
                position: 'absolute', width: 'clamp(6px, 2vw, 8px)', height: 'clamp(6px, 2vw, 8px)', borderRadius: '50%',
                background: 'var(--accent-3)', top: '50%', left: 0, transform: 'translateY(-50%)',
                animation: 'ring-rotate 18s linear infinite', boxShadow: '0 0 12px color-mix(in srgb, var(--accent-3) 60%, transparent)',
              }} />

              {/* Logo */}
              <div style={{
                width: 'clamp(120px, 40vw, 180px)', height: 'clamp(120px, 40vw, 180px)', borderRadius: 'clamp(20px, 6vw, 32px)',
                border: '2px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden', background: 'color-mix(in srgb, var(--bg-elevated) 80%, transparent)',
                animation: 'pulse-glow 2.5s ease-in-out infinite',
                boxShadow: '0 0 50px color-mix(in srgb, var(--accent) 20%, transparent), 0 0 100px color-mix(in srgb, var(--accent) 8%, transparent)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--accent-3) 15%, transparent))',
                }} />
                <img src="/IDEALab.png" alt="IDEA Lab" style={{ position: 'relative', width: 'clamp(70px, 25vw, 110px)', height: 'clamp(70px, 25vw, 110px)', objectFit: 'contain' }} />
              </div>
            </div>

            {/* Brand text */}
            <p style={{
              fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 10vw, 3rem)',
              letterSpacing: '-0.03em', color: 'var(--text)', marginTop: 36, textAlign: 'center',
            }}>
              IDEA Lab <span style={{ color: 'var(--accent)' }}>@ KEC</span>
            </p>

            <p style={{
              fontSize: 'clamp(11px, 3.5vw, 15px)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono), monospace',
              marginTop: 8, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', width: '100%', padding: '0 16px',
            }}>
              Innovation, Development, Evaluation & Application Lab
            </p>

            {/* Partner logos row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(16px, 4vw, 28px)', marginTop: 40, opacity: 0.7, width: '100%', padding: '0 16px',
            }}>
              {['/AICTE.png', '/KEC_new2.png', '/IIC.png', '/EMDC.png', '/TBI.png'].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: 'clamp(28px, 8vw, 40px)', width: 'auto', objectFit: 'contain', opacity: 0.8 }} />
              ))}
            </div>

            {/* Animated loading bar */}
            <div style={{
              width: 'min(80vw, 300px)', height: 3, borderRadius: 3, background: 'color-mix(in srgb, var(--text) 8%, transparent)',
              marginTop: 44, overflow: 'hidden', position: 'relative',
            }}>
              <div style={{
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 1s ease infinite, loading-fill 1.8s ease-out forwards',
              }} />
            </div>

            {/* Status text */}
            <p style={{
              fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono), monospace',
              marginTop: 12, letterSpacing: '0.1em',
            }}>
              LOADING INNOVATION WORKSPACE...
            </p>
          </div>
        </div>
        <NavigationProgress />
        <ThemeProvider>
          <SessionWrapper>{children}</SessionWrapper>
        </ThemeProvider>
        <SplashScreen />
      </body>
    </html>
  );
}
