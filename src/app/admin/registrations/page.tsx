'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { SkeletonList } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { useAdminCrud } from '@/hooks/useAdminCrud';
import { ClipboardList, Mail, Phone, Calendar, User, ExternalLink, Trash2, Download } from 'lucide-react';

interface Registration {
  _id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  rollNoDept: string;
  email: string;
  phone: string;
  createdAt: string;
}

const PER_PAGE = 10;

export default function AdminRegistrationsPage() {
  const { data: registrations, loading, refresh } = useAdminCrud<Registration>('/api/register');
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/register?id=${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('success', `Registration from "${deleteTarget.name}" deleted.`);
        refresh();
      } else {
        toast('error', data.error || 'Failed to delete registration.');
      }
    } catch {
      toast('error', 'Failed to delete registration.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const handleExport = (eventId?: string) => {
    const url = eventId ? `/api/export/registrations?eventId=${eventId}` : '/api/export/registrations';
    window.open(url, '_blank');
  };

  // Unique events from registrations
  const eventMap = registrations.reduce((acc, reg) => {
    if (!acc[reg.eventId]) acc[reg.eventId] = reg.eventTitle || reg.eventId;
    return acc;
  }, {} as Record<string, string>);

  const filtered = registrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(search.toLowerCase()) ||
      reg.email.toLowerCase().includes(search.toLowerCase()) ||
      reg.rollNoDept.toLowerCase().includes(search.toLowerCase()) ||
      reg.eventTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-8">
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Registration"
        message={`Delete registration from "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <div>
        <h1 className="stat-value">Event Registrations</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          View and manage student registrations for workshops, hackathons, and lab events.
        </p>
      </div>

      {loading ? (
        <div className="py-10">
          <SkeletonList count={5} />
        </div>
      ) : registrations.length === 0 ? (
        <div className="text-center py-20 space-y-4 border border-dashed border-border rounded-3xl max-w-lg mx-auto">
          <div className="inline-flex p-4 rounded-full bg-bg-elevated text-text-secondary border border-border">
            <ClipboardList className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-text">No Registrations Yet</p>
            <p className="text-xs text-text-secondary max-w-xs mx-auto">
              Student registrations from the public events page will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-text flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-accent" />
                  Registrations
                </h2>
                <span className="text-[10px] text-text-secondary font-mono bg-bg-elevated px-2 py-0.5 rounded border border-border">{filtered.length}</span>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, event..." />
              </div>
            </div>

            {/* Export buttons */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <button
                onClick={() => handleExport()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent/10 hover:bg-accent/20 text-accent text-[10px] font-bold border border-accent/30 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Export All
              </button>
              {Object.entries(eventMap).map(([eid, eTitle]) => (
                <button
                  key={eid}
                  onClick={() => handleExport(eid)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-elevated hover:bg-border/20 text-text-secondary text-[10px] font-mono border border-border transition-colors"
                >
                  <Download className="h-3 w-3" /> {eTitle.slice(0, 24)}{eTitle.length > 24 ? '…' : ''}
                </button>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xs text-text-secondary font-semibold uppercase">No matching registrations found</p>
                <p className="text-[10px] text-text-secondary mt-1">Try a different search term.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginated.map((reg) => (
                    <div
                      key={reg._id}
                      className="bg-bg-elevated/30 border border-border/60 rounded-xl p-4 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <User className="h-4 w-4 text-accent" />
                            <span className="font-bold text-sm text-text">{reg.name}</span>
                            <Badge variant="primary">{reg.rollNoDept}</Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-secondary font-mono">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <a href={`mailto:${reg.email}`} className="hover:text-accent transition-colors">
                                {reg.email}
                              </a>
                            </span>
                            {reg.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {reg.phone}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-text-secondary">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-accent-2" />
                              Registered: {formatDate(reg.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3 text-accent-3" />
                              Event: {reg.eventTitle || reg.eventId}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setDeleteTarget({ id: reg._id, name: reg.name })}
                          className="p-1.5 text-accent-2 hover:text-rose-300 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded transition-colors shrink-0 self-start"
                          title="Delete registration"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
