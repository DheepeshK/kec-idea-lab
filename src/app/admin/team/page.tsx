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
import { Users, Mail, Edit, Trash2, X, Github, Linkedin, Twitter, ChevronUp, ChevronDown, Menu, XCircle } from 'lucide-react';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  group: string;
  focusArea?: string;
  photoUrl?: string;
  image?: string;
  designation?: string;
  bio?: string;
  email?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  order: number;
}

export default function AdminTeamPage() {
  const { data: team, loading, deleteItem, refresh } = useAdminCrud<TeamMember>('/api/team', '/api/team');
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [cancelTarget, setCancelTarget] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'order' | 'group'>('order');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [group, setGroup] = useState<string>('Student');
  const [focusArea, setFocusArea] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(0);
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleEditClick = (member: TeamMember) => {
    setEditingId(member._id);
    setName(member.name || '');
    setRole(member.role || '');
    setGroup(member.group || 'Student');
    setFocusArea(member.focusArea || '');
    setPhotoUrl(member.photoUrl || member.image || '');
    setDesignation(member.designation || '');
    setBio(member.bio || '');
    setEmail(member.email || '');
    setOrder(member.order || 0);
    setLinkedin(member.socials?.linkedin || '');
    setGithub(member.socials?.github || '');
    setTwitter(member.socials?.twitter || '');
  };

  const handleCancelEdit = () => {
    if (editingId) { setCancelTarget(true); return; }
    doCancelEdit();
  };

  const doCancelEdit = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setGroup('Student');
    setFocusArea('');
    setPhotoUrl('');
    setDesignation('');
    setBio('');
    setEmail('');
    setOrder(0);
    setLinkedin('');
    setGithub('');
    setTwitter('');
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!role.trim()) newErrors.role = 'Role is required.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('error', 'Please fix the validation errors below.');
      return;
    }
    setErrors({});

    setFormSubmitting(true);

    const payload = {
      name,
      role,
      group,
      focusArea,
      photoUrl,
      designation,
      bio,
      email,
      order: Number(order),
      socials: { linkedin, github, twitter },
    };

    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        toast('success', editingId ? 'Team member updated successfully.' : 'Team member registered successfully.');
        setEditingId(null);
        setName('');
        setRole('');
        setGroup('Student');
        setFocusArea('');
        setPhotoUrl('');
        setDesignation('');
        setBio('');
        setEmail('');
        setOrder(0);
        setLinkedin('');
        setGithub('');
        setTwitter('');
        refresh();
      } else {
        toast('error', result.error || 'Failed to submit team member details.');
      }
    } catch (err: any) {
      toast('error', err.message || 'An unexpected server communication error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      toast('success', `"${deleteTarget.name}" removed successfully.`);
      if (editingId === deleteTarget.id) handleCancelEdit();
    } catch (err: any) {
      toast('error', err.message || 'Failed to remove team member.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleInlineOrderChange = (id: string, newOrder: number) => {
    refresh();
    fetch(`/api/team/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: newOrder }),
    }).catch(() => {});
  };

  const submitHandler = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSubmit(e || new Event('submit') as any);
  }, [editingId, name, role, group, focusArea, photoUrl, designation, bio, email, order, linkedin, github, twitter]);

  useCtrlSave(() => submitHandler(), !!editingId);

  const filtered = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.group.toLowerCase().includes(search.toLowerCase()) ||
      m.designation?.toLowerCase().includes(search.toLowerCase()) ||
      m.focusArea?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortField === 'order') cmp = (a.order ?? 0) - (b.order ?? 0);
    else if (sortField === 'group') cmp = a.group.localeCompare(b.group);
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

  const grouped = sorted.reduce((acc, m) => {
    const g = m.group || 'Other';
    if (!acc[g]) acc[g] = [];
    acc[g].push(m);
    return acc;
  }, {} as Record<string, typeof sorted>);

  return (
    <div className="space-y-8">
      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove Team Member"
        message={`Are you sure you want to remove "${deleteTarget?.name}" from the KEC Idea Lab team?`}
        confirmLabel="Remove"
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
          <h1 className="stat-value">Manage Idea Lab Team</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Add or edit faculty mentors, technical supervisors, and student tech ambassadors.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-text text-xs font-bold"
        >
          {showForm ? <XCircle className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {showForm ? 'Close Form' : (editingId ? 'Edit Member' : 'Add Member')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`lg:col-span-5 ${!showForm && !editingId ? 'hidden lg:block' : 'block'}`}>
          <Card className="p-6 space-y-6 border border-border shadow-xl shadow-accent/5">
            <h2 className="text-lg font-bold text-text flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                {editingId ? 'Edit Team Member' : 'Register Member'}
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
                <label className="block text-xs font-semibold text-text-secondary">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. T. Kumar"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.name ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.name && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Team Group Category</label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  >
                    <option value="Chief Mentor">Chief Mentor</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Co-ordinator">Co-ordinator</option>
                    <option value="Implementation team: Tech gurus">Implementation team: Tech gurus</option>
                    <option value="Student Ambassadors">Student Ambassadors</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Role Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Lab Faculty In-Charge / Technical Mentor"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.role ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.role && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.role}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Professional Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Professor, Dept. of ECE"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Focus Area</label>
                <input
                  type="text"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  placeholder="Rapid Prototyping / Embedded Systems"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <ImageUploadField
                label="Profile Photograph"
                value={photoUrl}
                onChange={setPhotoUrl}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Brief Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Pioneering industrial IoT research with over 15 years of design experience..."
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mentor@kongu.edu"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.email ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.email && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.email}</p>}
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <span className="block text-xs font-bold text-text-secondary">Social Connections</span>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 bg-bg border border-border rounded-lg px-2.5 py-1">
                    <Linkedin className="h-4 w-4 text-accent-3 shrink-0" />
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="LinkedIn URL"
                      className="w-full bg-transparent text-xs text-text placeholder-text-secondary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-bg border border-border rounded-lg px-2.5 py-1">
                    <Github className="h-4 w-4 text-brand-navy shrink-0" />
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="GitHub URL"
                      className="w-full bg-transparent text-xs text-text placeholder-text-secondary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-bg border border-border rounded-lg px-2.5 py-1">
                    <Twitter className="h-4 w-4 text-accent-2 shrink-0" />
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="Twitter URL"
                      className="w-full bg-transparent text-xs text-text placeholder-text-secondary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1 text-xs">
                    Cancel
                  </Button>
                )}
                <Button type="submit" variant="primary" fullWidth={!editingId} className="flex-1 text-xs gap-2" disabled={formSubmitting}>
                  {formSubmitting ? 'Processing...' : editingId ? 'Update Member' : 'Register Member'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-text">Team</h2>
                <span className="text-[10px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border">{sorted.length}</span>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Search by name, role, group..." />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-[10px] text-text-secondary border-b border-border pb-2">
              <span className="font-semibold uppercase tracking-wider">Sort:</span>
              {(['name', 'order', 'group'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 hover:text-text transition-colors ${sortField === field ? 'text-accent font-bold' : ''}`}
                >
                  {field === 'name' ? 'Name' : field === 'order' ? 'Order' : 'Group'}
                  <SortIcon field={field} />
                </button>
              ))}
            </div>

            {loading ? (
              <SkeletonList count={4} />
            ) : sorted.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Users className="h-8 w-8 text-text-secondary mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">
                  {search ? 'No matching members found' : 'No members registered'}
                </p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  {search ? 'Try a different search term.' : 'Add team profiles on the left to populate the database.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(grouped).map(([g, members]) => (
                  <div key={g}>
                    <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-3 border-b border-border/40 pb-1">
                      {g} <span className="text-text-secondary">({members.length})</span>
                    </h3>
                    <div className="space-y-4">
                      {members.map((member) => (
                        <div key={member._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-elevated/20 rounded-xl p-4 border border-border/40">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              {member.photoUrl || member.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={member.photoUrl || member.image}
                                  alt={member.name}
                                  className="h-8 w-8 rounded-full object-cover border border-border shrink-0 shadow-md shadow-accent/10"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 shrink-0 shadow-md shadow-accent/10">
                                  <span className="text-[10px] font-bold text-accent">{member.name.charAt(0)}</span>
                                </div>
                              )}
                              <div>
                                <span className="font-bold text-sm text-text block leading-tight">{member.name}</span>
                                <span className="text-[10px] text-text-secondary">{member.designation || 'Idea Lab Staff'}</span>
                              </div>
                              <Badge variant={member.group === 'Faculty' ? 'primary' : member.group === 'Mentor' ? 'secondary' : 'warning'}>
                                {member.group}
                              </Badge>
                            </div>
                            <p className="text-xs text-text-secondary">
                              Role: <b>{member.role}</b>
                              {member.focusArea && <> &bull; Focus: <b>{member.focusArea}</b></>}
                            </p>
                            {member.email && (
                              <p className="text-[10px] text-text-secondary flex items-center gap-1 font-mono">
                                <Mail className="h-3 w-3 text-text-secondary" /> {member.email}
                              </p>
                            )}
                          </div>
                          <div className="flex sm:flex-col items-end gap-3 justify-between sm:justify-start">
                            <div className="text-right space-y-1.5">
                              <label className="block text-[10px] text-text-secondary uppercase font-bold">Sort Order</label>
                              <input
                                type="number"
                                defaultValue={member.order}
                                onBlur={(e) => handleInlineOrderChange(member._id, Number(e.target.value))}
                                className="w-16 bg-bg border border-border rounded px-2 py-0.5 text-xs text-text text-center focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setShowForm(true); handleEditClick(member); }}
                                className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                                title="Edit member details"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteTarget({ id: member._id, name: member.name })}
                                className="p-1.5 text-accent-2 hover:text-rose-300 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded transition-colors"
                                title="Delete member"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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

