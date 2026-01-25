import styles from './LiquidButton.module.scss';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function LiquidButton({ children, className = '', ...props }: LiquidButtonProps) {
  return (
    <button className={`${styles.liquidBtn} ${className}`} {...props}>
      <span>{children}</span>
    </button>
  );
}