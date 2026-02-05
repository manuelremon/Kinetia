'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import styles from './TextReveal.module.scss';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.02
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren * 5,
        delayChildren: delay
      }
    }
  };

  const wordVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren
      }
    }
  };

  const charVariants: Variants = {
    hidden: {
      y: '100%',
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.25, 0.4, 0.25, 1] as const
      }
    }
  };

  return (
    <div ref={ref} className={`${styles.textReveal} ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {words.map((word, wordIndex) => (
          <motion.span key={wordIndex} className={styles.word} variants={wordVariants}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className={styles.char}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
