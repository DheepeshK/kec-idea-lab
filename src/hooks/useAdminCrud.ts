'use client';

import { useState, useCallback, useEffect } from 'react';

interface CrudState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface CrudActions {
  deleteItem: (id: string, onSuccess?: () => void) => Promise<void>;
  refresh: () => Promise<void>;
  setData: (data: any[]) => void;
}

export function useAdminCrud<T>(
  fetchUrl: string,
  deleteUrlPrefix?: string
): CrudState<T> & CrudActions {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(fetchUrl);
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]);

  const deleteItem = useCallback(
    async (id: string, onSuccess?: () => void) => {
      const url = deleteUrlPrefix ? `${deleteUrlPrefix}/${id}` : `${fetchUrl}/${id}`;
      try {
        const res = await fetch(url, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          setData((prev) => prev.filter((item: any) => item._id !== id));
          onSuccess?.();
        } else {
          throw new Error(result.error || 'Failed to delete.');
        }
      } catch (err: any) {
        throw err;
      }
    },
    [fetchUrl, deleteUrlPrefix]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, deleteItem, refresh, setData };
}
