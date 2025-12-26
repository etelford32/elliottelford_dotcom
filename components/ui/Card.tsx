import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, href, onClick }) => {
  const baseStyles = "bg-card-bg border border-card-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1";

  const classes = cn(baseStyles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(classes, "w-full text-left cursor-pointer")}>
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
};
