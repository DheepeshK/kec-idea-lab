export const metadata = {
  title: 'Team | AICTE IDEA Lab @ KEC',
  description:
    'The dedicated faculty coordinators, expert technical mentors, and passionate student leaders driving the AICTE IDEA Lab at Kongu Engineering College.',
};

import ScrollReveal from '@/components/motion/ScrollReveal';
import TeamMemberImage from '@/components/team/TeamMemberImage';
import { Mail, Shield, Cpu, Award, Zap, Code, Users } from 'lucide-react';
import { getAll } from '@/lib/store';

// Cache the public page briefly instead of rebuilding it for every visitor.
export const revalidate = 60;

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
    socials: { linkedin: 'https://linkedin.com' },
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
    socials: { linkedin: 'https://linkedin.com' },
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
    email: 'rajkumarr.eie@kongu.edu',
    socials: { linkedin: 'https://linkedin.com' },
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
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
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
    socials: { linkedin: 'https://linkedin.com' },
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
    socials: { github: 'https://github.com' },
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
    socials: { linkedin: 'https://linkedin.com' },
  },
  // 5. Student Ambassadors (5)
  {
    _id: 'fallback-amb-1',
    name: 'Dheepesh K',
    role: 'Chairman',
    group: 'Student Ambassadors',
    focusArea: '',
    photoUrl: '',
    designation: 'II - Year, Department of Mechatronics Engineering',
    order: 8,
    email: 'dheepeshk.25mts@kongu.edu',
  },
  {
    _id: 'fallback-amb-2',
    name: 'Prithisha P S',
    role: 'Co-Chairman',
    group: 'Student Ambassadors',
    focusArea: '',
    photoUrl: '',
    designation: 'II - Year, Department of Computer Science & Design',
    order: 9,
    email: 'prithishaps.25csd@kongu.edu',
  },
  {
    _id: 'fallback-amb-3',
    name: 'Eniya A',
    role: 'Treasurer',
    group: 'Student Ambassadors',
    focusArea: '',
    photoUrl: '',
    designation: 'II - Year, Department of Electronics & Communication Engineering',
    order: 10,
    email: 'eniyaa.25ece@kongu.edu',
  },
  {
    _id: 'fallback-amb-4',
    name: 'Ranjani',
    role: 'Joint Treasurer',
    group: 'Student Ambassadors',
    focusArea: '',
    photoUrl: '',
    designation: 'II - Year, Department of Computer Science & Engineering',
    order: 11,
    email: 'ranjani.25cse@kongu.edu',
  },
  {
    _id: 'fallback-amb-5',
    name: 'Atitya Ram S',
    role: 'Co-ordinator',
    group: 'Student Ambassadors',
    focusArea: '',
    photoUrl: '',
    designation: 'III - Year, Department of Computer Science & Engineering',
    order: 12,
    email: 'atityarams.25cse@kongu.edu',
  },
];

