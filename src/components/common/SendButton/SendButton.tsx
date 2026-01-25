import { ButtonHTMLAttributes } from 'react';
import styles from './SendButton.module.scss';

interface SendButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SendButton({ children, className, ...props }: SendButtonProps) {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
}
