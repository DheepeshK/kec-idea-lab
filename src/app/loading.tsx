export default function RootLoading() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-text">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl border-2 border-accent/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-3/20 animate-pulse" />
          <span className="relative text-2xl font-bold font-display text-accent">I</span>
        </div>
      </div>
      <div className="mt-6 space-y-2 text-center">
        <p className="font-display font-bold text-lg tracking-tight">
          IDEA Lab <span className="text-accent">@ KEC</span>
        </p>
        <div className="flex items-center justify-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-accent-3 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
