'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageUploadField from '@/components/ui/ImageUploadField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Users, Plus, CheckCircle2, AlertTriangle, Mail, Edit, Trash2, X, Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  group: string;
  focusArea?: string;
  photoUrl?: string;
  image?: string; // fallback
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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit mode tracking
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [group, setGroup] = useState<string>('Student');
  const [focusArea, setFocusArea] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(0);

  // Social handles
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchTeam = () => {
    setLoading(true);
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTeam(data.data);
        }
      })
      .catch((err) => console.error('Error fetching team:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

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

    setFormSuccess(false);
    setFormError(null);
  };

  const handleCancelEdit = () => {
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
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess(false);
    setFormError(null);

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
      socials: {
        linkedin,
        github,
        twitter,
      },
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
        setFormSuccess(true);
        if (editingId) {
          setEditingId(null);
        }

        // Clear states
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

        fetchTeam();
      } else {
        setFormError(result.error || 'Failed to submit team member details.');
      }
    } catch (err: any) {
      setFormError(err.message || 'An unexpected server communication error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the KEC Idea Lab team?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchTeam();
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        alert(result.error || 'Failed to remove team member.');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during deletion.');
    }
  };

  const handleInlineOrderChange = async (id: string, newOrder: number) => {
    // Update local state instantly so input value behaves normally
    setTeam((prev) =>
      prev.map((m) => (m._id === id ? { ...m, order: newOrder } : m))
    );
  };

  const handleInlineOrderBlur = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/team/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      });
      // Re-fetch to sort the updated array properly on the server side
      fetchTeam();
    } catch (err) {
      console.error('Failed to update inline order:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="stat-value">Manage Idea Lab Team</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Add or edit faculty mentors, technical supervisors, and student tech ambassadors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5">
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
              {formSuccess && (
                <div className="bg-success/10 border border-success/20 text-success text-xs p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Team member database updated successfully!</span>
                </div>
              )}

              {formError && (
                <div className="bg-accent-2/10 border border-accent-2/20 text-accent-2 text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. T. Kumar"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Team Group Category</label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
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
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Role Title</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Lab Faculty In-Charge / Technical Mentor"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Professional Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Professor, Dept. of ECE"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Focus Area</label>
                <input
                  type="text"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  placeholder="Rapid Prototyping / Embedded Systems"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              {/* Dynamic Image Upload */}
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
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mentor@kongu.edu"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              {/* Socials Sub-Fields */}
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
                      className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-700 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-bg border border-border rounded-lg px-2.5 py-1">
                    <Github className="h-4 w-4 text-brand-navy shrink-0" />
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="GitHub URL"
                      className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-700 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-bg border border-border rounded-lg px-2.5 py-1">
                    <Twitter className="h-4 w-4 text-accent-2 shrink-0" />
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="Twitter URL"
                      className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-700 focus:outline-none"
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

        {/* Database List Column */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-bold text-text mb-4">Laboratory Team Database</h2>

            {loading ? (
              <div className="text-center py-10">
                <LoadingSpinner />
                <p className="text-xs text-text-secondary mt-2">Querying database...</p>
              </div>
            ) : team.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Users className="h-8 w-8 text-slate-700 mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">No members registered</p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  Add team profiles on the left to populate the database and display them on the public portal.
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border/60">
                {team.map((member) => (
                  <div key={member._id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                            <span className="text-[10px] font-bold text-accent">
                              {member.name.charAt(0)}
                            </span>
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
                          value={member.order}
                          onChange={(e) => handleInlineOrderChange(member._id, Number(e.target.value))}
                          onBlur={(e) => handleInlineOrderBlur(member._id, Number(e.target.value))}
                          className="w-16 bg-bg border border-border rounded px-2 py-0.5 text-xs text-slate-100 text-center font-mono focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                          title="Edit member details"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(member._id, member.name)}
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

