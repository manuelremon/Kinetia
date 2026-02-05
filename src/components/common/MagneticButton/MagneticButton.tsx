'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MagneticButton.module.scss';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.magneticButton} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.div
        className={`${styles.inner} ${variant === 'outline' ? styles.outline : ''}`}
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
