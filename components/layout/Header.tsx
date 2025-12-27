'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-primary/98 backdrop-blur-xl shadow-2xl border-b border-accent/30"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex items-center justify-between">
            {/* Logo with PRO Badge */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <span className="text-2xl lg:text-3xl font-bold text-accent hover:text-[#52e8c4] transition-colors">
                {SITE_NAME}
              </span>
              <span className="relative">
                {/* Animated gradient border */}
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] rounded-full blur-sm opacity-75" />
                {/* PRO Badge */}
                <span className="relative inline-block px-3 py-1 text-xs font-bold tracking-wider bg-gradient-to-r from-accent to-secondary text-primary rounded-full border border-accent/50 group-hover:scale-110 transition-transform">
                  PRO
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-3">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname?.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-6 py-3 text-base font-medium transition-all duration-300 rounded-lg group overflow-hidden",
                        isActive
                          ? "text-accent bg-accent/10 border border-accent/30"
                          : "text-foreground/80 hover:text-accent hover:bg-accent/5 border border-transparent hover:border-accent/20"
                      )}
                    >
                      {/* Hover glow effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative">{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 text-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/10 border border-transparent hover:border-accent/30"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-24 lg:h-32" />
    </>
  );
};
