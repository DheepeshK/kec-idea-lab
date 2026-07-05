'use client';

import { useState, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageUploadField from '@/components/ui/ImageUploadField';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import SearchInput from '@/components/ui/SearchInput';
import { SkeletonList } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { useAdminCrud } from '@/hooks/useAdminCrud';
import { useCtrlSave } from '@/hooks/useCtrlSave';
import { Calendar, MapPin, Clock, Edit, Trash2, X, ChevronUp, ChevronDown, Menu, XCircle, Eye, EyeOff } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category: 'Workshop' | 'Hackathon' | 'Ideathon' | 'Open Lab Day';
  status?: 'published' | 'draft';
  imageUrl?: string;
  image?: string;
}

export default function AdminEventsPage() {
  const { data: events, loading, deleteItem, refresh } = useAdminCrud<EventItem>('/api/events', '/api/events');
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [cancelTarget, setCancelTarget] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<'title' | 'date' | 'category'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('AICTE-KEC Idea Lab');
  const [category, setCategory] = useState<'Workshop' | 'Hackathon' | 'Ideathon' | 'Open Lab Day'>('Workshop');
  const [imageUrl, setImageUrl] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);

  const formatDateToInput = (dateStr: string | Date) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const handleEditClick = (event: EventItem) => {
    setEditingId(event._id);
    setTitle(event.title || '');
    setDescription(event.description || '');
    setDate(formatDateToInput(event.date));
    setTime(event.time || '');
    setLocation(event.location || 'AICTE-KEC Idea Lab');
    setCategory(event.category || 'Workshop');
    setImageUrl(event.imageUrl || event.image || '');
  };

  const handleCancelEdit = () => {
    if (editingId && (title || description || date || imageUrl)) {
      setCancelTarget(true);
      return;
    }
    doCancelEdit();
  };

  const doCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('AICTE-KEC Idea Lab');
    setCategory('Workshop');
    setImageUrl('');
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!date) newErrors.date = 'Date is required.';
    if (!time.trim()) newErrors.time = 'Time is required.';
    if (!location.trim()) newErrors.location = 'Location is required.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('error', 'Please fix the validation errors below.');
      return;
    }
    setErrors({});

    setFormSubmitting(true);

    const payload = {
      title,
      description,
      date: new Date(date).toISOString(),
      time,
      location,
      category,
      imageUrl,
    };

    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        toast('success', editingId ? 'Event updated successfully.' : 'Event scheduled successfully.');
        setEditingId(null);
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setLocation('AICTE-KEC Idea Lab');
        setCategory('Workshop');
        setImageUrl('');
        refresh();
      } else {
        toast('error', result.error || 'Failed to submit the event form.');
      }
    } catch (err: any) {
      toast('error', err.message || 'An unexpected database writing error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      toast('success', `"${deleteTarget.title}" deleted successfully.`);
      if (editingId === deleteTarget.id) handleCancelEdit();
    } catch (err: any) {
      toast('error', err.message || 'Failed to delete event.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const formatEventDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleStatus = async (event: any) => {
    const newStatus = event.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/events/${event._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        toast('success', `Event is now ${newStatus}.`);
        refresh();
      }
    } catch { toast('error', 'Failed to toggle status.'); }
  };

  const submitHandler = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSubmit(e || new Event('submit') as any);
  }, [editingId, title, description, date, time, location, category, imageUrl]);

  useCtrlSave(() => submitHandler(), !!editingId || !!(title || description || date));

  const filtered = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase()) ||
      ev.location?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'title') cmp = a.title.localeCompare(b.title);
    else if (sortField === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
    else if (sortField === 'category') cmp = a.category.localeCompare(b.category);
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
        title="Delete Event"
        message={`Are you sure you want to cancel and delete the event "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={cancelTarget}
        title="Discard Changes?"
        message="You have unsaved changes in the edit form. Discard them?"
        confirmLabel="Discard"
        variant="danger"
        onConfirm={() => { setCancelTarget(false); doCancelEdit(); }}
        onCancel={() => setCancelTarget(false)}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="stat-value">Manage Idea Lab Events</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Schedule, edit, and publish technical training workshops, bootcamps, and safety sessions.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-text text-xs font-bold"
        >
          {showForm ? <XCircle className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {showForm ? 'Close Form' : (editingId ? 'Edit Event' : 'Add Event')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`lg:col-span-5 ${!showForm && !editingId ? 'hidden lg:block' : 'block'}`}>
          <Card className="p-6 space-y-6 border border-border shadow-xl shadow-accent/5">
            <h2 className="text-lg font-bold text-text flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                {editingId ? 'Edit Scheduled Event' : 'Schedule Event'}
              </span>
              {editingId && (
                <button
                  onClick={handleCancelEdit}
                  className="text-xs text-text-secondary hover:text-text flex items-center gap-1 bg-bg-elevated border border-border px-2 py-1 rounded"
                >
                  <X className="h-3 w-3" /> Cancel Edit
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Workshop Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="3D Printing & CAD Fundamentals"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.title ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.title && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.title}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Event Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive introduction to SLA printing, parameter settings, slicing engines, and post-processing..."
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none ${errors.description ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.description && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.description}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Event Classification</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Ideathon">Ideathon</option>
                  <option value="Open Lab Day">Open Lab Day</option>
                </select>
              </div>

              <ImageUploadField
                label="Promo Banner Image"
                value={imageUrl}
                onChange={setImageUrl}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Calendar Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.date ? 'border-accent' : 'border-border focus:border-accent'}`}
                  />
                  {errors.date && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.date}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Duration Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="09:30 AM - 04:30 PM"
                    className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.time ? 'border-accent' : 'border-border focus:border-accent'}`}
                  />
                  {errors.time && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.time}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Location Venue</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="AICTE-KEC Idea Lab, Main Building"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.location ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.location && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.location}</p>}
              </div>

              <div className="pt-2 flex gap-3">
                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1 text-xs">
                    Cancel
                  </Button>
                )}
                <Button type="submit" variant="primary" fullWidth={!editingId} className="flex-1 text-xs gap-2" disabled={formSubmitting}>
                  {formSubmitting ? 'Processing...' : editingId ? 'Update Event' : 'Schedule Event'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-text">Events</h2>
                <span className="text-[10px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border">{sorted.length}</span>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Search by title, category, location..." />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-[10px] text-text-secondary border-b border-border pb-2">
              <span className="font-semibold uppercase tracking-wider">Sort:</span>
              {(['title', 'date', 'category'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 hover:text-text transition-colors ${sortField === field ? 'text-accent font-bold' : ''}`}
                >
                  {field === 'title' ? 'Title' : field === 'date' ? 'Date' : 'Category'}
                  <SortIcon field={field} />
                </button>
              ))}
            </div>

            {loading ? (
              <SkeletonList count={4} />
            ) : sorted.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Calendar className="h-8 w-8 text-text-secondary mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">
                  {search ? 'No matching events found' : 'No events scheduled'}
                </p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  {search ? 'Try a different search term.' : 'Add custom workshops on the left to populate the database.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border/60">
                {sorted.map((event) => (
                  <div key={event._id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {event.imageUrl || event.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.imageUrl || event.image}
                            alt={event.title}
                            className="h-10 w-16 rounded object-cover border border-border shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-16 rounded bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shrink-0">
                            <Calendar className="h-4 w-4 text-accent" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-sm text-text block leading-tight">{event.title}</span>
                          <span className="text-[10px] text-text-secondary">{event._id.substring(event._id.length - 6)}</span>
                        </div>
                        <Badge variant={event.category === 'Workshop' ? 'primary' : event.category === 'Hackathon' ? 'danger' : event.category === 'Ideathon' ? 'success' : 'warning'}>{event.category}</Badge>
                        {/* Status badge */}
                        <button
                          onClick={() => toggleStatus(event)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                            event.status === 'published'
                              ? 'bg-success/10 border-success/30 text-success hover:bg-success/20'
                              : 'bg-accent-2/10 border-accent-2/30 text-accent-2 hover:bg-accent-2/20'
                          }`}
                          title={event.status === 'published' ? 'Click to unpublish' : 'Click to publish'}
                        >
                          {event.status === 'published' ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {event.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </div>

                      <p className="text-xs text-text-secondary line-clamp-2">{event.description}</p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatEventDate(event.date)}
                        </span>
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {event.time}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {event.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 shrink-0">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setShowForm(true); handleEditClick(event); }}
                          className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                          title="Edit event details"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ id: event._id, title: event.title })}
                          className="p-1.5 text-accent-2 hover:text-rose-300 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded transition-colors"
                          title="Delete event"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

