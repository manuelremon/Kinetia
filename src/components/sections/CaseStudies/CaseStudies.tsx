'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import { CASE_STUDIES } from '@/utils/constants';
import styles from './CaseStudies.module.scss';

export function CaseStudies() {
  return (
    <section id="case-studies" className={styles.caseStudies}>
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Casos de Éxito</h2>
        </motion.div>

        <div className={styles.grid}>
          {CASE_STUDIES.map((caseStudy, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.image}>
                {caseStudy.image ? (
                  <Image src={caseStudy.image} alt={caseStudy.title} fill className={styles.img} />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    {caseStudy.icon}
                  </div>
                )}
                <span className={styles.companyLogo}>{caseStudy.company}</span>

                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h4 className={styles.overlayTitle}>{caseStudy.challenge}</h4>
                    <p className={styles.overlayText}>{caseStudy.solution}</p>
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{caseStudy.title}</h3>
                <p className={styles.description}>{caseStudy.description}</p>

                <div className={styles.metrics}>
                  {caseStudy.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className={styles.metric}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <span className={styles.arrow}>→</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className={styles.ctaButton}>
            Ver todos los casos
            <span>→</span>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
