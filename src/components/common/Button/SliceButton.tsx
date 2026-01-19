import { ReactNode } from 'react';
import styles from './SliceButton.module.scss';

interface SliceButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'small';
}

export function SliceButton({ children, onClick, href, variant = 'primary' }: SliceButtonProps) {
  const className = `${styles.slice} ${variant === 'small' ? styles.small : ''}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick as any}>
        <span className={styles.text}>{children}</span>
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
