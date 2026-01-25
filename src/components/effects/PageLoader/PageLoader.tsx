import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PageLoader.module.scss';

const TIPS = [
  'Automatización inteligente...',
  'Optimizando procesos...',
  'Preparando tu experiencia...',
  'Cargando innovación...'
];

export function PageLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Simular progreso de carga
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Rotar tips
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 1500);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(handleLoad, 800);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className={styles.pageLoader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className={styles.content}>
            {/* Logo */}
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.logoText}>KINETIA</span>
              <span className={styles.logoDot}></span>
            </motion.div>

            {/* Spinner animado */}
            <motion.div
              className={styles.spinnerContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.spinner}>
                <div className={styles.spinnerRing} />
                <div className={styles.spinnerRing} />
                <div className={styles.spinnerRing} />
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className={styles.progressContainer}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '200px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{Math.round(progress)}%</span>
            </motion.div>

            {/* Tips rotativos */}
            <motion.div
              className={styles.tipContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  className={styles.tip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {TIPS[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Background effects */}
          <div className={styles.backgroundEffects}>
            <div className={styles.orb} />
            <div className={styles.orb} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
