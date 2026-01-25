import type { TerminalCommand, FlipCardData, StatData, NavLink, FooterColumn } from '@/types';

// ============================================
// TYPING EFFECT PHRASES
// ============================================

export const TYPING_PHRASES = [
  'Automatiza tu negocio',
  'Optimiza tus procesos',
  'Gestiona tu inventario',
  'Transforma tu operación',
  'con inteligencia artificial'
];

// ============================================
// HERO STATS
// ============================================

export const HERO_STATS = [
  { value: '70%', label: 'Ahorro tiempo' },
  { value: '24/7', label: 'Soporte' }
];

// ============================================
// CLIENT LOGOS
// ============================================

export const CLIENT_LOGOS = [
  { name: 'Salesforce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg' },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'Slack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg' },
  { name: 'Google', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Windows', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg' },
  { name: 'PayPal', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/paypal/paypal-original.svg' },
  { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' }
];

// ============================================
// TRUST BADGES
// ============================================

export const TRUST_BADGES = [
  { icon: '☁️', title: 'AWS Partner', subtitle: 'Cloud Solutions' },
  { icon: '🔷', title: 'Google Cloud', subtitle: 'Certified Partner' },
  { icon: '🛡️', title: 'ISO 27001', subtitle: 'Seguridad Certificada' },
  { icon: '⚡', title: 'Microsoft', subtitle: 'Azure Partner' },
  { icon: '🔐', title: 'GDPR', subtitle: 'Compliant' }
];

// ============================================
// FAQ ITEMS
// ============================================

export const FAQ_ITEMS = [
  {
    category: 'General',
    question: '¿Qué tipo de empresas pueden beneficiarse de sus servicios?',
    answer: 'Trabajamos con PyMEs de diversos sectores que buscan automatizar procesos, optimizar inventarios o implementar soluciones de IA. Desde retail y manufactura hasta servicios profesionales y logística.'
  },
  {
    category: 'General',
    question: '¿Cuánto tiempo toma implementar una solución?',
    answer: 'Depende de la complejidad del proyecto. Soluciones simples de automatización pueden estar listas en 2-4 semanas, mientras que sistemas más complejos pueden tomar 2-3 meses. Siempre entregamos en fases para que veas valor desde el inicio.'
  },
  {
    category: 'Técnico',
    question: '¿Necesito conocimientos técnicos para usar sus soluciones?',
    answer: 'No. Diseñamos todas nuestras soluciones pensando en usuarios no técnicos. Proporcionamos capacitación completa y documentación, además de soporte continuo para asegurar una adopción exitosa.'
  },
  {
    category: 'Técnico',
    question: '¿Sus soluciones se integran con sistemas existentes?',
    answer: 'Sí, nuestras soluciones están diseñadas para integrarse con la mayoría de sistemas empresariales (ERP, CRM, sistemas de inventario, etc.). Evaluamos tu infraestructura actual durante el diagnóstico inicial.'
  },
  {
    category: 'Proceso',
    question: '¿Cómo es el proceso de trabajo con KINETIA?',
    answer: 'Comenzamos con un diagnóstico gratuito para entender tus necesidades. Luego diseñamos una solución personalizada, la implementamos por fases, y proporcionamos soporte continuo post-implementación.'
  },
  {
    category: 'Proceso',
    question: '¿Ofrecen mantenimiento y soporte post-implementación?',
    answer: 'Sí, todos nuestros proyectos incluyen un período de soporte. También ofrecemos planes de mantenimiento continuo con SLA definido, actualizaciones y mejoras según evolucionen tus necesidades.'
  },
  {
    category: 'Precios',
    question: '¿Cuánto cuesta una solución de automatización?',
    answer: 'Cada proyecto es único y el precio depende de la complejidad y alcance. Ofrecemos un diagnóstico gratuito donde evaluamos tus necesidades y proporcionamos un presupuesto detallado sin compromiso.'
  },
  {
    category: 'Precios',
    question: '¿Tienen opciones de financiamiento o pago en cuotas?',
    answer: 'Sí, entendemos que la inversión en tecnología es importante. Ofrecemos planes de pago flexibles y podemos estructurar el proyecto en fases para distribuir la inversión en el tiempo.'
  }
];

// ============================================
// TESTIMONIALS
// ============================================

export const TESTIMONIALS = [
  {
    name: 'María González',
    role: 'Gerente de Operaciones',
    company: 'RetailMax',
    text: 'Gracias a KINETIA, redujimos el tiempo de gestión de inventario en un 60%. El equipo fue profesional y la implementación fue más rápida de lo esperado.',
    rating: 5,
    avatar: ''
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de IT',
    company: 'LogiTrans',
    text: 'La automatización de nuestros procesos de despacho transformó nuestra operación. Ahora procesamos el triple de pedidos con el mismo equipo.',
    rating: 5,
    avatar: ''
  },
  {
    name: 'Ana Martínez',
    role: 'CEO',
    company: 'FoodService Pro',
    text: 'Implementamos su sistema de predicción de demanda y redujimos el desperdicio en un 40%. La inversión se recuperó en menos de 6 meses.',
    rating: 5,
    avatar: ''
  },
  {
    name: 'Roberto Sánchez',
    role: 'Jefe de Almacén',
    company: 'DistribuParts',
    text: 'El sistema de inventario con IA nos alertó de roturas de stock antes de que ocurrieran. Nuestro nivel de servicio mejoró significativamente.',
    rating: 4,
    avatar: ''
  },
  {
    name: 'Laura Pérez',
    role: 'Directora Comercial',
    company: 'TechRetail',
    text: 'El chatbot de ventas que implementaron aumentó nuestras conversiones en un 35%. Responde consultas 24/7 y califica leads automáticamente.',
    rating: 5,
    avatar: ''
  }
];

// ============================================
// CASE STUDIES
// ============================================

export const CASE_STUDIES = [
  {
    title: 'Automatización de Inventario',
    company: 'RetailMax',
    description: 'Sistema de gestión de inventario con predicción de demanda mediante IA.',
    icon: '📦',
    image: '',
    challenge: 'Roturas de stock frecuentes y exceso de inventario',
    solution: 'Implementamos un sistema predictivo que anticipa la demanda y automatiza reposiciones',
    metrics: [
      { value: '-70%', label: 'Tiempo gestión' },
      { value: '+25%', label: 'Rotación' },
      { value: '-40%', label: 'Stock muerto' }
    ]
  },
  {
    title: 'Proceso de Ventas Automatizado',
    company: 'TechRetail',
    description: 'Pipeline de ventas inteligente con calificación automática de leads.',
    icon: '🎯',
    image: '',
    challenge: 'Equipo de ventas saturado con leads no calificados',
    solution: 'Chatbot inteligente + scoring automático de leads + seguimiento automatizado',
    metrics: [
      { value: '+35%', label: 'Conversión' },
      { value: '3x', label: 'Leads procesados' },
      { value: '-50%', label: 'Tiempo respuesta' }
    ]
  },
  {
    title: 'Optimización Logística',
    company: 'LogiTrans',
    description: 'Sistema de ruteo y despacho optimizado con machine learning.',
    icon: '🚚',
    image: '',
    challenge: 'Costos de distribución elevados y entregas tardías',
    solution: 'Algoritmo de optimización de rutas + automatización de asignaciones',
    metrics: [
      { value: '-30%', label: 'Costos logísticos' },
      { value: '+45%', label: 'Entregas a tiempo' },
      { value: '2x', label: 'Capacidad' }
    ]
  }
];

// ============================================
// TERMINAL COMMANDS
// ============================================

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { type: 'command', text: 'kinetia init --proyecto pipeline' },
  { type: 'output', text: '✓ Proyecto inicializado' },
  { type: 'command', text: 'kinetia generar --modelo usuarios' },
  { type: 'output', text: '→ Analizando esquema...' },
  { type: 'success', text: '✓ Modelo creado exitosamente!' },
  { type: 'command', text: 'kinetia validar' },
  { type: 'success', text: '✓ Todas las pruebas pasaron!' }
];

