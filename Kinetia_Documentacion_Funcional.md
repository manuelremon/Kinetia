# Documentación Funcional y Técnica: Proyecto Kinetia

**Fecha de Última Actualización:** 04 de Febrero de 2026
**Versión:** 1.1.0 (Incluye Lógica de Negocio y QA)
**Repositorio:** https://github.com/manuelremon/Kinetia

---

## 1. Visión General y Contexto del Negocio

**Kinetia** es una consultora tecnológica de alto nivel especializada en la transformación digital operativa. La plataforma web sirve como el principal punto de contacto, portafolio y herramienta de conversión para clientes potenciales.

### Propuesta de Valor
Kinetia no solo desarrolla software, sino que optimiza procesos mediante tecnologías avanzadas:
*   **Automatización de Procesos:** Transformación de tareas manuales en flujos digitales autónomos.
*   **Optimización de Inventarios:** Uso de algoritmos predictivos para gestión de stock.
*   **Sistemas Personalizados:** Desarrollo de ERPs y aplicaciones a medida.
*   **Agentic AI:** Diseño y entrenamiento de agentes de Inteligencia Artificial autónomos.

### Asistente Virtual (KINA)
La plataforma integra un agente de IA llamado **KINA**, impulsado por Google Gemini. KINA actúa como el primer nivel de soporte y ventas, capaz de explicar servicios y guiar al usuario hacia una demostración.

---

## 2. Stack Tecnológico

La arquitectura es moderna, basada en el ecosistema JavaScript/TypeScript, priorizando el rendimiento y la experiencia de usuario (UX).

### Frontend (Cliente)
*   **Framework:** React 18 (con Hooks y Functional Components).
*   **Lenguaje:** TypeScript (Tipado estático estricto).
*   **Build Tool:** Vite (Optimización y HMR rápido).
*   **Estilizado:**
    *   **SCSS Modules:** Para estilos locales y aislados (`.module.scss`).
    *   **SCSS Global:** Variables, mixins y resets en `src/styles`.
    *   **Carbon Design System:** (@carbon/react) Implementación de componentes base y sistema de grillas de IBM.
*   **Animaciones y Efectos:**
    *   **Framer Motion:** Animaciones de componentes y transiciones de estado.
    *   **Anime.js:** Animaciones complejas vectoriales o basadas en tiempo.
    *   **Lenis:** Librería para "Smooth Scrolling" (desplazamiento suave de alto rendimiento).

### Backend (Servidor BFF - Backend for Frontend)
*   **Entorno:** Node.js.
*   **Servidor:** Servidor HTTP nativo de Node (sin Express pesado) para máxima ligereza en `server/index.js`.
*   **Integraciones:**
    *   **Google Gemini API (Modelo gemini-2.0-flash):** Cerebro del chatbot KINA.
    *   **Webhooks:** Sistema de reenvío de formularios (Contacto y Demo) a servicios externos.

---

## 3. Estructura de Datos y Tipado

El proyecto utiliza TypeScript para asegurar la integridad de los datos que fluyen entre componentes y la API.

### Entidades Principales (`src/types/`)
1.  **ChatMessage:** Representa la interacción en el chat.
    ```typescript
    interface ChatMessage {
      id: string;
      role: 'user' | 'model'; // Identifica al remitente
      content: string;        // Texto del mensaje (HTML safe)
      timestamp: number;
    }
    ```

2.  **ServiceItem:** Estructura para renderizar tarjetas de servicios dinámicamente.
    ```typescript
    interface ServiceItem {
      id: string;
      title: string;
      description: string;
      icon: React.ReactNode; // Icono de Carbon
      route: 'ops' | 'finance' | 'tech' | 'management'; // Categorización
    }
    ```

3.  **API Payloads:** Estructura de datos enviados al servidor.
    *   **Chat Request:** `{ messages: [{ role: string, content: string }] }`
    *   **Contact Form:** `{ name: string, email: string, country: string, message: string }`

---

## 4. Lógica de Negocio y Flujos

La lógica se divide entre el estado del cliente y el procesamiento del servidor BFF.

### Flujo del Asistente Virtual (KINA)
1.  **Captura:** El usuario envía un mensaje a través de `ChatInput`.
2.  **Estado Optimista:** La interfaz muestra el mensaje del usuario inmediatamente.
3.  **Procesamiento (Server):**
    *   Recibe el historial completo de la conversación.
    *   Inyecta el *System Prompt* (instrucciones de identidad de KINA) al inicio del array.
    *   Envía la petición a Google Gemini API (`gemini-2.0-flash`).
4.  **Respuesta:**
    *   El servidor devuelve el texto plano generado.
    *   El frontend actualiza el estado, reemplazando el indicador de "escribiendo...".

