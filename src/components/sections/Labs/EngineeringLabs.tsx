'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './EngineeringLabs.module.scss';

// Lab Projects Data
const LAB_PROJECTS = [
  {
    id: 'stockflow-ai',
    title: 'StockFlow AI',
    category: 'Inventory Intelligence',
    description:
      'Dashboard de predicción de inventario para Retail. Modelos de series temporales que anticipan demanda con 94% de precisión, reduciendo quiebres de stock y capital inmovilizado.',
    stack: ['Python', 'Pandas', 'Prophet', 'FastAPI', 'Next.js'],
    metrics: [
      { label: 'Precisión Forecast', value: '94%' },
      { label: 'Reducción Stock Muerto', value: '-38%' },
    ],
    status: 'Production',
    image: '/labs/stockflow-preview.png',
  },
  {
    id: 'procurebot',
    title: 'ProcureBot',
    category: 'Agentic AI',
    description:
      'Agente autónomo de compras que negocia vía email, compara proveedores, genera órdenes de compra y actualiza ERP. Function Calling + RAG sobre políticas internas.',
    stack: ['LangChain', 'GPT-4', 'Function Calling', 'PostgreSQL', 'n8n'],
    metrics: [
      { label: 'Tiempo Negociación', value: '-70%' },
      { label: 'Órdenes Automáticas', value: '85%' },
    ],
    status: 'Beta',
    image: '/labs/procurebot-preview.png',
  },
];

// Project Card Component
function LabProjectCard({ project, index }: { project: typeof LAB_PROJECTS[0]; index: number }) {
  return (
    <motion.article
      className={styles.projectCard}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Project Header */}
      <div className={styles.projectHeader}>
        <div className={styles.projectMeta}>
          <span className={styles.category}>{project.category}</span>
          <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
            {project.status}
          </span>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
      </div>

      {/* Project Visual */}
      <div className={styles.projectVisual}>
        <div className={styles.terminalWindow}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.terminalTitle}>{project.id}.py</span>
          </div>
          <div className={styles.terminalBody}>
            <code className={styles.codeBlock}>
              <span className={styles.comment}># {project.title} - Kinetia Labs</span>
              <br />
              <span className={styles.keyword}>from</span> kinetia <span className={styles.keyword}>import</span> {project.id.replace('-', '_')}
              <br /><br />
              <span className={styles.function}>engine</span> = {project.id.replace('-', '_')}.
              <span className={styles.method}>initialize</span>()
              <br />
              <span className={styles.function}>result</span> = engine.
              <span className={styles.method}>predict</span>(data)
              <br /><br />
              <span className={styles.comment}># Metrics: {project.metrics[0].value} accuracy</span>
            </code>
          </div>
        </div>
      </div>

      {/* Project Description */}
      <p className={styles.projectDescription}>{project.description}</p>

      {/* Tech Stack */}
      <div className={styles.stackSection}>
        <span className={styles.stackLabel}>Stack:</span>
        <div className={styles.stackTags}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.stackTag}>{tech}</span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className={styles.metricsGrid}>
        {project.metrics.map((metric) => (
          <div key={metric.label} className={styles.metricItem}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export function EngineeringLabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className={styles.section} id="labs" ref={containerRef}>
      <Container>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Kinetia Labs</span>
          <h2 className={styles.title}>
            Prototipos <span className={styles.highlight}>Funcionales</span>
          </h2>
          <p className={styles.subtitle}>
            Ingeniería aplicada. Proyectos internos que demuestran capacidad técnica real.
          </p>
        </motion.div>

        {/* Projects Gallery */}
        <div className={styles.projectsGallery}>
          {LAB_PROJECTS.map((project, index) => (
            <LabProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className={styles.labsCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={styles.ctaText}>
            Estos prototipos reflejan nuestra metodología. Tu proyecto puede ser el próximo.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar Colaboración Técnica
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
