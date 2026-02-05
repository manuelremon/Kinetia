'use client';

import { CSSProperties } from 'react';

interface ViewTransitionConfig {
  name: string;
  duration?: number;
  easing?: string;
}

/**
 * Hook para manejar View Transitions API con type safety
 * Retorna propiedades CSS seguras para aplicar a elementos
 *
 * Uso:
 * const viewTransitionStyle = useViewTransition({ name: 'service-card-1' });
 * <div style={viewTransitionStyle}>...</div>
 */
export function useViewTransition(config: ViewTransitionConfig): CSSProperties {
  // Detectar soporte de View Transitions API
  const supportsViewTransitions = typeof document !== 'undefined' &&
    'startViewTransition' in document;

  if (!supportsViewTransitions) {
    return {};
  }

  const style: CSSProperties = {
    viewTransitionName: config.name,
  } as CSSProperties;

  return style;
}

/**
 * Hook para iniciar view transitions programáticamente
 * Uso en event handlers o efectos
 */
export function useStartViewTransition() {
  return (callback: () => void | Promise<void>) => {
    const supportsViewTransitions = typeof document !== 'undefined' &&
      'startViewTransition' in document;

    if (!supportsViewTransitions) {
      callback();
      return;
    }

    (document as any).startViewTransition(callback);
  };
}

/**
 * Hook para detectar soporte de View Transitions
 */
export function useSupportsViewTransitions(): boolean {
  if (typeof document === 'undefined') return false;
  return 'startViewTransition' in document;
}
