'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { ReactNode } from 'react';

interface SubscriptionGateProps {
  children: ReactNode;
  tier?: 'pro' | 'premium';
  fallback?: ReactNode;
}

/**
 * Component to gate content behind subscription tiers
 * Shows upgrade prompt if user doesn't have required subscription
 */
export function SubscriptionGate({ children, tier = 'pro', fallback }: SubscriptionGateProps) {
  const { user, isAuthenticated, hasSubscription } = useAuth();

  // Not authenticated - show sign in prompt
  if (!isAuthenticated) {
    return fallback || (
      <div className="relative rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10 backdrop-blur-sm p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-3xl md:text-4xl font-bold text-accent font-heading">
            Premium Content
          </h3>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Sign in to access this exclusive content and unlock advanced simulations, tutorials, and interactive experiences.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/login"
              className="px-8 py-4 bg-accent hover:bg-accent/80 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-secondary/20 hover:bg-secondary/30 border-2 border-secondary text-secondary font-bold text-lg rounded-xl transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated but doesn't have required subscription
  if (!hasSubscription(tier)) {
    const tierNames = {
      pro: 'Pro',
      premium: 'Premium',
    };

    return fallback || (
      <div className="relative rounded-2xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-accent/10 backdrop-blur-sm p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-3xl md:text-4xl font-bold text-secondary font-heading">
            Upgrade to {tierNames[tier]}
          </h3>
          <p className="text-xl text-foreground/80 leading-relaxed">
            This content is available to {tierNames[tier]} subscribers. Upgrade your account to unlock advanced features, exclusive simulations, and premium content.
          </p>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="px-4 py-2 rounded-full bg-accent/20 border border-accent/40 text-accent text-sm font-semibold">
                Current: {user?.subscription_tier?.toUpperCase() || 'FREE'}
              </span>
              <span className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-sm font-semibold">
                Required: {tierNames[tier].toUpperCase()}
              </span>
            </div>
            <Link
              href="/subscribe"
              className="inline-block px-8 py-4 bg-secondary hover:bg-secondary/80 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/50 hover:scale-105"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Has required subscription - show content
  return <>{children}</>;
}

/**
 * Simpler component to show premium badge
 */
export function PremiumBadge({ tier = 'pro' }: { tier?: 'pro' | 'premium' }) {
  const colors = {
    pro: 'border-accent/40 bg-accent/10 text-accent',
    premium: 'border-secondary/40 bg-secondary/10 text-secondary',
  };

  const icons = {
    pro: '⭐',
    premium: '👑',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors[tier]} font-semibold text-sm`}>
      <span>{icons[tier]}</span>
      <span>{tier.toUpperCase()}</span>
    </span>
  );
}
