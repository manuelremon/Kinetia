'use client';

import { useEffect } from 'react';
import { NAV_LINKS } from '@/utils/constants';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCTAClick: () => void;
}

export function MobileMenu({ isOpen, onClose, onCTAClick }: MobileMenuProps) {
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
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.menuLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
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
          Solicitar Diagnóstico
        </button>
      </nav>
    </>
  );
}
