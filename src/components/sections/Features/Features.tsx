import { Container } from '@/components/common';
import { FEATURES } from '@/utils/constants';
import type { FlipCardData } from '@/types';
import styles from './Features.module.scss';

interface FlipCardProps {
  data: FlipCardData;
}

function FlipCard({ data }: FlipCardProps) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <div className={styles.icon}>{data.icon}</div>
          <span className={styles.label}>{data.label}</span>
          <h3 className={styles.cardTitle}>{data.title}</h3>
          <p className={styles.cardDescription}>{data.description}</p>
          <div className={styles.flipIndicator}>
            <span className={styles.flipIndicatorIcon}>↻</span>
            Pasar cursor para voltear
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.backIcon}>{data.backIcon}</div>
          <h4 className={styles.backTitle}>{data.backTitle}</h4>
          <p className={styles.backText}>{data.backText}</p>
          <button className={styles.backBtn}>{data.backButtonText}</button>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className={styles.section}>
      <Container>
        <div className="section-header">
          <span className="section-label">Características</span>
          <h2 className="section-title">
            El sistema de datos <span className="text-gradient-animated">agéntico</span>
          </h2>
          <p className="section-subtitle">Pasa el cursor sobre las tarjetas para ver más detalles</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FlipCard key={feature.title} data={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
