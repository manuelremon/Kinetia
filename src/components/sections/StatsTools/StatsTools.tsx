import { useEffect } from 'react';
import { Container, IconCloud } from '@/components/common';
import { useIntersectionObserver, useAnimatedCounter } from '@/hooks';
import { STATS } from '@/utils/constants';
import styles from './StatsTools.module.scss';

const LOGO_URLS = [
  'https://cdn.simpleicons.org/sap/0FAAFF',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
  'https://cdn.simpleicons.org/microsoft/5E5E5E',
  'https://img.icons8.com/fluency/96/microsoft-teams-2019.png',
  'https://cdn.simpleicons.org/microsoftoffice/D83B01',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
];

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

export function StatsTools() {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className={styles.section}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.statsColumn}>
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
          </div>

          <div className={styles.toolsColumn}>
            <h3 className={styles.toolsTitle}>Herramientas</h3>
            <IconCloud images={LOGO_URLS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
