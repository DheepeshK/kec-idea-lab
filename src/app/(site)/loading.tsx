export default function SiteLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-text">
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 rounded-full bg-accent-2 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 rounded-full bg-accent-3 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <p className="mt-4 text-sm text-text-secondary">Loading...</p>
    </div>
  );
}
