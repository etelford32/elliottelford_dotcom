'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ComponentPlayground: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'ghost'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [badgeVariant, setBadgeVariant] = useState<'default' | 'accent' | 'secondary'>('accent');

  return (
    <div className="space-y-6">
      {/* Button Playground */}
      <Card>
        <h3 className="text-xl font-bold text-accent mb-4">Button Playground</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-foreground/70 mb-2">Variant:</p>
            <div className="flex gap-2">
              {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
                <button
                  key={variant}
                  onClick={() => setButtonVariant(variant)}
                  className={`px-3 py-1 rounded text-sm ${
                    buttonVariant === variant
                      ? 'bg-accent text-primary'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-foreground/70 mb-2">Size:</p>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setButtonSize(size)}
                  className={`px-3 py-1 rounded text-sm ${
                    buttonSize === size
                      ? 'bg-accent text-primary'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/10">
            <p className="text-sm text-foreground/70 mb-2">Preview:</p>
            <Button variant={buttonVariant} size={buttonSize}>
              Sample Button
            </Button>
          </div>
        </div>
      </Card>

      {/* Badge Playground */}
      <Card>
        <h3 className="text-xl font-bold text-accent mb-4">Badge Playground</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-foreground/70 mb-2">Variant:</p>
            <div className="flex gap-2">
              {(['default', 'accent', 'secondary'] as const).map((variant) => (
                <button
                  key={variant}
                  onClick={() => setBadgeVariant(variant)}
                  className={`px-3 py-1 rounded text-sm ${
                    badgeVariant === variant
                      ? 'bg-accent text-primary'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/10">
            <p className="text-sm text-foreground/70 mb-2">Preview:</p>
            <div className="flex gap-2 flex-wrap">
              <Badge text="Sample Badge" variant={badgeVariant} />
              <Badge text="Another Badge" variant={badgeVariant} />
              <Badge text="Third Badge" variant={badgeVariant} />
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Playground */}
      <Card>
        <h3 className="text-xl font-bold text-accent mb-4">Modal Playground</h3>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold text-accent mb-4">Modal Title</h2>
          <p className="text-foreground/70 mb-4">
            This is a modal dialog. It can contain any content you want. Click outside,
            press ESC, or click the close button to dismiss.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            <Button variant="secondary" onClick={() => alert('Action clicked!')}>
              Take Action
            </Button>
          </div>
        </Modal>
      </Card>

      {/* Loading States */}
      <Card>
        <h3 className="text-xl font-bold text-accent mb-4">Loading States</h3>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <LoadingSpinner size="sm" />
            <p className="text-xs text-foreground/70 mt-2">Small</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="md" />
            <p className="text-xs text-foreground/70 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-xs text-foreground/70 mt-2">Large</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
