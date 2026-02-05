'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './ProblemSolution.module.scss';

const CARDS = [
  {
    title: 'El Caos Administrativo',
    text: '¿Tu equipo pierde horas pasando datos a Excel? Automatizamos la entrada de datos con 99% de precisión.'
  },
  {
    title: 'El Stock Ciego',
    text: 'Evita quiebres de stock y sobre-stock. Predicción de demanda basada en tus datos históricos.'
  },
  {
    title: 'La Desconexión',
    text: 'Información eficiente en tiempo real.'
  }
];

export function ProblemSolution() {
  return (
    <section className={styles.section}>
      <Container>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Problema &lt;&gt; Solución
        </motion.h2>

        <div className={styles.grid}>
          {CARDS.map((card, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
