'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS, SUBSCRIBE_LINK, EXTERNAL_NAVIGATION_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileNav } from './MobileNav';
import { SpaceshipLogo } from '@/components/ui/SpaceshipLogo';
import { useAuth } from '@/lib/auth';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

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
            {/* Logo with Spaceship */}
            <Link
              href="/"
              className="flex items-center gap-4 group"
            >
              <div className="w-24 h-10 lg:w-32 lg:h-12">
                <SpaceshipLogo />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-accent group-hover:text-blue-500 transition-colors font-display tracking-tight">
                  TELFORD
                </span>
                <span className="text-sm lg:text-base font-semibold text-foreground/70 group-hover:text-accent transition-colors font-heading tracking-wider">
                  PROJECTS
                </span>
              </div>
              <span className="relative hidden sm:inline-block">
                {/* Animated gradient border */}
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] rounded-full blur-sm opacity-75" />
                {/* PRO Badge */}
                <span className="relative inline-block px-3 py-1 text-xs font-bold tracking-wider bg-gradient-to-r from-accent to-secondary text-white rounded-full border border-accent/50 group-hover:scale-110 transition-transform">
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

              {/* Subscribe CTA - Special Styling */}
              <li>
                <Link
                  href={SUBSCRIBE_LINK.href}
                  className="relative px-6 py-3 text-base font-bold transition-all duration-300 rounded-lg group overflow-hidden bg-gradient-to-r from-accent/30 to-secondary/30 border-2 border-accent/60 hover:border-accent text-foreground hover:text-white hover:scale-105"
                >
                  {/* Animated glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    <span>{SUBSCRIBE_LINK.icon}</span>
                    <span>{SUBSCRIBE_LINK.name}</span>
                  </span>
                </Link>
              </li>

              {/* External Links - Special Styling */}
              {EXTERNAL_NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-6 py-3 text-base font-medium transition-all duration-300 rounded-lg group overflow-hidden bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/40 hover:border-secondary/60 text-foreground hover:text-accent"
                  >
                    {/* Animated glow */}
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center gap-2">
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                      <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}

              {/* Auth Buttons / User Menu */}
              {!user ? (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="px-6 py-3 text-base font-medium text-foreground/80 hover:text-accent transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="px-6 py-3 text-base font-bold bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/40 hover:border-accent text-accent rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 bg-accent/10 hover:bg-accent/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black font-bold">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <span className="text-foreground font-medium">{user.name || user.email.split('@')[0]}</span>
                    <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-foreground/10 bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-foreground/10">
                        <p className="text-sm text-foreground/60">Signed in as</p>
                        <p className="text-foreground font-semibold truncate">{user.email}</p>
                        {user.subscription_tier && (
                          <span className="inline-block mt-2 px-3 py-1 text-xs font-bold bg-accent/20 text-accent rounded-full border border-accent/30">
                            {user.subscription_tier.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <Link
                        href="/subscribe"
                        className="block px-4 py-3 text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Manage Subscription
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </li>
              )}
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
