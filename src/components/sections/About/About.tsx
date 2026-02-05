'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import { AgentTerminal } from '@/components/features';
import styles from './About.module.scss';

export function About() {
  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.grid}>
          {/* Left: Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>Capacidad Técnica</span>
            <h2 className={styles.title}>
              Ingeniería de IA <span className={styles.highlight}>Real</span>
            </h2>
            <p className={styles.description}>
              No somos solo consultores, somos ingenieros. Nuestro equipo desarrolla
              agentes autónomos, pipelines de ML y sistemas de automatización que
              operan en producción 24/7.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statLabel}>Pipelines Desplegados</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>SLA Disponibilidad</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>10x</span>
                <span className={styles.statLabel}>Más Rápido</span>
              </div>
            </div>

            <div className={styles.techStack}>
              <span className={styles.techLabel}>Stack Tecnológico:</span>
              <div className={styles.techBadges}>
                <span className={styles.badge}>Python</span>
                <span className={styles.badge}>TensorFlow</span>
                <span className={styles.badge}>LangChain</span>
                <span className={styles.badge}>GPT-4</span>
                <span className={styles.badge}>Claude</span>
                <span className={styles.badge}>RAG</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Agent Terminal */}
          <motion.div
            className={styles.terminalWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AgentTerminal />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
