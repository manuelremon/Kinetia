import { Container, ScrollReveal } from '@/components/common';
import FEATURES from '@/data/features.json';
import type { FlipCardData } from '@/types';
import styles from './Features.module.scss';

interface FeatureCardProps {
  data: FlipCardData;
}

function FeatureCard({ data }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{data.label}</span>
      <div className={styles.cardContent}>
        <span className={styles.label}>{data.label}</span>
        <h3 className={styles.cardTitle}>{data.title}</h3>
        <p className={styles.cardDescription}>{data.description}</p>
        <button className={styles.cardBtn}>{data.backButtonText}</button>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className={styles.section}>
      <Container>
        <ScrollReveal>
          <div className={styles.header}>
            <h2 className={styles.title}>
              <span className="text-gradient-animated">Sistema de datos agéntico</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <ScrollReveal key={feature.title} variant="scale" delay={index * 0.1}>
              <FeatureCard data={feature} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
