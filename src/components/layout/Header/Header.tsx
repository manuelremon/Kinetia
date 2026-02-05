'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Container, DemoModal } from '@/components/common';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.scss';

// Corporate Navigation Structure
const CORPORATE_NAV = [
  {
    label: 'Soluciones',
    href: '#services',
    dropdown: [
      { label: 'Automatización de Procesos', href: '#services', description: 'RPA e integración de sistemas' },
      { label: 'Inteligencia Artificial', href: '#services', description: 'ML, NLP y agentes autónomos' },
      { label: 'Ingeniería de Datos', href: '#services', description: 'Pipelines y arquitectura cloud' },
    ]
  },
  {
    label: 'Industrias',
    href: '#industries',
    dropdown: [
      { label: 'Retail & E-commerce', href: '#industries', description: 'Optimización de inventario y ventas' },
      { label: 'Finanzas & Seguros', href: '#industries', description: 'Automatización de compliance' },
      { label: 'Logística & Supply Chain', href: '#industries', description: 'Ruteo y demand planning' },
    ]
  },
  {
    label: 'Resultados',
    href: '#case-studies',
  },
  {
    label: 'Insights',
    href: '#insights',
  }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      setActiveDropdown(null);
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.inner}>
          {/* Logo */}
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
            <span className={styles.logoText}>KINETIA</span>
          </a>

          {/* Corporate Navigation */}
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navLinks}>
              {CORPORATE_NAV.map((item) => (
                <li
                  key={item.label}
                  className={item.dropdown ? styles.hasDropdown : ''}
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <a
                    href={item.href}
                    className={styles.navLink}
                    onClick={(e) => !item.dropdown && handleNavClick(e, item.href)}
                  >
                    {item.label}
                    {item.dropdown && <span className={styles.arrow}>&#9662;</span>}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className={`${styles.dropdown} ${activeDropdown === item.label ? styles.active : ''}`}>
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className={styles.dropdownItem}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                        >
                          <span className={styles.dropdownLabel}>{subItem.label}</span>
                          <span className={styles.dropdownDesc}>{subItem.description}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - Corporate */}
          <button
            className={styles.ctaButton}
            onClick={() => setIsDemoModalOpen(true)}
          >
            Hablar con Consultor
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
