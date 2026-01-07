/**
 * Authentication context and utilities
 * Prepared for Supabase integration
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User interface
export interface User {
  id: string;
  email: string;
  name?: string;
  subscription_tier?: 'free' | 'pro' | 'premium';
  subscription_status?: 'active' | 'inactive' | 'trial';
  created_at?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  hasSubscription: (tier?: 'pro' | 'premium') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state (will integrate with Supabase later)
  useEffect(() => {
    // TODO: Check for existing session with Supabase
    // For now, check localStorage for demo purposes
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    setLoading(false);
  }, []);

  // Sign in function (will integrate with Supabase later)
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Replace with Supabase auth
      // For now, create a demo user
      const demoUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name: email.split('@')[0],
        subscription_tier: 'free',
        subscription_status: 'active',
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function (will integrate with Supabase later)
  const signUp = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      // TODO: Replace with Supabase auth
      const demoUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name: name || email.split('@')[0],
        subscription_tier: 'free',
        subscription_status: 'trial',
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setLoading(true);
    try {
      // TODO: Replace with Supabase auth
      localStorage.removeItem('demo_user');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has a specific subscription tier
  const hasSubscription = (tier?: 'pro' | 'premium') => {
    if (!user || user.subscription_status !== 'active') return false;
    if (!tier) return true; // Any active subscription

    const tierHierarchy = { free: 0, pro: 1, premium: 2 };
    const userTier = user.subscription_tier || 'free';
    return tierHierarchy[userTier] >= tierHierarchy[tier];
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    hasSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper to protect routes (for middleware or page-level auth)
export function requireAuth(user: User | null) {
  return !!user;
}

// Helper to check subscription requirements
export function requireSubscription(user: User | null, tier: 'pro' | 'premium') {
  if (!user) return false;

  const tierHierarchy = { free: 0, pro: 1, premium: 2 };
  const userTier = user.subscription_tier || 'free';

  return user.subscription_status === 'active' &&
         tierHierarchy[userTier] >= tierHierarchy[tier];
}
