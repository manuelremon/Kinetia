import { Container } from '@/components/common';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Transforma tu Operación: <span className={styles.highlight}>Automatiza.</span>
          </motion.h1>

          <motion.h2
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Integración inteligente con tus sistemas actuales.
          </motion.h2>
        </div>
      </Container>
    </section>
  );
}
