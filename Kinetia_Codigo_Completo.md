# Documento de Código Fuente: Kinetia

**Última Actualización:** 05 de Febrero de 2026
**Versión:** 2.0.0 (Next.js 15 + React 19)

Este documento contiene el código fuente completo del proyecto Kinetia, incluyendo archivos de configuración, Server Actions y componentes frontend.

## Estructura del Proyecto

```
kinetia/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # Home Page
│   ├── actions.ts               # Server Actions
│   └── error.tsx                # Error Boundary
├── src/
│   ├── components/
│   │   ├── common/              # Componentes reutilizables
│   │   ├── effects/             # Efectos visuales
│   │   ├── layout/              # Header, Footer
│   │   ├── providers/           # Context Providers
│   │   └── sections/            # Secciones de la página
│   ├── hooks/                   # Custom Hooks
│   ├── styles/                  # SCSS globales
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utilidades
├── next.config.ts               # Configuración Next.js
├── tsconfig.json                # Configuración TypeScript
└── package.json                 # Dependencias
```

---

## Archivos de Configuración

### `package.json`
```json
{
  "name": "kinetia",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@types/animejs": "^3.1.13",
    "animejs": "^4.2.2",
    "framer-motion": "^12.31.0",
    "lenis": "^1.3.17",
    "next": "^15.0.0",
    "react": "^19.0.0-rc.1",
    "react-dom": "^19.0.0-rc.1",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@types/node": "^25.2.0",
    "@types/react": "^18.3.27",
    "@types/react-dom": "^18.3.7",
    "eslint": "^9.39.2",
    "eslint-config-next": "^16.1.6",
    "sass": "^1.97.3",
    "typescript": "~5.6.2"
  }
}
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./app/*"]
    },
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "app/**/*"],
  "exclude": ["node_modules"]
}
```

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    additionalData: `@use "abstracts/variables" as *; @use "abstracts/mixins" as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
```

---

## App Router

### `app/layout.tsx`
```typescript
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/main.scss';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { WebVitalsProvider } from '@/components/providers/WebVitalsProvider';

// Optimización de Fuentes (Zero Layout Shift)
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Viewport Configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// SEO & Metadata API
export const metadata: Metadata = {
  title: {
    template: '%s | Kinetia - Transformación Digital',
    default: 'Kinetia | Consultora de Tecnología y Automatización',
  },
  description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software a medida.',
  keywords: ['Automatización', 'IA', 'Software', 'Kinetia', 'ERP', 'Consultoría'],
  authors: [{ name: 'Kinetia Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://kinetia.tech',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://kinetia.tech',
    siteName: 'Kinetia',
    title: 'Kinetia | Transformación Digital y Automatización',
    description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software',
    images: [
      {
        url: 'https://kinetia.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kinetia - Transformación Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetia | Transformación Digital y Automatización',
    description: 'Especialistas en Automatización de Procesos, IA Agentic y Desarrollo de Software',
    images: ['https://kinetia.tech/og-image.jpg'],
  },
};

// JSON-LD Schemas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kinetia',
  alternateName: 'Kinetia Tech',
  description: 'Consultora de automatización inteligente, IA agentic y desarrollo full-stack',
  url: 'https://kinetia.tech',
  logo: 'https://kinetia.tech/logo.png',
  foundingDate: '2023',
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'Latinoamérica' }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'info@kinetia.tech',
    availableLanguage: ['es', 'en']
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kinetia',
  url: 'https://kinetia.tech',
  description: 'Consultoría en automatización de procesos, optimización de inventarios con ML, sistemas personalizados y agentes IA',
  priceRange: '$$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Kinetia',
    itemListElement: [
      { '@type': 'Offer', name: 'Automatización de Procesos', description: 'RPA/BPA' },
      { '@type': 'Offer', name: 'Optimización de Inventarios', description: 'Predicción con ML' },
      { '@type': 'Offer', name: 'Sistemas Personalizados', description: 'ERPs, CRMs' },
      { '@type': 'Offer', name: 'Agentic AI', description: 'Agentes autónomos con LLMs' }
    ]
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué ofrece Kinetia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Automatización de procesos, optimización de inventarios, sistemas personalizados y agentes IA.'
      }
    },
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="professional-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <WebVitalsProvider />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### `app/page.tsx`
```typescript
import {
  PageLoader,
  Header,
  Footer,
  Hero,
  ChooseRoute,
  LogoCarousel,
  ProblemSolution,
  TrustBadges,
  ServicesBento,
  CaseStudies,
  HorizontalGallery,
  Stats,
  Features,
  HowItWorks,
  About,
  ScrollToTop,
  ScrollProgress,
  FAQ,
  FinalCTA,
  Contact,
  ChatWidget,
} from '@/components';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Global Effects */}
      <PageLoader />
      <ScrollProgress />

      <Header />

      {/* Main Content */}
      <Hero />
      <ChooseRoute />
      <ProblemSolution />
      <ServicesBento />
      <CaseStudies />
      <HorizontalGallery />
      <Stats />
      <TrustBadges />
      <LogoCarousel />
      <Features />
      <HowItWorks />
      <About />
      <FAQ />
      <FinalCTA />
      <Contact />

      <Footer />

      {/* Floating Components */}
      <ChatWidget />
      <ScrollToTop />
    </main>
  );
}
```

### `app/actions.ts`
```typescript
'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import type { GeminiContent } from '@/types/chat';

