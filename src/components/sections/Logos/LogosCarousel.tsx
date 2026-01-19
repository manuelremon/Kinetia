import { Container } from '@/components/common';
import { LOGOS } from '@/utils/constants';
import styles from './LogosCarousel.module.scss';

export function LogosCarousel() {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...LOGOS, ...LOGOS];

  return (
    <section className={styles.section}>
      <Container>
        <p className={styles.title}>Confianza de líderes de datos en todo el mundo</p>
      </Container>
      <div className={styles.track}>
        <div className={styles.slide}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo}-${index}`} className={styles.logoItem}>
              <span className={styles.logoPlaceholder}>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
