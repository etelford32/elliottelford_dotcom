'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Placeholder data - will be replaced with real blog posts later
const recentPosts = [
  {
    id: 1,
    title: 'Building Realistic Orbital Mechanics in Games',
    excerpt: 'How I implemented n-body physics simulation for Explore the Universe 2175 using Rust and custom integrators.',
    category: 'gamedev',
    date: '2025-01-15',
    readTime: '8 min read',
    href: '/blog/orbital-mechanics-in-games',
  },
  {
    id: 2,
    title: 'Visualizing Black Hole Photon Spheres with WebGL',
    excerpt: 'A deep dive into rendering gravitational lensing effects and photon trajectories around black holes using Three.js.',
    category: 'space',
    date: '2025-01-10',
    readTime: '12 min read',
    href: '/blog/black-hole-photon-spheres',
  },
  {
    id: 3,
    title: 'The Adaptive AI System in My Space RTS',
    excerpt: 'Designing an AI opponent that learns from player behavior and adapts its strategy in real-time.',
    category: 'gamedev',
    date: '2025-01-05',
    readTime: '10 min read',
    href: '/blog/adaptive-ai-system',
  },
];

const categoryColors: Record<string, 'accent' | 'secondary' | 'default'> = {
  gamedev: 'secondary',
  space: 'accent',
  health: 'default',
  opinion: 'default',
};

export const RecentPosts: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 relative bg-card-bg/20">
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
                Recent Writing
              </h2>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="px-8 py-5 bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Thoughts on game development, astrophysics, and the intersection of code and physics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-16">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card href={post.href} className="group h-full">
                <div className="space-y-4">
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <Badge
                      text={post.category}
                      variant={categoryColors[post.category] || 'default'}
                    />
                    <span className="text-xs text-foreground/50">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read Time */}
                  <div className="flex items-center text-foreground/50 text-xs pt-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-accent text-sm font-medium group-hover:text-[#52e8c4] transition-colors">
                    <span>Read More</span>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center text-accent hover:text-[#52e8c4] transition-colors text-lg font-medium"
          >
            <span>View All Posts</span>
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
