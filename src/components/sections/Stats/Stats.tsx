'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import { useIntersectionObserver, useAnimatedCounter } from '@/hooks';
import styles from './Stats.module.scss';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  icon: string;
  comparison?: string;
}

const ENHANCED_STATS: StatItem[] = [
  {
    target: 70,
    suffix: '%',
    label: 'Reducción Tareas Manuales',
    icon: '⚡',
    comparison: 'vs 30% promedio industria'
  },
  {
    target: 98,
    suffix: '%',
    label: 'Satisfacción Clientes',
    icon: '⭐',
    comparison: 'NPS de 72+'
  },
  {
    target: 50,
    suffix: '+',
    label: 'Proyectos Exitosos',
    icon: '🚀'
  },
  {
    target: 24,
    suffix: '/7',
    label: 'Soporte Disponible',
    icon: '🛡️',
    comparison: 'Tiempo respuesta < 2hrs'
  }
];

interface CounterProps {
  stat: StatItem;
  shouldAnimate: boolean;
  index: number;
}

function Counter({ stat, shouldAnimate, index }: CounterProps) {
  const { count, startAnimation } = useAnimatedCounter({ target: stat.target });

  useEffect(() => {
    if (shouldAnimate) {
      startAnimation();
    }
  }, [shouldAnimate, startAnimation]);

  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className={styles.icon}>{stat.icon}</span>
      <div className={styles.number}>
        <span>{count}</span>
        <span className={styles.suffix}>{stat.suffix}</span>
      </div>
      <div className={styles.label}>{stat.label}</div>
      {stat.comparison && (
        <div className={styles.comparison}>{stat.comparison}</div>
      )}
    </motion.div>
  );
}

export function Stats() {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.background}>
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
      </div>

      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Nuestros Resultados</span>
          <h2 className={styles.title}>Números que respaldan nuestro trabajo</h2>
        </motion.div>

        <div className={styles.grid}>
          {ENHANCED_STATS.map((stat, index) => (
            <Counter
              key={stat.label}
              stat={stat}
              shouldAnimate={isVisible}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
