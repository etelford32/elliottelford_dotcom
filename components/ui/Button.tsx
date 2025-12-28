import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseStyles = "font-heading inline-flex items-center justify-center rounded-xl font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";

    const variants = {
      primary: "bg-gradient-to-r from-accent to-blue-600 text-white hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 border border-accent/30",
      secondary: "border-2 border-secondary text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-purple-500/10 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-1 active:scale-95",
      ghost: "text-accent hover:bg-gradient-to-r hover:from-accent/10 hover:to-blue-500/10 hover:shadow-md hover:-translate-y-0.5 active:scale-95",
    };

    const sizes = {
      sm: "text-sm px-5 py-2.5",
      md: "text-base px-7 py-3.5",
      lg: "text-lg px-9 py-5",
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    const ButtonContent = (
      <>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        <span className="relative z-10">{children}</span>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {ButtonContent}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {ButtonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
