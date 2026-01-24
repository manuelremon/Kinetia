import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '@/utils/constants';
import styles from './LogoCarousel.module.scss';

export function LogoCarousel() {
  // Duplicamos los logos para crear el efecto infinito
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className={styles.logoCarousel}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.label}>Empresas que confían en nosotros</p>
      </motion.div>

      <div className={styles.track}>
        <div className={styles.logoGroup}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className={styles.logoItem}>
              {logo.icon && (
                <div className={styles.logoIcon}>
                  <img src={logo.icon} alt={logo.name} />
                </div>
              )}
              <span className={styles.logoText}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
