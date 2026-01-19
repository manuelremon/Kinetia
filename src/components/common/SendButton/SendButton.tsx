import { ButtonHTMLAttributes } from 'react';
import styles from './SendButton.module.scss';

interface SendButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SendButton({ children, className, ...props }: SendButtonProps) {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      <div className={styles.svgWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
          />
        </svg>
      </div>
      <span>{children}</span>
    </button>
  );
}
