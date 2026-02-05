'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './FinalCTA.module.scss';

const WHATSAPP_NUMBER = '5491112345678'; // Reemplazar con número real
const WHATSAPP_MESSAGE = '¡Hola! Me gustaría conocer más sobre los servicios de KINETIA.';

export function FinalCTA() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <section className={styles.finalCTA}>
      <div className={styles.background}>
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
      </div>

      <Container>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.pulse} />
            Te respondemos en menos de 24hs
          </motion.div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ¿Listo para <span className={styles.highlight}>transformar</span> tu operación?
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Coordinemos una consulta y descubrí cómo impulsar tu negocio a otro nivel.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className={styles.primaryBtn} onClick={scrollToContact}>
              <span>Agenda una demo</span>
            </button>
            <button className={styles.secondaryBtn} onClick={openWhatsApp}>
              <span>
                <span className={styles.whatsappIcon}>💬</span>
                Contactar por WhatsApp
              </span>
            </button>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
