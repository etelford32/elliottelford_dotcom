'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

export const ResponsiveTester: React.FC = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });

      // Determine breakpoint (Tailwind default breakpoints)
      if (width < 640) setBreakpoint('Mobile (< 640px)');
      else if (width < 768) setBreakpoint('SM (640px - 768px)');
      else if (width < 1024) setBreakpoint('MD (768px - 1024px)');
      else if (width < 1280) setBreakpoint('LG (1024px - 1280px)');
      else if (width < 1536) setBreakpoint('XL (1280px - 1536px)');
      else setBreakpoint('2XL (≥ 1536px)');
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const testSizes = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 14', width: 390, height: 844 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Wide', width: 2560, height: 1440 },
  ];

  return (
    <Card>
      <h3 className="text-xl font-bold text-accent mb-4">Responsive Tester</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-background/30 rounded">
          <div className="text-sm text-foreground/70">Current Viewport</div>
          <div className="text-lg font-bold text-accent">
            {viewport.width} × {viewport.height}
          </div>
        </div>

        <div className="p-3 bg-background/30 rounded">
          <div className="text-sm text-foreground/70">Breakpoint</div>
          <div className="text-lg font-bold text-accent">{breakpoint}</div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-foreground/70 mb-2">Common Device Sizes:</p>
        {testSizes.map((size) => (
          <div
            key={size.name}
            className="flex items-center justify-between p-2 bg-background/20 rounded text-sm"
          >
            <span className="text-foreground">{size.name}</span>
            <span className="text-foreground/70">
              {size.width} × {size.height}
            </span>
            <div
              className={`px-2 py-1 rounded text-xs ${
                viewport.width === size.width && viewport.height === size.height
                  ? 'bg-accent text-primary'
                  : 'bg-foreground/10 text-foreground/50'
              }`}
            >
              {viewport.width === size.width && viewport.height === size.height ? 'Active' : 'Resize to test'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
        <p className="text-xs text-foreground/70">
          💡 Tip: Use browser DevTools (F12) → Toggle device toolbar to test different screen sizes
        </p>
      </div>
    </Card>
  );
};
