'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container, RandomizedTextEffect, DemoModal } from '@/components/common';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <a href="#" className={styles.logo} aria-label="KINETIA Home">
            <Image
              src="/logo.png"
              alt="KINETIA"
              width={38}
              height={38}
              className={styles.logoIcon}
              style={{ width: 'auto', height: '38px' }}
              priority
            />
            <RandomizedTextEffect text="KINETIA" />
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
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
            className={styles.squishyButton}
            onClick={() => setIsDemoModalOpen(true)}
          >
            <span className={styles.squishyContent}>Solicitar Diagnóstico Gratuito</span>
            <span className={styles.squishyGlow}></span>
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onCTAClick={() => setIsDemoModalOpen(true)}
      />

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </header>
  );
}