// ============================================
// STATS DATA
// ============================================

export const STATS: StatData[] = [
  { target: 500, suffix: '+', label: 'Pipelines Generados' },
  { target: 99, suffix: '%', label: 'SLA de Disponibilidad' },
  { target: 10, suffix: 'x', label: 'Despliegue más Rápido' },
  { target: 24, suffix: '/7', label: 'Monitoreo IA' }
];

// ============================================
// FEATURES DATA
// ============================================

export const FEATURES: FlipCardData[] = [
  {
    icon: '🔧',
    label: 'Auto-Reparación',
    title: 'Autofix + Integración Git',
    description: 'Detecta problemas, sugiere correcciones y crea automáticamente PRs en GitHub para reparar pipelines fallidos.',
    backIcon: '✨',
    backTitle: 'Cómo funciona',
    backText: 'La IA monitorea tus pipelines 24/7, detecta fallos, analiza causas raíz y genera automáticamente correcciones con flujo de trabajo git apropiado.',
    backButtonText: 'Saber Más →'
  },
  {
    icon: '⚡',
    label: 'Generación de Código',
    title: 'Modelos Impulsados por IA',
    description: 'Genera modelos dbt, pruebas y aserciones con tipado de esquema fuerte automáticamente.',
    backIcon: '🚀',
    backTitle: '10x Más Rápido',
    backText: 'Describe lo que necesitas en español. Nuestra IA genera código listo para producción siguiendo los patrones de tu equipo.',
    backButtonText: 'Probar Ahora →'
  },
  {
    icon: '✅',
    label: 'Validación',
    title: 'Dry-Run de Todo',
    description: 'Valida sintaxis, estructura DAG y ejecuta dry-runs antes de cualquier despliegue a producción.',
    backIcon: '🛡️',
    backTitle: 'Despliegues Sin Riesgo',
    backText: 'Cada cambio se valida de forma aislada. Detecta errores antes de que lleguen a producción. Nunca más rompas tus pipelines de datos.',
    backButtonText: 'Ver Demo →'
  },
  {
    icon: '📊',
    label: 'Observabilidad',
    title: 'Sistema de Datos Unificado',
    description: 'Gestiona todos los pipelines de todas las herramientas en una ubicación centralizada con visibilidad completa.',
    backIcon: '🎯',
    backTitle: 'Panel Único',
    backText: 'Ve todos tus trabajos de dbt, Airflow, Spark en un dashboard. Métricas en tiempo real, alertas y seguimiento de linaje.',
    backButtonText: 'Explorar →'
  }
];

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS: NavLink[] = [
  { href: '#services', label: 'Soluciones' },
  { href: '#industries', label: 'Industrias' },
  { href: '#case-studies', label: 'Casos de Éxito' }
];

// ============================================
// LOGOS
// ============================================

export const LOGOS = [
  'dbt',
  'Airflow',
  'GitHub',
  'Snowflake',
  'Databricks',
  'AWS',
  'GCP',
  'Azure'
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

// ============================================
// PARTICLE COLORS - iOS Style
// ============================================

export const EXPLOSION_COLORS = ['#007aff', '#5ac8fa', '#5856d6', '#34c759', '#ff9500'];
export const BG_PARTICLE_COLORS = ['#007aff', '#5ac8fa'];
