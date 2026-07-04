'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]" style={{ height: 4 }}>
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, #D2232A, #F9A01B, #009444, #D2232A)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 1s ease infinite',
          boxShadow: '0 0 8px rgba(210,35,42,0.6), 0 0 16px rgba(210,35,42,0.3)',
        }}
      />
    </div>
  );
}
