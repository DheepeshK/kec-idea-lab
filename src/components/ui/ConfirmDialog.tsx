'use client';

import { useEffect, useCallback } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    },
    [onCancel]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-bg-elevated border border-border rounded-2xl shadow-2xl shadow-accent/10 w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent-2/10 border border-accent-2/20">
              <AlertTriangle className="h-5 w-5 text-accent-2" />
            </div>
            <div>
              <h3 className="font-bold text-text text-sm">{title}</h3>
              <p className="text-xs text-text-secondary mt-1">{message}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-border/20 rounded transition-colors text-text-secondary hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 text-xs">
            Cancel
          </Button>
          <Button
            type="button"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            className="flex-1 text-xs"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
