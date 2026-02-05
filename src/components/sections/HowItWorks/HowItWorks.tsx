'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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
    label: 'Diagnóstico estratégico',
    title: 'Analizamos tu situación',
    description: 'Realizamos un análisis exhaustivo de la situación actual de tu empresa: infraestructura tecnológica, procesos operativos y cultura organizacional. Evaluamos competencias internas, identificamos cuellos de botella y oportunidades de mejora, y analizamos el mercado y a la competencia para establecer una línea base y definir objetivos claros.',
    color: 'transparent',
    content: null,
  },
  {
    number: 2,
    label: 'Diseño a medida',
    title: 'Creamos tu roadmap de éxito',
    description: 'Con el diagnóstico como guía, definimos una estrategia alineada con la visión y objetivos de negocio. Diseñamos soluciones personalizadas y un roadmap detallado con hitos, cronogramas y asignación de recursos. Seleccionamos las tecnologías más adecuadas, aplicamos principios de diseño centrado en el usuario y planificamos la gestión del cambio para garantizar una adopción fluida.',
    color: 'transparent',
    content: null,
  },
  {
    number: 3,
    label: 'Implementación ágil',
    title: 'Desarrollamos e integramos',
    description: 'Construimos e integramos la solución mediante ciclos iterativos y entregas incrementales, siguiendo marcos ágiles como Scrum o Kanban. Gestionamos la comunicación y la formación para superar la resistencia al cambio: involucramos a los equipos desde el inicio, comunicamos beneficios y ofrecemos capacitaciones personalizadas.',
    color: 'transparent',
    content: null,
  },
  {
    number: 4,
    label: 'Optimización continua',
    title: 'Mejoramos sin límites',
    description: 'Tras el despliegue, la optimización no se detiene. Medimos resultados, revisamos KPIs y analizamos métricas de uso para evaluar el impacto de la solución. Ajustamos parámetros, automatizamos tareas repetitivas y escalamos la solución según el crecimiento del negocio, garantizando eficiencia sostenida y máximo retorno de inversión.',
    color: 'transparent',
    content: null,
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
          scale,
          top: `calc(${index * 25}px)`,
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
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
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

  // Fade out title when reaching end of section (after 85% scroll)
  const titleOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  return (
    <section id="how-it-works" className={styles.section} ref={sectionRef}>
      <motion.div className={styles.header} style={{ opacity: titleOpacity }}>
        <h2 className={styles.sectionTitle}><span className="text-gradient-animated">Cómo trabajamos</span></h2>
      </motion.div>

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
