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
  border: `1.5px solid ${['rgba(210,35,42,0.15)', 'rgba(249,160,27,0.12)', 'rgba(0,148,68,0.1)'][index]}`,
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
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#080b18',
          transition: 'opacity 0.6s ease-out', overflow: 'hidden',
        }}>
          {/* Animated gradient bg */}
          <div style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0e1a 0%, #0e1428 25%, #0a1628 50%, #0e1428 75%, #0a0e1a 100%)',
            backgroundSize: '200% 200%', animation: 'gradient-shift 8s ease infinite',
          }} />

          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(rgba(210,35,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(210,35,42,0.3) 1px, transparent 1px)',
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
                background: '#D2232A', top: 0, left: '50%', marginLeft: -7,
                animation: 'ring-rotate 10s linear infinite', boxShadow: '0 0 16px rgba(210,35,42,0.7)',
              }} />
              <div style={{
                position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                background: '#F9A01B', bottom: 0, right: '50%', marginRight: -5,
                animation: 'ring-rotate-reverse 14s linear infinite', boxShadow: '0 0 12px rgba(249,160,27,0.6)',
              }} />
              <div style={{
                position: 'absolute', width: 8, height: 8, borderRadius: '50%',
                background: '#009444', top: '50%', left: 0, marginTop: -4,
                animation: 'ring-rotate 18s linear infinite', boxShadow: '0 0 12px rgba(0,148,68,0.6)',
              }} />

              {/* Logo */}
              <div style={{
                width: 180, height: 180, borderRadius: 32, border: '2px solid rgba(210,35,42,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden', background: 'rgba(14,20,40,0.8)',
                animation: 'pulse-glow 2.5s ease-in-out infinite',
                boxShadow: '0 0 50px rgba(210,35,42,0.2), 0 0 100px rgba(210,35,42,0.08)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(210,35,42,0.15), rgba(0,148,68,0.15))',
                }} />
                <img src="/IDEALab.png" alt="IDEA Lab" style={{ position: 'relative', width: 110, height: 110, objectFit: 'contain' }} />
              </div>
            </div>

            {/* Brand text */}
            <p style={{
              fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: 48,
              letterSpacing: '-0.03em', color: '#f0f4f8', marginTop: 36, textAlign: 'center',
            }}>
              IDEA Lab <span style={{ color: '#D2232A' }}>@ KEC</span>
            </p>

            <p style={{
              fontSize: 15, color: '#94a3b8', fontFamily: 'var(--font-mono), monospace',
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
              width: 300, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.06)',
              marginTop: 44, overflow: 'hidden', position: 'relative',
            }}>
              <div style={{
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, #D2232A, #F9A01B, #009444)',
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 1s ease infinite, loading-fill 1.8s ease-out forwards',
              }} />
            </div>

            {/* Status text */}
            <p style={{
              fontSize: 10, color: '#64748b', fontFamily: 'var(--font-mono), monospace',
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
