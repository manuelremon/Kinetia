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

// Fixed particle positions (hydration-safe)
const PARTICLES = [
  { x: 0, y: -18.26, scale: 0.5 },
  { x: 86.96, y: 37.58, scale: 0.5 },
  { x: 68.5, y: -7.83, scale: 0.54 },
  { x: 0.91, y: 4.56, scale: 0.71 },
  { x: 35.4, y: 92.76, scale: 0.55 },
  { x: 40.21, y: -14.91, scale: 0.72 },
  { x: 7.56, y: -20, scale: 0.67 },
  { x: 37.12, y: -13.82, scale: 0.81 },
  { x: 93.21, y: -19.74, scale: 0.63 },
  { x: 42.49, y: -9.73, scale: 0.76 },
  { x: 30.82, y: -3.62, scale: 0.81 },
  { x: 63.73, y: 5.8, scale: 0.87 },
  { x: 9.81, y: 20.68, scale: 0.65 },
  { x: 66.09, y: 30.13, scale: 0.87 },
  { x: 5.49, y: 14.57, scale: 0.95 },
  { x: 43.29, y: -12.76, scale: 0.94 },
  { x: 84.49, y: 12.34, scale: 0.68 },
  { x: 71.83, y: 70.97, scale: 0.59 },
  { x: 33.18, y: 29.24, scale: 0.73 },
  { x: 23.7, y: 63.83, scale: 0.7 },
];

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
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              transform: `translateX(${particle.x}%) translateY(${particle.y}%) scale(${particle.scale})`,
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

  const scrollToChooseRoute = () => {
    document.getElementById('choose-route')?.scrollIntoView({ behavior: 'smooth' });
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
              <span>Somos Líderes en Revolución Digital</span>
            </motion.div>

            {/* Glassmorphism Card */}
            <div className={styles.glassCard}>
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                El Futuro de tu Empresa es
                <br />
                <KineticText />
              </motion.h1>

              {/* CTA Group */}
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button
                  className={styles.secondaryButton}
                  onClick={scrollToChooseRoute}
                >
                  Elegí tu Ruta
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

        </div>
      </Container>

    </section>
  );
}
