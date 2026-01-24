import styles from './GlitchText.module.scss';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
  return (
    <Component className={`${styles.glitchWrapper} ${className}`}>
      <span className={styles.glitch} data-text={text}>
        {text}
      </span>
    </Component>
  );
}