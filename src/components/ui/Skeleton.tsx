interface SkeletonProps {
  className?: string;
  rows?: number;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-border/40 ${className}`}
    />
  );
}

export function SkeletonCard({ rows = 3 }: SkeletonProps) {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className={`h-3 w-${i % 2 === 0 ? '4/5' : '3/5'}`} />
      ))}
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4 divide-y divide-border/60">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="pt-4 first:pt-0">
          <SkeletonCard rows={2} />
        </div>
      ))}
    </div>
  );
}
