'use client';

import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

interface WebVitalsThresholds {
  LCP: { good: number; poor: number };
  FID: { good: number; poor: number };
  CLS: { good: number; poor: number };
  TTFB: { good: number; poor: number };
  INP: { good: number; poor: number };
}

// Google Core Web Vitals Thresholds (2024/2026 standards)
const THRESHOLDS: WebVitalsThresholds = {
  LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint (ms)
  FID: { good: 100, poor: 300 },        // First Input Delay (ms) - deprecated in favor of INP
  CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift (unitless)
  TTFB: { good: 600, poor: 1800 },      // Time to First Byte (ms)
  INP: { good: 200, poor: 500 },        // Interaction to Next Paint (ms) - new metric
};

/**
 * Rating based on Google Core Web Vitals standards
 * Used for: Real-time performance monitoring, Sustainable/Green coding tracking
 */
function getRating(
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = THRESHOLDS[metricName as keyof WebVitalsThresholds];
  if (!thresholds) return 'needs-improvement';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Hook para monitorear Web Vitals en tiempo real
 * Implementa medición de: LCP, FID, CLS, TTFB, INP
 *
 * Uso:
 * useWebVitals((metric) => {
 *   console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`);
 *   // Enviar a analytics, monitoreo, etc.
 * });
 */
export function useWebVitals(
  onMetric?: (metric: WebVitalsMetric) => void
): void {
  useEffect(() => {
    // Si no hay soporte para PerformanceObserver, no hacer nada
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const metric: WebVitalsMetric = {
        name: 'LCP',
        value: Math.round(lastEntry.startTime),
        rating: getRating('LCP', lastEntry.startTime),
      };
      onMetric?.(metric);
    });

    // INP - Interaction to Next Paint (reemplaza a FID)
    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const maxValue = Math.max(...entries.map((e) => (e as any).duration));
      const metric: WebVitalsMetric = {
        name: 'INP',
        value: Math.round(maxValue),
        rating: getRating('INP', maxValue),
      };
      onMetric?.(metric);
    });

    // CLS - Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      const metric: WebVitalsMetric = {
        name: 'CLS',
        value: Math.round(clsValue * 1000) / 1000, // 3 decimales
        rating: getRating('CLS', clsValue),
      };
      onMetric?.(metric);
    });

    // Observar métricas
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Fallback: algunos navegadores no soportan LCP
    }

    try {
      inpObserver.observe({ entryTypes: ['event'] });
    } catch (e) {
      // Fallback: INP no soportado
    }

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Fallback: CLS no soportado
    }

    // TTFB - Time to First Byte (vía Navigation Timing)
    if ('performance' in window && 'timing' in window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.responseStart - perfData.navigationStart;
      if (pageLoadTime > 0) {
        onMetric?.({
          name: 'TTFB',
          value: Math.round(pageLoadTime),
          rating: getRating('TTFB', pageLoadTime),
        });
      }
    }

    // Cleanup
    return () => {
      lcpObserver.disconnect();
      inpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [onMetric]);
}

/**
 * Hook para reportar Web Vitals a servicios externos (analytics)
 * Compatible con: Google Analytics, Vercel Analytics, Datadog, etc.
 */
export function useWebVitalsReporter(
  endpoint?: string
): (metric: WebVitalsMetric) => void {
  return (metric: WebVitalsMetric) => {
    // Log en development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}: ${metric.value}`, metric);
    }

    // Enviar a endpoint si está configurado
    if (endpoint) {
      navigator.sendBeacon(endpoint, JSON.stringify(metric));
    }

    // Google Analytics integration (si está disponible)
    if ('gtag' in window) {
      (window as any).gtag?.('event', metric.name.toLowerCase(), {
        value: metric.value,
        event_category: 'web_vitals',
        event_label: metric.rating,
        non_interaction: true,
      });
    }
  };
}

/**
 * Hook para monitorear uso de memoria (si está disponible)
 * Performance API Extension - Chrome/Edge only
 */
export function useMemoryMonitoring(
  onMemoryChange?: (memory: { usedJSHeapSize: number; totalJSHeapSize: number; rating: string }) => void
): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in (performance as any))) {
      return;
    }

    const checkMemory = () => {
      const memory = (performance as any).memory;
      const usedPercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
      const rating =
        usedPercent < 50 ? 'good' : usedPercent < 80 ? 'needs-improvement' : 'poor';

      onMemoryChange?.({
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        rating,
      });
    };

    const interval = setInterval(checkMemory, 5000); // Check every 5 seconds
    checkMemory(); // Initial check

    return () => clearInterval(interval);
  }, [onMemoryChange]);
}
