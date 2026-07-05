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
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { useCtrlSave } from '@/hooks/useCtrlSave';
import { Wrench, Cpu, Trash2, Edit, X, PlusCircle, ChevronUp, ChevronDown, Menu, XCircle } from 'lucide-react';

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
  image?: string;
  order: number;
  specs: SpecItem[];
}

export default function AdminEquipmentPage() {
  const { data: equipment, loading, deleteItem, refresh } = useAdminCrud<EquipmentItem>('/api/equipment', '/api/equipment');
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [cancelTarget, setCancelTarget] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'order' | 'quantity'>('order');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const formDirty = name !== '' || description !== '' || imageUrl !== '' || specs.some((s) => s.label || s.value);
  useUnsavedChanges(formDirty && editingId === null);

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
  };

  const handleCancelEdit = () => {
    if (editingId && isFormDirty()) {
      setCancelTarget(true);
      return;
    }
    doCancelEdit();
  };

  const isFormDirty = () =>
    name !== '' || description !== '' || imageUrl !== '' || specs.some((s) => s.label || s.value);

  const doCancelEdit = () => {
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
    setErrors({});
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

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Equipment name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (quantity < 1) newErrors.quantity = 'Must be at least 1.';
    if (available < 0) newErrors.available = 'Cannot be negative.';
    if (available > quantity) newErrors.available = 'Cannot exceed total quantity.';
    if (!location.trim()) newErrors.location = 'Location is required.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('error', 'Please fix the validation errors below.');
      return;
    }
    setErrors({});

    setFormSubmitting(true);

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
        toast('success', editingId ? 'Equipment updated successfully.' : 'Equipment registered successfully.');
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
        refresh();
      } else {
        toast('error', result.error || 'Failed to submit the equipment form.');
      }
    } catch (err: any) {
      toast('error', err.message || 'An unexpected error occurred.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      toast('success', `"${deleteTarget.name}" deleted successfully.`);
      if (editingId === deleteTarget.id) handleCancelEdit();
    } catch (err: any) {
      toast('error', err.message || 'Failed to delete equipment.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortField === 'order') cmp = (a.order ?? 0) - (b.order ?? 0);
    else if (sortField === 'quantity') cmp = (a.quantity ?? 0) - (b.quantity ?? 0);
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

  const submitHandler = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSubmit(e || new Event('submit') as any);
  }, [editingId, name, description, quantity, available, category, location, order, imageUrl, specs]);

  useCtrlSave(() => submitHandler(), !!editingId || formDirty);

  const availPercent = (item: EquipmentItem) =>
    item.quantity > 0 ? Math.round((item.available / item.quantity) * 100) : 0;

  return (
    <div className="space-y-8">
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Equipment"
        message={`Are you sure you want to delete "${deleteTarget?.name}" from the registry?`}
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
          <h1 className="stat-value">Manage Laboratory Equipment</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Review, register, and update active machinery units inside Kongu Engineering College Idea Lab.
          </p>
        </div>
        {/* Mobile form toggle */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-text text-xs font-bold"
        >
          {showForm ? <XCircle className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {showForm ? 'Close Form' : (editingId ? 'Edit Asset' : 'Add Asset')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column - collapsible on mobile */}
        <div className={`lg:col-span-5 ${!showForm && !editingId ? 'hidden lg:block' : 'block'}`}>
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
                  <X className="h-3 w-3" /> Cancel Edit
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Equipment Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="FDM 3D Printer XL"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.name ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.name && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="High temperature extruder for engineering composites..."
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 resize-none ${errors.description ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.description && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.description}</p>}
              </div>

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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.quantity ? 'border-accent' : 'border-border focus:border-accent'}`}
                  />
                  {errors.quantity && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.quantity}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Available units</label>
                  <input
                    type="number"
                    min={0}
                    value={available}
                    onChange={(e) => setAvailable(Number(e.target.value))}
                    className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.available ? 'border-accent' : 'border-border focus:border-accent'}`}
                  />
                  {errors.available && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.available}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Machinery Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
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
                    className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Lab Location Room</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="3D Printing Zone"
                  className={`w-full bg-bg border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5 ${errors.location ? 'border-accent' : 'border-border focus:border-accent'}`}
                />
                {errors.location && <p className="text-[10px] text-accent font-semibold mt-0.5">{errors.location}</p>}
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
                          value={spec.label}
                          onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                          placeholder="Label (e.g. Build Volume)"
                          className="flex-1 bg-bg border border-border rounded-lg px-2.5 py-1.5 text-xs text-text focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                          placeholder="Value (e.g. 300x300mm)"
                          className="flex-1 bg-bg border border-border rounded-lg px-2.5 py-1.5 text-xs text-text focus:outline-none focus:border-accent"
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
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-text">Assets</h2>
                <span className="text-[10px] text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border">{sorted.length}</span>
              </div>
              <div className="w-full sm:w-64">
                <SearchInput value={search} onChange={setSearch} placeholder="Search by name, category, location..." />
              </div>
            </div>

            {/* Sort controls */}
            <div className="flex items-center gap-4 mb-4 text-[10px] text-text-secondary border-b border-border pb-2">
              <span className="font-semibold uppercase tracking-wider">Sort:</span>
              {(['name', 'order', 'quantity'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 hover:text-text transition-colors ${sortField === field ? 'text-accent font-bold' : ''}`}
                >
                  {field === 'name' ? 'Name' : field === 'order' ? 'Order' : 'Qty'}
                  <SortIcon field={field} />
                </button>
              ))}
            </div>

            {loading ? (
              <SkeletonList count={4} />
            ) : sorted.length === 0 ? (
              <div className="text-center py-10 space-y-2 border border-dashed border-border rounded-xl">
                <Wrench className="h-8 w-8 text-text-secondary mx-auto" />
                <p className="text-xs text-text-secondary font-semibold uppercase">
                  {search ? 'No matching equipment found' : 'No machinery cataloged'}
                </p>
                <p className="text-[10px] text-text-secondary max-w-xs mx-auto">
                  {search ? 'Try a different search term.' : 'Add equipment assets on the left to populate the database.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border/60">
                {sorted.map((item) => (
                  <div key={item._id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-text">{item.name}</span>
                        <Badge variant={item.category === 'Rapid Prototyping' ? 'primary' : item.category === 'Machining' ? 'warning' : item.category === 'Electronics & IoT' ? 'success' : 'danger'}>{item.category || 'General'}</Badge>
                        <span className="text-[10px] text-accent bg-accent/5 px-1.5 py-0.5 rounded border border-accent/10">Order: {item.order}</span>
                      </div>
                      <p className="text-xs text-text-secondary max-w-md line-clamp-1">{item.description}</p>

                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-secondary">
                        <span className="flex items-center gap-1 bg-bg px-2 py-0.5 rounded border border-border">
                          <Cpu className="h-3 w-3" /> Location: <b>{item.location || 'Main Zone'}</b>
                        </span>
                        {item.specs && item.specs.length > 0 && (
                          <span className="text-accent">({item.specs.length} specifications)</span>
                        )}
                      </div>

                      {/* Availability bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-border/40 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              availPercent(item) >= 70 ? 'bg-success' : availPercent(item) >= 30 ? 'bg-accent-2' : 'bg-accent'
                            }`}
                            style={{ width: `${availPercent(item)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-text-secondary">
                          {item.available}/{item.quantity}
                        </span>
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
                          onClick={() => { setShowForm(true); handleEditClick(item); }}
                          className="p-1.5 hover:text-text text-text-secondary bg-bg-elevated hover:bg-border/20 border border-border rounded transition-colors"
                          title="Edit asset details"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ id: item._id, name: item.name })}
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

