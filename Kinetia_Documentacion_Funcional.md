# Documentación Funcional y Técnica: Proyecto Kinetia

**Fecha de Última Actualización:** 05 de Febrero de 2026
**Versión:** 2.0.0 (Migración a Next.js 15 + React 19)
**Repositorio:** https://github.com/manuelremon/Kinetia

---

## 1. Visión General y Contexto del Negocio

**Kinetia** es una consultora tecnológica de alto nivel especializada en la transformación digital operativa. La plataforma web sirve como el principal punto de contacto, portafolio y herramienta de conversión para clientes potenciales.

### Propuesta de Valor
Kinetia no solo desarrolla software, sino que optimiza procesos mediante tecnologías avanzadas:
*   **Automatización de Procesos:** Transformación de tareas manuales en flujos digitales autónomos (RPA/BPA).
*   **Optimización de Inventarios:** Uso de algoritmos predictivos y Machine Learning para gestión de stock.
*   **Sistemas Personalizados:** Desarrollo de ERPs, CRMs y aplicaciones empresariales a medida.
*   **Agentic AI:** Diseño y entrenamiento de agentes de Inteligencia Artificial autónomos con LLMs.

### Asistente Virtual (KINA)
La plataforma integra un agente de IA llamado **KINA**, impulsado por Google Gemini (modelo `gemini-2.0-flash`). KINA actúa como el primer nivel de soporte y ventas, capaz de explicar servicios y guiar al usuario hacia una demostración.

---

## 2. Stack Tecnológico

La arquitectura es moderna, basada en el ecosistema JavaScript/TypeScript con Next.js 15, priorizando el rendimiento SSR/SSG y la experiencia de usuario (UX).

### Frontend (Cliente)
*   **Framework:** Next.js 15 (App Router) con React 19 RC.
*   **Lenguaje:** TypeScript (Tipado estático estricto).
*   **Build Tool:** Next.js (Turbopack en desarrollo).
*   **Estilizado:**
    *   **SCSS Modules:** Para estilos locales y aislados (`.module.scss`).
    *   **SCSS Global:** Variables, mixins y resets en `src/styles`.
*   **Animaciones y Efectos:**
    *   **Framer Motion:** Animaciones de componentes, transiciones y View Transitions API.
    *   **Anime.js:** Animaciones complejas vectoriales o basadas en tiempo.
    *   **Lenis:** Librería para "Smooth Scrolling" (desplazamiento suave de alto rendimiento).
*   **Tipografía:**
    *   **IBM Plex Sans:** Fuente principal (400, 500, 700).
    *   **JetBrains Mono:** Fuente monoespaciada para terminales y código.

### Backend (Next.js Server Actions)
*   **Entorno:** Node.js con Next.js Server Actions.
*   **Validación:** Zod para validación de esquemas en servidor.
*   **Integraciones:**
    *   **Google Gemini API (Modelo gemini-2.0-flash):** Cerebro del chatbot KINA via `@google/generative-ai`.
    *   **Webhooks:** Sistema de reenvío de formularios (Contacto y Demo) a servicios externos.

### Monitoreo y Performance
*   **Web Vitals:** Monitoreo en tiempo real de LCP, INP, CLS, TTFB.
*   **Memory Monitoring:** Tracking de uso de memoria (Chrome/Edge).
*   **SEO:** JSON-LD Schemas (Organization, ProfessionalService, FAQPage).

---

## 3. Estructura del Proyecto

```
kinetia/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout (fonts, metadata, providers)
│   ├── page.tsx                 # Home Page (composición de secciones)
│   ├── actions.ts               # Server Actions (chat, forms)
│   └── error.tsx                # Error Boundary
├── src/
│   ├── components/
│   │   ├── common/              # Componentes reutilizables
│   │   ├── effects/             # Efectos visuales (PageLoader, etc.)
│   │   ├── features/            # Componentes de features específicas
│   │   ├── layout/              # Header, Footer
│   │   ├── providers/           # Context Providers
│   │   └── sections/            # Secciones de la página
│   ├── hooks/                   # Custom Hooks
│   ├── styles/                  # SCSS globales y abstracts
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utilidades y constantes
├── public/                      # Assets estáticos
├── next.config.ts               # Configuración Next.js
├── tsconfig.json                # Configuración TypeScript
└── package.json                 # Dependencias
```

---

## 4. Estructura de Datos y Tipado

El proyecto utiliza TypeScript para asegurar la integridad de los datos que fluyen entre componentes y Server Actions.

### Entidades Principales (`src/types/`)

1.  **GeminiContent:** Estructura para comunicación con Gemini API.
    ```typescript
    interface GeminiContent {
      role: 'user' | 'model';
      parts: { text: string }[];
    }
    ```

2.  **ChatMessage:** Representa la interacción en el chat.
    ```typescript
    interface ChatMessage {
      id: string;
      role: 'user' | 'model';
      content: string;
      timestamp: number;
    }
    ```

