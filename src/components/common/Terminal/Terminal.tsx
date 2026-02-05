'use client';

import { useEffect } from 'react';
import { useTerminalEffect } from '@/hooks';
import type { TerminalCommand } from '@/types';
import styles from './Terminal.module.scss';

interface TerminalProps {
  commands: TerminalCommand[];
  title?: string;
  autoStart?: boolean;
  startDelay?: number;
}

export function Terminal({
  commands,
  title = 'tensorstax-cli',
  autoStart = true,
  startDelay = 1500
}: TerminalProps) {
  const { lines, isTyping, startTerminal } = useTerminalEffect({ commands });

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(startTerminal, startDelay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, startDelay, startTerminal]);

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${styles.line} ${styles.visible}`}
          >
            {line.type === 'command' && (
              <>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}>{line.text}</span>
                {!line.isComplete && isTyping && (
                  <span className={styles.cursor} />
                )}
              </>
            )}
            {line.type === 'output' && (
              <span className={styles.output}>{line.text}</span>
            )}
            {line.type === 'success' && (
              <span className={styles.success}>{line.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
