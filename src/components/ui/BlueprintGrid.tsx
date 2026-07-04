import React from "react";

export default function BlueprintGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" id="blueprint-grid-container">
      {/* Engineering blueprint grid */}
      <svg
        className="absolute inset-0 h-full w-full stroke-border/20 [mask-image:radial-gradient(100%_100%_at_50%_30%,white_20%,transparent_80%)]"
        aria-hidden="true"
        id="blueprint-grid-svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="-1"
          >
            <path d="M.5 48V.5H48" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
      </svg>

      {/* Lab Blueprint HUD aesthetic details */}
      <div className="absolute inset-0 max-w-[1280px] mx-auto px-6 h-full relative">
        <div className="absolute top-8 left-6 label text-accent/20 select-none hidden lg:block">
          SYS_REF: KEC-IDEA-LAB // GRID_48PX // TOLERANCE_±0.05MM
        </div>
        <div className="absolute top-8 right-6 label text-accent-2/20 select-none hidden lg:block">
          [ DEPT_FABRICATION // COORD_11.16N_77.60E ]
        </div>
      </div>
    </div>
  );
}
