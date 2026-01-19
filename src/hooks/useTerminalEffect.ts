import { useState, useEffect, useCallback, useRef } from 'react';
import type { TerminalCommand } from '@/types';

interface TerminalLine {
  type: 'command' | 'output' | 'success';
  text: string;
  isComplete: boolean;
}

interface UseTerminalEffectOptions {
  commands: TerminalCommand[];
  commandSpeed?: number;
  outputSpeed?: number;
  delayBetweenLines?: number;
  restartDelay?: number;
}

export function useTerminalEffect({
  commands,
  commandSpeed = 40,
  outputSpeed = 15,
  delayBetweenLines = 400,
  restartDelay = 2500
}: UseTerminalEffectOptions) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const currentLineIndexRef = useRef(0);
  const currentCharIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const startTerminal = useCallback(() => {
    setIsStarted(true);
  }, []);

  const reset = useCallback(() => {
    setLines([]);
    currentLineIndexRef.current = 0;
    currentCharIndexRef.current = 0;
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const tick = () => {
      const currentLineIndex = currentLineIndexRef.current;
      const currentCharIndex = currentCharIndexRef.current;

      // All commands completed
      if (currentLineIndex >= commands.length) {
        timeoutRef.current = window.setTimeout(() => {
          reset();
          // Restart the animation
          timeoutRef.current = window.setTimeout(tick, 100);
        }, restartDelay);
        return;
      }

      const currentCommand = commands[currentLineIndex];
      const speed = currentCommand.type === 'command' ? commandSpeed : outputSpeed;

      // Starting a new line
      if (currentCharIndex === 0) {
        setLines(prev => {
          if (prev.length <= currentLineIndex) {
            return [
              ...prev,
              { type: currentCommand.type, text: '', isComplete: false }
            ];
          }
          return prev;
        });
        setIsTyping(true);
      }

      // Typing the current line
      if (currentCharIndex < currentCommand.text.length) {
        setLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex] = {
              ...newLines[currentLineIndex],
              text: currentCommand.text.substring(0, currentCharIndex + 1)
            };
          }
          return newLines;
        });
        currentCharIndexRef.current += 1;
        timeoutRef.current = window.setTimeout(tick, speed);
        return;
      }

      // Line complete, move to next
      if (currentCharIndex === currentCommand.text.length) {
        setLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex] = {
              ...newLines[currentLineIndex],
              isComplete: true
            };
          }
          return newLines;
        });
        setIsTyping(false);

        const delay = currentCommand.type === 'command' ? delayBetweenLines : delayBetweenLines / 2;
        currentLineIndexRef.current += 1;
        currentCharIndexRef.current = 0;
        timeoutRef.current = window.setTimeout(tick, delay);
      }
    };

    tick();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isStarted, commands, commandSpeed, outputSpeed, delayBetweenLines, restartDelay, reset]);

  return { lines, isTyping, startTerminal };
}
