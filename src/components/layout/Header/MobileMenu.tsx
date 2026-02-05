'use client';

import { useEffect, useState } from 'react';
import styles from './MobileMenu.module.scss';

// Corporate Navigation Structure (same as Header)
const CORPORATE_NAV = [
  {
    label: 'Soluciones',
    href: '#services',
    subItems: [
      { label: 'Automatización de Procesos', href: '#services' },
      { label: 'Inteligencia Artificial', href: '#services' },
      { label: 'Ingeniería de Datos', href: '#services' },
    ]
  },
  {
    label: 'Industrias',
    href: '#industries',
    subItems: [
      { label: 'Retail & E-commerce', href: '#industries' },
      { label: 'Finanzas & Seguros', href: '#industries' },
      { label: 'Logística & Supply Chain', href: '#industries' },
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCTAClick: () => void;
}

export function MobileMenu({ isOpen, onClose, onCTAClick }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const hamburger = document.getElementById('mobile-menu-button');

      if (menu && hamburger && !menu.contains(e.target as Node) && !hamburger.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        onClose();
      }
    }
  };

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`${styles.menu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.menuLinks}>
          {CORPORATE_NAV.map((item) => (
            <li key={item.label} className={styles.menuItem}>
              {item.subItems ? (
                <>
                  <button
                    className={styles.menuButton}
                    onClick={() => toggleExpanded(item.label)}
                  >
                    {item.label}
                    <span className={`${styles.expandIcon} ${expandedItem === item.label ? styles.expanded : ''}`}>
                      &#9662;
                    </span>
                  </button>
                  <ul className={`${styles.subMenu} ${expandedItem === item.label ? styles.expanded : ''}`}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <a
                          href={subItem.href}
                          className={styles.subMenuLink}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={item.href}
                  className={styles.menuLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className={styles.mobileCTA}
          onClick={() => {
            onCTAClick();
            onClose();
          }}
        >
          Hablar con Consultor
        </button>
      </nav>
    </>
  );
}
