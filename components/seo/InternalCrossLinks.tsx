'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Quick link cards for internal navigation
 */
interface QuickLink {
  title: string;
  href: string;
  icon: string;
  description: string;
  color: 'accent' | 'secondary' | 'primary';
}

export const QuickLinksGrid: React.FC<{ links: QuickLink[] }> = ({ links }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={link.href} className="group block">
            <div className="relative h-full p-10 bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-2xl hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2">
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${link.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />

              <div className="relative space-y-6 text-center">
                {/* Icon */}
                <div className="text-6xl group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-${link.color} group-hover:text-accent transition-colors font-heading text-shadow-glow`}>
                  {link.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed text-center font-body text-shadow-subtle">
                  {link.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center justify-center text-accent text-sm font-medium pt-2 group-hover:translate-x-2 transition-transform">
                  <span>Explore</span>
                  <svg
                    className="w-4 h-4 ml-2"
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
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Inline text link with hover animation
 */
interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export const InlineLink: React.FC<InlineLinkProps> = ({ href, children, external = false }) => {
  const linkClasses = "relative inline-flex items-center gap-1 text-accent hover:text-[#52e8c4] font-medium transition-colors group";

  const arrow = (
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
  );

  const underline = (
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {children}
        {arrow}
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
      {arrow}
      {underline}
    </Link>
  );
};

/**
 * Featured content card with image
 */
interface FeaturedCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  category: string;
  readTime?: string;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title,
  description,
  href,
  image,
  category,
  readTime
}) => {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative h-full bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300"
      >
        {/* Image */}
        {image && (
          <div className="relative h-48 bg-gradient-to-br from-accent/20 to-secondary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
              🌌
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg border border-accent/30">
              {category}
            </span>
            {readTime && (
              <span className="text-foreground/60">{readTime}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 leading-relaxed">
            {description}
          </p>

          {/* Read more */}
          <div className="flex items-center text-accent font-medium pt-2 group-hover:translate-x-2 transition-transform">
            <span>Read more</span>
            <svg
              className="w-4 h-4 ml-2"
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
      </motion.div>
    </Link>
  );
};

/**
 * Call-to-action banner for internal pages
 */
interface CTABannerProps {
  title: string;
  description: string;
  primaryLink: { text: string; href: string };
  secondaryLink?: { text: string; href: string };
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  primaryLink,
  secondaryLink
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group my-32"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Card */}
      <div className="relative bg-primary/60 backdrop-blur-md border border-accent/30 rounded-3xl p-16 lg:p-24">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
            {title}
          </h2>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed text-center font-body text-shadow-subtle">
              {description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryLink.href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-primary font-bold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group"
            >
              <span>{primaryLink.text}</span>
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
            </Link>

            {secondaryLink && (
              <Link
                href={secondaryLink.href}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary/60 backdrop-blur-sm border-2 border-accent/30 text-accent font-bold rounded-xl hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
              >
                <span>{secondaryLink.text}</span>
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
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
