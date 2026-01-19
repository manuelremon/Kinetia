import { Container, LiquidButton, GlitchText } from '@/components/common';
import styles from './CTA.module.scss';

export function CTA() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.card}>
          <div className={styles.content}>
            <span className={styles.label}>Comenzar</span>
            <GlitchText
              text="IA Autónoma para Datos"
              as="h2"
              className={styles.title}
            />
            <p className={styles.subtitle}>
              Pipelines que se reparan solos. Validados antes de desplegar.
            </p>
            <div className={styles.buttons}>
              <LiquidButton>Solicitar Demo</LiquidButton>
              <LiquidButton variant="secondary">Ver Documentación</LiquidButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
