'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  const iconMap = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info,
  };

  const borderMap = {
    success: 'border-success/30',
    error: 'border-accent/30',
    info: 'border-accent-3/30',
  };

  const iconColorMap = {
    success: 'text-success',
    error: 'text-accent',
    info: 'text-accent-3',
  };

  const bgMap = {
    success: 'bg-success/5',
    error: 'bg-accent/5',
    info: 'bg-accent-3/5',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const Icon = iconMap[t.type];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border ${borderMap[t.type]} ${bgMap[t.type]} bg-bg-elevated/95 backdrop-blur-md shadow-2xl shadow-accent/10 animate-in slide-in-from-right-4 fade-in duration-200`}
            >
              <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconColorMap[t.type]}`} />
              <p className="text-xs text-text flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-text-secondary hover:text-text transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
