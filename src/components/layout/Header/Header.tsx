import { useState, useEffect } from 'react';
import { Container, RandomizedTextEffect, DemoModal } from '@/components/common';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

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
            <img src="/logo.png" alt="KINETIA" className={styles.logoIcon} />
            <RandomizedTextEffect text="KINETIA" />
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
          </nav>

          <button
            className={styles.ctaButton}
            onClick={() => setIsDemoModalOpen(true)}
          >
            <span>Solicitar Diagnóstico</span>
          </button>
        </div>
      </Container>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </header>
  );
}
