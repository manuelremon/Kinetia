'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styles from './AgentTerminal.module.scss';

// Terminal Commands and AI Analysis Simulation
const AGENT_SEQUENCES = [
  {
    type: 'command',
    text: 'kinetia agente --analizar inventario',
    delay: 0
  },
  {
    type: 'system',
    text: '⚡ Inicializando Kinetia AI Agent v2.0...',
    delay: 800
  },
  {
    type: 'output',
    text: '→ Conectando a base de datos de inventario...',
    delay: 1200
  },
  {
    type: 'success',
    text: '✓ Conexión exitosa',
    delay: 1800
  },
  {
    type: 'output',
    text: '→ Cargando datos históricos de ventas (24 meses)...',
    delay: 2200
  },
  {
    type: 'output',
    text: '→ Aplicando modelo ML de predicción de demanda...',
    delay: 2800
  },
  {
    type: 'code',
    text: `modelo = PredictorDemanda(
  algoritmo="prophet",
  estacionalidad=True,
  confianza=0.95
)`,
    delay: 3200
  },
  {
    type: 'output',
    text: '→ Analizando 15,432 SKUs en 3 almacenes...',
    delay: 4200
  },
  {
    type: 'metric',
    label: 'Precisión del Modelo',
    value: '94.7%',
    delay: 5000
  },
  {
    type: 'success',
    text: '✓ ¡Análisis completado!',
    delay: 5800
  },
  {
    type: 'output',
    text: '→ Generando recomendaciones de optimización...',
    delay: 6200
  },
  {
    type: 'result',
    title: 'RESULTADOS DE OPTIMIZACIÓN',
    items: [
      { label: 'Reducción de Stock', value: '-35%', trend: 'down' },
      { label: 'Nivel de Servicio', value: '99.2%', trend: 'up' },
      { label: 'Proyección ROI', value: '+47%', trend: 'up' }
    ],
    delay: 7000
  },
  {
    type: 'command',
    text: 'kinetia agente --desplegar --auto',
    delay: 8500
  },
  {
    type: 'success',
    text: '✓ ¡Agente desplegado en producción!',
    delay: 9200
  },
  {
    type: 'system',
    text: '🤖 Agente ejecutándose autónomamente 24/7...',
    delay: 9800
  }
];

// KPI Data for Modal
const KPI_DATA = {
  stockReduction: { value: 35, label: 'Reducción de Stock', unit: '%', color: '#10b981' },
  serviceLevel: { value: 99.2, label: 'Nivel de Servicio', unit: '%', color: '#0ea5e9' },
  roiProjection: { value: 47, label: 'Proyección ROI', unit: '%', color: '#8b5cf6' },
  accuracy: { value: 94.7, label: 'Precisión del Modelo', unit: '%', color: '#f59e0b' },
  skusAnalyzed: { value: 15432, label: 'SKUs Analizados', unit: '', color: '#ec4899' },
  warehouses: { value: 3, label: 'Almacenes', unit: '', color: '#6366f1' }
};

interface TerminalLine {
  id: number;
  type: string;
  text?: string;
  label?: string;
  value?: string;
  title?: string;
  items?: Array<{ label: string; value: string; trend: string }>;
  isTyping?: boolean;
}

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
}

// Circular Progress Component
function CircularProgress({
  value,
  color,
  size = 120
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className={styles.circularProgress}>
      <circle
        className={styles.circularBg}
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        className={styles.circularFill}
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          stroke: color,
        }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

// Bar Chart Component
function AnimatedBar({
  value,
  maxValue,
  color,
  label
}: {
  value: number;
  maxValue: number;
  color: string;
  label: string;
}) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className={styles.barContainer}>
      <div className={styles.barLabel}>{label}</div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      <div className={styles.barValue}>{value.toLocaleString()}</div>
    </div>
  );
}

