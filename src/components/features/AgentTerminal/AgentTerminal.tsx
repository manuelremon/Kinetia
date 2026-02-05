'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentTerminal.module.scss';

// Terminal Commands and AI Analysis Simulation
const AGENT_SEQUENCES = [
  {
    type: 'command',
    text: 'kinetia agent --analyze inventory',
    delay: 0
  },
  {
    type: 'system',
    text: '⚡ Initializing Kinetia AI Agent v2.0...',
    delay: 800
  },
  {
    type: 'output',
    text: '→ Connecting to inventory database...',
    delay: 1200
  },
  {
    type: 'success',
    text: '✓ Connected successfully',
    delay: 1800
  },
  {
    type: 'output',
    text: '→ Loading historical sales data (24 months)...',
    delay: 2200
  },
  {
    type: 'output',
    text: '→ Applying ML demand forecasting model...',
    delay: 2800
  },
  {
    type: 'code',
    text: `model = DemandForecaster(
  algorithm="prophet",
  seasonality=True,
  confidence=0.95
)`,
    delay: 3200
  },
  {
    type: 'output',
    text: '→ Analyzing 15,432 SKUs across 3 warehouses...',
    delay: 4200
  },
  {
    type: 'metric',
    label: 'Accuracy Score',
    value: '94.7%',
    delay: 5000
  },
  {
    type: 'success',
    text: '✓ Analysis complete!',
    delay: 5800
  },
  {
    type: 'output',
    text: '→ Generating optimization recommendations...',
    delay: 6200
  },
  {
    type: 'result',
    title: 'OPTIMIZATION RESULTS',
    items: [
      { label: 'Stock Reduction', value: '-35%', trend: 'down' },
      { label: 'Service Level', value: '99.2%', trend: 'up' },
      { label: 'ROI Projection', value: '+47%', trend: 'up' }
    ],
    delay: 7000
  },
  {
    type: 'command',
    text: 'kinetia agent --deploy --auto',
    delay: 8500
  },
  {
    type: 'success',
    text: '✓ Agent deployed to production!',
    delay: 9200
  },
  {
    type: 'system',
    text: '🤖 Agent running autonomously 24/7...',
    delay: 9800
  }
];

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

export function AgentTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const startTerminal = () => {
    if (isRunning) return;

    setIsRunning(true);
    setHasStarted(true);
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

        // Reset after last command
        if (index === AGENT_SEQUENCES.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
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
    <div className={styles.terminalContainer}>
      {/* Terminal Header */}
      <div className={styles.terminalHeader}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.terminalTitle}>kinetia-agent-terminal</span>
        <div className={styles.headerActions}>
          {!isRunning && (
            <button className={styles.runButton} onClick={startTerminal}>
              {hasStarted ? 'Run Again' : 'Run Demo'}
            </button>
          )}
          {isRunning && (
            <span className={styles.runningIndicator}>
              <span className={styles.runningDot} />
              Running...
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
║   Autonomous Business Intelligence    ║
╚═══════════════════════════════════════╝`}
            </div>
            <p>Click "Run Demo" to see the AI Agent in action</p>
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
    </div>
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