3.  **WebVitalsMetric:** Métricas de rendimiento.
    ```typescript
    interface WebVitalsMetric {
      name: string;
      value: number;
      rating: 'good' | 'needs-improvement' | 'poor';
      delta?: number;
    }
    ```

4.  **Contact Form Schema (Zod):**
    ```typescript
    const ContactFormSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().min(10),
    });
    ```

---

## 5. Componentes del Sistema

### Layout Components
| Componente | Descripción |
|------------|-------------|
| `Header` | Navegación principal con links y CTA |
| `Footer` | Pie de página con enlaces y contacto |

### Section Components
| Componente | Descripción |
|------------|-------------|
| `Hero` | Sección principal con animaciones cinéticas y CTAs |
| `ChooseRoute` | Selector de perfil de usuario (COO, CTO, CFO, etc.) |
| `ProblemSolution` | Presentación problema-solución adaptativa |
| `ServicesBento` | Grid Bento con servicios y efectos spotlight |
| `CaseStudies` | Casos de estudio y resultados |
| `HorizontalGallery` | Galería horizontal de proyectos |
| `Stats` | Estadísticas animadas con contadores |
| `TrustBadges` | Badges de confianza y certificaciones |
| `LogoCarousel` | Carrusel de logos de clientes |
| `Features` | Características destacadas |
| `HowItWorks` | Proceso de trabajo en pasos |
| `About` | Sección sobre la empresa |
| `FAQ` | Preguntas frecuentes con accordions |
| `FinalCTA` | Call-to-action final |
| `Contact` | Formulario de contacto |
| `TerminalSection` | Terminal interactiva con código |

### Common Components
| Componente | Descripción |
|------------|-------------|
| `ChatWidget` | Widget de chat flotante (KINA) |
| `ScrollProgress` | Barra de progreso de scroll |
| `ScrollToTop` | Botón para volver arriba |
| `Container` | Wrapper de contenido con max-width |
| `AnimatedButton` | Botones con animaciones |
| `MagneticButton` | Botones con efecto magnético |
| `GlitchText` | Texto con efecto glitch |
| `CountUpOnScroll` | Contadores animados al scroll |
| `ScrollReveal` | Revelado de elementos al scroll |

### Effect Components
| Componente | Descripción |
|------------|-------------|
| `PageLoader` | Loader de página inicial |
| `BackgroundLayers` | Capas de fondo animadas |

### Providers
| Provider | Descripción |
|----------|-------------|
| `SmoothScrollProvider` | Wrapper para Lenis smooth scroll |
| `WebVitalsProvider` | Monitoreo de Web Vitals |

---

## 6. Lógica de Negocio y Flujos

### Flujo del Asistente Virtual (KINA)

1.  **Captura:** El usuario envía un mensaje a través de `ChatInput`.
2.  **Estado Optimista:** La interfaz muestra el mensaje del usuario inmediatamente.
3.  **Server Action (`chatWithKina`):**
    *   Valida el historial con Zod (`GeminiContentSchema`).
    *   Inyecta el *System Prompt* al inicio del chat.
    *   Envía la petición a Google Gemini API.
4.  **Respuesta:**
    *   El servidor devuelve el texto generado.
    *   El frontend actualiza el estado del chat.

### Flujo de Formularios (Server Actions)

1.  **Captura:** El usuario completa el formulario de contacto.
2.  **Validación:** Zod valida los campos en el servidor.
3.  **Procesamiento:** `submitContactForm` procesa y reenvía a webhooks.
4.  **Feedback:** Respuesta de éxito/error al cliente.

### Lógica de Segmentación de Usuarios (`ChooseRoute`)
*   **Regla:** La página adapta el contenido visible basándose en la pestaña seleccionada.
*   **Perfiles:** Dirección, Operaciones, Tecnología, Finanzas.
*   **Implementación:** Estado local que filtra listas de componentes y altera textos.

---

## 7. Sistema de Diseño (UI/UX)

El diseño visual proyecta "Ingeniería, Precisión y Futuro" con estética Web 2026.

### Tipografía
*   **Fuente Principal:** `IBM Plex Sans` (400, 500, 700).
*   **Fuente Código:** `JetBrains Mono` (400, 500, 700).
*   **Optimización:** Next.js Font con `display: swap` para Zero CLS.

### Paleta de Colores
*   **Primario:** Azul (`#0f62fe`, `#0ea5e9`).
*   **Secundario:** Púrpura (`#6929c4`).
*   **Acentos:** Gradientes dinámicos (cyan → blue → purple).
*   **Fondo:** Dark theme con glassmorphism.

### Efectos Visuales
*   **Spotlight Cards:** Efecto de luz que sigue el cursor.
*   **Kinetic Typography:** Texto animado con palabras rotativas.
*   **Glassmorphism:** Cards con blur y transparencia.
*   **Particles:** Partículas flotantes con posiciones determinísticas (SSR-safe).
*   **View Transitions:** Transiciones suaves entre estados.

