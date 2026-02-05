'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileWarning, PackageSearch, Unplug } from 'lucide-react';
import { Container } from '@/components/common';
import styles from './ProblemSolution.module.scss';

// Typewriter Component
function Typewriter({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className={styles.typewriter}>
      {displayedText}
      <span className={`${styles.cursor} ${isComplete ? styles.cursorBlink : ''}`}>|</span>
    </span>
  );
}

const CARDS = [
  {
    icon: FileWarning,
    title: 'CAOS',
    problem: '¿Tu equipo pierde horas pasando datos a Excel manualmente?',
    solution: 'Automatizamos la entrada de datos con 99% de precisión.'
  },
  {
    icon: PackageSearch,
    title: 'CEGUERA',
    problem: 'Quiebres de stock y sobre-stock por falta de visibilidad.',
    solution: 'Predicción de demanda inteligente basada en tus históricos.'
  },
  {
    icon: Unplug,
    title: 'DESCONEXIÓN',
    problem: 'Datos aislados y dispersos en diferentes plataformas.',
    solution: 'Dashboard unificado con sincronización en tiempo real.'
  }
];

// Animated Loader Component
function AnimatedLoader() {
  return (
    <div className={styles.loader}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="clipping">
            <polygon points="0,0 100,0 100,100 0,100" fill="black" />
            <polygon points="25,25 75,25 50,75" fill="white" />
            <polygon points="50,25 75,75 25,75" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
          </mask>
        </defs>
      </svg>
      <div className={styles.box}></div>
    </div>
  );
}

export function ProblemSolution() {
  return (
    <section className={styles.section}>
      {/* Efecto de luz animada en la línea neón */}
      <div className={styles.neonSweep}></div>
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Problema <AnimatedLoader /> Solución
          </h2>
          <p className={styles.subtitle}>
            <Typewriter text="Transformamos tus desafíos operativos en ventajas competitivas" delay={40} />
          </p>
        </motion.div>

        <div className={styles.grid}>
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.blob}></div>
                <div className={styles.cardBg}>
                  <div className={styles.cardBody}>
                    <div className={styles.problemBlock}>
                      <p className={styles.problemText} data-text={card.problem}>{card.problem}</p>
                    </div>

                    <div className={styles.solutionBlock}>
                      <p className={styles.solutionText}>{card.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
