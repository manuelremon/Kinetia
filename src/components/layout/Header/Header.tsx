import { useState, useEffect } from 'react';
import { Container, SliceButton, RandomizedTextEffect, DemoModal } from '@/components/common';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
                <li
                  key={link.label}
                  className={link.dropdown ? styles.hasDropdown : ''}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                      } else {
                        handleNavClick(e, link.href);
                      }
                    }}
                  >
                    {link.label}
                    {link.dropdown && <span className={styles.arrow}>▾</span>}
                  </a>

                  {link.dropdown && (
                    <div className={`${styles.dropdown} ${activeDropdown === link.label ? styles.active : ''}`}>
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className={styles.dropdownItem}
                          onClick={(e) => handleNavClick(e, item.href)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </header>
  );
}
