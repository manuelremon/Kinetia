'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';
import styles from './CountUpOnScroll.module.scss';

interface CountUpOnScrollProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function CountUpOnScroll({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  decimals = 0
}: CountUpOnScrollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000
  });

  const display = useTransform(spring, (value) =>
    value.toFixed(decimals)
  );

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const unsubscribe = display.on('change', (value) => {
      setDisplayValue(value);
    });
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(target);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, target]);

  return (
    <motion.span
      ref={ref}
      className={`${styles.countUp} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <span className={styles.number}>{displayValue}</span>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </motion.span>
  );
}
