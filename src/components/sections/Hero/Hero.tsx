import { Container, GlitchText, LiquidButton, SliceButton, TypingText } from '@/components/common';
import { motion } from 'framer-motion';
import { TYPING_PHRASES } from '@/utils/constants';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.glitchContainer}>
            <div>POTENCIAMOS TU</div>
            <GlitchText text="INFRAESTRUCTURA" />
            <div style={{ fontSize: '0.5em', marginTop: '10px' }}>
              <TypingText phrases={TYPING_PHRASES} />
            </div>
          </div>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Combinamos tecnología de vanguardia con experiencia en la industria para crear soluciones que generan resultados reales.
          </motion.p>

          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <LiquidButton>COMENZAR PROYECTO</LiquidButton>
            <SliceButton>VER DEMO</SliceButton>
          </motion.div>
        </div>
      </Container>
      
      <div className={styles.scrollIndicator}>
        <span>SCROLL</span>
        <div className={styles.mouse}></div>
      </div>
    </section>
  );
}