---

## 8. Performance y Web Vitals

### Métricas Monitoreadas
| Métrica | Umbral Bueno | Umbral Pobre |
|---------|--------------|--------------|
| LCP | ≤ 2500ms | > 4000ms |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |
| TTFB | ≤ 600ms | > 1800ms |

### Optimizaciones Implementadas
*   **Font Optimization:** Next.js Font con preload y swap.
*   **Image Optimization:** Next.js Image con lazy loading.
*   **Code Splitting:** Automático por ruta con App Router.
*   **Server Components:** Reducción de JavaScript en cliente.
*   **Deterministic Particles:** Pre-cálculo para evitar hydration mismatch.

---

## 9. SEO y Metadata

### JSON-LD Schemas
*   **Organization:** Datos de la empresa para Knowledge Graph.
*   **ProfessionalService:** Catálogo de servicios con ofertas.
*   **FAQPage:** Preguntas frecuentes para rich snippets.

### Meta Tags
*   Open Graph para redes sociales.
*   Twitter Cards.
*   Canonical URLs.
*   Robots directives.

---

## 10. Casos de Uso (Actores)

1.  **El Director de Operaciones (COO):**
    *   *Objetivo:* Reducir costes y errores manuales.
    *   *Flujo:* Hero → ChooseRoute "Operaciones" → ServicesBento "Automatización" → Demo.

2.  **El CTO / Líder Técnico:**
    *   *Objetivo:* Evaluar calidad técnica y capacidad de integración.
    *   *Flujo:* Inspecciona TerminalSection → Interactúa con KINA → Revisa Stack.

3.  **El Director Financiero (CFO):**
    *   *Objetivo:* ROI y eficiencia de inventarios.
    *   *Flujo:* ServicesBento "Optimización" → CaseStudies → Stats.

4.  **Candidato / Talento:**
    *   *Objetivo:* Conocer cultura y tecnologías.
    *   *Flujo:* Explora diseño visual → About → Features.

---

## 11. Estrategia de Pruebas (QA)

### Recomendaciones

1.  **Unit Testing (Frontend):**
    *   **Herramienta:** Vitest + React Testing Library.
    *   **Objetivo:** Probar componentes aislados.

2.  **Integration Testing (Server Actions):**
    *   **Herramienta:** Vitest con mocks de Gemini API.
    *   **Objetivo:** Verificar `chatWithKina` y `submitContactForm`.

3.  **End-to-End (E2E):**
    *   **Herramienta:** Playwright.
    *   **Flujo Crítico:** Home → Navegación → Contacto → Envío → Confirmación.

4.  **Performance Testing:**
    *   **Herramienta:** Lighthouse CI.
    *   **Objetivo:** Mantener Core Web Vitals en verde.

---

## 12. Despliegue y CI/CD

### Integración Continua (CI)
*   **Linter:** `npm run lint` (ESLint con next/core-web-vitals).
*   **Build Check:** `npm run build` verifica compilación sin errores.

### Despliegue (CD)
*   **Infraestructura:** Vercel (recomendado), Netlify, o VPS con Node.js.
*   **Variables de Entorno:**
    *   `GEMINI_API_KEY`: Requerida para el servicio de chat.
    *   `CONTACT_WEBHOOK_URL`: URL para formulario de contacto.
    *   `DEMO_WEBHOOK_URL`: URL para solicitudes de demo.

### Pipeline Típico (GitHub Actions)
1.  Push a `main`.
2.  Instalación de dependencias (`npm ci`).
3.  Ejecución de Lint y Build.
4.  Si éxito → Despliegue a Producción.

---

## 13. Archivos de Configuración Clave

| Archivo | Descripción |
|---------|-------------|
| `next.config.ts` | Configuración de Next.js (SASS, Server Actions) |
| `tsconfig.json` | Configuración TypeScript con paths aliases |
| `package.json` | Dependencias y scripts |
| `app/layout.tsx` | Root Layout con fonts, metadata y providers |
| `app/actions.ts` | Server Actions para chat y formularios |

---

## 14. Dependencias Principales

### Producción
| Paquete | Versión | Uso |
|---------|---------|-----|
| `next` | ^15.0.0 | Framework principal |
| `react` | ^19.0.0-rc.1 | Librería UI |
| `framer-motion` | ^12.31.0 | Animaciones |
| `@google/generative-ai` | ^0.24.1 | Gemini API |
| `zod` | ^4.3.6 | Validación de esquemas |
| `lenis` | ^1.3.17 | Smooth scrolling |
| `animejs` | ^4.2.2 | Animaciones complejas |

### Desarrollo
| Paquete | Versión | Uso |
|---------|---------|-----|
| `typescript` | ~5.6.2 | Tipado estático |
| `sass` | ^1.97.3 | Preprocesador CSS |
| `eslint` | ^9.39.2 | Linting |
| `eslint-config-next` | ^16.1.6 | Reglas ESLint para Next.js |
