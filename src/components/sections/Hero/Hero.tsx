import { Container, LiquidButton, TypingText, Terminal } from '@/components/common';
import { TYPING_PHRASES, TERMINAL_COMMANDS } from '@/utils/constants';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Presentamos KINETIA
          </div>

          <h1 className={styles.title}>
            Infraestructura de datos<br />
            <span className={styles.typingContainer}>
              <TypingText phrases={TYPING_PHRASES} />
            </span>
          </h1>

          <p className={styles.description}>
            Agentes de IA autónomos que planifican, generan y mantienen pipelines de datos
            de nivel producción. Se integra perfectamente con dbt, Airflow, Spark y todo tu stack.
          </p>

          <div className={styles.cta}>
            <LiquidButton variant="secondary">Unirse a Lista de Espera</LiquidButton>
            <LiquidButton>Solicitar Demo</LiquidButton>
          </div>

          <div className={styles.terminal}>
            <Terminal commands={TERMINAL_COMMANDS} />
          </div>
        </div>
      </Container>

      <div className={styles.scroll}>
        <span>Desplazar</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
