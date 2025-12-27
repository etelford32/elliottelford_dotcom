'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThreeJsHero } from './ThreeJsHero';
import { ShootingStars } from './ShootingStars';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Animated Background */}
      <ThreeJsHero />

      {/* Interactive Shooting Stars */}
      <ShootingStars />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-32 lg:py-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto space-y-8"
        >
          {/* Greeting Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block"
          >
            <div className="px-6 py-3 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl">
              <p className="text-accent text-lg md:text-xl font-mono">
                Hi, I'm
              </p>
            </div>
          </motion.div>

          {/* Name Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-block"
          >
            <div className="px-10 py-6 bg-primary/40 backdrop-blur-md border border-accent/20 rounded-2xl shadow-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
                Elliot Telford
              </h1>
            </div>
          </motion.div>

          {/* Tagline Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="px-8 py-6 bg-gradient-to-r from-accent/5 via-secondary/5 to-accent/5 backdrop-blur-sm border border-accent/20 rounded-2xl">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground/90 leading-relaxed">
                Building the Future Through{' '}
                <span className="text-accent">Code & Physics</span>
              </h2>
            </div>
          </motion.div>

          {/* Description Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="px-8 py-4 bg-primary/30 backdrop-blur-sm border border-accent/20 rounded-xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Game Developer | Computational Astrophysicist | Systems Engineer
              </p>
            </div>
          </motion.div>

          {/* Mission Statement with Enhanced Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 blur-3xl opacity-60" />
            <div className="relative bg-primary/60 backdrop-blur-md border border-accent/30 rounded-2xl px-10 py-8 shadow-2xl">
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
                Applying science and technology for humanity's optimization as a resilient,{' '}
                <span className="text-accent font-semibold">interstellar species</span>
              </p>
            </div>
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
