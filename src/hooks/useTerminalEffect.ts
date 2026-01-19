import { useState, useEffect, useCallback } from 'react';
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
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const startTerminal = useCallback(() => {
    setIsStarted(true);
  }, []);

  const reset = useCallback(() => {
    setLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    // All commands completed
    if (currentLineIndex >= commands.length) {
      const timeout = setTimeout(() => {
        reset();
      }, restartDelay);
      return () => clearTimeout(timeout);
    }

    const currentCommand = commands[currentLineIndex];
    const speed = currentCommand.type === 'command' ? commandSpeed : outputSpeed;

    // Starting a new line
    if (currentCharIndex === 0 && !lines[currentLineIndex]) {
      setLines(prev => [
        ...prev,
        { type: currentCommand.type, text: '', isComplete: false }
      ]);
      setIsTyping(true);
    }

    // Typing the current line
    if (currentCharIndex < currentCommand.text.length) {
      const timeout = setTimeout(() => {
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
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
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
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [
    commands,
    currentLineIndex,
    currentCharIndex,
    commandSpeed,
    outputSpeed,
    delayBetweenLines,
    restartDelay,
    lines,
    reset,
    isStarted
  ]);

  return { lines, isTyping, startTerminal };
}
