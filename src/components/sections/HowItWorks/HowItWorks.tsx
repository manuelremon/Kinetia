import { Container } from '@/components/common';
import { useScrollReveal } from '@/hooks';
import styles from './HowItWorks.module.scss';

interface StepProps {
  number: number;
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function Step({ number, label, title, description, children }: StepProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={`${styles.step} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.stepContent}>
        <div className={styles.stepNumber}>
          <span className={styles.stepNumberCircle}>{number}</span>
          {label}
        </div>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
      <div className={styles.stepCard}>{children}</div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <Container>
        <div className="section-header">
          <span className="section-label">Proceso</span>
          <h2 className="section-title">
            Cómo <span className="text-gradient-animated">funciona</span>
          </h2>
        </div>

        <div className={styles.stepsGrid}>
          <Step
            number={1}
            label="Describir"
            title="Expresa tu intención"
            description="Comienza describiendo lo que necesitas — un nuevo modelo dbt, DAG de Airflow o flujo ELT completo."
          >
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <span className={`${styles.dot} ${styles.red}`} />
                <span className={`${styles.dot} ${styles.yellow}`} />
                <span className={`${styles.dot} ${styles.green}`} />
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.command}>kinetia crear</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.output}>→ ¿Qué te gustaría construir?</span>
                </div>
              </div>
            </div>
          </Step>

          <Step
            number={2}
            label="Planificar"
            title="La IA genera un plan"
            description="Nuestra IA crea un plan estructurado adaptado a tu infraestructura y estándares de código."
          >
            <div className={styles.planCard}>
              <div className={styles.planItem}>
                <span className={`${styles.planNumber} ${styles.orange}`}>1</span>
                <span>Crear modelo dbt</span>
              </div>
              <div className={styles.planItem}>
                <span className={`${styles.planNumber} ${styles.cyan}`}>2</span>
                <span>Añadir pruebas de esquema</span>
              </div>
              <div className={styles.planItem}>
                <span className={`${styles.planNumber} ${styles.purple}`}>3</span>
                <span>Crear DAG de Airflow</span>
              </div>
            </div>
          </Step>

          <Step
            number={3}
            label="Generar"
            title="Pipeline en segundos"
            description="Pipeline completo generado instantáneamente con estructura adecuada y mejores prácticas."
          >
            <div className={styles.generateCard}>
              <div className={styles.generateIcon}>⚡</div>
              <p className={styles.generateText}>¡Pipeline Generado!</p>
            </div>
          </Step>

          <Step
            number={4}
            label="Verificar"
            title="Siempre validado"
            description="El dry-run automático asegura que todo funcione antes del despliegue."
          >
            <div className={styles.verifyCard}>
              <div className={styles.verifyItem}>
                <span className={styles.checkmark}>✓</span> Todas las pruebas pasaron
              </div>
              <div className={styles.verifyItem}>
                <span className={styles.checkmark}>✓</span> Esquema validado
              </div>
              <div className={styles.verifyItem}>
                <span className={styles.checkmark}>✓</span> Listo para desplegar
              </div>
            </div>
          </Step>
        </div>
      </Container>
    </section>
  );
}
