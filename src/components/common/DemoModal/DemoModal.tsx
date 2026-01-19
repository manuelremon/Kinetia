import { useState } from 'react';
import { Modal } from '../Modal';
import { SliceButton } from '../Button';
import styles from './DemoModal.module.scss';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  { id: 'automatizacion', label: 'Automatización de Procesos' },
  { id: 'inventarios', label: 'Optimización de Inventarios' },
  { id: 'sistemas', label: 'Sistemas Personalizados' },
  { id: 'agentic', label: 'Agentic / Entrenamiento de Agentes' },
  { id: 'otro', label: 'Otro / No estoy seguro' },
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset form after close animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.content}>
        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>¡Solicitud enviada!</h3>
            <p>
              Gracias por tu interés en KINETIA. Nuestro equipo revisará tu solicitud
              y te contactará en las próximas 24-48 horas para agendar tu demo personalizada.
            </p>
            <button className={styles.closeBtn} onClick={handleClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span className={styles.badge}>Demo Gratuita</span>
              <h2>Solicitar Demo</h2>
              <p>
                Completa el formulario y te mostraremos cómo KINETIA puede
                transformar tu negocio con una demo personalizada.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="demo-name">Nombre completo *</label>
                  <input
                    type="text"
                    id="demo-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="demo-email">Email *</label>
                  <input
                    type="email"
                    id="demo-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="demo-phone">Teléfono</label>
                  <input
                    type="tel"
                    id="demo-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="demo-company">Empresa</label>
                  <input
                    type="text"
                    id="demo-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="demo-service">¿Qué servicio te interesa? *</label>
                <select
                  id="demo-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICES.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="demo-message">Cuéntanos más sobre tu proyecto</label>
                <textarea
                  id="demo-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿Qué desafíos enfrentas actualmente? ¿Qué esperas lograr con nuestras soluciones?"
                  rows={4}
                />
              </div>

              <SliceButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Solicitar Demo Gratuita'}
              </SliceButton>

              <p className={styles.disclaimer}>
                Al enviar este formulario, aceptas que nos pongamos en contacto contigo
                para agendar tu demo.
              </p>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
