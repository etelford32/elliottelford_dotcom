'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SpaceshipLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Spaceship body */}
        <motion.g
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main hull */}
          <path
            d="M 30 40 L 60 25 L 140 25 L 165 40 L 140 55 L 60 55 Z"
            fill="url(#shipGradient)"
            stroke="#2563eb"
            strokeWidth="2"
          />

          {/* Cockpit */}
          <ellipse
            cx="150"
            cy="40"
            rx="15"
            ry="12"
            fill="url(#cockpitGradient)"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />

          {/* Window */}
          <ellipse
            cx="150"
            cy="40"
            rx="8"
            ry="6"
            fill="#93c5fd"
            opacity="0.6"
          />

          {/* Top wing */}
          <path
            d="M 80 25 L 85 10 L 110 15 L 105 25 Z"
            fill="url(#wingGradient)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />

          {/* Bottom wing */}
          <path
            d="M 80 55 L 85 70 L 110 65 L 105 55 Z"
            fill="url(#wingGradient)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />

          {/* Detail lines */}
          <line x1="60" y1="40" x2="140" y2="40" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
          <line x1="70" y1="35" x2="130" y2="35" stroke="#60a5fa" strokeWidth="0.8" opacity="0.3" />
          <line x1="70" y1="45" x2="130" y2="45" stroke="#60a5fa" strokeWidth="0.8" opacity="0.3" />
        </motion.g>

        {/* Animated engine glow */}
        <motion.g
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Top engine */}
          <ellipse
            cx="35"
            cy="32"
            rx="8"
            ry="4"
            fill="#3b82f6"
            opacity="0.7"
            filter="url(#glow)"
          />

          {/* Bottom engine */}
          <ellipse
            cx="35"
            cy="48"
            rx="8"
            ry="4"
            fill="#3b82f6"
            opacity="0.7"
            filter="url(#glow)"
          />

          {/* Engine trails */}
          <motion.path
            d="M 30 32 L 10 32 L 15 32"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.8"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 30 48 L 10 48 L 15 48"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.8"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />
        </motion.g>

        {/* Gradients */}
        <defs>
          <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          <linearGradient id="cockpitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Sparkles around the ship */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </motion.div>
  );
};
