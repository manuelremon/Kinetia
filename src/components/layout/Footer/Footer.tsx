import { Container } from '@/components/common';
import { FOOTER_COLUMNS } from '@/utils/constants';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#fff" d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path fill="none" stroke="#fff" strokeWidth="2" d="M2 17L12 22L22 17"/>
                  <path fill="none" stroke="#fff" strokeWidth="2" d="M2 12L12 17L22 12"/>
                </svg>
              </div>
              TensorStax
            </a>
            <p className={styles.description}>
              IA Autónoma para Ingeniería de Datos. Construye y mantiene pipelines de producción automáticamente.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>✕</a>
              <a href="#" className={styles.socialLink}>in</a>
              <a href="#" className={styles.socialLink}>▶</a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className={styles.column}>
              <h4>{column.title}</h4>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>TensorStax &copy; 2025</p>
          <div className={styles.legal}>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
