import styles from './GridLoader.module.scss';

interface GridLoaderProps {
  size?: number;
  className?: string;
}

export function GridLoader({ size = 80, className = '' }: GridLoaderProps) {
  const scale = size / 80;

  return (
    <div
      className={`${styles.loadingspinner} ${className}`}
      style={{
        '--square': `${26 * scale}px`,
        '--offset': `${30 * scale}px`,
      } as React.CSSProperties}
    >
      <div id="square1" className={styles.square1} />
      <div id="square2" className={styles.square2} />
      <div id="square3" className={styles.square3} />
      <div id="square4" className={styles.square4} />
      <div id="square5" className={styles.square5} />
    </div>
  );
}
