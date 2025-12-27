'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RELATED_SITES } from '@/lib/constants';

/**
 * Cross-site promotional banner for interlinking
 */
export const CrossSitePromo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-accent/30 to-secondary/30 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Card content */}
            <div className="relative bg-primary/60 backdrop-blur-md border border-accent/30 rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="space-y-6">
                  <div className="inline-block">
                    <div className="px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/40 rounded-xl">
                      <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                        Now Available
                      </p>
                    </div>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {RELATED_SITES.game.name}
                  </h3>

                  <p className="text-lg text-foreground/80 leading-relaxed">
                    A physics-based space RTS featuring adaptive AI, realistic orbital mechanics,
                    and dynamic faction conflicts. Experience the future of strategic space warfare.
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {[
                      'Realistic N-body orbital physics',
                      'Adaptive AI that learns from your tactics',
                      'Dynamic faction diplomacy system',
                      'Procedurally generated star systems'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-foreground/70">
                        <span className="text-accent mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={RELATED_SITES.game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-primary font-bold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group"
                  >
                    <span>🎮 Visit Game Website</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </div>

                {/* Visual Element */}
                <div className="hidden lg:block">
                  <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl border border-accent/30 overflow-hidden">
                    {/* Placeholder for game screenshot/video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl opacity-50">🌌</div>
                    </div>

                    {/* Overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-16 h-16 bg-accent/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Related content links for SEO and user navigation
 */
interface RelatedLink {
  title: string;
  href: string;
  description: string;
  category?: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({
  links,
  title = "Related Content"
}) => {
  return (
    <div className="py-12 border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="inline-block mb-8">
            <div className="px-6 py-3 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl">
              <h3 className="text-xl md:text-2xl font-bold text-accent">
                {title}
              </h3>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-xl hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="space-y-3">
                  {link.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/20 text-secondary rounded-md">
                      {link.category}
                    </span>
                  )}

                  <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                    <span>{link.title}</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </h4>

                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Breadcrumbs for navigation and SEO
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-accent font-medium" : "text-foreground/60"}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <svg className="w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