// Configuración Singleton del Cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Esquemas de Validación
const GeminiContentSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(z.object({ text: z.string() }))
});

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Response Types
interface ChatResponse {
  success: boolean;
  text?: string;
  error?: string;
}

interface FormResponse {
  success: boolean;
  error?: string;
  message?: string;
}

const SYSTEM_PROMPT = `Eres KINA, el asistente virtual de KINETIA, una empresa de tecnología especializada en:
- Automatización de Procesos
- Optimización de Inventarios
- Sistemas Personalizados
- Agentic / Entrenamiento de Agentes IA

Tu objetivo es:
1. Dar la bienvenida a los visitantes
2. Responder preguntas sobre los servicios de KINETIA
3. Ayudar a los usuarios a entender cómo KINETIA puede resolver sus problemas
4. Guiar hacia solicitar una demo cuando sea apropiado

Responde siempre en español, de forma profesional pero cercana. Sé conciso (máximo 2-3 párrafos cortos).`;

export async function chatWithKina(history: GeminiContent[], newMessage: string): Promise<ChatResponse> {
  if (!process.env.GEMINI_API_KEY) {
    console.error('API Key missing');
    return { success: false, error: 'Server Config Error: API Key missing' };
  }

  if (!newMessage || typeof newMessage !== 'string' || newMessage.trim().length === 0) {
    return { success: false, error: 'Mensaje vacío no permitido' };
  }

  try {
    // 1. Validar el historial
    const validatedHistory = history.map(msg => {
      const parsed = GeminiContentSchema.safeParse(msg);
      if (!parsed.success) {
        throw new Error(`Mensaje inválido en historial: ${parsed.error.message}`);
      }
      return parsed.data;
    });

    // 2. Iniciar chat con historial
    const initialHistory: GeminiContent[] = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Entendido. Soy KINA.' }] },
    ];

    const chat = model.startChat({
      history: [...initialHistory, ...validatedHistory],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // 3. Enviar mensaje
    const result = await chat.sendMessage(newMessage);
    const response = result.response;

    return { success: true, text: response.text() };
  } catch (error) {
    console.error('Gemini Error:', error);
    return { success: false, error: 'No pude procesar tu solicitud en este momento.' };
  }
}

export async function submitContactForm(formData: FormData): Promise<FormResponse> {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      message: formData.get('message'),
    };

    const validation = ContactFormSchema.safeParse(rawData);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validación fallida: ${errors}` };
    }

    const validData: ContactFormData = validation.data;

    // TODO: Enviar a webhook
    console.log('Server Action: Contact Form received', validData);

    return { success: true, message: 'Formulario enviado exitosamente' };
  } catch (error) {
    console.error('Contact Form Error:', error);
    return { success: false, error: 'Error al procesar el formulario' };
  }
}
```

---

## Types

### `src/types/chat.ts`
```typescript
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiCandidate {
  content: {
    parts: { text: string }[];
    role: 'user' | 'model';
  };
  finishReason: 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER';
}

export interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}
```

---

## Hooks

### `src/hooks/useWebVitals.ts`
```typescript
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
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 600, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

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

export function useWebVitals(
  onMetric?: (metric: WebVitalsMetric) => void
): void {
  useEffect(() => {
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

    // INP - Interaction to Next Paint
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
        value: Math.round(clsValue * 1000) / 1000,
        rating: getRating('CLS', clsValue),
      };
      onMetric?.(metric);
    });

    // Observe metrics
    try { lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] }); } catch {}
    try { inpObserver.observe({ entryTypes: ['event'] }); } catch {}
    try { clsObserver.observe({ entryTypes: ['layout-shift'] }); } catch {}

    // TTFB
    try {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        if (ttfb > 0) {
          onMetric?.({
            name: 'TTFB',
            value: Math.round(ttfb),
            rating: getRating('TTFB', ttfb),
          });
        }
      }
    } catch {}

    return () => {
      lcpObserver.disconnect();
      inpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [onMetric]);
}

export function useWebVitalsReporter(
  endpoint?: string
): (metric: WebVitalsMetric) => void {
  return (metric: WebVitalsMetric) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}: ${metric.value}`, metric);
    }

    if (endpoint) {
      navigator.sendBeacon(endpoint, JSON.stringify(metric));
    }

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
      const rating = usedPercent < 50 ? 'good' : usedPercent < 80 ? 'needs-improvement' : 'poor';

      onMemoryChange?.({
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        rating,
      });
    };

    const interval = setInterval(checkMemory, 5000);
    checkMemory();

    return () => clearInterval(interval);
  }, [onMemoryChange]);
}
```

---

## Providers

### `src/components/providers/SmoothScrollProvider.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## Secciones Principales

