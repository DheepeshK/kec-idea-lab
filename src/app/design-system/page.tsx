"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Check, Activity, ShieldAlert, Cpu } from "lucide-react";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import Button from "@/components/ui/Button";

export default function DesignSystemPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center font-mono text-sm">
        INITIALIZING LAB WORKSPACE...
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const colors = [
    { name: "Background (bg)", varName: "var(--bg)", class: "bg-bg", textClass: "text-text", desc: "Primary canvas color" },
    { name: "Bg Elevated", varName: "var(--bg-elevated)", class: "bg-bg-elevated", textClass: "text-text", desc: "Card and panel background" },
    { name: "Text (Primary)", varName: "var(--text)", class: "bg-text", textClass: "bg-bg text-bg", desc: "Main body and headings" },
    { name: "Text (Secondary)", varName: "var(--text-secondary)", class: "bg-text-secondary", textClass: "bg-bg text-bg", desc: "Captions, labels, and metadata" },
    { name: "Border", varName: "var(--border)", class: "bg-border", textClass: "text-text", desc: "1px hairlines, grids, and dividers" },
    { name: "Accent (Red/Blue)", varName: "var(--accent)", class: "bg-accent", textClass: "text-white", desc: "Primary focus and call-to-actions" },
    { name: "Accent-2 (Amber/Red)", varName: "var(--accent-2)", class: "bg-accent-2", textClass: "text-bg", desc: "Secondary accent and highlights" },
    { name: "Warn (Orange)", varName: "var(--warn)", class: "bg-warn", textClass: "text-white", desc: "Alerts, deadlines, and warnings" },
  ];

  return (
    <div className="relative min-h-screen bg-bg text-text transition-colors duration-150 overflow-hidden" id="design-system-page">
      {/* Blueprint background for visualization */}
      <BlueprintGrid />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-20 relative z-10" id="design-system-main">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-8" id="design-system-header">
          <div className="space-y-3">
            <div className="flex items-center gap-2 label text-accent leading-none">
              <Cpu className="h-4 w-4" /> IEF @ KEC Innovation Workspace
            </div>
            <h1 className="text-h1 font-display font-bold tracking-tight text-text">
              IDEA Lab Design System
            </h1>
            <p className="text-body text-text-secondary max-w-2xl">
              An engineering-forward, clean design language engineered for hardware developers, faculty, and industry visitors. Built with full fluid scales and high-fidelity contrast values.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-text-secondary block">ACTIVE ENVIRONMENT</span>
              <span className="text-xs font-mono text-accent-2 font-bold uppercase block">
                {theme === "dark" ? "● DARK MODE" : "○ LIGHT MODE"}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="gap-2 border-border bg-bg-elevated text-text hover:bg-border/20"
              id="theme-toggle-btn"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 text-warn" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-accent" />
                  <span>Switch to Dark</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 1. Typography Swatches */}
        <section className="space-y-8" id="typography-section">
          <div className="space-y-1">
            <h2 className="stat-value">01 // Typography Suite</h2>
            <p className="text-sm text-text-secondary">Demonstrating fluid clamp() sizes and intentional font pairing.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border border-border bg-bg-elevated/40 p-8 rounded-xl backdrop-blur-sm">
            {/* Display Font */}
            <div className="lg:col-span-4 space-y-4">
              <span className="label text-accent block border-b border-border pb-2">
                Font Display // Space Grotesk
              </span>
              <div className="space-y-1">
                <p className="font-display text-4xl font-bold">Space Grotesk</p>
                <p className="text-xs text-text-secondary font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Used primarily for large hero headlines, section headers, and call-to-actions. Conveys a modern, structured, and high-tech digital fabrication aesthetic.
              </p>
            </div>

            {/* Sans Font */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest block border-b border-border pb-2">
                Font Sans // Inter
              </span>
              <div className="space-y-1">
                <p className="font-sans text-4xl font-bold">Inter Sans</p>
                <p className="text-xs text-text-secondary font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                The primary font used for all body text, paragraph layout, forms, labels, and general UI interactions. Prioritizes legibility, clean spacing, and structural geometry.
              </p>
            </div>

            {/* Mono Font */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest block border-b border-border pb-2">
                Font Mono // JetBrains Mono
              </span>
              <div className="space-y-1">
                <p className="font-mono text-4xl font-bold">JetBrains Mono</p>
                <p className="text-xs text-text-secondary font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Reserved exclusively for laboratory readouts, equipment model numbers, tolerance specifications (e.g. ±0.05mm), real-time status grids, and precise logs.
              </p>
            </div>
          </div>

          {/* Fluid Scale Showcase */}
          <div className="space-y-6 border border-border bg-bg-elevated/20 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xs font-mono text-text-secondary uppercase tracking-wider">Fluid Scale (clamp) Showcase</h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-4 space-y-1">
                <span className="text-[10px] font-mono text-text-secondary uppercase">text-h1 (H1 Headings)</span>
                <h1 className="text-h1 font-display font-bold text-text">
                  Establish Innovation
                </h1>
              </div>

              <div className="border-l-2 border-accent pl-4 space-y-1">
                <span className="text-[10px] font-mono text-text-secondary uppercase">text-h2 (H2 Headings)</span>
                <h2 className="text-h2 font-display font-bold text-text">
                  Rapid Physical Prototyping
                </h2>
              </div>

              <div className="border-l-2 border-accent pl-4 space-y-1">
                <span className="text-[10px] font-mono text-text-secondary uppercase">text-body (Primary Body Text)</span>
                <p className="text-body font-sans text-text-secondary max-w-3xl">
                  Our lab accelerates creative ideas into high-fidelity functional models. Utilizing top-tier hardware setups from CNC routers to industrial laser engravers, we support active entrepreneurial students and research partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Color Swatches */}
        <section className="space-y-8" id="colors-section">
          <div className="space-y-1">
            <h2 className="stat-value">02 // Color Architecture</h2>
            <p className="text-sm text-text-secondary">Fully mapped CSS variables and custom Tailwind theme utility classes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((color, index) => (
              <div
                key={index}
                className="border border-border bg-bg-elevated/40 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className={`h-28 w-full ${color.class} flex items-end p-4`} id={`swatch-${index}`}>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${color.textClass}`}>
                    {color.varName}
                  </span>
                </div>
                <div className="p-4 space-y-1 bg-bg-elevated/90 border-t border-border">
                  <h3 className="text-sm font-display font-bold text-text">{color.name}</h3>
                  <p className="text-xs text-text-secondary leading-normal">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Component & Structure Presets */}
        <section className="space-y-8" id="components-section">
          <div className="space-y-1">
            <h2 className="stat-value">03 // Interactive Components & Hairlines</h2>
            <p className="text-sm text-text-secondary">Checking interactive feedback loops, 1px hair borders, and action styles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card & Hairline Border check */}
            <div className="border border-border bg-bg-elevated/60 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-text-secondary uppercase">CARD HAIR LINE</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-accent-2/10 text-accent-2 border border-accent-2/20">
                  SECURE
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-text">Precision Laser Cutter</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Operating with CO2 tube power, capable of 0.01mm positioning precision across wood, acrylics, and heavy polymers.
              </p>
              <div className="border-t border-border pt-4 flex items-center justify-between text-[10px] font-mono text-text-secondary">
                <span>TOLERANCE: ±0.01mm</span>
                <span className="text-accent">ONLINE</span>
              </div>
            </div>

            {/* State Badges & Interactive feedback */}
            <div className="border border-border bg-bg-elevated/60 p-6 rounded-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-text-secondary uppercase block">BADGES & NOTIFICATIONS</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent/10 text-accent border border-accent/20">
                    <Activity className="h-3 w-3" /> Bootcamps
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent-2/10 text-accent-2 border border-accent-2/20">
                    <Check className="h-3 w-3" /> Ready
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-warn/10 text-warn border border-warn/20">
                    <ShieldAlert className="h-3 w-3" /> Attention
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-text-secondary uppercase block">SYSTEM STATUS FEED</span>
                <div className="bg-bg border border-border p-3 rounded-lg font-mono text-[10px] text-accent-2 space-y-1">
                  <div>&gt; CONNECTING SECURE SENSOR GRID...</div>
                  <div className="text-text-secondary">&gt; ALL SENSORS 100% OPERATIONAL</div>
                </div>
              </div>
            </div>

            {/* Action buttons list */}
            <div className="border border-border bg-bg-elevated/60 p-6 rounded-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-text-secondary uppercase block">BUTTON VARIANTS</span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Hover interactions must have clear background shifts and scaling feedback using standard Tailwind transitions.
                </p>
              </div>

              <div className="space-y-3">
                <Button variant="primary" fullWidth className="justify-center">
                  Primary Interaction
                </Button>
                <Button variant="outline" fullWidth className="justify-center border-border bg-bg-elevated hover:bg-border/30">
                  Outline Interaction
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
