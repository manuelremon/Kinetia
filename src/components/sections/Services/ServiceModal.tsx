'use client';

import { SliceButton } from '@/components/common';
import type { Service } from './servicesData';
import styles from './Services.module.scss';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <div>
          <span className={styles.modalSubtitle}>
            {service.subtitle}
          </span>
          <h3 className={styles.modalTitle}>{service.title}</h3>
        </div>
      </div>

      <p className={styles.modalDescription}>{service.description}</p>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>
          Beneficios
        </h4>
        <ul className={styles.modalList}>
          {service.detailedContent.benefits.map((benefit, i) => (
            <li key={i}>
              <span className={styles.modalCheckIcon}>✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>
          Casos de Uso
        </h4>
        <ul className={styles.modalList}>
          {service.detailedContent.useCases.map((useCase, i) => (
            <li key={i}>
              <span className={styles.modalCheckIcon}>→</span>
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h4 className={styles.modalSectionTitle}>
          Tecnologías
        </h4>
        <div className={styles.techTags}>
          {service.detailedContent.technologies.map((tech, i) => (
            <span
              key={i}
              className={styles.techTag}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.modalCta}>
        <SliceButton href="#contacto" onClick={onClose}>
          Solicitar información
        </SliceButton>
      </div>
    </div>
  );
}
