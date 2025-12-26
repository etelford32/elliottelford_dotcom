'use client';

import React, { useState } from 'react';

export const DevBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
  const showBanner = process.env.NEXT_PUBLIC_SHOW_DEV_BANNER === 'true';

  if (!showBanner || !isVisible) return null;

  const bannerConfig = {
    development: {
      bg: 'bg-accent/20',
      border: 'border-accent',
      text: 'text-accent',
      message: '🚧 Development Mode - Local Environment',
    },
    preview: {
      bg: 'bg-secondary/20',
      border: 'border-secondary',
      text: 'text-secondary',
      message: '🔬 Preview/Prototype Build - For Testing & Optimization',
    },
  };

  const config = isPreview || environment === 'preview'
    ? bannerConfig.preview
    : bannerConfig.development;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${config.bg} border-b ${config.border} py-2 px-4`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className={`text-sm font-medium ${config.text}`}>
          {config.message}
          {isPreview && (
            <span className="ml-2 text-xs opacity-75">
              • Changes may not be production-ready
            </span>
          )}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className={`${config.text} hover:opacity-70 transition-opacity`}
          aria-label="Close banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
