import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
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
            position: 'relative', zIndex: 10,
          }}>
            {/* Orbital rings */}
            <div style={{ position: 'relative', width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ ...ringStyles(0), width: 400, height: 400 }} />
              <div style={{ ...ringStyles(1), width: 310, height: 310 }} />
              <div style={{ ...ringStyles(2), width: 220, height: 220 }} />

              {/* Floating dots on rings */}
              <div style={{
                position: 'absolute', width: 14, height: 14, borderRadius: '50%',
                background: 'var(--accent)', top: 0, left: '50%', marginLeft: -7,
                animation: 'ring-rotate 10s linear infinite', boxShadow: '0 0 16px color-mix(in srgb, var(--accent) 70%, transparent)',
              }} />
              <div style={{
                position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                background: 'var(--accent-2)', bottom: 0, right: '50%', marginRight: -5,
                animation: 'ring-rotate-reverse 14s linear infinite', boxShadow: '0 0 12px color-mix(in srgb, var(--accent-2) 60%, transparent)',
              }} />
              <div style={{
                position: 'absolute', width: 8, height: 8, borderRadius: '50%',
                background: 'var(--accent-3)', top: '50%', left: 0, marginTop: -4,
                animation: 'ring-rotate 18s linear infinite', boxShadow: '0 0 12px color-mix(in srgb, var(--accent-3) 60%, transparent)',
              }} />

              {/* Logo */}
              <div style={{
                width: 180, height: 180, borderRadius: 32,
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
                <img src="/IDEALab.png" alt="IDEA Lab" style={{ position: 'relative', width: 110, height: 110, objectFit: 'contain' }} />
              </div>
            </div>

            {/* Brand text */}
            <p style={{
              fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: 48,
              letterSpacing: '-0.03em', color: 'var(--text)', marginTop: 36, textAlign: 'center',
            }}>
              IDEA Lab <span style={{ color: 'var(--accent)' }}>@ KEC</span>
            </p>

            <p style={{
              fontSize: 15, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono), monospace',
              marginTop: 8, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Innovation, Development, Evaluation & Application Lab
            </p>

            {/* Partner logos row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 28, marginTop: 40, opacity: 0.7,
            }}>
              {['/AICTE.png', '/KEC_new2.png', '/IIC.png', '/EMDC.png', '/TBI.png'].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: 40, width: 'auto', objectFit: 'contain', opacity: 0.8 }} />
              ))}
            </div>

            {/* Animated loading bar */}
            <div style={{
              width: 300, height: 3, borderRadius: 3, background: 'color-mix(in srgb, var(--text) 8%, transparent)',
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
