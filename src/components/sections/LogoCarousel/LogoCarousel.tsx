import { CLIENT_LOGOS } from '@/utils/constants';
import styles from './LogoCarousel.module.scss';

export function LogoCarousel() {
  // Duplicamos los logos para crear el efecto infinito
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className={styles.logoCarousel}>
      <div className={styles.track}>
        <div className={styles.logoGroup}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className={styles.logoItem}>
              <img src={logo.icon} alt={logo.name} className={styles.logoImg} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
