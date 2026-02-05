'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.scss';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.scrollProgress}>
      <motion.div className={styles.bar} style={{ scaleX }} />
    </div>
  );
}