### `src/components/sections/Hero/Hero.tsx`
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/common';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Hero.module.scss';

// Kinetic Words Configuration
const KINETIC_WORDS = ['Transformación', 'Automatización', 'IA', 'Futuro'];
const CYCLE_DURATION = 3000;

// Squishy Button Component
function SquishyButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const scale = useTransform(
    [xSpring, ySpring],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
      return 1 - distance * 0.1;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={styles.squishyButton}
      style={{ rotateX, rotateY, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <span className={styles.squishyContent}>{children}</span>
      <span className={styles.squishyGlow} />
    </motion.button>
  );
}

// Kinetic Text Component
function KineticText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % KINETIC_WORDS.length);
        setIsAnimating(false);
      }, 500);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.kineticContainer}>
      <motion.span
        key={currentIndex}
        className={styles.kineticWord}
        initial={{ y: 40, opacity: 0, rotateX: -90 }}
        animate={{
          y: isAnimating ? -40 : 0,
          opacity: isAnimating ? 0 : 1,
          rotateX: isAnimating ? 90 : 0
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {KINETIC_WORDS[currentIndex]}
      </motion.span>
    </span>
  );
}

// Seeded pseudo-random for deterministic particle positions (SSR-safe)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: seededRandom(i * 1) * 100,
  y: seededRandom(i * 2) * 100,
  scale: seededRandom(i * 3) * 0.5 + 0.5,
  duration: seededRandom(i * 4) * 10 + 10,
  delay: seededRandom(i * 5) * 5,
}));

