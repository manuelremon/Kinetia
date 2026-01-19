import styles from './RobotIcon.module.scss';

interface RobotIconProps {
  size?: number;
  className?: string;
}

export function RobotIcon({ size = 100, className = '' }: RobotIconProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ '--uib-size': `${size}px` } as React.CSSProperties}
    >
      <div className={styles.slice} />
      <div className={styles.slice} />
      <div className={styles.slice} />
      <div className={styles.slice} />
      <div className={styles.slice} />
      <div className={styles.slice} />
    </div>
  );
}
