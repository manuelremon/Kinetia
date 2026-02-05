'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Modal } from '@/components/common';
import { SERVICES } from './servicesData';
import { ServiceCard } from './ServiceCard';
import { ServiceModal } from './ServiceModal';
import styles from './Services.module.scss';

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section className={styles.section} id="servicios">
      {/* Services sections */}
      <div className={styles.servicesContainer}>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onLearnMore={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* CTA Estratégico */}
      <div className={styles.servicesCta}>
        <Container>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.ctaTitle}>¿No sabes por dónde empezar?</h3>
            <p className={styles.ctaText}>
              Solicita un diagnóstico gratuito y descubre qué procesos puedes automatizar
            </p>
            <button
              className={styles.ctaButton}
              onClick={() => {
                const contact = document.getElementById('contacto');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solicitar diagnóstico gratis
              <span>→</span>
            </button>
          </motion.div>
        </Container>
      </div>

      {/* Service Detail Modal */}
      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </Modal>
    </section>
  );
}
