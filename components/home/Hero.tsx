'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThreeJsHero } from './ThreeJsHero';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Animated Background */}
      <ThreeJsHero />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-40 lg:py-48 relative z-10 pl-[10px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto space-y-20 lg:space-y-24"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-accent text-xl md:text-2xl font-mono text-shadow-glow tracking-wider">
              Welcome to
            </p>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground font-display text-3d tracking-tight">
              TELFORD PROJECTS
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground/90 leading-relaxed font-heading text-bevel tracking-wide">
              Building the Future Through{' '}
              <span className="text-accent text-shadow-glow">Code & Physics</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-body text-shadow-subtle tracking-wide">
              Founded by <span className="text-accent font-semibold">Elliot Telford</span> | Game Development | Computational Astrophysics | Systems Engineering
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed font-body text-shadow-subtle tracking-wide">
              Applying science and technology for humanity&apos;s optimization as a resilient,{' '}
              <span className="text-accent font-semibold text-shadow-glow">interstellar species</span>
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button href="/simulations" variant="primary" size="lg">
              🌌 Explore Simulations
            </Button>
            <Button href="/game" variant="secondary" size="lg">
              🎮 View Game
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              💬 Get In Touch
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
