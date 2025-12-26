'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  loadTime: number;
  navigationTiming?: PerformanceNavigationTiming;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    loadTime: 0,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Get initial load time
    if (typeof window !== 'undefined' && window.performance) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigationTiming?.loadEventEnd - navigationTiming?.fetchStart || 0;

      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(loadTime),
        navigationTiming,
      }));
    }
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        // Get memory if available (Chrome only)
        const memory = (performance as any).memory
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
          : undefined;

        setMetrics(prev => ({ ...prev, fps, memory }));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMonitoring]);

  const getTiming = (name: keyof PerformanceNavigationTiming): string => {
    if (!metrics.navigationTiming) return '-';
    const value = metrics.navigationTiming[name] as number;
    return value ? `${Math.round(value)}ms` : '-';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-accent">Performance Monitor</h3>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            isMonitoring
              ? 'bg-secondary/20 text-secondary border border-secondary'
              : 'bg-accent/20 text-accent border border-accent'
          }`}
        >
          {isMonitoring ? '⏸ Pause' : '▶ Start'} FPS Monitor
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-background/30 rounded">
          <div className="text-2xl font-bold text-accent">{metrics.fps}</div>
          <p className="text-xs text-foreground/70">FPS</p>
        </div>

        <div className="text-center p-3 bg-background/30 rounded">
          <div className="text-2xl font-bold text-accent">
            {metrics.loadTime ? `${metrics.loadTime}ms` : '-'}
          </div>
          <p className="text-xs text-foreground/70">Load Time</p>
        </div>

        {metrics.memory !== undefined && (
          <div className="text-center p-3 bg-background/30 rounded">
            <div className="text-2xl font-bold text-accent">{metrics.memory}MB</div>
            <p className="text-xs text-foreground/70">Memory</p>
          </div>
        )}

        <div className="text-center p-3 bg-background/30 rounded">
          <div className="text-2xl font-bold text-accent">
            {metrics.navigationTiming ? getTiming('domContentLoadedEventEnd') : '-'}
          </div>
          <p className="text-xs text-foreground/70">DOM Ready</p>
        </div>
      </div>

      {metrics.navigationTiming && (
        <div className="text-xs space-y-1 text-foreground/70">
          <div className="flex justify-between">
            <span>DNS Lookup:</span>
            <span>{getTiming('domainLookupEnd')}</span>
          </div>
          <div className="flex justify-between">
            <span>TCP Connection:</span>
            <span>{getTiming('connectEnd')}</span>
          </div>
          <div className="flex justify-between">
            <span>Request Time:</span>
            <span>{getTiming('responseEnd')}</span>
          </div>
          <div className="flex justify-between">
            <span>DOM Processing:</span>
            <span>{getTiming('domComplete')}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-foreground/50 mt-4">
        {isMonitoring ? '🟢 Live monitoring active' : '⚪ Click "Start" to monitor FPS'}
      </p>
    </Card>
  );
};
