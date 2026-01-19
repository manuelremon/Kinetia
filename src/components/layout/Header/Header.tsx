import { useState, useEffect } from 'react';
import { Container, LiquidButton, GlitchText } from '@/components/common';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#fff" d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path fill="none" stroke="#fff" strokeWidth="2" d="M2 17L12 22L22 17"/>
                <path fill="none" stroke="#fff" strokeWidth="2" d="M2 12L12 17L22 12"/>
              </svg>
            </div>
            <GlitchText text="TensorStax" />
          </a>

          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <LiquidButton>Solicitar Demo</LiquidButton>
          </nav>
        </div>
      </Container>
    </header>
  );
}
