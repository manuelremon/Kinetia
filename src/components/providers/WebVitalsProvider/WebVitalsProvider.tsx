'use client';

import { useWebVitals, useWebVitalsReporter } from '@/hooks/useWebVitals';

/**
 * Component para monitorear Web Vitals en tiempo real
 * Implementa tracking automático de Core Web Vitals
 *
 * Green Coding Practice: Monitoreo bajo impacto
 * - Lazy: solo en desarrollo o cuando hay analytics endpoint
 * - Non-blocking: metrics collection no interfiere con interacción del usuario
 */
export function WebVitalsProvider({
  analyticsEndpoint,
  enableLogging = process.env.NODE_ENV === 'development',
}: {
  analyticsEndpoint?: string;
  enableLogging?: boolean;
} = {}) {
  // Reporter con selección automática de destino (logging, endpoint, Google Analytics)
  const reporter = useWebVitalsReporter(analyticsEndpoint);

  // Monitorear métricas
  useWebVitals((metric) => {
    // Logging en desarrollo
    if (enableLogging) {
      const emoji =
        metric.rating === 'good'
          ? '✅'
          : metric.rating === 'needs-improvement'
            ? '⚠️'
            : '❌';
      console.log(
        `${emoji} [${metric.name}] ${metric.value}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`
      );
    }

    // Reportar métrica
    reporter(metric);
  });

  // Este componente no renderiza nada, es solo para efectos
  return null;
}
