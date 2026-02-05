'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './ChooseRoute.module.scss';

interface RouteData {
  id: string;
  label: string;
  bullets: string[];
  miniCase: {
    title: string;
    result: string;
  };
  cta: {
    text: string;
    href: string;
  };
}

const ROUTES: RouteData[] = [
  {
    id: 'operaciones',
    label: 'Operaciones',
    bullets: [
      'Automatiza tareas repetitivas y reduce errores manuales en un 70%',
      'Integra tus sistemas en un flujo unificado',
      'Monitoreo en tiempo real con alertas proactivas'
    ],
    miniCase: {
      title: 'Caso: Empresa logística',
      result: 'Redujo tiempos de procesamiento de pedidos de 4h a 15min'
    },
    cta: {
      text: 'Optimizar mis operaciones',
      href: '#contact'
    }
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    bullets: [
      'Automatiza conciliaciones bancarias y cierre contable',
      'Dashboards financieros en tiempo real con KPIs clave',
      'Predicción de flujo de caja con IA'
    ],
    miniCase: {
      title: 'Caso: Retail mediano',
      result: 'Cerró mes contable en 2 días en lugar de 10'
    },
    cta: {
      text: 'Modernizar mis finanzas',
      href: '#contact'
    }
  },
  {
    id: 'direccion',
    label: 'Dirección',
    bullets: [
      'Visibilidad 360° del negocio en un solo dashboard',
      'Alertas ejecutivas sobre métricas críticas',
      'Reportes automáticos para toma de decisiones ágil'
    ],
    miniCase: {
      title: 'Caso: CEO de manufactura',
      result: 'Pasó de revisar 12 reportes a 1 dashboard unificado'
    },
    cta: {
      text: 'Obtener visibilidad total',
      href: '#contact'
    }
  },
  {
    id: 'tecnologia',
    label: 'Tecnología',
    bullets: [
      'Arquitecturas escalables y mantenibles',
      'Integración de sistemas legacy sin fricción',
      'Implementación de IA y agentes autónomos'
    ],
    miniCase: {
      title: 'Caso: Fintech en crecimiento',
      result: 'Escaló de 1K a 100K usuarios sin cambiar infraestructura'
    },
    cta: {
      text: 'Escalar mi tecnología',
      href: '#contact'
    }
  }
];

export function ChooseRoute() {
  const [activeRoute, setActiveRoute] = useState<string>(ROUTES[0].id);
  const currentRoute = ROUTES.find(r => r.id === activeRoute) || ROUTES[0];

  return (
    <section id="choose-route" className={styles.section}>
      <Container>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Elegí tu ruta
        </motion.h2>

        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {ROUTES.map((route) => (
            <button
              key={route.id}
              className={`${styles.tab} ${activeRoute === route.id ? styles.active : ''}`}
              onClick={() => setActiveRoute(route.id)}
            >
              {route.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute.id}
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.contentGrid}>
              <div className={styles.bullets}>
                <ul>
                  {currentRoute.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className={styles.checkIcon}>✓</span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={styles.miniCase}>
                <div className={styles.caseCard}>
                  <span className={styles.caseLabel}>{currentRoute.miniCase.title}</span>
                  <p className={styles.caseResult}>{currentRoute.miniCase.result}</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <a href={currentRoute.cta.href} className={styles.ctaButton}>
                {currentRoute.cta.text}
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
