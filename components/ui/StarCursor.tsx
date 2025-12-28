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
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

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

      // Create particles
      if (Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const colors = ['#a855f7', '#06b6d4', '#8b5cf6', '#ffffff'];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });

      // Limit particles
      if (particlesRef.current.length > 50) {
        particlesRef.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.vy += 0.05; // Gravity

        if (particle.life <= 0) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
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
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovering
                ? 'bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8),0_0_40px_rgba(74,222,128,0.6)]'
                : 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]'
            }`}
          />
        </div>

        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8),0_0_60px_rgba(74,222,128,0.4)] animate-ping'
              : 'border-purple-400/50'
          }`}
        />

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
