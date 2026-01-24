import styles from './LiquidButton.module.scss';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function LiquidButton({ children, className = '', ...props }: LiquidButtonProps) {
  // Nota: Para una implementación real de "Liquid" completa se necesita Paper.js o un canvas complejo.
  // Aquí implementaremos una versión CSS avanzada con un "blob" animado para simplificar dependencias
  // pero manteniendo el efecto visual impactante.
  
  return (
    <button className={`${styles.liquidBtn} ${className} btn-liquid`} {...props}>
      <span>{children}</span>
      <div className={styles.blob}></div>
    </button>
  );
}