import styles from './MorphLoader.module.scss';

interface MorphLoaderProps {
  size?: number;
  className?: string;
}

export function MorphLoader({ size = 100, className = '' }: MorphLoaderProps) {
  return (
    <div
      className={`${styles.loader} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${Math.max(4, size * 0.08)}px`
      }}
    />
  );
}
