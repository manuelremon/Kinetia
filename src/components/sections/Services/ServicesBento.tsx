'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './ServicesBento.module.scss';

// ============================================
// ENGINEERING SERVICES DATA
// ============================================
const services = [
  {
    id: 'neural-inventory',
    title: 'Neural Inventory Engine',
    subtitle: 'Predicción de Demanda con Python',
    description:
      'Algoritmos de forecast en Python + Pandas. Reducción de capital inmovilizado y quiebres de stock mediante modelos de series temporales y machine learning.',
    size: 'featured',
    tags: ['Python', 'Pandas', 'Prophet', 'XGBoost'],
    visual: 'forecast',
  },
  {
    id: 'agentic-erp',
    title: 'Agentic ERP Integration',
    subtitle: 'IA que Opera tu Software',
    description:
      'Agentes RAG que leen facturas, actualizan SQL, detectan anomalías y ejecutan acciones. No solo responden: actúan.',
    size: 'vertical',
    tags: ['LangChain', 'RAG', 'Function Calling'],
    visual: 'chip',
  },
  {
    id: 'liquid-teams',
    title: 'Liquid Engineering Teams',
    subtitle: 'Arquitectura Senior + Ejecución Escalable',
    description:
      'Células ágiles ensambladas para tu proyecto. Liderazgo técnico centralizado con red de expertos on-demand.',
    size: 'horizontal',
    tags: ['Next.js 15', 'TypeScript', 'AWS'],
    visual: 'team',
  },
  {
    id: 'tech-stack',
    title: 'Tech Stack',
    subtitle: 'Herramientas de Precisión',
    description: null,
    size: 'small',
    tags: null,
    visual: 'stack',
  },
];

// ============================================
// SPOTLIGHT CARD COMPONENT
// ============================================
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

