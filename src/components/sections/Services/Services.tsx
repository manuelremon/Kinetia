import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, SliceButton, GridLoader, CubeSpinner, MorphLoader, RobotIcon, Modal, SpotlightCard } from '@/components/common';
import styles from './Services.module.scss';


const SERVICES = [
  {
    id: 'automatizacion',
    title: 'Automatización de Procesos',
    subtitle: 'Eficiencia sin límites',
    description: 'Transformamos tareas manuales y repetitivas en flujos de trabajo inteligentes. Desde la captura de datos hasta la generación de reportes, eliminamos cuellos de botella y liberamos a tu equipo para que se concentre en la innovación y la estrategia.',
    features: [
      'Automatización inteligente de flujos de trabajo',
      'Integración fluida entre sistemas (CRM, ERP, legacy)',
      'Reducción de errores mediante algoritmos y validaciones automáticas',
      'Monitoreo en tiempo real y alertas proactivas'
    ],
    icon: '⚙️',
    color: '#007aff',
    detailedContent: {
      benefits: [
        'Reducción de hasta un 70% en tiempos de procesamiento y costes operativos',
        'Eliminación de errores humanos gracias a validaciones automatizadas',
        'Disponibilidad 24/7 y escalabilidad inmediata según la demanda',
        'Mejora del ROI: más del 75% de las empresas ven aumento del rendimiento en un año',
        'Gobernanza y resiliencia: cumplimiento normativo, datos seguros y eficiencia energética'
      ],
      useCases: [
        'Procesamiento automático de facturas y documentos',
        'Sincronización de datos entre CRM, ERP y sistemas heredados',
        'Generación automática de reportes y dashboards en segundos',
        'Workflows de aprobación y notificaciones multicanal',
        'Implementación de chatbots y asistentes virtuales para atención 24/7',
        'Automatización de procesos de onboarding y recursos humanos'
      ],
      technologies: [
        'Python, n8n, Zapier, Power Automate',
        'APIs REST para integraciones personalizadas',
        'IA contextual y analítica predictiva',
        'Plataformas no-code/low-code'
      ]
    }
  },
  {
    id: 'inventarios',
    title: 'Optimización de Inventarios',
    subtitle: 'Control inteligente de stock',
    description: 'Implementamos sistemas predictivos basados en machine learning que anticipan la demanda y ajustan tus niveles de inventario en tiempo real. Con modelos de IA, reducimos costos de almacenamiento, evitamos quiebres de stock y mejoramos la rotación, convirtiendo la volatilidad del mercado en una ventaja competitiva.',
    features: [
      'Predicción de demanda con IA para anticipar tendencias y estacionalidad',
      'Alertas de reabastecimiento automáticas en función de puntos de reorden dinámicos',
      'Análisis de rotación y clasificación ABC para priorizar SKUs críticos',
      'Dashboards en tiempo real que integran datos de ERP, CRM y proveedores'
    ],
    icon: '📦',
    color: '#34c759',
    detailedContent: {
      benefits: [
        'Reducción del 30% en costos de almacenamiento al mantener el nivel óptimo de stock',
        'Disminución de hasta el 90% en quiebres de stock gracias a la previsión de demanda',
        'Mejora del 25% en rotación de inventario, aumentando la disponibilidad de productos y la satisfacción del cliente',
        'Decisiones basadas en datos en tiempo real, integrando información de ventas, tendencias externas y logística',
        'Mayor previsibilidad de la demanda e inventarios, habilitando procesos automatizados y escalables'
      ],
      useCases: [
        'Predicción de demanda estacional y tendencias con modelos que analizan cientos de variables simultáneamente',
        'Optimización de puntos de reorden automáticos para cada SKU, ajustados según patrones de consumo y lead time',
        'Análisis ABC y gestión de SKUs para priorizar artículos según su importancia estratégica y rentabilidad',
        'Integración con proveedores para reabastecimiento automatizado y sincronización de órdenes de compra',
        'Monitoreo de rotación y expiración en sectores como alimentación y farmacéutica'
      ],
      technologies: [
        'Machine Learning y IA contextual (scikit-learn, TensorFlow)',
        'Python y SQL como base de procesamiento de datos',
        'Power BI y dashboards interactivos para visualización en tiempo real',
        'Integración de datos mediante APIs REST y conectores a ERP/CRM'
      ]
    }
  },
  {
    id: 'sistemas',
    title: 'Sistemas Personalizados',
    subtitle: 'Soluciones a tu medida',
    description: 'Desarrollamos software que se adapta completamente a tus procesos de negocio. A diferencia de las soluciones genéricas, los sistemas personalizados están diseñados al 100% para tus necesidades, lo que se traduce en eficiencia y productividad inmediata. Desde ERPs a aplicaciones móviles, creamos herramientas que se integran con tus sistemas actuales y crecen contigo.',
    features: [
      'Desarrollo a medida adaptado a tus procesos',
      'Integración nativa con sistemas existentes y APIs',
      'Interfaces intuitivas y experiencia de usuario optimizada',
      'Soporte técnico y mantenimiento continuo con actualizaciones adaptadas'
    ],
    icon: '🛠️',
    color: '#5856d6',
    detailedContent: {
      benefits: [
        'Adaptación total a tus procesos y flujos de trabajo. El software se ajusta a tu empresa en lugar de forzarte a adaptarte a una herramienta genérica.',
        'Propiedad y control completos del código y los datos. Tienes control total sobre la aplicación, los datos y la seguridad, sin dependencia de terceros.',
        'Escalabilidad ilimitada y rentabilidad a largo plazo. Las soluciones a medida escalan con tu crecimiento y eliminan pagos recurrentes de licencias.',
        'Soporte técnico dedicado y mantenimiento continuo. Actualizaciones y mejoras adaptadas a tus necesidades operativas.'
      ],
      useCases: [
        'ERPs personalizados para industrias específicas (retail, logística, salud, manufactura)',
        'Portales de clientes y proveedores integrados con tus sistemas de facturación y CRM',
        'Aplicaciones móviles y web empresariales para equipos distribuidos, con acceso desde cualquier dispositivo',
        'Sistemas de gestión de proyectos a medida con flujos de trabajo, analítica y reportes en tiempo real'
      ],
      technologies: [
        'React · Node.js · TypeScript · PostgreSQL · AWS · Microservicios y APIs RESTful'
      ]
    }
  },
  {
    id: 'agentic',
    title: 'Agentic / Entrenamiento de Agentes',
    subtitle: 'IA que trabaja por ti',
    description: 'Diseñamos y entrenamos agentes de inteligencia artificial que ejecutan tareas complejas de forma autónoma. Estos agentes no son simples bots; son programas capaces de entender su entorno, tomar decisiones basadas en objetivos y aprender de cada interacción. Utilizando técnicas de machine learning, procesamiento de lenguaje natural y razonamiento avanzado, llevamos la automatización al siguiente nivel.',
    features: [
      'Agentes autónomos personalizados que se adaptan a tus procesos y operan sin intervención constante',
      'Procesamiento de lenguaje natural y modelos generativos que comprenden y responden de manera precisa y contextual',
      'Aprendizaje continuo mediante retroalimentación y refuerzo, mejorando con cada tarea',
      'Integración con tu ecosistema de sistemas (CRM, ERP, bases de conocimiento), orquestando flujos de trabajo multicanal'
    ],
    icon: '🤖',
    color: '#ff9500',
    detailedContent: {
      benefits: [
        'Atención al cliente 24/7 con respuestas inteligentes, permitiendo manejar conversaciones ilimitadas y transferir casos complejos a humanos',
        'Automatización de tareas cognitivas complejas, desde análisis documentales hasta toma de decisiones avanzadas',
        'Aprendizaje continuo: los agentes incorporan nuevas reglas y datos para mejorar en cada interacción',
        'Reducción de carga operativa y de costes; los agentes liberan a los equipos para tareas de mayor valor',
        'Escalabilidad ilimitada y precisión mejorada; las soluciones agentic ofrecen disponibilidad permanente',
        'Mejora del ROI y de la experiencia del cliente: reducción de tiempos y costes'
      ],
      useCases: [
        'Asistentes virtuales de atención al cliente que resuelven consultas y canalizan al equipo humano',
        'Agentes de análisis de documentos y contratos que extraen datos, validan cláusulas y generan resúmenes',
        'Sistemas de recomendación personalizados basados en preferencias y comportamientos de los usuarios',
        'Automatización de investigación y reportes: los agentes recopilan información, generan informes y extraen insights',
        'Orquestación de flujos complejos en marketing, finanzas o logística, coordinando múltiples sistemas y fuentes de datos'
      ],
      technologies: [
        'OpenAI (modelos GPT), LangChain, Claude, arquitecturas de Agentes Reforzados (RAG), bases de datos vectoriales y frameworks de automatización'
      ]
    }
  }
];

interface ServiceSectionProps {
  service: typeof SERVICES[0];
  onLearnMore: () => void;
}

function ServiceSection({ service, onLearnMore }: ServiceSectionProps) {
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
      transition: { duration: 0.6 }
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
        <SpotlightCard className={styles.serviceContent}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ width: '100%' }}
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
        </SpotlightCard>
      </Container>
    </div>
  );
}

export function Services() {
  const [, setActiveSection] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll(`.${styles.serviceSection}`);

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
        {SERVICES.map((service) => (
          <ServiceSection
            key={service.id}
            service={service}
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
