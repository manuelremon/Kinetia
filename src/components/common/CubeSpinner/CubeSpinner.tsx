import styles from './CubeSpinner.module.scss';

interface CubeSpinnerProps {
  size?: number;
  className?: string;
}

export function CubeSpinner({ size = 70, className = '' }: CubeSpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        '--cube-depth': `${size / 2}px`
      } as React.CSSProperties}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
