import { useEffect } from 'react';
import { Container } from '@/components/common';
import { useIntersectionObserver, useAnimatedCounter } from '@/hooks';
import { STATS } from '@/utils/constants';
import styles from './Stats.module.scss';

interface CounterProps {
  target: number;
  suffix: string;
  label: string;
  shouldAnimate: boolean;
}

function Counter({ target, suffix, label, shouldAnimate }: CounterProps) {
  const { count, startAnimation } = useAnimatedCounter({ target });

  useEffect(() => {
    if (shouldAnimate) {
      startAnimation();
    }
  }, [shouldAnimate, startAnimation]);

  return (
    <div className={styles.item}>
      <div className={styles.number}>
        <span>{count}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export function Stats() {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {STATS.map((stat) => (
            <Counter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              shouldAnimate={isVisible}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
