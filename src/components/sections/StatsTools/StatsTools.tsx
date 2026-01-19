import { Container, IconCloud, ScrollReveal } from '@/components/common';
import styles from './StatsTools.module.scss';

const LOGO_URLS = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
];

export function StatsTools() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrapper}>
          <ScrollReveal>
            <div className={styles.toolsContainer}>
              <IconCloud images={LOGO_URLS} />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