// Animated Gradient Background
function AnimatedBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <motion.div
        className={styles.gradientLayer}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className={styles.meshOverlay} />

      <div className={styles.particles}>
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: particle.scale,
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <AnimatedBackground />

      <Container>
        <div className={styles.splitLayout}>
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className={styles.badgePulse} />
              <span>Liderando la Revolución Digital</span>
            </motion.div>

            {/* Glassmorphism Card */}
            <div className={styles.glassCard}>
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                El Futuro de tu
                <br />
                Empresa es <KineticText />
              </motion.h1>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Automatizamos procesos, optimizamos inventarios con ML y
                desarrollamos agentes IA que trabajan 24/7 para tu negocio.
              </motion.p>

              {/* CTA Group */}
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SquishyButton onClick={scrollToContact}>
                  Solicitar Diagnóstico Gratuito
                </SquishyButton>

                <button
                  className={styles.secondaryButton}
                  onClick={scrollToServices}
                >
                  Ver Servicios
                  <span className={styles.arrowIcon}>→</span>
                </button>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className={styles.stat}>
                <span className={styles.statValue}>+70%</span>
                <span className={styles.statLabel}>Eficiencia Operativa</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>-40%</span>
                <span className={styles.statLabel}>Costos de Inventario</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Agentes IA Activos</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
```

### `src/components/sections/Services/ServicesBento.tsx`
```typescript
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/common';
import styles from './ServicesBento.module.scss';

const services = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI & LLMs',
    subtitle: 'Inteligencia que actúa por ti',
    description: 'Agentes autónomos que comprenden contexto y ejecutan tareas 24/7.',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0f62fe 0%, #6929c4 50%, #9f1853 100%)',
    size: 'featured',
    tags: ['GPT-4', 'Claude', 'LangChain', 'RAG'],
  },
  {
    id: 'automation',
    title: 'Automatización de Procesos',
    subtitle: 'RPA & Workflows inteligentes',
    description: 'Transformamos tareas manuales en flujos automatizados.',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0f62fe 100%)',
    size: 'vertical',
    metric: { value: '-30%', label: 'Costos Operativos' },
    tags: ['n8n', 'Zapier', 'Python'],
  },
  {
    id: 'software',
    title: 'Desarrollo a Medida',
    subtitle: 'Sistemas que escalan contigo',
    description: 'ERPs, CRMs y aplicaciones empresariales.',
    icon: '🛠️',
    gradient: 'linear-gradient(135deg, #6929c4 0%, #491d8b 100%)',
    size: 'standard',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'consulting',
    title: 'Consultoría',
    subtitle: 'Estrategia tecnológica',
    icon: '💡',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
    size: 'small',
    badge: 'Trusted Partner',
  },
  {
    id: 'inventory',
    title: 'Optimización de Inventarios',
    subtitle: 'Predictive Analytics & ML',
    description: 'Modelos de ML que predicen demanda y optimizan stock.',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    size: 'horizontal',
    metric: { value: '-40%', label: 'Stock Muerto' },
    tags: ['TensorFlow', 'Power BI', 'SQL'],
  },
];

// SpotlightCard with mouse-following effect
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  id: string;
}

function SpotlightCard({ children, className = '', gradient, id }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.bentoCard} ${className}`}
      style={{ viewTransitionName: `service-${id}` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {gradient && (
        <div
          className={styles.gradientBg}
          style={{ background: gradient, opacity: isHovered ? 0.15 : 0.08 }}
        />
      )}

      {isMounted && (
        <motion.div
          className={styles.spotlight}
          style={{
            background: spotlightBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      <motion.div
        className={styles.borderGlow}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={styles.cardContent}>{children}</div>
    </motion.div>
  );
}

export function ServicesBento() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.section} id="servicios">
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Nuestros Servicios</span>
          <h2 className={styles.title}>
            Soluciones que <span className={styles.highlight}>transforman</span>
          </h2>
          <p className={styles.subtitle}>
            Combinamos IA, automatización y desarrollo a medida
          </p>
        </motion.div>

        <div className={styles.bentoGrid}>
          {services.map((service) => (
            <SpotlightCard
              key={service.id}
              id={service.id}
              className={styles[service.size]}
              gradient={service.gradient}
            >
              {/* Card content rendered based on size */}
              <span className={styles.cardIcon}>{service.icon}</span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardSubtitle}>{service.subtitle}</p>
              {service.description && (
                <p className={styles.cardDescription}>{service.description}</p>
              )}
              {service.tags && (
                <div className={styles.tags}>
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>¿Listo para transformar tu operación?</h3>
            <p className={styles.ctaText}>
              Solicita un diagnóstico gratuito
            </p>
          </div>
          <motion.button
            className={styles.ctaButton}
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar diagnóstico
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}
```

