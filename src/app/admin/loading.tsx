export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-text">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent" />
      <p className="mt-4 text-sm text-text-secondary">Loading dashboard...</p>
    </div>
  );
}
