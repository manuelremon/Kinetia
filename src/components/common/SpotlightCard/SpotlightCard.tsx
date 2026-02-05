'use client';

import { useRef, useState, MouseEvent } from 'react';
import styles from './SpotlightCard.module.scss';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`${styles.card} ${className}`}
      style={{
        '--mouse-x': `${position.x}px`,
        '--mouse-y': `${position.y}px`,
      } as React.CSSProperties}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
