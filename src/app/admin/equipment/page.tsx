'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ImageUploadField from '@/components/ui/ImageUploadField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Wrench, Plus, CheckCircle2, AlertTriangle, Cpu, Trash2, Edit, X, PlusCircle } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
}

interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  available: number;
  category?: string;
  location?: string;
  imageUrl?: string;
  image?: string; // fallback
  order: number;
  specs: SpecItem[];
}

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit mode tracking
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [available, setAvailable] = useState(1);
  const [category, setCategory] = useState('Rapid Prototyping');
  const [location, setLocation] = useState('Main Zone');
  const [order, setOrder] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [specs, setSpecs] = useState<SpecItem[]>([]);
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchEquipment = () => {
    setLoading(true);
    fetch('/api/equipment')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setEquipment(data.data);
        }
      })
      .catch((err) => console.error('Error fetching equipment:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleEditClick = (item: EquipmentItem) => {
    setEditingId(item._id);
    setName(item.name || '');
    setDescription(item.description || '');
    setQuantity(item.quantity || 1);
    setAvailable(item.available || 1);
    setCategory(item.category || 'Rapid Prototyping');
    setLocation(item.location || 'Main Zone');
    setOrder(item.order || 0);
    setImageUrl(item.imageUrl || item.image || '');
    setSpecs(item.specs || []);
    
    // Clear notifications
    setFormSuccess(false);
    setFormError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setQuantity(1);
    setAvailable(1);
    setCategory('Rapid Prototyping');
    setLocation('Main Zone');
    setOrder(0);
    setImageUrl('');
    setSpecs([]);
    setFormError(null);
  };

  const handleAddSpecRow = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess(false);
    setFormError(null);

    // Validate specs array - filter out empty rows
    const cleanedSpecs = specs.filter((s) => s.label.trim() !== '' && s.value.trim() !== '');

    const payload = {
      name,
      description,
      quantity: Number(quantity),
      available: Number(available),
      category,
      location,
      order: Number(order),
      imageUrl,
      specs: cleanedSpecs,
    };

    try {
      const url = editingId ? `/api/equipment/${editingId}` : '/api/equipment';
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
          // Reset edit state
          setEditingId(null);
        }
        
        // Clear fields
        setName('');
        setDescription('');
        setQuantity(1);
        setAvailable(1);
        setCategory('Rapid Prototyping');
        setLocation('Main Zone');
        setOrder(0);
        setImageUrl('');
        setSpecs([]);
        
        fetchEquipment();
      } else {
        setFormError(result.error || 'Failed to submit the equipment form.');
      }
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the registry?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/equipment/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchEquipment();
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        alert(result.error || 'Failed to delete equipment.');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred during deletion.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="stat-value">Manage Laboratory Equipment</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Review, register, and update active machinery units inside Kongu Engineering College Idea Lab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-6 border border-border shadow-xl shadow-accent/5">
            <h2 className="text-lg font-bold text-text flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-accent" />
                {editingId ? 'Edit Asset' : 'Register New Asset'}
              </span>
              {editingId && (
                <button 
                  onClick={handleCancelEdit} 
                  className="text-xs text-text-secondary hover:text-text flex items-center gap-1 bg-bg-elevated border border-border px-2 py-1 rounded"
                >
                  <X className="h-3. w-3" /> Cancel Edit
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formSuccess && (
                <div className="bg-success/10 border border-success/20 text-success text-xs p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Equipment database updated successfully!</span>
                </div>
              )}

              {formError && (
                <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Equipment Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="FDM 3D Printer XL"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="High temperature extruder for engineering composites..."
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none"
                />
              </div>

              {/* Dynamic Image Upload */}
              <ImageUploadField
                label="Asset Image (Optional)"
                value={imageUrl}
                onChange={setImageUrl}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Total Quantity</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Available units</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={available}
                    onChange={(e) => setAvailable(Number(e.target.value))}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Machinery Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  >
                    <option value="Rapid Prototyping">Rapid Prototyping</option>
                    <option value="Machining">Machining</option>
                    <option value="Electronics & IoT">Electronics & IoT</option>
                    <option value="Testing & Measurement">Testing & Measurement</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    placeholder="0"
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Lab Location Room</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="3D Printing Zone"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                />
              </div>

              {/* Specs array fields */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-text-secondary">Technical Specifications</label>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="text-xs text-accent hover:text-accent flex items-center gap-1 font-semibold"
                  >
                    <PlusCircle className="h-3.5 w-3.5" /> Add Row
                  </button>
                </div>

                {specs.length === 0 ? (
                  <p className="text-[11px] text-text-secondary italic">No custom specs added yet. (e.g. Layer Resolution: 50 microns)</p>
                ) : (
                  <div className="space-y-2">
                    {specs.map((spec, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required
                          value={spec.label}
                          onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                          placeholder="Label (e.g. Build Volume)"
                          className="flex-1 bg-bg border border-border rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          required
                          value={spec.value}
                          onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                          placeholder="Value (e.g. 300x300mm)"
                          className="flex-1 bg-bg border border-border rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(i)}
                          className="text-accent-2 hover:text-accent-2 p-1 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1 text-xs">
                    Cancel
                  </Button>
                )}
                <Button type="submit" variant="primary" fullWidth={!editingId} className="flex-1 text-xs gap-2" disabled={formSubmitting}>
                  {formSubmitting ? 'Processing...' : editingId ? 'Update Machinery' : 'Register Machinery'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Database List Column */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-bold text-text mb-4">Laboratory Asset Database</h2>

            {loading ? (
              <div className="text-center py-10">
                <LoadingSpinner />
                <p className="text-xs text-text-secondary mt-2">Querying database...</p>
              </div>
            ) : equipment.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Wrench className="h-8 w-8 text-slate-700 mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">No machinery cataloged</p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  Add equipment assets on the left to populate the database and display them on the public portal.
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border/60">
                {equipment.map((item) => (
                  <div key={item._id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-text">{item.name}</span>
                        <Badge variant={item.category === 'Rapid Prototyping' ? 'primary' : item.category === 'Machining' ? 'warning' : item.category === 'Electronics & IoT' ? 'success' : 'danger'}>{item.category || 'General'}</Badge>
                        <span className="text-[10px] text-accent font-mono bg-accent/5 px-1.5 py-0.5 rounded border border-accent/10">Order: {item.order}</span>
                      </div>
                      <p className="text-xs text-text-secondary max-w-md line-clamp-1">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-secondary font-mono">
                        <span className="flex items-center gap-1 bg-bg px-2 py-0.5 rounded border border-border">
                          <Cpu className="h-3 w-3" /> Location: <b>{item.location || 'Main Zone'}</b>
                        </span>
                        {item.specs && item.specs.length > 0 && (
                          <span className="text-accent">({item.specs.length} specifications)</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col items-end gap-3 justify-between sm:justify-start">
                      <div className="text-right">
                        <span className="text-xs text-accent font-bold block">
                          {item.available} / {item.quantity} units
                        </span>
                        <span className="text-[10px] text-text-secondary uppercase font-semibold">Available</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                          title="Edit asset details"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id, item.name)}
                          className="p-1.5 text-accent-2 hover:text-rose-300 bg-accent-2/10 hover:bg-accent-2/20 border border-accent-2/20 rounded transition-colors"
                          title="Delete asset"
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

