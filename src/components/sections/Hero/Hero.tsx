import { Container, AnimatedButton, TypingText } from '@/components/common';
import { motion } from 'framer-motion';
import { TYPING_PHRASES } from '@/utils/constants';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Infraestructura{' '}
            <span className={styles.typingContainer}>
              <TypingText phrases={TYPING_PHRASES} />
            </span>
          </h2>

          <div className={styles.divider} />

          <div className={styles.cta}>
            <AnimatedButton variant="secondary">Conocer Más</AnimatedButton>
            <AnimatedButton variant="primary">Solicitar Demo</AnimatedButton>
          </div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Combinamos tecnología de vanguardia con experiencia en la industria para crear soluciones que generan resultados reales.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