function SpotlightCard({ children, className = '', id }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.bentoCard} ${className}`}
      style={{ viewTransitionName: `service-${id}` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Spotlight Effect */}
      {isMounted && (
        <motion.div
          className={styles.spotlight}
          style={{
            background: spotlightBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Border Glow */}
      <motion.div
        className={styles.borderGlow}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className={styles.cardContent}>{children}</div>
    </motion.div>
  );
}

// ============================================
// FORECAST CHART - Animated SVG
// ============================================
function ForecastChart() {
  return (
    <div className={styles.forecastContainer}>
      <svg className={styles.forecastChart} viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Grid Lines */}
        <g className={styles.gridLines}>
          {[0, 50, 100, 150, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} />
          ))}
        </g>

        {/* Actual Data Line */}
        <motion.path
          className={styles.actualLine}
          d="M0,150 L50,140 L100,120 L150,130 L200,100 L250,90 L300,110"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Forecast Line (Dashed) */}
        <motion.path
          className={styles.forecastLine}
          d="M300,110 L350,80 L400,60"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        />

        {/* Confidence Band */}
        <motion.path
          className={styles.confidenceBand}
          d="M300,110 L350,80 L400,60 L400,100 L350,120 L300,110"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />

        {/* Data Points */}
        {[[0, 150], [50, 140], [100, 120], [150, 130], [200, 100], [250, 90], [300, 110]].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            className={styles.dataPoint}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          />
        ))}
      </svg>

      <div className={styles.forecastLegend}>
        <span className={styles.legendItem}>
          <span className={styles.legendActual} /> Histórico
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendForecast} /> Predicción
        </span>
      </div>
    </div>
  );
}

// ============================================
// CHIP LOADER - Processing Animation
// ============================================
function ChipLoader() {
  return (
    <div className={styles.chipContainer}>
      <svg className={styles.chipLoader} viewBox="0 0 200 80">
        {/* Traces Background */}
        <path className={styles.traceBg} d="M10,40 H50" />
        <path className={styles.traceBg} d="M150,40 H190" />
        <path className={styles.traceBg} d="M100,10 V25" />
        <path className={styles.traceBg} d="M100,55 V70" />
        <path className={styles.traceBg} d="M30,20 L50,35" />
        <path className={styles.traceBg} d="M170,20 L150,35" />
        <path className={styles.traceBg} d="M30,60 L50,45" />
        <path className={styles.traceBg} d="M170,60 L150,45" />

        {/* Traces Flow */}
        <path className={`${styles.traceFlow} ${styles.flowBlue}`} d="M10,40 H50" />
        <path className={`${styles.traceFlow} ${styles.flowGreen}`} d="M150,40 H190" />
        <path className={`${styles.traceFlow} ${styles.flowBlue}`} d="M100,10 V25" />
        <path className={`${styles.traceFlow} ${styles.flowGreen}`} d="M100,55 V70" />
        <path className={`${styles.traceFlow} ${styles.flowBlue}`} d="M30,20 L50,35" />
        <path className={`${styles.traceFlow} ${styles.flowGreen}`} d="M170,20 L150,35" />
        <path className={`${styles.traceFlow} ${styles.flowBlue}`} d="M30,60 L50,45" />
        <path className={`${styles.traceFlow} ${styles.flowGreen}`} d="M170,60 L150,45" />

        {/* Chip Body */}
        <rect className={styles.chipBody} x="50" y="25" width="100" height="30" rx="4" />

        {/* Chip Pins */}
        {[60, 80, 100, 120, 140].map((x) => (
          <g key={x}>
            <line className={styles.chipPin} x1={x} y1="25" x2={x} y2="18" />
            <line className={styles.chipPin} x1={x} y1="55" x2={x} y2="62" />
          </g>
        ))}

        {/* Chip Text */}
        <text className={styles.chipText} x="100" y="43" textAnchor="middle">RAG</text>
      </svg>

      <div className={styles.chipStatus}>
        <span className={styles.statusDot} />
        <span>Procesando documentos...</span>
      </div>
    </div>
  );
}

// ============================================
// TEAM VISUALIZATION
// ============================================
function TeamVisualization() {
  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamCore}>
        <div className={styles.coreNode}>
          <span>Lead</span>
        </div>
      </div>
      <div className={styles.teamSatellites}>
        {['Dev', 'ML', 'Data', 'QA'].map((role, i) => (
          <motion.div
            key={role}
            className={styles.satelliteNode}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          >
            <span>{role}</span>
          </motion.div>
        ))}
      </div>
      <svg className={styles.teamLines} viewBox="0 0 200 200">
        <motion.line
          x1="100" y1="100" x2="50" y2="50"
          className={styles.connectionLine}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.line
          x1="100" y1="100" x2="150" y2="50"
          className={styles.connectionLine}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.line
          x1="100" y1="100" x2="50" y2="150"
          className={styles.connectionLine}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.line
          x1="100" y1="100" x2="150" y2="150"
          className={styles.connectionLine}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

// ============================================
// TECH STACK LOGOS
// ============================================
function TechStackLogos() {
  const techs = [
    { name: 'Python', color: '#3776ab' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'AWS', color: '#ff9900' },
    { name: 'PostgreSQL', color: '#336791' },
  ];

  return (
    <div className={styles.stackContainer}>
      {techs.map((tech, i) => (
        <motion.div
          key={tech.name}
          className={styles.stackItem}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          whileHover={{ scale: 1.05 }}
        >
          <span className={styles.stackName} style={{ color: tech.color }}>{tech.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function ServicesBento() {
  return (
    <section className={styles.section} id="services">
      <Container>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>Servicios</span>
          <h2 className={styles.title}>
            Ingeniería <span className={styles.highlight}>Aplicada</span>
          </h2>
          <p className={styles.subtitle}>
            Soluciones técnicas para problemas operativos complejos.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {services.map((service) => (
            <SpotlightCard
              key={service.id}
              id={service.id}
              className={styles[service.size]}
            >
              {/* Featured Card - Neural Inventory */}
              {service.size === 'featured' && (
                <div className={styles.featuredContent}>
                  <div className={styles.featuredVisual}>
                    <ForecastChart />
                  </div>
                  <div className={styles.featuredInfo}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardSubtitle}>{service.subtitle}</p>
                    <p className={styles.cardDescription}>{service.description}</p>
                    <div className={styles.tags}>
                      {service.tags?.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical Card - Agentic ERP */}
              {service.size === 'vertical' && (
                <div className={styles.verticalContent}>
                  <ChipLoader />
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardSubtitle}>{service.subtitle}</p>
                  <p className={styles.cardDescription}>{service.description}</p>
                  <div className={styles.tags}>
                    {service.tags?.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Horizontal Card - Liquid Teams */}
              {service.size === 'horizontal' && (
                <div className={styles.horizontalContent}>
                  <div className={styles.horizontalVisual}>
                    <TeamVisualization />
                  </div>
                  <div className={styles.horizontalInfo}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardSubtitle}>{service.subtitle}</p>
                    <p className={styles.cardDescription}>{service.description}</p>
                    <div className={styles.tags}>
                      {service.tags?.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Small Card - Tech Stack */}
              {service.size === 'small' && (
                <div className={styles.smallContent}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <TechStackLogos />
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
