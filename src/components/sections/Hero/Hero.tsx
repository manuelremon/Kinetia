'use client';

import { Container } from '@/components/common';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

// Precision Button Component - Engineering Grade
function PrecisionButton({
  children,
  onClick,
  variant = 'primary'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <motion.button
      className={`${styles.precisionButton} ${styles[variant]}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.buttonContent}>{children}</span>
      <span className={styles.buttonGlow} />
    </motion.button>
  );
}

// Engineering Background - Deep Navy with Grid
function EngineeringBackground() {
  return (
    <div className={styles.backgroundContainer}>
      {/* Deep Navy Base */}
      <div className={styles.navyBase} />

      {/* Subtle Blue Accent */}
      <div className={styles.meshOverlay} />

      {/* Dark Overlay for WCAG AA */}
      <div className={styles.darkOverlay} />

      {/* Technical Blueprint Grid */}
      <div className={styles.gridPattern} />

      {/* Data Flow Lines */}
      <svg className={styles.dataLines} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M0,400 Q300,350 600,400 T1200,400"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0,450 Q400,500 800,450 T1200,450"
          stroke="rgba(59, 130, 246, 0.08)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

// Tech Stack Badge
function TechBadge({ tech }: { tech: string }) {
  return (
    <span className={styles.techBadge}>{tech}</span>
  );
}

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLabs = () => {
    document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <EngineeringBackground />

      <Container>
        <div className={styles.contentWrapper}>
          {/* Main Content */}
          <motion.div
            className={styles.mainContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Engineering Badge */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className={styles.badgeIndicator} />
              <span>Boutique de Ingeniería de Software</span>
            </motion.div>

            {/* Engineering Headline */}
            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ingeniería de Software
              <br />
              <span className={styles.accentText}>para Operaciones Complejas.</span>
            </motion.h1>

            {/* Technical Value Proposition */}
            <motion.p
              className={styles.valueProposition}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Especialistas en Optimización de Inventarios y Sistemas Agénticos.
              <br />
              Transformamos datos masivos en decisiones automáticas mediante Python y Next.js 15.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              className={styles.techStack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TechBadge tech="Python" />
              <TechBadge tech="Pandas" />
              <TechBadge tech="Next.js 15" />
              <TechBadge tech="LangChain" />
              <TechBadge tech="AWS" />
            </motion.div>

            {/* CTA Group */}
            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <PrecisionButton variant="primary" onClick={scrollToContact}>
                Solicitar Diagnóstico Técnico
              </PrecisionButton>
              <PrecisionButton variant="secondary" onClick={scrollToLabs}>
                Ver Labs
                <span className={styles.arrowIcon}>→</span>
              </PrecisionButton>
            </motion.div>

            {/* Engineering Metrics */}
            <motion.div
              className={styles.metricsRow}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className={styles.metric}>
                <span className={styles.metricValue}>Python</span>
                <span className={styles.metricLabel}>Forecast & ML</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metric}>
                <span className={styles.metricValue}>RAG</span>
                <span className={styles.metricLabel}>Agentes que Ejecutan</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metric}>
                <span className={styles.metricValue}>Next.js</span>
                <span className={styles.metricLabel}>Server Actions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Liquid Workforce Badge */}
      <motion.div
        className={styles.liquidBadge}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className={styles.liquidLabel}>Modelo Operativo:</span>
        <span className={styles.liquidValue}>Liderazgo Senior + Red de Expertos On-Demand</span>
      </motion.div>
    </section>
  );
}
