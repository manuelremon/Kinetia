import { Container, IconCloud } from '@/components/common';
import styles from './LogosCarousel.module.scss';

const LOGO_URLS = [
  'https://cdn.simpleicons.org/sap/0FAAFF',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'https://img.icons8.com/fluency/96/microsoft-teams-2019.png',
  'https://cdn.simpleicons.org/microsoft365/D83B01',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
];

export function LogosCarousel() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.introBox}>
          <h3 className={styles.introTitle}>Herramientas</h3>
        </div>
        <IconCloud images={LOGO_URLS} />
      </Container>
    </section>
  );
}
