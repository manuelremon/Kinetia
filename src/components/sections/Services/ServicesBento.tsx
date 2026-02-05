'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './ServicesBento.module.scss';

// ============================================
// BENTO SERVICES DATA
// ============================================
const services = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI & LLMs',
    subtitle: 'Agentes entrenados para vos',
    description:
      'Diseñamos y entrenamos agentes autónomos que comprenden contexto, toman decisiones y ejecutan tareas complejas 24/7.',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0f62fe 0%, #6929c4 50%, #9f1853 100%)',
    size: 'featured',
    metric: null,
    tags: ['GPT-4', 'Claude', 'LangChain', 'RAG'],
  },
  {
    id: 'automation',
    title: 'Automatización de Procesos',
    subtitle: 'RPA & Workflows inteligentes',
    description:
      'Transformamos tareas manuales en flujos de trabajo automatizados que liberan a tu equipo de trabajo.',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0f62fe 100%)',
    size: 'vertical',
    metric: { value: '-30%', label: 'Costos Operativos' },
    tags: ['n8n', 'Zapier', 'Python'],
  },
  {
    id: 'software',
    title: 'Desarrollo a Medida',
    subtitle: 'Sistemas escalados a tu negocio',
    description:
      'ERPs, CRMs y Sistemas construidos con tecnología de punta.',
    icon: '🛠️',
    gradient: 'linear-gradient(135deg, #6929c4 0%, #491d8b 100%)',
    size: 'standard',
    metric: null,
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'consulting',
    title: 'Consultoría',
    subtitle: 'Estrategia tecnológica',
    description: null,
    icon: '💡',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
    size: 'small',
    metric: null,
    tags: null,
    badge: 'We are your trusted partner',
  },
  {
    id: 'inventory',
    title: 'Optimización de Inventarios',
    subtitle: 'Predictive Analytics & ML',
    description:
      'Modelos de machine learning que predicen demanda, optimizan stock y reducen costos.',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    size: 'horizontal',
    metric: { value: '-40%', label: 'Stock Muerto' },
    tags: ['TensorFlow', 'Power BI', 'SQL'],
  },
];

// ============================================
// SPOTLIGHT CARD COMPONENT
// ============================================
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  id: string;
}