// KPI Modal Component
function KPIModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>📊 Dashboard de KPIs</h2>
              <p>Resultados del análisis de optimización</p>
              <button className={styles.closeButton} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Main KPIs with Circular Progress */}
              <div className={styles.kpiGrid}>
                <motion.div
                  className={styles.kpiCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={styles.kpiCircleWrapper}>
                    <CircularProgress value={KPI_DATA.stockReduction.value} color={KPI_DATA.stockReduction.color} size={50} />
                    <div className={styles.kpiCircleValue}>
                      <AnimatedCounter value={KPI_DATA.stockReduction.value} />
                      <span>%</span>
                    </div>
                  </div>
                  <div className={styles.kpiInfo}>
                    <span className={styles.kpiLabel}>{KPI_DATA.stockReduction.label}</span>
                    <span className={styles.kpiTrend} style={{ color: KPI_DATA.stockReduction.color }}>
                      ↓ Reducción
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.kpiCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={styles.kpiCircleWrapper}>
                    <CircularProgress value={KPI_DATA.serviceLevel.value} color={KPI_DATA.serviceLevel.color} size={50} />
                    <div className={styles.kpiCircleValue}>
                      <AnimatedCounter value={Math.floor(KPI_DATA.serviceLevel.value)} />
                      <span>%</span>
                    </div>
                  </div>
                  <div className={styles.kpiInfo}>
                    <span className={styles.kpiLabel}>{KPI_DATA.serviceLevel.label}</span>
                    <span className={styles.kpiTrend} style={{ color: KPI_DATA.serviceLevel.color }}>
                      ↑ Mejora
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.kpiCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={styles.kpiCircleWrapper}>
                    <CircularProgress value={KPI_DATA.roiProjection.value} color={KPI_DATA.roiProjection.color} size={50} />
                    <div className={styles.kpiCircleValue}>
                      +<AnimatedCounter value={KPI_DATA.roiProjection.value} />
                      <span>%</span>
                    </div>
                  </div>
                  <div className={styles.kpiInfo}>
                    <span className={styles.kpiLabel}>{KPI_DATA.roiProjection.label}</span>
                    <span className={styles.kpiTrend} style={{ color: KPI_DATA.roiProjection.color }}>
                      ↑ Incremento
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Secondary Stats with Bars */}
              <motion.div
                className={styles.statsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>Métricas de Análisis</h3>
                <div className={styles.barsContainer}>
                  <AnimatedBar
                    value={KPI_DATA.accuracy.value}
                    maxValue={100}
                    color={KPI_DATA.accuracy.color}
                    label={KPI_DATA.accuracy.label}
                  />
                  <AnimatedBar
                    value={KPI_DATA.skusAnalyzed.value}
                    maxValue={20000}
                    color={KPI_DATA.skusAnalyzed.color}
                    label={KPI_DATA.skusAnalyzed.label}
                  />
                </div>
              </motion.div>

              {/* Summary Cards */}
              <motion.div
                className={styles.summaryGrid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className={styles.summaryCard}>
                  <span className={styles.summaryIcon}>🏭</span>
                  <span className={styles.summaryValue}>
                    <AnimatedCounter value={KPI_DATA.warehouses.value} />
                  </span>
                  <span className={styles.summaryLabel}>Almacenes</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryIcon}>📦</span>
                  <span className={styles.summaryValue}>
                    <AnimatedCounter value={KPI_DATA.skusAnalyzed.value} />
                  </span>
                  <span className={styles.summaryLabel}>SKUs</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryIcon}>📅</span>
                  <span className={styles.summaryValue}>24</span>
                  <span className={styles.summaryLabel}>Meses de datos</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryIcon}>🤖</span>
                  <span className={styles.summaryValue}>24/7</span>
                  <span className={styles.summaryLabel}>Monitoreo</span>
                </div>
              </motion.div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.ctaButton} onClick={onClose}>
                Solicitar Diagnóstico Real
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AgentTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showKPIModal, setShowKPIModal] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based 3D roll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const startTerminal = () => {
    if (isRunning) return;

    setIsRunning(true);
    setHasStarted(true);
    setIsComplete(false);
    setLines([]);

    AGENT_SEQUENCES.forEach((sequence, index) => {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { ...sequence, id: index, isTyping: true }
        ]);

        // Mark typing complete after a delay
        setTimeout(() => {
          setLines((prev) =>
            prev.map((line) =>
              line.id === index ? { ...line, isTyping: false } : line
            )
          );
        }, 400);

        // Scroll to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }

        // Mark complete after last command
        if (index === AGENT_SEQUENCES.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setIsComplete(true);
          }, 1000);
        }
      }, sequence.delay);
    });
  };

  // Auto-scroll on new lines
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const renderLine = (line: TerminalLine) => {
    switch (line.type) {
      case 'command':
        return (
          <div className={styles.commandLine}>
            <span className={styles.prompt}>$</span>
            <TypewriterText text={line.text || ''} isTyping={line.isTyping} />
            {line.isTyping && <span className={styles.cursor} />}
          </div>
        );

      case 'system':
        return (
          <div className={styles.systemLine}>
            {line.text}
          </div>
        );

      case 'output':
        return (
          <div className={styles.outputLine}>
            {line.text}
          </div>
        );

      case 'success':
        return (
          <div className={styles.successLine}>
            {line.text}
          </div>
        );

      case 'code':
        return (
          <pre className={styles.codeLine}>
            {line.text}
          </pre>
        );

      case 'metric':
        return (
          <div className={styles.metricLine}>
            <span className={styles.metricLabel}>{line.label}</span>
            <span className={styles.metricValue}>{line.value}</span>
          </div>
        );

      case 'result':
        return (
          <div className={styles.resultBlock}>
            <div className={styles.resultTitle}>{line.title}</div>
            <div className={styles.resultItems}>
              {line.items?.map((item, i) => (
                <div key={i} className={styles.resultItem}>
                  <span className={styles.resultLabel}>{item.label}</span>
                  <span
                    className={`${styles.resultValue} ${styles[item.trend]}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.terminalWrapper} ref={containerRef}>
        <motion.div
          className={styles.terminalContainer}
          style={{
            rotateX,
            scale,
            opacity,
          }}
        >
          {/* Terminal Header */}
          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.terminalTitle}>kinetia-agente-terminal</span>
            <div className={styles.headerActions}>
              {!isRunning && (
                <button className={styles.runButton} onClick={startTerminal}>
                  {hasStarted ? 'Ejecutar de Nuevo' : 'Ejecutar Demo'}
                </button>
              )}
              {isRunning && (
                <span className={styles.runningIndicator}>
                  <span className={styles.runningDot} />
                  Ejecutando...
                </span>
              )}
            </div>
          </div>

          {/* Terminal Body */}
          <div className={styles.terminalBody} ref={terminalRef}>
            {!hasStarted && (
              <div className={styles.welcomeMessage}>
                <div className={styles.ascii}>
{`╔═══════════════════════════════════════╗
║     KINETIA AI AGENT TERMINAL v2.0    ║
║   Inteligencia de Negocios Autónoma   ║
╚═══════════════════════════════════════╝`}
                </div>
                <p>Haz clic en "Ejecutar Demo" para ver el Agente IA en acción</p>
              </div>
            )}

            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.line}
                >
                  {renderLine(line)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* KPI Button after animation completes - Outside body for visibility */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className={styles.kpiButtonContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <motion.button
                  className={styles.kpiButton}
                  onClick={() => setShowKPIModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.kpiButtonIcon}>📊</span>
                  Ver KPI's
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reflection effect */}
          <div className={styles.terminalReflection} />
        </motion.div>
      </div>

      {/* KPI Modal */}
      <KPIModal isOpen={showKPIModal} onClose={() => setShowKPIModal(false)} />
    </>
  );
}

// Typewriter Effect Component
function TypewriterText({
  text,
  isTyping
}: {
  text: string;
  isTyping?: boolean;
}) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (isTyping) {
      setDisplayText('');
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [text, isTyping]);

  return <span className={styles.commandText}>{displayText}</span>;
}
