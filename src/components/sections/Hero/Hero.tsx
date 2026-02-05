'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/common';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Hero.module.scss';

// Kinetic Words Configuration
const KINETIC_WORDS = ['Transformación', 'Automatización', 'IA', 'Futuro'];
const CYCLE_DURATION = 3000; // ms per word

// Squishy Button Component
function SquishyButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const scale = useTransform(
    [xSpring, ySpring],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
      return 1 - distance * 0.1;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={styles.squishyButton}
      style={{ rotateX, rotateY, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <span className={styles.squishyContent}>{children}</span>
      <span className={styles.squishyGlow} />
    </motion.button>
  );
}

// Kinetic Text Component
function KineticText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % KINETIC_WORDS.length);
        setIsAnimating(false);
      }, 500);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.kineticContainer}>
      <motion.span
        key={currentIndex}
        className={styles.kineticWord}
        initial={{ y: 40, opacity: 0, rotateX: -90 }}
        animate={{
          y: isAnimating ? -40 : 0,
          opacity: isAnimating ? 0 : 1,
          rotateX: isAnimating ? 90 : 0
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {KINETIC_WORDS[currentIndex]}
      </motion.span>
    </span>
  );
}

// Animated Gradient Background
function AnimatedBackground() {
  return (
    <div className={styles.backgroundContainer}>
      {/* Animated Gradient Layer */}
      <motion.div
        className={styles.gradientLayer}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Mesh Gradient Overlay */}
      <div className={styles.meshOverlay} />

      {/* Floating Particles */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <AnimatedBackground />

      <Container>
        <div className={styles.splitLayout}>
          {/* Left Column - Content */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className={styles.badgePulse} />
              <span>Liderando la Revolución Digital</span>
            </motion.div>

            {/* Glassmorphism Card */}
            <div className={styles.glassCard}>
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                El Futuro de tu
                <br />
                Empresa es <KineticText />
              </motion.h1>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Automatizamos procesos, optimizamos inventarios con ML y
                desarrollamos agentes IA que trabajan 24/7 para tu negocio.
              </motion.p>

              {/* CTA Group */}
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SquishyButton onClick={scrollToContact}>
                  Solicitar Diagnóstico Gratuito
                </SquishyButton>

                <button
                  className={styles.secondaryButton}
                  onClick={scrollToServices}
                >
                  Ver Servicios
                  <span className={styles.arrowIcon}>→</span>
                </button>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className={styles.stat}>
                <span className={styles.statValue}>+70%</span>
                <span className={styles.statLabel}>Eficiencia Operativa</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>-40%</span>
                <span className={styles.statLabel}>Costos de Inventario</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Agentes IA Activos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Product Preview */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.productPreview}>
              {/* Floating Dashboard Preview */}
              <motion.div
                className={styles.dashboardCard}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className={styles.dashboardHeader}>
                  <div className={styles.dots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.dashboardTitle}>kinetia-agent.ts</span>
                </div>
                <div className={styles.dashboardContent}>
                  <pre className={styles.codeBlock}>
{`// Agente IA en acción
const agent = new KinetiaAgent({
  mode: 'autonomous',
  tasks: ['inventory', 'forecast']
});

await agent.analyze();
// ✓ Predicción completada
// ROI: +45% en 3 meses`}
                  </pre>
                </div>
              </motion.div>

              {/* Floating Metric Cards */}
              <motion.div
                className={`${styles.floatingCard} ${styles.card1}`}
                animate={{
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              >
                <span className={styles.cardIcon}>📈</span>
                <span className={styles.cardValue}>+45%</span>
                <span className={styles.cardLabel}>ROI</span>
              </motion.div>

              <motion.div
                className={`${styles.floatingCard} ${styles.card2}`}
                animate={{
                  y: [0, 10, 0],
                  rotate: [2, -2, 2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              >
                <span className={styles.cardIcon}>🤖</span>
                <span className={styles.cardValue}>Activo</span>
                <span className={styles.cardLabel}>Agente IA</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
