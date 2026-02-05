'use client';

import { useEffect, useRef } from 'react';
import styles from './ExplosionCanvas.module.scss';

// Solo 2 colores iOS
const PARTICLE_COLORS = ['rgba(0, 122, 255, 0.6)', 'rgba(90, 200, 250, 0.5)'];

interface ExplosionParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  opacity: number;
  decay: number;
  color: string;
}

export function ExplosionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ExplosionParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number): ExplosionParticle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      return {
        x,
        y,
        size: Math.random() * 4 + 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        friction: 0.96,
        opacity: Math.random() * 0.3 + 0.4,
        decay: Math.random() * 0.015 + 0.01,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
      };
    };

    const createExplosion = (x: number, y: number) => {
      const particleCount = 8 + Math.floor(Math.random() * 6);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(x, y));
      }
    };

    const drawParticle = (p: ExplosionParticle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const updateParticle = (p: ExplosionParticle) => {
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.x += p.vx;
      p.y += p.vy;
      p.opacity -= p.decay;
      p.size *= 0.97;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0 && p.size > 0.5);

      particlesRef.current.forEach(p => {
        updateParticle(p);
        drawParticle(p);
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
