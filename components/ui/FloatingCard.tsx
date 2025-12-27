'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  delay?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  href,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      <Card href={href} className={className}>
        {children}
      </Card>
    </motion.div>
  );
};
