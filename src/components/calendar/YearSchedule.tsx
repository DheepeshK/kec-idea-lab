'use client';

const YEAR = new Date().getFullYear();
const START_YEAR = YEAR;
const END_YEAR = YEAR + 1;

interface ScheduleRow {
  quarter: string;
  month: string;
  event: string;
  focus: string;
  participation: string;
}

const rows: ScheduleRow[] = [
  { quarter: 'Q1', month: 'June', event: 'Lab Inauguration & Orientation', focus: 'Lab induction, safety training', participation: 'All students & faculty' },
  { quarter: 'Q1', month: 'June', event: 'Summer Bootcamp — CAD/CAM', focus: '3D modelling, simulation, CAM', participation: 'Selected student teams' },
  { quarter: 'Q1', month: 'July', event: 'National Hackathon Qualifier', focus: 'Problem-solving, prototyping', participation: 'Open teams' },
  { quarter: 'Q1', month: 'July', event: 'Open Lab Day', focus: 'Self-guided project work', participation: 'All students & faculty' },
  { quarter: 'Q1', month: 'August', event: 'PCB Design Hackathon', focus: 'Schematic design, layout routing', participation: 'ECE/EEE/MCT students' },
  { quarter: 'Q1', month: 'August', event: 'Student Project Exhibition', focus: 'Project display, judging', participation: 'All student teams' },
  { quarter: 'Q2', month: 'September', event: 'Innovation Ideathon', focus: 'Ideation, business model canvas', participation: 'All students' },
  { quarter: 'Q2', month: 'September', event: 'Laser Cutting & Engraving Workshop', focus: 'Advanced engraving, material settings', participation: 'All students' },
  { quarter: 'Q2', month: 'October', event: 'Robotics Challenge', focus: 'Autonomous navigation, manipulation', participation: 'MCT/Mechanical/ECE teams' },
  { quarter: 'Q2', month: 'October', event: 'Open Lab Day', focus: 'Self-guided project work', participation: 'All students & faculty' },
  { quarter: 'Q2', month: 'November', event: 'Annual Tech Symposium', focus: 'Technical papers, project demos', participation: 'All students' },
  { quarter: 'Q2', month: 'November', event: 'Advanced CNC & Fabrication Workshop', focus: 'Multi-axis machining, finishing', participation: 'MCT/Mechanical students' },
  { quarter: 'Q3', month: 'December', event: 'Year-End Project Showcase', focus: 'Final project presentations', participation: 'All student teams' },
  { quarter: 'Q3', month: 'December', event: 'Open Lab Day & Demo Session', focus: 'Live demos, feedback', participation: 'All students & faculty' },
  { quarter: 'Q3', month: 'January', event: '3D Printing Basics Workshop', focus: 'FDM printing, slicing software', participation: 'UG/PG students' },
  { quarter: 'Q3', month: 'January', event: 'Lab Reorientation Program', focus: 'Refresher training, safety update', participation: 'All students' },
  { quarter: 'Q3', month: 'February', event: 'PCB Design & Fabrication Workshop', focus: 'Circuit design, etching, soldering', participation: 'ECE/EEE students' },
  { quarter: 'Q3', month: 'February', event: 'Laser Cutting Certification', focus: 'Laser operation, material compatibility', participation: 'All students' },
  { quarter: 'Q4', month: 'March', event: 'Idea Pitching Session', focus: 'Innovation ideation, presentation', participation: 'Student teams' },
  { quarter: 'Q4', month: 'March', event: 'CNC Routing Masterclass', focus: 'CNC operation, toolpath generation', participation: 'Mechatronics/Mechanical students' },
  { quarter: 'Q4', month: 'March', event: 'Open Lab Day', focus: 'Self-guided project work', participation: 'All students & faculty' },
  { quarter: 'Q4', month: 'April', event: 'Embedded Systems Hackathon', focus: 'Microcontroller programming, sensors', participation: 'ECE/EEE/MCT students' },
  { quarter: 'Q4', month: 'April', event: 'Advanced 3D Printing Workshop', focus: 'Multi-material printing, post-processing', participation: 'UG/PG students' },
  { quarter: 'Q4', month: 'May', event: 'Summer Bootcamp — Robotics', focus: 'Robot kinematics, control systems', participation: 'Selected student teams' },
  { quarter: 'Q4', month: 'May', event: 'Summer Bootcamp — IoT', focus: 'Sensor integration, cloud connectivity', participation: 'Selected student teams' },
];

