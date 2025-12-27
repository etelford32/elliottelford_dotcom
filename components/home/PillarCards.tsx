'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const pillars = [
  {
    icon: '🎮',
    title: 'Game Development',
    description: 'Explore the Universe 2175 - A physics-based space RTS featuring adaptive AI and realistic orbital mechanics powered by a custom Rust engine.',
    highlights: ['Adaptive AI', 'Orbital Mechanics', 'Custom Rust Engine'],
    cta: 'Visit Game Website',
    href: 'https://exploretheuniverse2175.com',
    isExternal: true,
    gradient: 'from-accent/20 to-transparent',
  },
  {
    icon: '🌌',
    title: 'Interactive Simulations',
    description: 'Scientifically accurate visualizations of planetary systems, black holes, and stellar dynamics built with Three.js and WebGL.',
    highlights: ['Three.js', 'WebGL', 'Scientific Accuracy'],
    cta: 'Explore Simulations',
    href: '/simulations',
    gradient: 'from-secondary/20 to-transparent',
  },
  {
    icon: '💡',
    title: 'Services & Insights',
    description: 'Systems engineering consulting, technical content creation, and interdisciplinary problem-solving at the intersection of code and physics.',
    highlights: ['Consulting', 'Technical Writing', 'Problem Solving'],
    cta: 'Learn More',
    href: '/services',
    gradient: 'from-accent/10 to-transparent',
  },
];

export const PillarCards: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <div className="px-8 py-4 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
                What I Do
              </h2>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="px-8 py-5 bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Bridging the gap between theoretical physics and practical software engineering
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                href={pillar.href}
                isExternal={pillar.isExternal}
                className="h-full group relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/50 via-secondary/50 to-accent/50 blur-sm" style={{ margin: '-2px' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-accent mb-3 group-hover:text-[#52e8c4] transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pillar.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-2 py-1 bg-accent/10 text-accent rounded border border-accent/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-accent group-hover:text-[#52e8c4] transition-colors">
                    <span className="font-medium">{pillar.cta}</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
