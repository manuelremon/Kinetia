import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import { TRUST_BADGES } from '@/utils/constants';
import styles from './TrustBadges.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export function TrustBadges() {
  return (
    <section className={styles.trustBadges}>
      <Container>
        <motion.div
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {TRUST_BADGES.map((badge, index) => (
            <motion.div
              key={index}
              className={styles.badge}
              variants={badgeVariants}
            >
              <span className={styles.icon}>{badge.icon}</span>
              <div className={styles.content}>
                <span className={styles.title}>{badge.title}</span>
                <span className={styles.subtitle}>{badge.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
