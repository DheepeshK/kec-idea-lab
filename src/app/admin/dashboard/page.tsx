'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Wrench,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [counts, setCounts] = useState<{ equipment: number; team: number; events: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/equipment').then((r) => r.json()),
      fetch('/api/team').then((r) => r.json()),
      fetch('/api/events').then((r) => r.json()),
    ])
      .then(([eq, tm, ev]) => {
        setCounts({
          equipment: eq.success ? eq.data.length : 0,
          team: tm.success ? tm.data.length : 0,
          events: ev.success ? ev.data.length : 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleQuickNav = (href: string) => {
    router.push(href);
  };

  const dashboardStats = [
    {
      name: 'Total Machinery Assets',
      value: loading ? '...' : `${counts?.equipment ?? 0}`,
      desc: '3D printers, CNC units, laser cutters',
      href: '/admin/equipment',
      color: 'text-accent',
      icon: Wrench,
    },
    {
      name: 'Lab Mentors & Staff',
      value: loading ? '...' : `${counts?.team ?? 0}`,
      desc: 'Faculty coordinators & ambassadors',
      href: '/admin/team',
      color: 'text-accent-2',
      icon: Users,
    },
    {
      name: 'Scheduled Workshops',
      value: loading ? '...' : `${counts?.events ?? 0}`,
      desc: 'Bootcamps, safety training sessions',
      href: '/admin/events',
      color: 'text-accent-3',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Block */}
      <div className="bg-gradient-to-r from-accent/20 to-accent-3/10 border border-accent/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-gradient">
        <div className="space-y-2">
          <span className="text-[10px] bg-accent/10 text-accent font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Authenticated Superuser Active
          </span>
          <h1 className="stat-value">
            Welcome back, {session?.user?.name || 'Administrator'}!
          </h1>
          <p className="body-text text-xs sm:text-sm max-w-2xl">
            You are logged into the control console for AICTE-KEC Idea Lab. From here you can add or update laboratory equipment entries, schedule training workshops, and manage technical student ambassadors.
          </p>
        </div>
        <div className="shrink-0 bg-bg-elevated/80 p-3.5 border border-border rounded-xl flex flex-col items-center justify-center gap-2">
          <ShieldCheck className="h-8 w-8 text-accent animate-pulse" />
          <div className="flex items-center gap-1.5">
            {[
              { src: '/AICTE.png', alt: 'AICTE' },
              { src: '/KEC_new2.png', alt: 'KEC' },
              { src: '/IDEALab.png', alt: 'IDEA Lab' },
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div key={logo.alt} className="relative w-10 h-10 rounded overflow-hidden opacity-75 hover:opacity-100 transition-opacity bg-bg border border-border/20">
                <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain p-[2px]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid count stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-accent/10 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{stat.name}</span>
                  <div className="bg-bg p-2 border border-border rounded-lg text-text-secondary group-hover:text-text group-hover:bg-border/40 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <p className={`stat-value ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-text-secondary mt-1">{stat.desc}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border/40 mt-6">
                <button
                  onClick={() => handleQuickNav(stat.href)}
                  className="text-xs text-accent hover:text-text font-semibold flex items-center gap-1.5 transition-all duration-300 hover:gap-2"
                >
                  Configure Records <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick guide and safety policy reminder */}
      <Card className="bg-bg-elevated/40 border border-border p-6 space-y-4">
        <h3 className="font-bold text-text text-sm uppercase tracking-wider flex items-center gap-2">
          <Award className="h-4 w-4 text-warn" />
          General Operator Instructions
        </h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          When submitting new equipment assets, verify the corresponding location zone coordinates (e.g. 3D printing area, PCB bay, heavy equipment room) carefully. When creating a new student workshop, ensure you coordinate with Anna University and AICTE coordinators for scheduling conflicts.
        </p>
      </Card>
    </div>
  );
}

