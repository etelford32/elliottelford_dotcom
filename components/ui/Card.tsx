import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, href, isExternal = false, onClick }) => {
  const baseStyles = "bg-card-bg border border-card-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1";

  const classes = cn(baseStyles, className);

  if (href) {
    // External link
    if (isExternal || href.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    // Internal link
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
