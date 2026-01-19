import styles from './GlitchText.module.scss';

interface GlitchTextProps {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export function GlitchText({
  text,
  as: Component = 'span',
  className = ''
}: GlitchTextProps) {
  return (
    <Component
      className={`${styles.glitch} ${className}`}
      data-text={text}
    >
      {text}
    </Component>
  );
}
