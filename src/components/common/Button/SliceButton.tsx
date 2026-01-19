import { ReactNode } from 'react';
import styles from './SliceButton.module.scss';

interface SliceButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'small';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function SliceButton({
  children,
  onClick,
  href,
  variant = 'primary',
  type = 'button',
  disabled = false
}: SliceButtonProps) {
  const className = `${styles.slice} ${variant === 'small' ? styles.small : ''} ${disabled ? styles.disabled : ''}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick as any}>
        <span className={styles.text}>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
