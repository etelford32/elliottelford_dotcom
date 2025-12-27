'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/constants';

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    href: SOCIAL_LINKS.github,
    color: 'hover:text-[#64ffda]',
  },
  {
    name: 'Twitter',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: SOCIAL_LINKS.twitter,
    color: 'hover:text-[#64ffda]',
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: SOCIAL_LINKS.linkedin,
    color: 'hover:text-[#64ffda]',
  },
  {
    name: 'Steam',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
      </svg>
    ),
    href: SOCIAL_LINKS.steam,
    color: 'hover:text-[#66c0f4]', // Steam blue
  },
  {
    name: 'Blog',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: '/blog',
    color: 'hover:text-[#a78bfa]', // Purple/secondary
    isInternal: true,
  },
];

export const SocialFollow: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="inline-block mb-8">
            <div className="px-8 py-4 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                Let's Connect
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="px-8 py-5 bg-primary/30 backdrop-blur-sm border border-accent/20 rounded-xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Follow along for updates on space simulations, game development, and the future of interstellar exploration
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center items-center gap-8 mb-16">
            {socialPlatforms.map((platform, index) => {
              const MotionComponent = platform.isInternal ? motion(Link) : motion.a;
              const linkProps = platform.isInternal
                ? { href: platform.href }
                : {
                    href: platform.href,
                    target: '_blank' as const,
                    rel: 'noopener noreferrer',
                  };

              return (
                <MotionComponent
                  key={platform.name}
                  {...linkProps}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: 'spring',
                    bounce: 0.6
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -5, 5, 0],
                    boxShadow: '0 0 20px rgba(100, 255, 218, 0.4)',
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{
                    scale: 0.85,
                    rotate: -10
                  }}
                  className={`p-4 bg-card-bg border border-accent/30 rounded-lg text-foreground/70 transition-all hover:border-accent/60 ${platform.color}`}
                  aria-label={`Follow on ${platform.name}`}
                >
                  {platform.icon}
                </MotionComponent>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="px-6 py-3 bg-primary/40 backdrop-blur-sm border border-accent/20 rounded-xl">
              <span className="text-sm md:text-base text-foreground/70 uppercase tracking-wider font-medium">
                Building Humanity's Interstellar Future
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