export default async function TeamPage() {
  const dbTeam = getAll<DBTeamMember>('team', (a, b) => a.order - b.order);
  const teamList = dbTeam.length > 0 ? dbTeam : fallbackTeam;

  const finalGrouped: { [key: string]: DBTeamMember[] } = {
    'Faculty Leadership': [],
    'Implementation team: Tech gurus': [],
    'Student Ambassadors': [],
    Faculty: [],
    Mentor: [],
    Student: [],
  };

  for (const member of teamList) {
    const g = member.group || '';
    const r = member.role || '';
    if (
      g === 'Chief Mentor' ||
      g === 'Coordinator' ||
      g === 'Co-ordinator' ||
      g === 'Faculty Leadership' ||
      g === 'Leadership' ||
      (!g.includes('Student') &&
        (r.includes('Chief Mentor') ||
          r.includes('Coordinator') ||
          r.includes('Co-ordinator') ||
          r.includes('Co-coordinator')))
    ) {
      finalGrouped['Faculty Leadership'].push({ ...member });
    } else if (finalGrouped[g]) {
      finalGrouped[g].push({ ...member });
    } else {
      if (!finalGrouped[g]) finalGrouped[g] = [];
      finalGrouped[g].push({ ...member });
    }
  }

  // Helper config for visual headers
  const sectionMeta: { [key: string]: { label: string; sub: string; icon: any; maxCount: number } } = {
    'Faculty Leadership': {
      label: 'Laboratory Leadership',
      sub: 'Providing visionary guidance and administrative coordination directing the IDEA Lab',
      icon: Award,
      maxCount: 3,
    },
    'Implementation team: Tech gurus': {
      label: 'Implementation Team: Tech Gurus',
      sub: 'Industry-grade technical experts managing lab machinery',
      icon: Zap,
      maxCount: 4,
    },
    'Student Ambassadors': {
      label: 'Student Ambassadors',
      sub: 'Student leadership driving innovation, coordination, and lab activities',
      icon: Code,
      maxCount: 5,
    },
  };

  const iconColorMap: Record<string, string> = {
    'Faculty Leadership': 'text-accent',
    'Chief Mentor': 'text-accent',
    Coordinator: 'text-accent-2',
    'Co-ordinator': 'text-accent-3',
    'Implementation team: Tech gurus': 'text-brand-navy',
    'Student Ambassadors': 'text-brand-red',
  };

  const borderColorMap: Record<string, string> = {
    'Faculty Leadership': 'hover:border-accent/30',
    'Chief Mentor': 'hover:border-accent/30',
    Coordinator: 'hover:border-accent-2/30',
    'Co-ordinator': 'hover:border-accent-3/30',
    'Implementation team: Tech gurus': 'hover:border-brand-navy/30',
    'Student Ambassadors': 'hover:border-brand-red/30',
  };

  const knownGroups = Object.keys(sectionMeta);

  const sectionsOrder = [
    ...knownGroups,
    ...Object.keys(finalGrouped).filter((group) => finalGrouped[group].length > 0 && !knownGroups.includes(group)),
  ];

  const getMeta = (group: string) =>
    sectionMeta[group] || {
      label: group,
      sub: 'Contributing to the IDEA Lab ecosystem',
      icon: Users,
      maxCount: 0,
    };

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
              Pillars of Innovation
            </span>
            <h1 className="">Meet the AICTE KEC IDEA Lab Team</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.08}>
            <p className="body-text max-w-lg mx-auto">
              The dedicated faculty coordinators, expert technical mentors, and passionate student leaders driving the
              AICTE IDEA Lab at Kongu Engineering College.
            </p>
          </ScrollReveal>

          {/* Affiliation logos */}
          <ScrollReveal direction="up" delay={0.14}>
            <div className="flex items-center justify-center gap-6 pt-2 flex-wrap">
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
            const meta = getMeta(sectionKey);
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
                {sectionKey === 'Faculty Leadership' ? (
                  (() => {
                    // Tier function mapping Leadership roles:
                    // 1. Chief Mentor -> Tier 1 (1 card centered)
                    // 2. Coordinator & 2. Co-coordinator -> Tier 2 (2 cards side-by-side)
                    const getLeadershipRank = (m: DBTeamMember) => {
                      const r = (m.role || '').toLowerCase();
                      const g = (m.group || '').toLowerCase();
                      if (r.includes('chief mentor') || g.includes('chief mentor')) {
                        return { tier: 1, priority: 1 };
                      }
                      if (
                        r.includes('co-ordinator') ||
                        r.includes('co-coordinator') ||
                        r.includes('cocoordinator') ||
                        g.includes('co-ordinator')
                      ) {
                        return { tier: 2, priority: 2 };
                      }
                      if (r.includes('coordinator') || g.includes('coordinator')) {
                        return { tier: 2, priority: 1 };
                      }
                      if (m.order === 1) return { tier: 1, priority: 1 };
                      if (m.order === 2) return { tier: 2, priority: 1 };
                      return { tier: 2, priority: 2 };
                    };

                    const tier1 = list.filter((m) => getLeadershipRank(m).tier === 1);
                    const tier2 = list
                      .filter((m) => getLeadershipRank(m).tier === 2)
                      .sort(
                        (a, b) => getLeadershipRank(a).priority - getLeadershipRank(b).priority || a.order - b.order,
                      );

                    const cardBorder = borderColorMap[sectionKey] || 'hover:border-accent/20';

                    const renderLeadershipCard = (member: DBTeamMember, idx: number, isFeatured = false) => {
                      const avatarUrl = member.photoUrl || member.image;
                      return (
                        <ScrollReveal key={member._id || `${member.name}-${idx}`} direction="up" delay={idx * 0.05}>
                          <div
                            className={`bg-bg-elevated/30 border border-border/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 ${
                              isFeatured ? 'border-accent/30 shadow-md shadow-accent/5' : ''
                            }`}
                          >
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/30 transition-colors shadow-lg shadow-black/15">
                              <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-accent text-xs font-semibold">{member.role}</p>
                              {member.designation && (
                                <p className="text-text-secondary text-[11px]">{member.designation}</p>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-[11px] text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1 transition-colors pt-1"
                                >
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate max-w-[180px]" title={member.email}>
                                    {member.email}
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    };

                    return (
                      <div className="space-y-6">
                        {/* 1. Chief Mentor (Tier 1: Aligned Centered / 1 Card) */}
                        {tier1.length > 0 && (
                          <div className="flex justify-center w-full">
                            <div className="w-full max-w-xl">
                              {tier1.map((m, i) => renderLeadershipCard(m, i, true))}
                            </div>
                          </div>
                        )}

                        {/* 2. Coordinator & 2. Co-coordinator (Tier 2: 2 Cards Side-by-Side) */}
                        {tier2.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                            {tier2.map((m, i) => renderLeadershipCard(m, i))}
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : sectionKey === 'Student Ambassadors' ? (
                  (() => {
                    // Tier function mapping the positions:
                    // 1. Chairman -> Tier 1
                    // 2. Co-Chairman, 2. Treasurer -> Tier 2
                    // 3. Joint Treasurer, 3. Co-ordinator -> Tier 3
                    const getRank = (m: DBTeamMember) => {
                      const r = (m.role || '').toLowerCase();
                      if (r.includes('co-chairman') || r.includes('co chairman') || r.includes('vice chairman')) {
                        return { tier: 2, priority: 1 };
                      }
                      if (
                        r.includes('joint treasurer') ||
                        r.includes('joint-treasurer') ||
                        r.includes('assistant treasurer') ||
                        r.includes('asst treasurer')
                      ) {
                        return { tier: 3, priority: 1 };
                      }
                      if (r.includes('treasurer')) {
                        return { tier: 2, priority: 2 };
                      }
                      if (r.includes('chairman') || r.includes('chairperson')) {
                        return { tier: 1, priority: 1 };
                      }
                      if (r.includes('coordinator') || r.includes('co-ordinator')) {
                        return { tier: 3, priority: 2 };
                      }
                      if (m.order === 1) return { tier: 1, priority: 1 };
                      if (m.order === 2) return { tier: 2, priority: 1 };
                      if (m.order === 3) return { tier: 2, priority: 2 };
                      if (m.order === 4) return { tier: 3, priority: 1 };
                      return { tier: 3, priority: 2 };
                    };

                    const tier1 = list.filter((m) => getRank(m).tier === 1);
                    const tier2 = list
                      .filter((m) => getRank(m).tier === 2)
                      .sort((a, b) => getRank(a).priority - getRank(b).priority || a.order - b.order);
                    const tier3 = list
                      .filter((m) => getRank(m).tier === 3)
                      .sort((a, b) => getRank(a).priority - getRank(b).priority || a.order - b.order);

                    const cardBorder = borderColorMap[sectionKey] || 'hover:border-accent/20';

                    const renderAmbassadorCard = (member: DBTeamMember, idx: number, isFeatured = false) => {
                      const avatarUrl = member.photoUrl || member.image;
                      return (
                        <ScrollReveal key={member._id || `${member.name}-${idx}`} direction="up" delay={idx * 0.05}>
                          <div
                            className={`bg-bg-elevated/30 border border-border/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 ${
                              isFeatured ? 'border-accent/30 shadow-md shadow-accent/5' : ''
                            }`}
                          >
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/30 transition-colors shadow-lg shadow-black/15">
                              <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-accent text-xs font-semibold">{member.role}</p>
                              {member.designation && (
                                <p className="text-text-secondary text-[11px]">{member.designation}</p>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-[11px] text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1 transition-colors pt-1"
                                >
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate max-w-[180px]" title={member.email}>
                                    {member.email}
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    };

                    return (
                      <div className="space-y-6">
                        {/* 1. Chairman (Tier 1: Aligned Centered / 1 Card) */}
                        {tier1.length > 0 && (
                          <div className="flex justify-center w-full">
                            <div className="w-full max-w-xl">
                              {tier1.map((m, i) => renderAmbassadorCard(m, i, true))}
                            </div>
                          </div>
                        )}

                        {/* 2. Co-Chairman & 2. Treasurer (Tier 2: 2 Cards Side-by-Side) */}
                        {tier2.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                            {tier2.map((m, i) => renderAmbassadorCard(m, i))}
                          </div>
                        )}

                        {/* 3. Joint Treasurer & 3. Co-ordinator (Tier 3: 2 Cards Side-by-Side) */}
                        {tier3.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                            {tier3.map((m, i) => renderAmbassadorCard(m, i))}
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className={`grid ${isSingle ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-5`}>
                    {list.map((member, idx) => {
                      const avatarUrl = member.photoUrl || member.image;
                      const cardBorder = borderColorMap[sectionKey] || 'hover:border-accent/20';

                      if (isSingle) {
                        return (
                          <ScrollReveal key={member._id} direction="up" delay={0.05}>
                            <div
                              className={`bg-bg-elevated/30 border border-border/60 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300`}
                            >
                              <div className="relative h-32 w-32 sm:h-48 sm:w-48 rounded-2xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/40 transition-colors shadow-xl shadow-black/25">
                                <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                              </div>
                              <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                                  {member.name}
                                </h3>
                                <p className="text-accent text-sm font-semibold">{member.role}</p>
                                {member.designation && (
                                  <p className="text-text-secondary text-xs">{member.designation}</p>
                                )}
                                {member.email && (
                                  <a
                                    href={`mailto:${member.email}`}
                                    className="text-xs text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1.5 transition-colors pt-1"
                                  >
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
                          <div
                            className={`bg-bg-elevated/30 border border-border/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left group ${cardBorder} hover:bg-bg-elevated/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300`}
                          >
                            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden shrink-0 border-2 border-border/60 group-hover:border-accent/30 transition-colors shadow-lg shadow-black/15">
                              <TeamMemberImage src={avatarUrl || ''} name={member.name} />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-accent text-xs font-semibold">{member.role}</p>
                              {member.designation && (
                                <p className="text-text-secondary text-[11px]">{member.designation}</p>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-[11px] text-text-secondary hover:text-accent font-mono inline-flex items-center gap-1 transition-colors pt-1"
                                >
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate max-w-[180px]" title={member.email}>
                                    {member.email}
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
