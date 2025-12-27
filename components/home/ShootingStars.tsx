'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
}

export const ShootingStars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  const createShootingStar = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;

    setStars((prev) => [...prev, { id, x, y }]);

    // Remove star after animation completes
    setTimeout(() => {
      setStars((prev) => prev.filter((star) => star.id !== id));
    }, 2000);
  }, []);

  return (
    <div
      className="absolute inset-0 cursor-crosshair"
      onClick={createShootingStar}
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              x: star.x,
              y: star.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: star.x + 300,
              y: star.y - 150,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute pointer-events-none"
            style={{ left: 0, top: 0 }}
          >
            {/* Star Core */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-accent/40 rounded-full blur-lg" />
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-md" />
              </div>

              {/* Star */}
              <svg
                className="relative w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="url(#starGradient)"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-accent"
                />
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64ffda" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Trail */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0.8 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-1/2 right-full h-0.5 w-32 origin-right -translate-y-1/2"
                style={{
                  background: 'linear-gradient(90deg, transparent, #64ffda, #a78bfa)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