---

## Common Components

### `src/components/common/ChatWidget/ChatWidget.tsx`
```typescript
'use client';

import { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import styles from './ChatWidget.module.scss';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.widget}>
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
```

---

## Component Exports

### `src/components/index.ts`
```typescript
// Common components
export * from './common';

// Layout components
export * from './layout';

// Section components
export * from './sections';

// Effect components
export * from './effects';

// Feature components
export * from './features';
```

### `src/components/sections/index.ts`
```typescript
export { Hero } from './Hero';
export { LogosCarousel } from './Logos';
export { ChooseRoute } from './ChooseRoute';
export { LogoCarousel } from './LogoCarousel';
export { ProblemSolution } from './ProblemSolution';
export { TrustBadges } from './TrustBadges';
export { Stats } from './Stats';
export { StatsTools } from './StatsTools';
export { Services, ServicesBento } from './Services';
export { Testimonials } from './Testimonials';
export { CaseStudies } from './CaseStudies';
export { Features } from './Features';
export { HowItWorks } from './HowItWorks';
export { CTA } from './CTA';
export { About } from './About';
export { FAQ } from './FAQ';
export { FinalCTA } from './FinalCTA';
export { Contact } from './Contact';
export { TerminalSection } from './TerminalSection';
export { HorizontalGallery } from './ProjectGallery';
```

### `src/components/common/index.ts`
```typescript
export * from './AnimatedButton';
export * from './AnimatedLetters';
export * from './Button';
export * from './ChatWidget';
export * from './Container';
export * from './CountUpOnScroll';
export * from './CubeSpinner';
export * from './DemoModal';
export * from './GlitchText';
export * from './GridLoader';
export * from './IconCloud';
export * from './MagneticButton';
export * from './Modal';
export * from './MorphLoader';
export * from './ParallaxSection';
export * from './RandomizedTextEffect';
export * from './RobotIcon';
export * from './ScrollProgress';
export * from './ScrollReveal';
export * from './ScrollTextMarquee';
export * from './ScrollToTop';
export * from './SectionDivider';
export * from './SendButton';
export * from './SpotlightCard';
export * from './Terminal';
export * from './TextReveal';
export * from './TypingText';
```

### `src/components/layout/index.ts`
```typescript
export { Header } from './Header';
export { Footer } from './Footer';
```

---

## Resumen de Cambios v2.0.0

### Migración Principal
- **Build Tool:** Vite → Next.js 15 (App Router)
- **React:** 18.x → 19.0.0-rc.1
- **Backend:** Node HTTP Server → Next.js Server Actions
- **API Client:** Fetch directo → `@google/generative-ai` SDK
- **Validación:** Manual → Zod schemas

### Nuevas Características
- Web Vitals monitoring (LCP, INP, CLS, TTFB)
- Memory monitoring hook
- JSON-LD SEO schemas
- Deterministic particles (SSR-safe)
- View Transitions API ready
- Spotlight card effects
- Bento Grid layout para servicios

### Componentes Nuevos
- `ServicesBento` - Grid Bento con spotlight effects
- `HorizontalGallery` - Galería de proyectos
- `WebVitalsProvider` - Monitoreo de performance
- `SquishyButton` - Botón con efecto 3D
- `KineticText` - Texto rotativo animado
