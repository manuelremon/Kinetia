'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxSection.module.scss';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier]);

  return (
    <div ref={ref} className={`${styles.parallaxSection} ${className}`}>
      <motion.div className={styles.content} style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
