'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Placeholder data - will be replaced with real data later
const featuredItems = [
  {
    id: 1,
    title: 'Saturn Rings Simulation',
    category: 'Simulation',
    description: 'Scientifically accurate simulation of Saturn\'s ring system with particle physics and gravitational interactions.',
    image: '/images/placeholder-saturn.jpg',
    tags: ['Three.js', 'WebGL', 'Physics'],
    href: '/simulations/planetary-systems/saturn',
  },
  {
    id: 2,
    title: 'Explore the Universe 2175',
    category: 'Game',
    description: 'Physics-based space RTS with adaptive AI, realistic orbital mechanics, and dynamic faction conflicts.',
    image: '/images/placeholder-game.jpg',
    tags: ['Rust', 'AI', 'RTS'],
    href: '/game',
  },
  {
    id: 3,
    title: 'TON 618 Black Hole',
    category: 'Simulation',
    description: 'Interactive visualization of one of the largest known black holes with photon sphere and accretion disk.',
    image: '/images/placeholder-blackhole.jpg',
    tags: ['Three.js', 'Relativity', 'Visualization'],
    href: '/simulations/black-holes/ton-618',
  },
  {
    id: 4,
    title: 'Kerr Black Hole',
    category: 'Simulation',
    description: 'Rotating black hole simulation featuring frame-dragging effects and ergosphere visualization.',
    image: '/images/placeholder-kerr.jpg',
    tags: ['Physics', 'WebGL', 'Shaders'],
    href: '/simulations/black-holes/kerr-black-hole',
  },
];

export const FeaturedWork: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A selection of interactive simulations and projects at the intersection of physics and code
          </p>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card href={item.href} className="group h-full overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-accent/20 to-secondary/20 mb-4 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {item.category === 'Game' ? '🎮' : '🌌'}
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Category Badge */}
                  <Badge
                    text={item.category}
                    variant={item.category === 'Game' ? 'secondary' : 'accent'}
                  />

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-foreground/10 text-foreground/70 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Link */}
                  <div className="flex items-center text-accent text-sm font-medium pt-2 group-hover:text-[#52e8c4] transition-colors">
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/projects"
            className="inline-flex items-center text-accent hover:text-[#52e8c4] transition-colors text-lg font-medium"
          >
            <span>View All Projects</span>
            <svg
              className="w-5 h-5 ml-2"
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
          </a>
        </motion.div>
      </div>
    </section>
  );
};
