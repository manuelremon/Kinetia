import { Container, Terminal, ScrollReveal } from '@/components/common';
import { TERMINAL_COMMANDS } from '@/utils/constants';
import styles from './TerminalSection.module.scss';

export function TerminalSection() {
  return (
    <section className={styles.section}>
      <Container>
        <ScrollReveal>
          <div className={styles.wrapper}>
            <Terminal commands={TERMINAL_COMMANDS} title="kinetia-cli" />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
