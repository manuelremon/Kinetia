'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Container, GridLoader, CubeSpinner, MorphLoader, RobotIcon, SpotlightCard } from '@/components/common';
import type { Service } from './servicesData';
import styles from './Services.module.scss';

interface ServiceCardProps {
  service: Service;
  onLearnMore: () => void;
}

export function ServiceCard({ service, onLearnMore }: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderIcon = () => {
    switch (service.icon) {
      case '⚙️':
        return <GridLoader size={60} />;
      case '📦':
        return <CubeSpinner size={60} />;
      case '🛠️':
        return <MorphLoader size={60} />;
      case '🤖':
        return <RobotIcon size={70} />;
      default:
        return service.icon;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={styles.serviceSection}
      id={service.id}
      data-section-name={service.id}
      style={{
        y,
        // View Transitions API: unique name for morphing effect
        viewTransitionName: `service-card-${service.id}`,
      } as any}
    >
      <Container>
        <SpotlightCard className={styles.serviceContent}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ width: '100%' }}
          >
            {service.badge && (
              <motion.div className={styles.popularBadge} variants={itemVariants}>
                <span className={styles.popularBadgePulse} />
                {service.badge}
              </motion.div>
            )}
            <motion.div className={styles.serviceHeader} variants={itemVariants}>
              <div className={styles.serviceIcon}>
                {renderIcon()}
              </div>
              <span className={styles.serviceSubtitle}>
                {service.subtitle}
              </span>
            </motion.div>

            <motion.h3 className={styles.serviceTitle} variants={itemVariants}>
              {service.title}
            </motion.h3>

            <motion.p className={styles.serviceDescription} variants={itemVariants}>
              {service.description}
            </motion.p>

            <motion.ul className={styles.features} variants={itemVariants}>
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                >
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants}>
              <button className={styles.learnMoreBtn} onClick={onLearnMore}>
                Saber más
              </button>
            </motion.div>
          </motion.div>
        </SpotlightCard>
      </Container>
    </motion.div>
  );
}
