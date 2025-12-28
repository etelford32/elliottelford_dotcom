'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export const StarCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastSparkTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create radial spark particles
    const createSpark = (x: number, y: number, burstMode = false) => {
      const colors = ['#a855f7', '#06b6d4', '#8b5cf6', '#ffffff', '#4ade80'];
      const sparkCount = burstMode ? 20 : 3; // More sparks on click

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = burstMode ? Math.random() * 4 + 3 : Math.random() * 2 + 1.5;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: burstMode ? Math.random() * 4 + 2 : Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Limit particles
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Update cursor position
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    // Handle click for burst effect
    const handleClick = (e: MouseEvent) => {
      setIsClicked(true);
      createSpark(e.clientX, e.clientY, true);

      setTimeout(() => setIsClicked(false), 200);
    };

    // Animation loop
    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Emit sparks continuously (every 50ms)
      if (currentTime - lastSparkTime.current > 50) {
        createSpark(mouseRef.current.x, mouseRef.current.y);
        lastSparkTime.current = currentTime;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Fast movement with slight deceleration
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95; // Deceleration
        particle.vy *= 0.95;
        particle.life -= 0.05; // Quick fade (shorter life)

        if (particle.life <= 0) return false;

        // Draw particle as a glowing spark
        ctx.save();
        ctx.globalAlpha = particle.life * particle.life; // Quadratic fade for sparkle effect
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;

        // Draw star shape
        drawStar(ctx, particle.x, particle.y, 5, particle.size, particle.size / 2);

        ctx.restore();
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Custom cursor - Always visible star */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicked ? 'scale-[2]' : ''}`}
        style={{
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
        }}
      >
        {/* Central star - always visible */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Star shape */}
          <path
            d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z"
            fill={isHovering ? '#4ade80' : '#a855f7'}
            filter="url(#glow)"
            className={`transition-all duration-300 ${isClicked ? 'opacity-100' : 'opacity-90'}`}
          />

          {/* Inner bright core */}
          <circle
            cx="16"
            cy="16"
            r="3"
            fill="white"
            opacity="0.8"
          />
        </svg>

        {/* Pulsing rings */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8),0_0_60px_rgba(74,222,128,0.4)] animate-ping'
              : 'border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
          }`}
        />

        {/* Click burst ring */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75" />
        )}

        {/* Hover glow effect */}
        {isHovering && (
          <>
            <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-green-400/10 blur-2xl" />
          </>
        )}
      </div>
    </>
  );
};
