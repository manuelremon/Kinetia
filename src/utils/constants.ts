import type { TerminalCommand, FlipCardData, StatData, NavLink, FooterColumn } from '@/types';

// ============================================
// TYPING EFFECT PHRASES
// ============================================

export const TYPING_PHRASES = [
  'que se construye sola',
  'que escala infinitamente',
  'que se auto-repara',
  'que nunca duerme',
  'impulsada por agentes IA'
];

// ============================================
// TERMINAL COMMANDS
// ============================================

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { type: 'command', text: 'tensorstax init --proyecto pipeline' },
  { type: 'output', text: '✓ Proyecto inicializado' },
  { type: 'command', text: 'tensorstax generar --modelo usuarios' },
  { type: 'output', text: '→ Analizando esquema...' },
  { type: 'success', text: '✓ Modelo creado exitosamente!' },
  { type: 'command', text: 'tensorstax validar' },
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
  { href: '#', label: 'Inicio' },
  { href: '#features', label: 'Características' },
  { href: '#how-it-works', label: 'Cómo Funciona' },
  { href: '#', label: 'Docs' }
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
      { href: 'mailto:info@tensorstax.com', label: 'info@tensorstax.com' }
    ]
  }
];

// ============================================
// PARTICLE COLORS
// ============================================

export const EXPLOSION_COLORS = ['#f97316', '#06b6d4', '#a855f7', '#fbbf24', '#22c55e'];
export const BG_PARTICLE_COLORS = ['#f97316', '#06b6d4'];
