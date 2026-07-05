export const metadata = {
  title: 'Team | AICTE IDEA Lab @ KEC',
  description: 'The dedicated faculty coordinators, expert technical mentors, and passionate student leaders driving the AICTE IDEA Lab at Kongu Engineering College.',
};

import ScrollReveal from '@/components/motion/ScrollReveal';
import TeamMemberImage from '@/components/team/TeamMemberImage';
import { Mail, Shield, Cpu, Award, Zap, Code } from 'lucide-react';
import { getAll } from '@/lib/store';

// Disable caching so we always pull fresh records from MongoDB
export const revalidate = 0;

interface DBTeamMember {
  _id: string;
  name: string;
  role: string;
  group: string;
  focusArea?: string;
  photoUrl?: string;
  image?: string; // fallback field
  order: number;
  email?: string;
  designation?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// Full 1 + 1 + 1 + 4 + 3 = 10 high-fidelity team fallback data matching exact group names
const fallbackTeam: DBTeamMember[] = [
  // 1. Chief Mentor (1)
  {
    _id: 'fallback-mentor-1',
    name: 'Dr. R. Parameshwaran',
    role: 'Chief Mentor, AICTE-IDEA Lab@KEC',
    group: 'Chief Mentor',
    focusArea: '',
    photoUrl: '/images/team/parameshwaran.webp',
    designation: 'Principal, Kongu Engineering College',
    order: 1,
    email: 'principal@kongu.ac.in',
    socials: { linkedin: 'https://linkedin.com' }
  },
  // 2. Coordinator (1)
  {
    _id: 'fallback-coord-1',
    name: 'Dr.S.Praveen Kumar',
    role: 'Co-ordinator, AICTE-IDEA Lab@KEC',
    group: 'Coordinator',
    focusArea: '',
    photoUrl: '/images/team/praveenkumar.webp',
    designation: 'Associate Professor, Dept. of Mechatronics Engineering',
    order: 2,
    email: 'praveen.kumar@kongu.edu',
    socials: { linkedin: 'https://linkedin.com' }
  },
  // 3. Co-ordinator (1)
  {
    _id: 'fallback-co-coord-1',
    name: 'Dr.R.Rajkumar',
    role: 'Co-Coordinator, AICTE-IDEA Lab@KEC',
    group: 'Co-ordinator',
    focusArea: '',
    photoUrl: '/images/team/rajkumar.webp',
    designation: 'Associate Professor, Dept. of Mechatronics',
    order: 3,
    email: 'mythili.mct@kongu.edu',
    socials: { linkedin: 'https://linkedin.com' }
  },
  // 4. Implementation team: Tech gurus (4)
  {
    _id: 'fallback-guru-1',
    name: 'Mr.T.Prabhu',
    role: 'Technical Guru',
    group: 'Implementation team: Tech gurus',
    focusArea: '',
    photoUrl: '/images/team/prabhu.webp',
    designation: 'CAD/CAM Specialist',
    order: 4,
    email: 'prabhu.eee@kongu.ac.in',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' }
  },
  {
    _id: 'fallback-guru-2',
    name: 'Mr.R.P.Karthik',
    role: 'Tech Guru',
    group: 'Implementation team: Tech gurus',
    focusArea: '',
    photoUrl: '/images/team/karthik.webp',
    designation: 'Additive Manufacturing Eng.',
    order: 5,
    email: 'karthik.ece@kongu.ac.in',
    socials: { linkedin: 'https://linkedin.com' }
  },
  {
    _id: 'fallback-guru-3',
    name: 'Mr.P.Gowsikraja',
    role: 'Tech Guru',
    group: 'Implementation team: Tech gurus',
    focusArea: '',
    photoUrl: '/images/team/gowsikraja.webp',
    designation: 'PCB Design Lead',
    order: 6,
    email: 'gowsikrajapcse@gmail.com',
    socials: { github: 'https://github.com' }
  },
  {
    _id: 'fallback-guru-4',
    name: 'Mr.R.Kamalakannan',
    role: 'Tech Guru',
    group: 'Implementation team: Tech gurus',
    focusArea: '',
    photoUrl: '/images/team/kamalakannan.webp',
    designation: 'Firmware Engineer',
    order: 7,
    email: 'kamalakannan.mech@kongu.ac.in',
    socials: { linkedin: 'https://linkedin.com' }
  },
  // 5. Student Ambassadors (3)
  {
    _id: 'fallback-amb-1',
    name: 'Adithya R',
    role: 'Lead Student Tech-Ambassador',
    group: 'Student Ambassadors',
    focusArea: 'Autonomous Robotics & Pneumatics Automation Systems',
    photoUrl: '/images/team/adithya.webp',
    designation: 'Final Year, Dept. of Mechatronics',
    order: 8,
    email: 'adithya.mct@kongu.edu',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' }
  },
  {
    _id: 'fallback-amb-2',
    name: 'Janani S',
    role: 'Student Tech-Ambassador',
    group: 'Student Ambassadors',
    focusArea: 'Embedded Linux, Custom PCB Design & Signal Integrity',
    photoUrl: '/images/team/janani.webp',
    designation: 'Pre-final Year, Dept. of ECE',
    order: 9,
    email: 'janani.ece@kongu.edu',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' }
  },
  {
    _id: 'fallback-amb-3',
    name: 'Karthik M',
    role: 'Student Tech-Ambassador',
    group: 'Student Ambassadors',
    focusArea: 'Generative AI Systems & Smart Smart-City Prototypes',
    photoUrl: '/images/team/mkarthik.webp',
    designation: 'Final Year, Dept. of Computer Science',
    order: 10,
    email: 'karthik.cse@kongu.edu',
    socials: { github: 'https://github.com' }
  }
];



export default async function TeamPage() {
  const dbTeam = getAll<DBTeamMember>('team', (a, b) => a.order - b.order);
  const teamList = dbTeam.length > 0 ? dbTeam : fallbackTeam;

  const finalGrouped: { [key: string]: DBTeamMember[] } = {
    'Chief Mentor': [],
    'Coordinator': [],
    'Co-ordinator': [],
    'Implementation team: Tech gurus': [],
    'Student Ambassadors': [],
    'Faculty': [],
    'Mentor': [],
    'Student': []
  };

  for (const member of teamList) {
    if (finalGrouped[member.group]) {
      finalGrouped[member.group].push({ ...member });
    }
  }



  // Helper config for visual headers
  const sectionMeta: { [key: string]: { label: string; sub: string; icon: any; maxCount: number } } = {
    'Chief Mentor': {
      label: 'Chief Mentor',
      sub: 'Providing visionary guidance and strategic leadership',
      icon: Award,
      maxCount: 1,
    },
    'Coordinator': {
      label: 'Coordinator',
      sub: 'Directing resource deployment and project alignment',
      icon: Shield,
      maxCount: 1,
    },
    'Co-ordinator': {
      label: 'Co-coordinator',
      sub: 'Supervising operations and scheduling execution',
      icon: Cpu,
      maxCount: 1,
    },
    'Implementation team: Tech gurus': {
      label: 'Implementation Team: Tech Gurus',
      sub: 'Industry-grade technical experts managing lab machinery',
      icon: Zap,
      maxCount: 4,
    },
    'Student Ambassadors': {
      label: 'Student Ambassadors',
      sub: 'Elite peer-mentors coordinating hackathons and active project designs',
      icon: Code,
      maxCount: 3,
    }
  };

  const iconColorMap: Record<string, string> = {
    'Chief Mentor': 'text-accent',
    'Coordinator': 'text-accent-2',
    'Co-ordinator': 'text-accent-3',
    'Implementation team: Tech gurus': 'text-brand-navy',
    'Student Ambassadors': 'text-brand-red',
  };

  const borderColorMap: Record<string, string> = {
    'Chief Mentor': 'hover:border-accent/30',
    'Coordinator': 'hover:border-accent-2/30',
    'Co-ordinator': 'hover:border-accent-3/30',
    'Implementation team: Tech gurus': 'hover:border-brand-navy/30',
    'Student Ambassadors': 'hover:border-brand-red/30',
  };

  const sectionsOrder = [
    'Chief Mentor',
    'Coordinator',
    'Co-ordinator',
    'Implementation team: Tech gurus',
    'Student Ambassadors'
  ];

  return (
    <div id="team-page-container" className="min-h-screen bg-bg text-text py-12 sm:py-16 relative overflow-hidden">
      {/* Brand-colored ambient blobs */}
      <div className="absolute top-[5%] left-[-8%] w-[400px] h-[400px] rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[300px] h-[300px] rounded-full bg-brand-navy/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-[350px] h-[350px] rounded-full bg-brand-green/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-8%] w-[300px] h-[300px] rounded-full bg-brand-amber/5 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal direction="up">
            <span className="text-[11px] text-accent font-bold uppercase tracking-[0.2em] block">
              Pillars of innovation
            </span>
            <h1 className="">
              Meet the KEC Idea Lab Team
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text max-w-lg mx-auto">
              The dedicated faculty coordinators, expert technical mentors, and passionate student leaders driving the AICTE IDEA Lab at Kongu Engineering College.
            </p>
          </ScrollReveal>

          {/* Affiliation logos */}
          <ScrollReveal direction="up" delay={0.14}>
            <div className="flex items-center justify-center gap-6 pt-2 flex-nowrap">
              {[
                { src: '/AICTE.png', alt: 'AICTE' },
                { src: '/KEC_new2.png', alt: 'KEC' },
                { src: '/IDEALab.png', alt: 'IDEA Lab' },
                { src: '/IIC.png', alt: 'IIC' },
                { src: '/EMDC.png', alt: 'EMDC' },
                { src: '/TBI.png', alt: 'TBI' },
              ].map((logo) => (
                <div key={logo.alt} className="relative h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sectionsOrder.map((sectionKey) => {
            const list = finalGrouped[sectionKey as keyof typeof finalGrouped] || [];
            const meta = sectionMeta[sectionKey];
            if (list.length === 0) return null;

            const SectionIcon = meta.icon;
            const isSingle = meta.maxCount === 1;

            return (
              <section key={sectionKey} className="space-y-4">
                {/* Section Header — compact */}
                <div className="flex items-center gap-3 border-b border-border/60 pb-2">
                  <div className={`p-1.5 rounded-lg ${iconColorMap[sectionKey] || 'text-accent'} bg-current/5`}>
                    <SectionIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-text">{meta.label}</h2>
                    <p className="text-[11px] text-text-secondary">{meta.sub}</p>
                  </div>
                </div>

                {/* Cards */}
                <div className={`grid ${
                  isSingle ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                } gap-5`}>
                  {list.map((member, idx) => {
                    const avatarUrl = member.photoUrl || member.image;
                    const cardBorder = borderColorMap[sectionKey] || 'hover:border-accent/20';

                    if (isSingle) {
                      return (
                        <ScrollReveal key={member._id} direction="up" delay={0.05}>
                          <div className={`bg-bg-elevated/30 border border-border/60 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300`}>
                            <div className="h-32 w-32 sm:h-48 sm:w-48 rounded-2xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/40 transition-colors shadow-xl shadow-black/25">
                              <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <h3 className="font-bold text-text group-hover:text-accent transition-colors">{member.name}</h3>
                              <p className="text-accent text-sm font-semibold">{member.role}</p>
                              {member.designation && (
                                <p className="text-text-secondary text-xs">{member.designation}</p>
                              )}
                              {member.email && (
                                <a href={`mailto:${member.email}`} className="text-xs text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1.5 transition-colors pt-1">
                                  <Mail className="h-3.5 w-3.5" />
                                  <span>{member.email}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    }

                    return (
                      <ScrollReveal key={member._id} direction="up" delay={idx * 0.05}>
                        <div className={`bg-bg-elevated/30 border border-border/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300`}>
                          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/30 transition-colors shadow-lg shadow-black/15">
                            <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <h3 className="font-bold text-text group-hover:text-accent transition-colors">{member.name}</h3>
                            <p className="text-accent text-xs font-semibold">{member.role}</p>
                            {member.designation && (
                              <p className="text-text-secondary text-[11px]">{member.designation}</p>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-[11px] text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1 transition-colors pt-1">
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[180px]">{member.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
