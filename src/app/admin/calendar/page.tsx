'use client';

import { useState, useCallback } from 'react';
import Card from '@/components/ui/Card';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import SearchInput from '@/components/ui/SearchInput';
import { SkeletonList } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { useAdminCrud } from '@/hooks/useAdminCrud';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { useCtrlSave } from '@/hooks/useCtrlSave';
import { Calendar, Edit, Trash2, X, ChevronUp, ChevronDown, Menu } from 'lucide-react';

interface CalendarEntry {
  _id: string;
  quarter: string;
  month: string;
  event: string;
  focus: string;
  participation: string;
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const MONTHS = ['June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'];
const Q_COLORS: Record<string, string> = { Q1: '#D2232A', Q2: '#F9A01B', Q3: '#0B4C8C', Q4: '#009444' };

export default function AdminCalendarPage() {
  const { data: entries, loading, deleteItem, refresh } = useAdminCrud<CalendarEntry>('/api/calendar', '/api/calendar');
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'quarter' | 'month' | 'event'>('quarter');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [cancelTarget, setCancelTarget] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [quarter, setQuarter] = useState('Q1');
  const [month, setMonth] = useState('June');
  const [event, setEvent] = useState('');
  const [focus, setFocus] = useState('');
  const [participation, setParticipation] = useState('');

  const formDirty = !!(event || focus || participation);

  useUnsavedChanges(formDirty && !!editingId);

  const resetForm = () => {
    setQuarter('Q1'); setMonth('June'); setEvent(''); setFocus(''); setParticipation('');
    setEditingId(null); setFormOpen(false);
  };

  const openEdit = (e: CalendarEntry) => {
    setQuarter(e.quarter); setMonth(e.month); setEvent(e.event); setFocus(e.focus); setParticipation(e.participation);
    setEditingId(e._id); setFormOpen(true);
  };

  const handleCancel = () => {
    if (formDirty && editingId) { setCancelTarget(true); return; }
    resetForm();
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!event.trim() || !focus.trim() || !participation.trim()) {
      toast('error', 'Event name, focus, and participation are required.');
      return;
    }

    const payload = { quarter, month, event: event.trim(), focus: focus.trim(), participation: participation.trim() };

    try {
      if (editingId) {
        const res = await fetch(`/api/calendar/${editingId}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });
        const d = await res.json();
        if (d.success) { toast('success', 'Calendar entry updated.'); refresh(); resetForm(); }
        else toast('error', d.error || 'Update failed.');
      } else {
        const res = await fetch('/api/calendar', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });
        const d = await res.json();
        if (d.success) { toast('success', 'Calendar entry added.'); refresh(); resetForm(); }
        else toast('error', d.error || 'Create failed.');
      }
    } catch {
      toast('error', 'Network error.');
    }
  }, [editingId, quarter, month, event, focus, participation, toast, refresh]);

  useCtrlSave(() => handleSubmit(), !!editingId || formDirty);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteItem(deleteTarget.id);
    toast('success', `"${deleteTarget.name}" deleted.`);
    refresh();
    setDeleteTarget(null);
  };

  const monthOrder = (m: string) => MONTHS.indexOf(m);

  const filtered = entries.filter(
    (e) =>
      e.event.toLowerCase().includes(search.toLowerCase()) ||
      e.focus.toLowerCase().includes(search.toLowerCase()) ||
      e.participation.toLowerCase().includes(search.toLowerCase()) ||
      e.quarter.toLowerCase().includes(search.toLowerCase()) ||
      e.month.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'quarter') cmp = a.quarter.localeCompare(b.quarter);
    else if (sortField === 'month') cmp = monthOrder(a.month) - monthOrder(b.month);
    else if (sortField === 'event') cmp = a.event.localeCompare(b.event);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ChevronUp className="h-3 w-3 opacity-30" />;
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-8">
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Calendar Entry"
        message={`Delete "${deleteTarget?.name}" from the schedule?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
      <ConfirmDialog
        open={cancelTarget}
        title="Discard Changes?"
        message="You have unsaved changes. Discard them?"
        confirmLabel="Discard"
        variant="danger"
        onConfirm={() => { setCancelTarget(false); resetForm(); }}
        onCancel={() => setCancelTarget(false)}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="stat-value">Yearly Schedule</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage the annual calendar — workshops, hackathons, and lab events.
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setFormOpen(true); }}
          className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded bg-accent hover:bg-accent/80 text-text text-xs font-bold transition-colors"
        >
          + Add Entry
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form drawer — hidden on mobile unless open */}
        {(formOpen || editingId) && (
          <div className="fixed inset-0 z-50 lg:static lg:z-auto lg:w-80">
            <div className="absolute inset-0 bg-black/40 lg:hidden" onClick={handleCancel} />
            <div className="absolute bottom-0 left-0 right-0 lg:static bg-bg-elevated border border-border rounded-t-2xl lg:rounded-xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl lg:shadow-none">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-sm text-text">{editingId ? 'Edit Entry' : 'New Entry'}</h3>
                <button onClick={handleCancel} className="text-text-secondary hover:text-text p-1"><X className="h-4 w-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label mb-1 block">Quarter</label>
                  <div className="flex gap-1.5">
                    {QUARTERS.map((q) => (
                      <button key={q} type="button" onClick={() => setQuarter(q)}
                        className={`flex-1 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                          quarter === q ? 'text-white border-transparent' : 'text-text-secondary border-border hover:border-text-secondary'
                        }`}
                        style={quarter === q ? { backgroundColor: Q_COLORS[q] } : {}}
                      >{q}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label mb-1 block">Month</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-bg border border-border rounded px-3 py-2 text-xs text-text outline-none focus:border-accent transition-colors"
                  >
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label mb-1 block">Event Name</label>
                  <input value={event} onChange={(e) => setEvent(e.target.value)} placeholder="e.g. Robotics Challenge"
                    className="w-full bg-bg border border-border rounded px-3 py-2 text-xs text-text placeholder-text-secondary outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="label mb-1 block">Focus / Description</label>
                  <input value={focus} onChange={(e) => setFocus(e.target.value)} placeholder="e.g. Autonomous navigation"
                    className="w-full bg-bg border border-border rounded px-3 py-2 text-xs text-text placeholder-text-secondary outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="label mb-1 block">Participation</label>
                  <select value={participation} onChange={(e) => setParticipation(e.target.value)}
                    className="w-full bg-bg border border-border rounded px-3 py-2 text-xs text-text outline-none focus:border-accent transition-colors"
                  >
                    <option value="All students & faculty">All students & faculty</option>
                    <option value="All students">All students</option>
                    <option value="All student teams">All student teams</option>
                    <option value="Open teams">Open teams</option>
                    <option value="Student teams">Student teams</option>
                    <option value="Selected student teams">Selected student teams</option>
                    <option value="UG/PG students">UG/PG students</option>
                    <option value="ECE/EEE/MCT students">ECE/EEE/MCT students</option>
                    <option value="ECE/EEE students">ECE/EEE students</option>
                    <option value="MCT/Mechanical/ECE teams">MCT/Mechanical/ECE teams</option>
                    <option value="MCT/Mechanical students">MCT/Mechanical students</option>
                    <option value="Mechatronics/Mechanical students">Mechatronics/Mechanical students</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit"
                    className="flex-1 py-2 rounded bg-accent hover:bg-accent/80 text-text text-xs font-bold transition-colors"
                  >{editingId ? 'Update' : 'Add'} Entry</button>
                  <button type="button" onClick={handleCancel}
                    className="py-2 px-4 rounded border border-border text-text-secondary hover:text-text text-xs transition-colors"
                  >Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile add toggle */}
        {!formOpen && !editingId && (
          <button
            onClick={() => setFormOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-accent text-text shadow-2xl flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* List */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <SkeletonList count={6} />
          ) : (
            <Card className="p-6 border border-border">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-text flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Schedule
                  </h2>
                  <span className="text-[10px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border">{sorted.length}</span>
                </div>
                <div className="w-full sm:w-56">
                  <SearchInput value={search} onChange={setSearch} placeholder="Search events..." />
                </div>
              </div>

              {/* Sort controls */}
              <div className="flex items-center gap-2 mb-3 text-[10px] text-text-secondary">
                <span className="font-bold uppercase tracking-wider">Sort:</span>
                {(['quarter', 'month', 'event'] as const).map((f) => (
                  <button key={f} onClick={() => toggleSort(f)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-bg-elevated border border-border hover:border-text-secondary transition-colors"
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                    <SortIcon field={f} />
                  </button>
                ))}
              </div>

              {sorted.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-10 w-10 mx-auto mb-3 text-text-secondary/40" />
                  <p className="text-sm text-text-secondary">{search ? 'No entries match your search.' : 'No schedule entries yet. Add one!'}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {sorted.map((entry) => {
                    const qColor = Q_COLORS[entry.quarter] || '#D2232A';
                    return (
                      <div
                        key={entry._id}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-elevated/60 transition-colors group border border-transparent hover:border-border"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                          style={{ backgroundColor: qColor + '22' }}
                        >
                          <span className="text-[10px] font-bold" style={{ color: qColor }}>{entry.quarter}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-text truncate">{entry.event}</span>
                            <span className="text-[10px] text-text-secondary shrink-0" style={{ color: qColor }}>{entry.month}</span>
                          </div>
                          <p className="text-[10px] text-text-secondary truncate">{entry.focus} &middot; {entry.participation}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button onClick={() => openEdit(entry)}
                            className="p-1.5 rounded hover:bg-border/30 text-text-secondary hover:text-accent transition-colors"
                          ><Edit className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteTarget({ id: entry._id, name: entry.event })}
                            className="p-1.5 rounded hover:bg-border/30 text-text-secondary hover:text-accent-2 transition-colors"
                          ><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
