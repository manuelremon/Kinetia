'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './CaseStudies.module.scss';

// Bento Grid Case Studies Data
const BENTO_CASES = [
  {
    id: 'logistics',
    title: 'Optimización Logística',
    company: 'LogiTrans',
    description: 'Algoritmos ML para ruteo dinámico y predicción de entregas',
    metrics: { main: '-30%', label: 'Costos Logísticos' },
    secondaryMetrics: [
      { value: '+45%', label: 'Entregas a tiempo' },
      { value: '2x', label: 'Capacidad' }
    ],
    icon: '🚚',
    color: '#0f62fe',
    size: 'large', // Bento size: large, medium, small
    challenge: 'Costos de distribución elevados y entregas tardías frecuentes',
    solution: 'Implementamos un sistema de optimización de rutas con ML que analiza tráfico en tiempo real, historial de entregas y capacidad de vehículos.',
    tech: ['Python', 'TensorFlow', 'Google Maps API', 'PostgreSQL']
  },
  {
    id: 'inventory',
    title: 'Predicción de Inventario',
    company: 'RetailMax',
    description: 'IA predictiva para gestión de stock con 95% de precisión',
    metrics: { main: '-70%', label: 'Tiempo Gestión' },
    secondaryMetrics: [
      { value: '+25%', label: 'Rotación' },
      { value: '-40%', label: 'Stock Muerto' }
    ],
    icon: '📦',
    color: '#24a148',
    size: 'medium',
    challenge: 'Roturas de stock frecuentes y exceso de inventario que congelaba capital',
    solution: 'Sistema predictivo que anticipa la demanda con 95% de precisión y automatiza reposiciones basándose en patrones estacionales.',
    tech: ['scikit-learn', 'Pandas', 'Power BI', 'SAP Integration']
  },
  {
    id: 'sales',
    title: 'Pipeline de Ventas IA',
    company: 'TechRetail',
    description: 'Chatbot + scoring automático de leads 24/7',
    metrics: { main: '+35%', label: 'Conversión' },
    secondaryMetrics: [
      { value: '3x', label: 'Leads Procesados' },
      { value: '-50%', label: 'Tiempo Respuesta' }
    ],
    icon: '🎯',
    color: '#8a3ffc',
    size: 'medium',
    challenge: 'Equipo de ventas saturado procesando leads no calificados manualmente',
    solution: 'Agente IA que califica leads automáticamente, responde consultas 24/7 y prioriza oportunidades de alto valor.',
    tech: ['OpenAI GPT-4', 'LangChain', 'HubSpot API', 'Twilio']
  },
  {
    id: 'finance',
    title: 'Automatización Financiera',
    company: 'FinCorp',
    description: 'Procesamiento automático de facturas y conciliaciones',
    metrics: { main: '-80%', label: 'Tiempo Manual' },
    secondaryMetrics: [
      { value: '99.9%', label: 'Precisión' },
      { value: '5x', label: 'Volumen' }
    ],
    icon: '💰',
    color: '#da1e28',
    size: 'small',
    challenge: 'Procesamiento manual de 500+ facturas diarias con errores frecuentes',
    solution: 'Sistema de OCR + IA que extrae datos, valida contra ERP y ejecuta conciliaciones automáticas.',
    tech: ['AWS Textract', 'Python', 'SAP API', 'Node.js']
  },
  {
    id: 'support',
    title: 'Agente de Soporte 24/7',
    company: 'ServicePro',
    description: 'Resolución automática del 80% de tickets',
    metrics: { main: '80%', label: 'Resolución Auto' },
    secondaryMetrics: [
      { value: '-60%', label: 'Tiempo Espera' },
      { value: '+40%', label: 'Satisfacción' }
    ],
    icon: '🤖',
    color: '#ff7eb6',
    size: 'small',
    challenge: 'Cola de soporte con tiempos de espera de 4+ horas y clientes frustrados',
    solution: 'Agente IA con RAG que accede a base de conocimiento y resuelve consultas complejas sin intervención humana.',
    tech: ['Claude 3.5', 'Pinecone', 'Zendesk API', 'React']
  }
];

// Spotlight Card Component
function SpotlightCard({
  children,
  className,
  style
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.spotlightCard} ${className || ''}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.spotlight}
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
            : 'none'
        }}
      />
      {children}
    </div>
  );
}

// Detail Modal Component
function CaseDetailModal({
  caseData,
  isOpen,
  onClose
}: {
  caseData: typeof BENTO_CASES[0] | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!caseData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              viewTransitionName: `case-card-${caseData.id}`
            } as React.CSSProperties}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.modalIcon} style={{ background: caseData.color }}>
                {caseData.icon}
              </span>
              <div>
                <h3 className={styles.modalTitle}>{caseData.title}</h3>
                <span className={styles.modalCompany}>{caseData.company}</span>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4>El Desafío</h4>
                <p>{caseData.challenge}</p>
              </div>

              <div className={styles.modalSection}>
                <h4>Nuestra Solución</h4>
                <p>{caseData.solution}</p>
              </div>

              <div className={styles.modalMetrics}>
                <div className={styles.mainMetric} style={{ borderColor: caseData.color }}>
                  <span className={styles.metricValue} style={{ color: caseData.color }}>
                    {caseData.metrics.main}
                  </span>
                  <span className={styles.metricLabel}>{caseData.metrics.label}</span>
                </div>
                {caseData.secondaryMetrics.map((metric, i) => (
                  <div key={i} className={styles.secondaryMetric}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.modalSection}>
                <h4>Stack Tecnológico</h4>
                <div className={styles.techStack}>
                  {caseData.tech.map((tech, i) => (
                    <span key={i} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof BENTO_CASES[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="case-studies" className={styles.caseStudies}>
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Casos de Éxito</span>
          <h2 className={styles.title}>
            Resultados que <span className={styles.highlight}>hablan por sí solos</span>
          </h2>
          <p className={styles.subtitle}>
            Empresas que transformaron su operación con nuestras soluciones de IA y automatización
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {BENTO_CASES.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className={`${styles.bentoItem} ${styles[caseItem.size]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                viewTransitionName: `case-card-${caseItem.id}`
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredId(caseItem.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <SpotlightCard
                className={styles.bentoCard}
                style={{ '--accent-color': caseItem.color } as React.CSSProperties}
              >
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon} style={{ background: caseItem.color }}>
                    {caseItem.icon}
                  </span>
                  <span className={styles.cardCompany}>{caseItem.company}</span>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{caseItem.title}</h3>
                  <p className={styles.cardDescription}>{caseItem.description}</p>
                </div>

                {/* Metric Reveal on Hover */}
                <motion.div
                  className={styles.metricReveal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredId === caseItem.id ? 1 : 0,
                    y: hoveredId === caseItem.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.bigMetric} style={{ color: caseItem.color }}>
                    {caseItem.metrics.main}
                  </span>
                  <span className={styles.bigMetricLabel}>{caseItem.metrics.label}</span>
                </motion.div>

                {/* Learn More Button */}
                <button
                  className={styles.learnMoreBtn}
                  onClick={() => setSelectedCase(caseItem)}
                  style={{ '--btn-color': caseItem.color } as React.CSSProperties}
                >
                  Ver caso completo
                  <span className={styles.arrow}>→</span>
                </button>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className={styles.ctaText}>¿Quieres resultados similares?</p>
          <button className={styles.ctaButton}>
            Agenda tu diagnóstico gratuito
            <span>→</span>
          </button>
        </motion.div>
      </Container>

      {/* Detail Modal */}
      <CaseDetailModal
        caseData={selectedCase}
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </section>
  );
}
