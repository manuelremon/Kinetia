import { useState } from 'react';
import { Container, SendButton } from '@/components/common';
import styles from './About.module.scss';

export function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
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
    setFormData({ name: '', email: '', phone: '', country: '', company: '', message: '' });
  };

  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.badge}>Sobre Nosotros</span>
            <h2 className={styles.title}>Sobre KINETIA</h2>
            <p className={styles.description}>
              Somos un equipo apasionado por la tecnología y la innovación. En KINETIA,
              transformamos la manera en que las empresas operan mediante soluciones
              inteligentes de automatización y sistemas personalizados.
            </p>
            <p className={styles.description}>
              Nuestra misión es impulsar el crecimiento de nuestros clientes a través
              de herramientas tecnológicas que simplifican procesos, optimizan recursos
              y generan resultados medibles.
            </p>

            <div className={styles.values}>
              <div className={styles.valueItem}>
                <span className={styles.valueIcon}>🎯</span>
                <div>
                  <h4>Innovación</h4>
                  <p>Siempre a la vanguardia tecnológica</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueIcon}>🤝</span>
                <div>
                  <h4>Compromiso</h4>
                  <p>Tu éxito es nuestro objetivo</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueIcon}>⚡</span>
                <div>
                  <h4>Agilidad</h4>
                  <p>Soluciones rápidas y efectivas</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Contáctanos</h3>
              <p className={styles.formSubtitle}>
                ¿Tienes un proyecto en mente? Escríbenos y te responderemos pronto.
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
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="country">País</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un país</option>
                      <option value="ES">España</option>
                      <option value="MX">México</option>
                      <option value="AR">Argentina</option>
                      <option value="CO">Colombia</option>
                      <option value="CL">Chile</option>
                      <option value="PE">Perú</option>
                      <option value="EC">Ecuador</option>
                      <option value="VE">Venezuela</option>
                      <option value="UY">Uruguay</option>
                      <option value="PY">Paraguay</option>
                      <option value="BO">Bolivia</option>
                      <option value="CR">Costa Rica</option>
                      <option value="PA">Panamá</option>
                      <option value="GT">Guatemala</option>
                      <option value="HN">Honduras</option>
                      <option value="SV">El Salvador</option>
                      <option value="NI">Nicaragua</option>
                      <option value="DO">República Dominicana</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="CU">Cuba</option>
                      <option value="US">Estados Unidos</option>
                      <option value="BR">Brasil</option>
                      <option value="PT">Portugal</option>
                      <option value="FR">Francia</option>
                      <option value="DE">Alemania</option>
                      <option value="IT">Italia</option>
                      <option value="GB">Reino Unido</option>
                      <option value="OTHER">Otro</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="company">Empresa (opcional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                      id="message"
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
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
