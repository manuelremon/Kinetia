import type { NavLink, FooterColumn } from '@/types';

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS: NavLink[] = [
  { href: '#services', label: 'Soluciones' },
  { href: '#industries', label: 'Industrias' },
  { href: '#case-studies', label: 'Casos de Éxito' }
];

// ============================================
// FOOTER DATA
// ============================================

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Descubrir',
    links: [
      { href: '#', label: 'Inicio' },
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Changelog' },
      { href: '#', label: 'Carreras' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { href: '#', label: 'Documentación' },
      { href: '#', label: 'Referencia API' },
      { href: '#', label: 'Soporte' }
    ]
  },
  {
    title: 'Contacto',
    links: [
      { href: 'mailto:info@kinetia.com', label: 'info@kinetia.com' }
    ]
  }
];
