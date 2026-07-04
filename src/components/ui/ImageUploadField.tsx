'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Trash2, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function ImageUploadField({
  value,
  onChange,
  label = 'Image / Photo',
  disabled = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    // Size check
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large (max 5MB).');
      return;
    }

    // Type check
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success && result.url) {
        onChange(result.url);
      } else {
        setError(result.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled || uploading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-semibold text-slate-400">{label}</label>
      
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-video max-h-48 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={disabled || uploading}
              className="text-white border-slate-700 bg-slate-900/80 hover:bg-slate-900"
            >
              Change
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange('')}
              disabled={disabled || uploading}
              className="text-rose-400 border-rose-950 bg-rose-950/20 hover:bg-rose-950/40"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            uploading
              ? 'border-indigo-500/50 bg-indigo-500/5'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
          ) : (
            <UploadCloud className="h-8 w-8 text-slate-500 mb-2" />
          )}
          
          <p className="text-xs text-slate-300 font-medium">
            {uploading ? 'Uploading asset...' : 'Drag & drop image, or click to select'}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            JPEG, PNG, GIF, WebP (Max 5MB)
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || uploading}
      />

      {error && (
        <p className="text-[10px] text-rose-400 font-semibold mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
