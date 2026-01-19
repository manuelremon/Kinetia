import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './HowItWorks.module.scss';

interface StepData {
  number: number;
  label: string;
  title: string;
  description: string;
  color: string;
  content: React.ReactNode;
}

const STEPS: StepData[] = [
  {
    number: 1,
    label: 'Describir',
    title: 'Expresa tu intención',
    description: 'Comienza describiendo lo que necesitas — un nuevo modelo dbt, DAG de Airflow o flujo ELT completo.',
    color: '#007aff',
    content: (
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>$</span>
            <span className={styles.command}>kinetia crear</span>
          </div>
          <div className={styles.terminalLine}>
            <span className={styles.output}>→ ¿Qué te gustaría construir?</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    label: 'Planificar',
    title: 'La IA genera un plan',
    description: 'Nuestra IA crea un plan estructurado adaptado a tu infraestructura y estándares de código.',
    color: '#5856d6',
    content: (
      <div className={styles.planCard}>
        <div className={styles.planItem}>
          <span className={`${styles.planNumber} ${styles.orange}`}>1</span>
          <span>Crear modelo dbt</span>
        </div>
        <div className={styles.planItem}>
          <span className={`${styles.planNumber} ${styles.cyan}`}>2</span>
          <span>Añadir pruebas de esquema</span>
        </div>
        <div className={styles.planItem}>
          <span className={`${styles.planNumber} ${styles.purple}`}>3</span>
          <span>Crear DAG de Airflow</span>
        </div>
      </div>
    ),
  },
  {
    number: 3,
    label: 'Generar',
    title: 'Pipeline en segundos',
    description: 'Pipeline completo generado instantáneamente con estructura adecuada y mejores prácticas.',
    color: '#34c759',
    content: (
      <div className={styles.generateCard}>
        <div className={styles.generateIcon}>⚡</div>
        <p className={styles.generateText}>¡Pipeline Generado!</p>
      </div>
    ),
  },
  {
    number: 4,
    label: 'Verificar',
    title: 'Siempre validado',
    description: 'El dry-run automático asegura que todo funcione antes del despliegue.',
    color: '#5ac8fa',
    content: (
      <div className={styles.verifyCard}>
        <div className={styles.verifyItem}>
          <span className={styles.checkmark}>✓</span> Todas las pruebas pasaron
        </div>
        <div className={styles.verifyItem}>
          <span className={styles.checkmark}>✓</span> Esquema validado
        </div>
        <div className={styles.verifyItem}>
          <span className={styles.checkmark}>✓</span> Listo para desplegar
        </div>
      </div>
    ),
  },
];

interface StepCardProps {
  step: StepData;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function StepCard({ step, index, progress, range, targetScale }: StepCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.stepContainer}>
      <motion.div
        style={{
          backgroundColor: step.color,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className={styles.stepCard}
      >
        <div className={styles.stepHeader}>
          <div className={styles.stepNumber}>
            <span className={styles.stepNumberCircle}>{step.number}</span>
            {step.label}
          </div>
        </div>

        <div className={styles.stepBody}>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
          <div className={styles.stepVisual}>
            {step.content}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="how-it-works" className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.header}>
          <span className="section-label">Proceso</span>
          <h2 className="section-title">
            Cómo <span className="text-gradient-animated">funciona</span>
          </h2>
        </div>
      </Container>

      <div className={styles.stepsWrapper}>
        {STEPS.map((step, i) => {
          const targetScale = 1 - (STEPS.length - i) * 0.05;
          return (
            <StepCard
              key={`step_${i}`}
              step={step}
              index={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
