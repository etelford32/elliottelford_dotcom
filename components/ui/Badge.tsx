import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  text: string;
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'default', className }) => {
  const baseStyles = "inline-block text-xs font-medium px-3 py-1 rounded-full";

  const variants = {
    default: "bg-foreground/10 text-foreground border border-foreground/20",
    accent: "bg-accent/20 text-accent border border-accent/40",
    secondary: "bg-secondary/20 text-secondary border border-secondary/40",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {text}
    </span>
  );
};
