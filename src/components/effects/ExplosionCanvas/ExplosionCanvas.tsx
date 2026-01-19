import { useEffect, useRef } from 'react';
import { EXPLOSION_COLORS } from '@/utils/constants';
import styles from './ExplosionCanvas.module.scss';

interface ExplosionParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  gravity: number;
  friction: number;
  opacity: number;
  decay: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: number;
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
      const speed = Math.random() * 8 + 4;
      return {
        x,
        y,
        size: Math.random() * 8 + 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.15,
        friction: 0.98,
        opacity: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: EXPLOSION_COLORS[Math.floor(Math.random() * EXPLOSION_COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        shape: Math.floor(Math.random() * 4)
      };
    };

    const createExplosion = (x: number, y: number) => {
      const particleCount = 30 + Math.floor(Math.random() * 20);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(x, y));
      }
    };

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerRadius;
        let y = cy + Math.sin(rot) * outerRadius;
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

    const drawParticle = (p: ExplosionParticle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;

      switch (p.shape) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 1: // Square
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          break;
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, p.size);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 3: // Star
          drawStar(0, 0, 5, p.size, p.size / 2);
          break;
      }

      ctx.restore();
    };

    const updateParticle = (p: ExplosionParticle) => {
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.opacity -= p.decay;
      p.size *= 0.98;
      p.rotation += p.rotationSpeed;
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
