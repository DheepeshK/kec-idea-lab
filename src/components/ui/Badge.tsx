import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
  ...props
}: BadgeProps) {
  const baseStyle = 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase';
  
  const variants = {
    primary: 'bg-bg-elevated text-accent border border-border shadow-sm',
    secondary: 'bg-bg-elevated text-text-secondary border border-border',
    warning: 'bg-bg-elevated text-warn border border-border shadow-sm',
    success: 'bg-bg-elevated text-success border border-border shadow-sm',
    danger: 'bg-bg-elevated text-rose-500 border border-rose-500/30 shadow-sm',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
