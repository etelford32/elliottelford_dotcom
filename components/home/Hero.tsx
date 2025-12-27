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
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-accent text-lg md:text-xl mb-4 font-mono"
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4"
          >
            Elliot Telford
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground/70 mb-8"
          >
            Building the Future Through{' '}
            <span className="text-accent">Code & Physics</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/60 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Game Developer | Computational Astrophysicist | Systems Engineer
          </motion.p>

          {/* Mission Statement with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="relative mb-12 max-w-3xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 blur-2xl opacity-50" />
            <p className="relative text-base md:text-lg text-accent/80 border border-accent/30 rounded-lg px-6 py-4 backdrop-blur-sm">
              Applying science and technology for humanity's optimization as a resilient, <span className="text-accent font-semibold">interstellar species</span>
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
