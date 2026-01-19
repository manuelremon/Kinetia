import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import styles from './IconCloud.module.scss';

interface IconCloudProps {
  images: string[];
}

interface IconPosition {
  x: number;
  y: number;
  z: number;
  url: string;
}

export function IconCloud({ images }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });

  const iconPositions = useMemo<IconPosition[]>(() => {
    const positions: IconPosition[] = [];
    const count = images.length;
    // Óvalo alargado horizontalmente
    const radiusX = 500;
    const radiusY = 120;
    const radiusZ = 150;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      positions.push({
        x: radiusX * Math.cos(theta) * Math.sin(phi),
        y: radiusY * Math.sin(theta) * Math.sin(phi),
        z: radiusZ * Math.cos(phi),
        url: images[i],
      });
    }
    return positions;
  }, [images]);

  const animate = useCallback(() => {
    setRotation((prev) => {
      const targetX = mouseRef.current.isHovering ? mouseRef.current.y * 0.00008 : 0.001;
      const targetY = mouseRef.current.isHovering ? mouseRef.current.x * 0.00008 : 0.002;

      return {
        x: prev.x + targetX,
        y: prev.y + targetY,
      };
    });
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
      isHovering: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  const transformIcon = (pos: IconPosition) => {
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    const y1 = pos.y * cosX - pos.z * sinX;
    const z1 = pos.y * sinX + pos.z * cosX;
    const x2 = pos.x * cosY + z1 * sinY;
    const z2 = -pos.x * sinY + z1 * cosY;

    const scale = (z2 + 300) / 500;
    const opacity = Math.max(0.3, Math.min(1, (z2 + 250) / 400));

    return {
      transform: `translate3d(${x2}px, ${y1}px, ${z2}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(z2 + 300),
    };
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cloud}>
        {iconPositions.map((pos, index) => {
          const style = transformIcon(pos);
          return (
            <div
              key={index}
              className={styles.icon}
              style={style}
            >
              <img src={pos.url} alt="" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