function mergeSpans(data: ScheduleRow[]) {
  const result: { row: ScheduleRow; quarterSpan: number; monthSpan: number }[] = [];
  const qGroups: { q: string; months: { m: string; count: number }[] }[] = [];

  for (const r of data) {
    let qg = qGroups.find(g => g.q === r.quarter);
    if (!qg) { qg = { q: r.quarter, months: [] }; qGroups.push(qg); }
    let mg = qg.months.find(m => m.m === r.month);
    if (!mg) { mg = { m: r.month, count: 0 }; qg.months.push(mg); }
    mg.count++;
  }

  let idx = 0;
  for (const qg of qGroups) {
    const qTotal = qg.months.reduce((s, m) => s + m.count, 0);
    let qFirst = true;
    for (const mg of qg.months) {
      let mFirst = true;
      for (let i = 0; i < mg.count; i++) {
        result.push({
          row: data[idx++],
          quarterSpan: qFirst ? qTotal : 0,
          monthSpan: mFirst ? mg.count : 0,
        });
        qFirst = false; mFirst = false;
      }
    }
  }
  return result;
}

const quarterTheme: Record<string, { color: string; rowBg: string; label: string }> = {
  Q1: { color: '#D2232A', rowBg: 'rgba(210,35,42,0.07)', label: 'Quarter 1' },
  Q2: { color: '#F9A01B', rowBg: 'rgba(249,160,27,0.07)', label: 'Quarter 2' },
  Q3: { color: '#0B4C8C', rowBg: 'rgba(11,76,140,0.07)', label: 'Quarter 3' },
  Q4: { color: '#009444', rowBg: 'rgba(0,148,68,0.07)', label: 'Quarter 4' },
};

export default function YearSchedule() {
  const grouped = mergeSpans(rows);

  return (
    <div className="overflow-x-auto rounded-xl border-2 border-border bg-bg shadow-xl">
      <div className="text-center py-6 px-6 border-b-2 border-border bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
        <span className="text-sm font-mono font-bold text-accent uppercase tracking-[0.2em]">Academic Year {START_YEAR} &ndash; {END_YEAR}</span>
        <p className="text-text-secondary text-xs mt-1.5">Tentative annual schedule &mdash; subject to revision</p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-5 py-4 text-[11px] font-mono font-bold text-text-secondary uppercase tracking-widest w-24 bg-bg-elevated border-b-2 border-border">Quarter</th>
            <th className="px-5 py-4 text-[11px] font-mono font-bold text-text-secondary uppercase tracking-widest w-28 bg-bg-elevated border-b-2 border-border">Month</th>
            <th className="px-5 py-4 text-[11px] font-mono font-bold text-text-secondary uppercase tracking-widest bg-bg-elevated border-b-2 border-border">Event Name</th>
            <th className="px-5 py-4 text-[11px] font-mono font-bold text-text-secondary uppercase tracking-widest hidden sm:table-cell bg-bg-elevated border-b-2 border-border">Focus</th>
            <th className="px-5 py-4 text-[11px] font-mono font-bold text-text-secondary uppercase tracking-widest hidden md:table-cell bg-bg-elevated border-b-2 border-border">Participation By</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((g, i) => {
            const qt = quarterTheme[g.row.quarter] || quarterTheme.Q1;

            return (
              <tr
                key={i}
                className="transition-all hover:brightness-110"
                style={{ backgroundColor: qt.rowBg }}
              >
                {g.quarterSpan > 0 && (
                  <td
                    rowSpan={g.quarterSpan}
                    className="px-5 py-4 align-middle border-r-2 border-white/10"
                    style={{ backgroundColor: qt.color + '22' }}
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shadow-md shadow-black/20"
                        style={{ backgroundColor: qt.color }}
                      >
                        <span className="text-sm font-mono font-bold text-white">{g.row.quarter}</span>
                      </div>
                    </div>
                  </td>
                )}
                {g.monthSpan > 0 && (
                  <td
                    rowSpan={g.monthSpan}
                    className="px-5 py-4 align-middle border-r border-white/10 font-mono text-xs font-bold"
                    style={{ color: qt.color }}
                  >
                    {g.row.month}
                  </td>
                )}
                <td className="px-5 py-3.5 border-b border-white/5">
                  <span className="text-xs sm:text-sm font-semibold text-text">{g.row.event}</span>
                </td>
                <td className="px-5 py-3.5 border-b border-white/5 hidden sm:table-cell">
                  <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">{g.row.focus}</span>
                </td>
                <td className="px-5 py-3.5 border-b border-white/5 hidden md:table-cell">
                  <span className="text-xs sm:text-sm font-mono font-semibold" style={{ color: qt.color }}>{g.row.participation}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t-2 border-border px-6 py-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
        <p className="text-xs text-text-secondary/50 font-mono text-center">
          * Schedule is tentative and subject to revision. Registered participants will be notified of changes.
        </p>
      </div>
    </div>
  );
}