### Lógica de Segmentación de Usuarios (`ChooseRoute`)
*   **Regla:** La página adapta el contenido visible basándose en la pestaña seleccionada por el usuario (Dirección, Operaciones, Tecnología, Finanzas).
*   **Implementación:** Estado local `activeTab` que filtra listas de componentes y altera textos de cabecera en la sección `ProblemSolution`.

### Validación de Formularios
*   **Cliente:** Validación HTML5 básica + validación de tipos en TypeScript.
*   **Servidor:** Validación estricta de campos requeridos y saneamiento básico antes de reenviar a Webhooks, evitando inyecciones o envíos vacíos.

---

## 5. Casos de Uso (Actores)

Identificamos 4 perfiles principales de usuario (Buyer Personas):

1.  **El Director de Operaciones (COO):**
    *   *Objetivo:* Reducir costes y errores manuales.
    *   *Flujo:* Aterriza en Hero -> Filtra por "Operaciones" -> Revisa "Automatización" -> Solicita Demo.
2.  **El CTO / Líder Técnico:**
    *   *Objetivo:* Evaluar la calidad técnica y la capacidad de integración.
    *   *Flujo:* Inspecciona el código (TerminalSection) -> Interactúa con KINA para probar la IA -> Revisa Stack Tecnológico.
3.  **El Director Financiero (CFO):**
    *   *Objetivo:* ROI y eficiencia de inventarios.
    *   *Flujo:* Revisa sección de "Optimización de Inventarios" y Casos de Estudio (Resultados).
4.  **Candidato / Talento:**
    *   *Objetivo:* Conocer la cultura y tecnologías.
    *   *Flujo:* Explora el diseño visual, animaciones y sección "About".

---

## 6. Sistema de Diseño (UI/UX) Detalles

El diseño visual proyecta "Ingeniería, Precisión y Futuro". Se ha migrado recientemente hacia una estética basada en **IBM Carbon Design System**.

### Tipografía
*   **Fuente Principal:** `IBM Plex Sans`.
*   **Uso:** Pesos variados (300 light, 400 regular, 500 medium, 600 semi-bold).

### Paleta de Colores
*   **Primario:** Azul Carbon (`#4589ff`).
*   **Fondo:** Claro/Blanco (Light Theme) con alto contraste.
*   **Acentos:** Gradientes sutiles para indicar estado "tech".

---

## 7. Estrategia de Pruebas (QA)

*Nota: Actualmente el proyecto no tiene tests configurados en `package.json`. Se recomienda la siguiente estrategia para futuras iteraciones:*

1.  **Unit Testing (Frontend):**
    *   **Herramienta:** Vitest + React Testing Library.
    *   **Objetivo:** Probar componentes aislados (ej. que `AnimatedButton` ejecute `onClick`, que `ChatWidget` se abra/cierre).
2.  **Integration Testing (API):**
    *   **Herramienta:** Supertest (para el servidor Node).
    *   **Objetivo:** Verificar que los endpoints `/api/chat` y `/api/contact` respondan 200 OK y manejen errores 400/500 correctamente.
3.  **End-to-End (E2E):**
    *   **Herramienta:** Playwright.
    *   **Flujo Crítico:** Carga de Home -> Navegación a Contacto -> Envío de Formulario -> Confirmación visual.

---

## 8. Despliegue y CI/CD

El ciclo de vida del desarrollo se gestiona mediante Git y despliegue automatizado.

### Integración Continua (CI)
*   **Linter:** `npm run lint` (ESLint) se ejecuta antes de cada commit (recomendado via husky) o en el pipeline.
*   **Build Check:** `npm run build` verifica que el código compile sin errores de TypeScript.

### Despliegue (CD)
*   **Infraestructura:** Compatible con plataformas Vercel/Netlify (Frontend) o VPS/Docker (Fullstack).
*   **Variables de Entorno:**
    *   `VITE_GEMINI_API_KEY`: Requerida en build-time/run-time para el servicio de chat.
    *   `PORT`: Puerto de escucha del servidor (default 3001).
*   **Pipeline Típico (GitHub Actions):**
    1.  Push a `main`.
    2.  Instalación de dependencias (`npm ci`).
    3.  Ejecución de Lint y Build.
    4.  Si éxito -> Despliegue a Producción.

---

## 9. Arquitectura de Archivos Clave

*   `server/index.js`: **Core Backend**. Maneja endpoints, CORS y llamadas a Gemini.
*   `src/App.tsx`: **Orquestador**. Composición principal de secciones.
*   `src/hooks/useChat.ts`: **Custom Hook**. Encapsula la lógica de estado y llamadas de red del chat.
*   `src/services/geminiService.ts`: **Adapter**. Interfaz limpia para comunicar frontend con backend.