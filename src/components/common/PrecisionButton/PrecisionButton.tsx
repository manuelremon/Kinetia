'use client';

import { motion } from 'framer-motion';
import styles from './PrecisionButton.module.scss';

interface PrecisionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function PrecisionButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
}: PrecisionButtonProps) {
  return (
    <motion.button
      type={type}
      className={`
        ${styles.precisionButton}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `.trim()}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.buttonContent}>{children}</span>
      {variant === 'primary' && <span className={styles.buttonGlow} />}
    </motion.button>
  );
}
