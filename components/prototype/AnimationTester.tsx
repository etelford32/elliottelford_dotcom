'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const AnimationTester: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationType, setAnimationType] = useState<'fade' | 'slide' | 'scale' | 'rotate'>('fade');

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
    scale: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
    },
    rotate: {
      initial: { rotate: -180, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
      exit: { rotate: 180, opacity: 0 },
    },
  };

  return (
    <Card>
      <h3 className="text-xl font-bold text-accent mb-4">Animation Tester</h3>

      <div className="space-y-4">
        {/* Animation Type Selector */}
        <div>
          <p className="text-sm text-foreground/70 mb-2">Animation Type:</p>
          <div className="flex gap-2 flex-wrap">
            {(['fade', 'slide', 'scale', 'rotate'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setAnimationType(type)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  animationType === type
                    ? 'bg-accent text-primary'
                    : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Demo Area */}
        <div className="h-48 bg-background/30 rounded flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={animationType}
                {...animations[animationType]}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute"
              >
                <div className="bg-accent text-primary px-8 py-4 rounded-lg font-bold text-lg">
                  Animated Box
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? 'Hide' : 'Show'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setIsVisible(true), 100);
            }}
          >
            Replay
          </Button>
        </div>

        {/* Continuous Animation Examples */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foreground/10">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-accent/30 rounded-full mx-auto mb-2"
            />
            <p className="text-xs text-foreground/70">Bounce</p>
          </div>

          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 bg-secondary/30 rounded mx-auto mb-2"
            />
            <p className="text-xs text-foreground/70">Spin</p>
          </div>

          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-accent/30 rounded-lg mx-auto mb-2"
            />
            <p className="text-xs text-foreground/70">Pulse</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
