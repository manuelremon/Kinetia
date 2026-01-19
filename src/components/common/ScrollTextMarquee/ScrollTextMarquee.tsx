import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import styles from './ScrollTextMarquee.module.scss';

// Wrap function to cycle value between min and max
function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

interface ScrollTextMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  scrollDependent?: boolean;
  className?: string;
}

export function ScrollTextMarquee({
  children,
  baseVelocity = 3,
  scrollDependent = true,
  className = '',
}: ScrollTextMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={styles.marqueeWrapper}>
      <motion.div className={styles.marquee} style={{ x }}>
        <span className={`${styles.text} ${className}`}>{children}</span>
        <span className={`${styles.text} ${className}`}>{children}</span>
        <span className={`${styles.text} ${className}`}>{children}</span>
        <span className={`${styles.text} ${className}`}>{children}</span>
      </motion.div>
    </div>
  );
}
