import { Container, SliceButton } from '@/components/common';
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
    icon: '⚙️'
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
    icon: '📦'
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
    icon: '🛠️'
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
    icon: '🤖'
  }
];

export function Services() {
  return (
    <section className={styles.section} id="servicios">
      <Container>
        <div className={styles.header}>
          <span className={styles.badge}>Servicios</span>
          <h2 className={styles.title}>Soluciones que transforman tu negocio</h2>
          <p className={styles.subtitle}>
            Combinamos tecnología de vanguardia con experiencia en la industria para crear soluciones que generan resultados reales.
          </p>
        </div>

        <div className={styles.services}>
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.serviceCard} ${index % 2 !== 0 ? styles.reverse : ''}`}
              id={service.id}
            >
              <div className={styles.content}>
                <span className={styles.serviceIcon}>{service.icon}</span>
                <span className={styles.serviceSubtitle}>{service.subtitle}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>

                <ul className={styles.features}>
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <SliceButton href={`#contacto`}>Saber más</SliceButton>
              </div>

              <div className={styles.visual}>
                <div className={styles.visualInner}>
                  <div className={styles.iconLarge}>{service.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
