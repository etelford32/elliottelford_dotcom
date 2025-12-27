'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call (replace with actual newsletter service)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 opacity-50" />

            <div className="relative z-10 text-center p-8 md:p-12">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: 'spring',
                  bounce: 0.5
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                className="text-6xl mb-6 cursor-pointer"
              >
                🚀
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
                Join the Journey
              </h2>

              {/* Description */}
              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Get updates on new simulations, game development progress, and insights at the intersection of physics and code.
                No spam, just space science and engineering.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 px-4 py-3 bg-background/50 border border-accent/30 rounded-md text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 py-3 bg-accent text-primary font-medium rounded-md hover:bg-[#52e8c4] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </div>

                {/* Success Message */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent text-sm mt-3"
                  >
                    ✓ Thanks for subscribing! Check your inbox for confirmation.
                  </motion.p>
                )}
              </form>

              {/* Privacy Note */}
              <p className="text-xs text-foreground/50">
                By subscribing, you agree to receive updates. Unsubscribe anytime.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
