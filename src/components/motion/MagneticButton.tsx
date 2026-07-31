interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  return (
    <div
      className={`relative inline-block rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] hover:bg-accent/5 ${className}`}
    >
      {children}
    </div>
  );
}