function SpotlightCard({ children, className = '', gradient, id }: SpotlightCardProps) {
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
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.bentoCard} ${className}`}
      style={{ viewTransitionName: `service-${id}` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Gradient Background */}
      {gradient && (
        <div
          className={styles.gradientBg}
          style={{ background: gradient, opacity: isHovered ? 0.15 : 0.08 }}
        />
      )}

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
// ANIMATED METRIC
// ============================================
function AnimatedMetric({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className={styles.metric}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </motion.div>
  );
}

// ============================================
// ASTRONAUT ANIMATION
// ============================================
function AstronautAnimation() {
  return (
    <div className={styles.astronautContainer}>
      <div className={styles.boxOfStar1}>
        <div className={`${styles.star} ${styles.starPosition1}`}></div>
        <div className={`${styles.star} ${styles.starPosition2}`}></div>
      </div>
      <div className={styles.boxOfStar2}>
        <div className={`${styles.star} ${styles.starPosition3}`}></div>
        <div className={`${styles.star} ${styles.starPosition4}`}></div>
      </div>
      <div className={styles.astronaut}>
        <div className={styles.schoolbag}></div>
        <div className={styles.head}></div>
        <div className={styles.body}>
          <div className={styles.panel}></div>
        </div>
        <div className={`${styles.arm} ${styles.armLeft}`}></div>
        <div className={`${styles.arm} ${styles.armRight}`}></div>
        <div className={`${styles.leg} ${styles.legLeft}`}></div>
        <div className={`${styles.leg} ${styles.legRight}`}></div>
      </div>
    </div>
  );
}

// ============================================
// NEWTON'S CRADLE ANIMATION
// ============================================
function NewtonsCradle() {
  return (
    <div className={styles.newtonsCradle}>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
    </div>
  );
}

// ============================================
// CHIP LOADER ANIMATION
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
        <path className={`${styles.traceFlow} ${styles.yellow}`} d="M10,40 H50" />
        <path className={`${styles.traceFlow} ${styles.blue}`} d="M150,40 H190" />
        <path className={`${styles.traceFlow} ${styles.green}`} d="M100,10 V25" />
        <path className={`${styles.traceFlow} ${styles.purple}`} d="M100,55 V70" />
        <path className={`${styles.traceFlow} ${styles.red}`} d="M30,20 L50,35" />
        <path className={`${styles.traceFlow} ${styles.yellow}`} d="M170,20 L150,35" />
        <path className={`${styles.traceFlow} ${styles.blue}`} d="M30,60 L50,45" />
        <path className={`${styles.traceFlow} ${styles.green}`} d="M170,60 L150,45" />

        {/* Chip Body */}
        <rect className={styles.chipBody} x="50" y="25" width="100" height="30" rx="6" ry="6" />

        {/* Chip Pins */}
        <line className={styles.chipPin} x1="60" y1="25" x2="60" y2="20" />
        <line className={styles.chipPin} x1="80" y1="25" x2="80" y2="20" />
        <line className={styles.chipPin} x1="100" y1="25" x2="100" y2="20" />
        <line className={styles.chipPin} x1="120" y1="25" x2="120" y2="20" />
        <line className={styles.chipPin} x1="140" y1="25" x2="140" y2="20" />
        <line className={styles.chipPin} x1="60" y1="55" x2="60" y2="60" />
        <line className={styles.chipPin} x1="80" y1="55" x2="80" y2="60" />
        <line className={styles.chipPin} x1="100" y1="55" x2="100" y2="60" />
        <line className={styles.chipPin} x1="120" y1="55" x2="120" y2="60" />
        <line className={styles.chipPin} x1="140" y1="55" x2="140" y2="60" />

        {/* Chip Text */}
        <text className={styles.chipText} x="100" y="44" textAnchor="middle">KINETIA</text>
      </svg>
    </div>
  );
}

// ============================================
// SQUARE LOADER ANIMATION
// ============================================
function SquareLoader() {
  return (
    <div className={styles.squareLoader}>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
    </div>
  );
}

// ============================================
// LIGHTBULB LOADER ANIMATION
// ============================================
function LightbulbLoader() {
  return <div className={styles.lightbulbLoader}></div>;
}

// ============================================
// AI VISUALIZATION
// ============================================
function AIVisualization() {
  return (
    <div className={styles.aiVisualization}>
      <motion.div
        className={styles.aiOrb}
        animate={{
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.5)',
            '0 0 40px rgba(139, 92, 246, 0.6)',
            '0 0 20px rgba(59, 130, 246, 0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function ServicesBento() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="servicios">
      <Container>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Desarrollo IA en <span className={styles.highlight}>SERIO</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {services.map((service) => (
            <SpotlightCard
              key={service.id}
              id={service.id}
              className={styles[service.size]}
              gradient={service.gradient}
            >
              {/* Featured Card */}
              {service.size === 'featured' && (
                <div className={styles.featuredContent}>
                  <div className={styles.featuredHeader}>
                    <AstronautAnimation />
                  </div>
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

              {/* Vertical Card */}
              {service.size === 'vertical' && (
                <div className={styles.verticalContent}>
                  <NewtonsCradle />
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardSubtitle}>{service.subtitle}</p>
                  <p className={styles.cardDescription}>{service.description}</p>
                  {service.metric && (
                    <AnimatedMetric value={service.metric.value} label={service.metric.label} />
                  )}
                  <div className={styles.tags}>
                    {service.tags?.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Standard Card */}
              {service.size === 'standard' && (
                <div className={styles.standardContent}>
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

              {/* Small Card */}
              {service.size === 'small' && (
                <div className={styles.smallContent}>
                  <LightbulbLoader />
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  {service.badge && (
                    <span className={styles.trustBadge}>{service.badge}</span>
                  )}
                </div>
              )}

              {/* Horizontal Card */}
              {service.size === 'horizontal' && (
                <div className={styles.horizontalContent}>
                  <div className={styles.horizontalMain}>
                    <div className={styles.horizontalHeader}>
                      <SquareLoader />
                      <div>
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardSubtitle}>{service.subtitle}</p>
                      </div>
                    </div>
                    <p className={styles.cardDescription}>{service.description}</p>
                    <div className={styles.tags}>
                      {service.tags?.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {service.metric && (
                    <AnimatedMetric value={service.metric.value} label={service.metric.label} />
                  )}
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>

      </Container>
    </section>
  );
}
