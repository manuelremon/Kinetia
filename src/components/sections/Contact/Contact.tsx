'use client';

import { useState } from 'react';
import { Container, SendButton } from '@/components/common';
import { submitContactForm } from '@app/actions';
import styles from './Contact.module.scss';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validación básica del lado del cliente
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        throw new Error('Nombre debe tener al menos 2 caracteres');
      }
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Email inválido');
      }
      if (!formData.message.trim() || formData.message.trim().length < 10) {
        throw new Error('Mensaje debe tener al menos 10 caracteres');
      }

      // Crear FormData para la Server Action
      const form = e.currentTarget;
      const fd = new FormData(form);

      // Llamar Server Action
      const response = await submitContactForm(fd);

      if (!response.success) {
        throw new Error(response.error || 'Error al enviar formulario');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contacto">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={styles.title}>
              <span className="text-gradient-animated">Hablemos</span>
            </h2>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 32 32" fill="currentColor">
                    <path d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z"/>
                  </svg>
                </span>
                <div>
                  <a href="mailto:info@kinetia.com" className={styles.contactValue}>info@kinetia.com</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16,18c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S18.8,18,16,18z"/>
                    <path d="M16,30l-8.4-9.9c0-0.1-0.3-0.5-0.3-0.5C5.8,17.7,5,15.4,5,13C5,6.9,9.9,2,16,2s11,4.9,11,11c0,2.4-0.8,4.7-2.2,6.6l0,0 c0,0-0.3,0.4-0.3,0.4L16,30z M8.8,18.4c0,0,0.2,0.3,0.3,0.4l6.9,8.1l6.9-8.1c0-0.1,0.3-0.4,0.3-0.4C24.4,16.8,25,15,25,13 c0-5-4-9-9-9s-9,4-9,9C7,15,7.6,16.8,8.8,18.4L8.8,18.4z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.contactValue}>Neuquén, Argentina</span>
                </div>
              </div>
            </div>

            <div className={styles.socialSection}>
              <span className={styles.socialTitle}>Seguínos</span>
              <div className={styles.socialLinks}>
                <a href="#" className={`${styles.socialLink} ${styles.youtube}`} aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.x}`} aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.linkedin}`} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.instagram}`} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/5492994673102" className={`${styles.socialLink} ${styles.whatsapp}`} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Envíanos un mensaje</h3>
              <p className={styles.formSubtitle}>
                Responderemos en menos de 24 horas.
              </p>

              {submitted ? (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  <h4>¡Mensaje enviado!</h4>
                  <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                  <button
                    className={styles.resetButton}
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className={styles.errorMessage} role="alert">
                      <span className={styles.errorIcon}>⚠</span>
                      <div>
                        <p>{error}</p>
                        <p style={{ marginTop: '8px', fontSize: '13px', opacity: 0.85 }}>
                          También puedes escribirnos por{' '}
                          <a href="https://wa.me/5492994673102" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>
                            WhatsApp
                          </a>.
                        </p>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name">Nombre completo</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email">Correo electrónico</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-phone">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message">Mensaje</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={4}
                      required
                    />
                  </div>

                  <SendButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </SendButton>
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
