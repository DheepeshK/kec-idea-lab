'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { SkeletonList } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { useAdminCrud } from '@/hooks/useAdminCrud';
import { MessageSquare, User, Calendar, FileText, Trash2 } from 'lucide-react';
import type { ContactEnquiry } from '@/types';

const PER_PAGE = 10;

export default function AdminEnquiriesPage() {
  const { data: enquiries, loading, refresh } = useAdminCrud<ContactEnquiry>('/api/contact-enquiries');
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/contact-enquiries?id=${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('success', `Enquiry from "${deleteTarget.name}" deleted.`);
        refresh();
      } else {
        toast('error', data.error || 'Failed to delete enquiry.');
      }
    } catch {
      toast('error', 'Failed to delete enquiry.');
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

  const filtered = enquiries.filter(
    (enq) =>
      enq.name.toLowerCase().includes(search.toLowerCase()) ||
      enq.rollNoDept.toLowerCase().includes(search.toLowerCase()) ||
      enq.purpose.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-8">
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Enquiry"
        message={`Delete enquiry from "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <div>
        <h1 className="stat-value">Contact Enquiries</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          View and manage enquiries submitted through the public contact form.
        </p>
      </div>

      {loading ? (
        <div className="py-10">
          <SkeletonList count={5} />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 space-y-4 border border-dashed border-border rounded-3xl max-w-lg mx-auto">
          <div className="inline-flex p-4 rounded-full bg-bg-elevated text-text-secondary border border-border">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-text">No Enquiries Yet</p>
            <p className="text-xs text-text-secondary max-w-xs mx-auto">
              Enquiries submitted from the public contact page will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-text flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Enquiries
                </h2>
                <span className="text-[10px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border">
                  {filtered.length}
                </span>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Search by name, department, purpose..." />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xs text-text-secondary font-semibold uppercase">No matching enquiries found</p>
                <p className="text-[10px] text-text-secondary mt-1">Try a different search term.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginated.map((enq) => (
                    <div
                      key={enq._id}
                      className="bg-bg-elevated/30 border border-border/60 rounded-xl p-4 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <User className="h-4 w-4 text-accent" />
                            <span className="font-bold text-sm text-text">{enq.name}</span>
                            <span className="text-[10px] bg-accent-3/10 text-accent-3 font-medium px-2 py-0.5 rounded border border-accent-3/20">
                              {enq.rollNoDept}
                            </span>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-text-secondary">
                            <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent-2" />
                            <p className="text-text-secondary/80 leading-relaxed">{enq.purpose}</p>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-text-secondary">
                            <Calendar className="h-3 w-3 text-accent" />
                            Submitted: {formatDate(enq.createdAt)}
                          </div>
                        </div>

                        <button
                          onClick={() => setDeleteTarget({ id: enq._id, name: enq.name })}
                          className="p-1.5 text-accent-2 hover:text-rose-300 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded transition-colors shrink-0 self-start"
                          title="Delete enquiry"
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
