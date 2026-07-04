import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-bg-elevated/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden p-6 transition-all duration-500 hover:duration-300 ${
        hoverEffect ? 'hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/15 hover:bg-bg-elevated' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
