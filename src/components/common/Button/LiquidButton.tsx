import type { ReactNode, MouseEvent } from 'react';
import styles from './LiquidButton.module.scss';

interface LiquidButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export function LiquidButton({
  children,
  variant = 'primary',
  onClick,
  className = ''
}: LiquidButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });

    onClick?.();
  };

  const buttonClasses = [
    styles.btnLiquid,
    variant === 'secondary' && styles.secondary,
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className={styles.blob} />
      <span className={styles.text}>
        {children}
        <span className={styles.arrow}>→</span>
      </span>
    </button>
  );
}
