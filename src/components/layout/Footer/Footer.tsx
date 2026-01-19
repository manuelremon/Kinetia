import { Container } from '@/components/common';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          {/* Brand */}
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <img src="/logo.png" alt="KINETIA" className={styles.logoIcon} />
              KINETIA
            </a>
            <p className={styles.tagline}>
              Automatización inteligente y desarrollo de software a medida
            </p>
          </div>

          {/* Navigation */}
          <nav className={styles.nav}>
            <div className={styles.navGroup}>
              <h4>Navegación</h4>
              <div className={styles.navLinks}>
                <a href="#servicios">Servicios</a>
                <a href="#features">Características</a>
                <a href="#how-it-works">Proceso</a>
                <a href="#about">Nosotros</a>
                <a href="#contacto">Contacto</a>
              </div>
            </div>
          </nav>

          </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2025 KINETIA. Todos los derechos reservados.</p>
          <div className={styles.contact}>
            <a href="mailto:info@kinetia.com" className={styles.email}>info@kinetia.com</a>
            <span className={styles.separator}>·</span>
            <span className={styles.location}>Neuquén, Argentina</span>
          </div>
          <div className={styles.legal}>
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Uso</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
