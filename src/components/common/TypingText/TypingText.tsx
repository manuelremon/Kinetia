'use client';

import { useEffect } from 'react';
import { useTypingEffect } from '@/hooks';
import styles from './TypingText.module.scss';

interface TypingTextProps {
  phrases: string[];
  className?: string;
  autoStart?: boolean;
  startDelay?: number;
}

export function TypingText({
  phrases,
  className = '',
  autoStart = true,
  startDelay = 800
}: TypingTextProps) {
  const { displayText, startTyping } = useTypingEffect({ phrases });

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(startTyping, startDelay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, startDelay, startTyping]);

  return (
    <span className={`${styles.typingText} text-gradient-animated ${className}`}>
      {displayText}
    </span>
  );
}
