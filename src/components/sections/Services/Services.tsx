import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, SliceButton, GridLoader, CubeSpinner, MorphLoader, RobotIcon, Modal } from '@/components/common';
import styles from './Services.module.scss';

const SERVICES = [
  {
    id: 'automatizacion',
    title: 'Automatización de Procesos',
    subtitle: 'Eficiencia sin límites',
    description: 'Transformamos tareas manuales y repetitivas en flujos de trabajo automatizados. Desde la captura de datos hasta la generación de reportes, eliminamos los cuellos de botella y liberamos a tu equipo para enfocarse en lo que realmente importa.',
    features: [
      'Automatización de flujos de trabajo',
      'Integración entre sistemas',
      'Reducción de errores humanos',
      'Monitoreo en tiempo real'
    ],
    icon: '⚙️',
    color: '#007aff',
    detailedContent: {
      benefits: [
        'Reducción del 70% en tiempo de procesamiento',
        'Eliminación de errores por entrada manual',
        'Disponibilidad 24/7 sin intervención humana',
        'Escalabilidad instantánea según demanda'
      ],
      useCases: [
        'Procesamiento automático de facturas y documentos',
        'Sincronización de datos entre CRM, ERP y sistemas legacy',
        'Generación automática de reportes y dashboards',
        'Workflows de aprobación y notificaciones'
      ],
      technologies: ['Python', 'n8n', 'Zapier', 'Power Automate', 'APIs REST']
    }
  },
  {
    id: 'inventarios',
    title: 'Optimización de Inventarios',
    subtitle: 'Control inteligente de stock',
    description: 'Implementamos sistemas predictivos que anticipan la demanda y optimizan tus niveles de inventario. Reduce costos de almacenamiento, evita quiebres de stock y mejora la rotación de productos con decisiones basadas en datos.',
    features: [
      'Predicción de demanda con IA',
      'Alertas de reabastecimiento',
      'Análisis de rotación',
      'Dashboards en tiempo real'
    ],
    icon: '📦',
    color: '#34c759',
    detailedContent: {
      benefits: [
        'Reducción del 30% en costos de almacenamiento',
        'Disminución del 90% en quiebres de stock',
        'Mejora del 25% en rotación de inventario',
        'Decisiones basadas en datos en tiempo real'
      ],
      useCases: [
        'Predicción de demanda estacional y tendencias',
        'Optimización de puntos de reorden automáticos',
        'Análisis ABC y gestión de SKUs',
        'Integración con proveedores para reabastecimiento'
      ],
      technologies: ['Machine Learning', 'Python', 'TensorFlow', 'Power BI', 'SQL']
    }
  },
  {
    id: 'sistemas',
    title: 'Sistemas Personalizados',
    subtitle: 'Soluciones a tu medida',
    description: 'Desarrollamos software a medida que se adapta perfectamente a tus procesos de negocio. Desde ERPs hasta aplicaciones especializadas, creamos herramientas que potencian tu operación y escalan con tu crecimiento.',
    features: [
      'Desarrollo a medida',
      'Integración con sistemas existentes',
      'Interfaces intuitivas',
      'Soporte y mantenimiento continuo'
    ],
    icon: '🛠️',
    color: '#5856d6',
    detailedContent: {
      benefits: [
        'Software que se adapta a tu negocio, no al revés',
        'Propiedad total del código y los datos',
        'Escalabilidad según crecimiento empresarial',
        'Soporte técnico dedicado y continuo'
      ],
      useCases: [
        'ERPs personalizados para industrias específicas',
        'Portales de clientes y proveedores',
        'Aplicaciones móviles empresariales',
        'Sistemas de gestión de proyectos a medida'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS']
    }
  },
  {
    id: 'agentic',
    title: 'Agentic / Entrenamiento de Agentes',
    subtitle: 'IA que trabaja por ti',
    description: 'Diseñamos y entrenamos agentes de inteligencia artificial que ejecutan tareas complejas de forma autónoma. Desde asistentes virtuales hasta sistemas de toma de decisiones, llevamos la automatización al siguiente nivel.',
    features: [
      'Agentes autónomos personalizados',
      'Procesamiento de lenguaje natural',
      'Aprendizaje continuo',
      'Integración con tu ecosistema'
    ],
    icon: '🤖',
    color: '#ff9500',
    detailedContent: {
      benefits: [
        'Atención al cliente 24/7 con respuestas inteligentes',
        'Automatización de tareas cognitivas complejas',
        'Aprendizaje continuo de tu negocio',
        'Reducción de carga operativa en equipos'
      ],
      useCases: [
        'Asistentes virtuales para atención al cliente',
        'Agentes de análisis de documentos y contratos',
        'Sistemas de recomendación personalizados',
        'Automatización de investigación y reportes'
      ],
      technologies: ['OpenAI', 'LangChain', 'Claude', 'RAG', 'Vector Databases']
    }
  }
];

interface ServiceSectionProps {
  service: typeof SERVICES[0];
  index: number;
  isActive: boolean;
  onLearnMore: () => void;
}

function ServiceSection({ service, index, isActive, onLearnMore }: ServiceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div
      ref={ref}
      className={styles.serviceSection}
      id={service.id}
      data-section-name={service.id}
    >
      <Container>
        <motion.div
          className={styles.serviceContent}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className={styles.serviceHeader} variants={itemVariants}>
            <div className={styles.serviceIcon}>
              {service.icon === '⚙️' ? <GridLoader size={60} /> :
               service.icon === '📦' ? <CubeSpinner size={60} /> :
               service.icon === '🛠️' ? <MorphLoader size={60} /> :
               service.icon === '🤖' ? <RobotIcon size={70} /> : service.icon}
            </div>
            <span className={styles.serviceSubtitle}>
              {service.subtitle}
            </span>
          </motion.div>

          <motion.h3 className={styles.serviceTitle} variants={itemVariants}>
            {service.title}
          </motion.h3>

          <motion.p className={styles.serviceDescription} variants={itemVariants}>
            {service.description}
          </motion.p>

          <motion.ul className={styles.features} variants={itemVariants}>
            {service.features.map((feature, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
              >
                <span className={styles.checkIcon}>✓</span>
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <button className={styles.learnMoreBtn} onClick={onLearnMore}>
              Saber más
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export function Services() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll(`.${styles.serviceSection}`);
      const containerTop = container.getBoundingClientRect().top;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = window.innerHeight / 2;

        if (Math.abs(sectionMiddle - viewportMiddle) < rect.height / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll(`.${styles.serviceSection}`);
    sections[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className={styles.section} id="servicios" ref={containerRef}>

      {/* Navigation dots */}
      <nav className={styles.sectionNavigate}>
        <ul className={styles.navigateItems}>
          {SERVICES.map((service, index) => (
            <li key={service.id} className={styles.navigateItem}>
              <button
                className={`${styles.navigateLink} ${activeSection === index ? styles.active : ''}`}
                onClick={() => scrollToSection(index)}
              >
                <span className={styles.navigateName}>{service.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Comienza button */}
      <div className={styles.lightButton}>
        <button className={styles.bt} onClick={() => scrollToSection(0)}>
                    <div className={styles.buttonHolder}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
            <span>Comienza</span>
          </div>
        </button>
      </div>

      {/* Services sections */}
      <div className={styles.servicesContainer}>
        {SERVICES.map((service, index) => (
          <ServiceSection
            key={service.id}
            service={service}
            index={index}
            isActive={activeSection === index}
            onLearnMore={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* Service Detail Modal */}
      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
        {selectedService && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalSubtitle}>
                  {selectedService.subtitle}
                </span>
                <h3 className={styles.modalTitle}>{selectedService.title}</h3>
              </div>
            </div>

            <p className={styles.modalDescription}>{selectedService.description}</p>

            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionTitle}>
                Beneficios
              </h4>
              <ul className={styles.modalList}>
                {selectedService.detailedContent.benefits.map((benefit, i) => (
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
                {selectedService.detailedContent.useCases.map((useCase, i) => (
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
                {selectedService.detailedContent.technologies.map((tech, i) => (
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
              <SliceButton href="#contacto" onClick={() => setSelectedService(null)}>
                Solicitar información
              </SliceButton>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
