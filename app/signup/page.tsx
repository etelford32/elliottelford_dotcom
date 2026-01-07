'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro' | 'premium'>('free');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const subscriptionTiers = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      icon: '🚀',
      features: [
        'Access to basic simulations',
        'View public projects',
        'Read blog articles',
        'Community support',
      ],
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      icon: '⭐',
      features: [
        'All Free features',
        'Advanced physics simulations',
        'Interactive tutorials',
        'Download source code',
        'Priority support',
        'Early access to features',
      ],
      highlighted: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      icon: '👑',
      features: [
        'All Pro features',
        'Custom simulation requests',
        'Private consulting',
        'Exclusive content',
        '1-on-1 mentorship sessions',
        'Commercial license',
      ],
      highlighted: false,
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, name);
      // In production, redirect to payment if pro/premium selected
      if (selectedTier !== 'free') {
        router.push(`/subscribe?tier=${selectedTier}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent font-heading text-shadow-glow mb-4">
            Join the Universe
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70">
            Create your account and start exploring
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Form */}
          <div className="relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-accent font-heading mb-8">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  disabled={loading}
                />
                <p className="text-xs text-foreground/50 mt-1">Minimum 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-foreground/20 text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-accent hover:bg-accent/80 disabled:bg-accent/50 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-foreground/50">OR</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-foreground/70">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent font-heading mb-8">
              Choose Your Plan
            </h2>

            <div className="space-y-4">
              {subscriptionTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id as 'free' | 'pro' | 'premium')}
                  className={`
                    w-full text-left p-6 rounded-xl border-2 transition-all duration-300
                    ${selectedTier === tier.id
                      ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                      : 'border-foreground/10 bg-card/30 hover:border-accent/30'
                    }
                    ${tier.highlighted ? 'ring-2 ring-secondary/30' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{tier.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-accent font-heading">
                          {tier.name}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                          <span className="text-foreground/60">{tier.period}</span>
                        </div>
                      </div>
                    </div>
                    {tier.highlighted && (
                      <span className="px-3 py-1 rounded-full bg-secondary text-black text-xs font-bold">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/80">
                        <span className="text-accent mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Demo Notice */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="text-sm text-foreground/60">
                <strong className="text-secondary">Demo Mode:</strong> Subscription selection is for demonstration. Payment integration coming with Supabase!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
