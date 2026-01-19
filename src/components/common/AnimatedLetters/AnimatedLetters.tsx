import { useEffect, useRef } from 'react';
import * as anime from 'animejs';
import styles from './AnimatedLetters.module.scss';

interface AnimatedLettersProps {
  text: string;
  className?: string;
  loop?: boolean;
}

export function AnimatedLetters({ text, className = '', loop = true }: AnimatedLettersProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');

    const animation = anime.timeline({ loop })
      .add({
        targets: letters,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2250,
        delay: (_el: Element, i: number) => 150 * (i + 1)
      })
      .add({
        targets: containerRef.current,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000
      });

    return () => {
      animation.pause();
    };
  }, [text, loop]);

  const letters = text.split('').map((char, index) => (
    <span
      key={index}
      className={`letter ${char === ' ' ? styles.space : ''}`}
      style={{ opacity: 0 }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <span ref={containerRef} className={`${styles.container} ${className}`}>
      {letters}
    </span>
  );
}
