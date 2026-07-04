'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageUploadField from '@/components/ui/ImageUploadField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Calendar, Plus, CheckCircle2, AlertTriangle, MapPin, Clock, Edit, Trash2, X } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category: 'Workshop' | 'Hackathon' | 'Ideathon' | 'Open Lab Day';
  imageUrl?: string;
  image?: string; // fallback
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit mode tracking
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('AICTE-KEC Idea Lab');
  const [category, setCategory] = useState<'Workshop' | 'Hackathon' | 'Ideathon' | 'Open Lab Day'>('Workshop');
  const [imageUrl, setImageUrl] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchEvents = () => {
    setLoading(true);
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setEvents(data.data);
        }
      })
      .catch((err) => console.error('Error fetching events:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

    // Clear notifications
    setFormSuccess(false);
    setFormError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('AICTE-KEC Idea Lab');
    setCategory('Workshop');
    setImageUrl('');
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess(false);
    setFormError(null);

    // Validate date has been selected
    if (!date) {
      setFormError('Please select a valid date.');
      setFormSubmitting(false);
      return;
    }

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
        setFormSuccess(true);
        if (editingId) {
          setEditingId(null);
        }

        // Clear fields
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setLocation('AICTE-KEC Idea Lab');
        setCategory('Workshop');
        setImageUrl('');

        fetchEvents();
      } else {
        setFormError(result.error || 'Failed to submit the event form.');
      }
    } catch (err: any) {
      setFormError(err.message || 'An unexpected database writing error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to cancel and delete the event "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchEvents();
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        alert(result.error || 'Failed to delete the event.');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during deletion.');
    }
  };

  const formatEventDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="stat-value">Manage Idea Lab Events</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Schedule, edit, and publish technical training workshops, bootcamps, and safety sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5">
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
              {formSuccess && (
                <div className="bg-success/10 border border-success/20 text-success text-xs p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Workshop catalog updated successfully!</span>
                </div>
              )}

              {formError && (
                <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Workshop Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="3D Printing & CAD Fundamentals"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Event Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive introduction to SLA printing, parameter settings, slicing engines, and post-processing..."
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Event Classification</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Ideathon">Ideathon</option>
                  <option value="Open Lab Day">Open Lab Day</option>
                </select>
              </div>

              {/* Dynamic Image Upload */}
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
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Duration Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="09:30 AM - 04:30 PM"
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Location Venue</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="AICTE-KEC Idea Lab, Main Building"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
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

        {/* Database List Column */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-bold text-text mb-4">Laboratory Events Database</h2>

            {loading ? (
              <div className="text-center py-10">
                <LoadingSpinner />
                <p className="text-xs text-text-secondary mt-2">Querying database...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Calendar className="h-8 w-8 text-slate-700 mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">No events scheduled</p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  Add custom workshops on the left to populate the database and display them on the public portal.
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border/60">
                {events.map((event) => (
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
                          <span className="text-[10px] text-text-secondary">Scheduled Asset ID: {event._id.substring(event._id.length - 6)}</span>
                        </div>
                        <Badge variant={event.category === 'Workshop' ? 'primary' : event.category === 'Hackathon' ? 'danger' : event.category === 'Ideathon' ? 'success' : 'warning'}>{event.category}</Badge>
                      </div>

                      <p className="text-xs text-text-secondary line-clamp-2">{event.description}</p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-text-secondary font-mono">
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
                          onClick={() => handleEditClick(event)}
                          className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                          title="Edit event details"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event._id, event.title)}
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

