export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-accent" />
    </div>
  );
}
