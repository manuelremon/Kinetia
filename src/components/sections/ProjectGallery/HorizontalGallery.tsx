'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HorizontalGallery.module.scss';

// ============================================
// PROJECTS DATA
// ============================================
const projects = [
  {
    id: 1,
    title: 'Fintech Core',
    category: 'Servicios Financieros',
    description: 'Plataforma de core bancario con procesamiento en tiempo real y compliance automatizado.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    stats: { metric: '+200%', label: 'Transacciones/seg' },
  },
  {
    id: 2,
    title: 'AI Logistics Hub',
    category: 'Logística & Supply Chain',
    description: 'Sistema de optimización de rutas con IA predictiva y tracking en tiempo real.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    tags: ['Python', 'TensorFlow', 'AWS'],
    stats: { metric: '-35%', label: 'Costos Envío' },
  },
  {
    id: 3,
    title: 'AgroTech Data',
    category: 'Agricultura de Precisión',
    description: 'Plataforma IoT para monitoreo de cultivos con análisis predictivo de rendimiento.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    tags: ['IoT', 'Machine Learning', 'Dashboard'],
    stats: { metric: '+45%', label: 'Rendimiento' },
  },
  {
    id: 4,
    title: 'HealthSync Pro',
    category: 'Healthcare',
    description: 'Sistema de gestión hospitalaria con integración de historiales clínicos electrónicos.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    tags: ['Next.js', 'FHIR', 'Security'],
    stats: { metric: '-60%', label: 'Tiempo Admin' },
  },
  {
    id: 5,
    title: 'RetailAI Engine',
    category: 'E-commerce & Retail',
    description: 'Motor de recomendaciones con personalización en tiempo real y análisis de comportamiento.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['AI/ML', 'Redis', 'Microservices'],
    stats: { metric: '+28%', label: 'Conversión' },
  },
];

// ============================================
// PROJECT CARD COMPONENT
// ============================================
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Container */}
      <motion.div
        className={styles.imageContainer}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />

        {/* Stats Badge */}
        <div className={styles.statsBadge}>
          <span className={styles.statsValue}>{project.stats.metric}</span>
          <span className={styles.statsLabel}>{project.stats.label}</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// MAIN HORIZONTAL GALLERY COMPONENT
// ============================================
export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal movement
  // Move from 0% to -80% (leaving some space at the end)
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-75%']);

  return (
    <section ref={containerRef} className={styles.section}>
      {/* Background Effects */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      {/* Sticky Container */}
      <div className={styles.stickyContainer}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            Soluciones que <span className={styles.highlight}>impulsan resultados</span>
          </h2>
        </motion.div>

        {/* Horizontal Scroll Track */}
        <div className={styles.trackWrapper}>
          <motion.div className={styles.track} style={{ x }}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}

            {/* CTA Card at the end */}
            <motion.div
              className={styles.ctaCard}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.ctaContent}>
                <span className={styles.ctaIcon}>🚀</span>
                <h3 className={styles.ctaTitle}>¿Tienes un proyecto en mente?</h3>
                <p className={styles.ctaText}>
                  Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos
                </p>
                <button
                  className={styles.ctaButton}
                  onClick={() => {
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Iniciar conversación
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className={styles.scrollLine}>
            <motion.div
              className={styles.scrollProgress}
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
