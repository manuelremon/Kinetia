'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.scss';

type CursorState = 'normal' | 'hover' | 'liquid' | 'click';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('normal');

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => setCursorState('click');
    const handleMouseUp = () => setCursorState('normal');

    // Smooth cursor animation
    let animationId: number;
    const animateCursor = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }

      animationId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hover state handlers
    const hoverElements = document.querySelectorAll('a, button, .flip-card, .stat-item, .nav-link');
    const liquidElements = document.querySelectorAll('.btn-liquid');

    const handleHoverEnter = () => setCursorState('hover');
    const handleHoverLeave = () => setCursorState('normal');
    const handleLiquidEnter = () => setCursorState('liquid');
    const handleLiquidLeave = () => setCursorState('normal');

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    liquidElements.forEach(el => {
      el.addEventListener('mouseenter', handleLiquidEnter);
      el.addEventListener('mouseleave', handleLiquidLeave);
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });

      liquidElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLiquidEnter);
        el.removeEventListener('mouseleave', handleLiquidLeave);
      });
    };
  }, []);

  const cursorClasses = [
    styles.cursor,
    cursorState === 'hover' && styles.hover,
    cursorState === 'liquid' && styles.liquid,
    cursorState === 'click' && styles.click
  ].filter(Boolean).join(' ');

  return (
    <>
      <div ref={cursorRef} className={cursorClasses} />
      <div ref={dotRef} className={styles.cursorDot} />
    </>
  );
}
