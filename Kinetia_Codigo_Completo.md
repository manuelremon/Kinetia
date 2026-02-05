# Documento de Código Fuente: Kinetia

Este documento contiene el código fuente completo del proyecto Kinetia, incluyendo archivos de configuración, backend y frontend.

## Estructura del Proyecto

Los archivos incluidos son:
- Configuración: `package.json`, `tsconfig.json`, `vite.config.ts`
- Backend: `server/index.js`
- Frontend Main: `src/main.tsx`, `src/App.tsx`
- Hooks: `src/hooks/useChat.ts`, `src/hooks/useSmoothScroll.ts`
- Servicios: `src/services/geminiService.ts`
- Utilidades: `src/utils/constants.ts`
- Estilos Globales: `src/styles/main.scss`, `src/styles/abstracts/_variables.scss`
- Componentes Clave:
    - Layout: `Header.tsx`, `Footer.tsx`
    - Secciones: `Hero.tsx`, `Services.tsx`, `Contact.tsx`
    - Chat Widget: `ChatWidget.tsx`, `ChatPanel.tsx`, `ChatMessages.tsx`, `ChatInput.tsx`

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
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@carbon/react": "^1.99.0",
    "@types/animejs": "^3.1.13",
    "animejs": "^4.2.2",
    "framer-motion": "^12.27.0",
    "lenis": "^1.3.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "sass": "^1.83.4",
    "typescript": "~5.6.2",
    "vite": "^6.0.7"
  }
}
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/abstracts/variables" as *; @use "@/styles/abstracts/mixins" as *; @use "@/styles/abstracts/animations";`,
      },
    },
  },
})
```

---

## Backend (Server)

### `server/index.js`
```javascript
import http from 'node:http';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const REQUEST_TIMEOUT_MS = 30000;
const WEBHOOK_TIMEOUT_MS = 10000;
const MAX_BODY_SIZE = 1_000_000;

loadEnv();

const PORT = Number(process.env.PORT || 3001);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const FORM_MODE = process.env.FORM_MODE || 'strict';
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

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

Información sobre los servicios:
- Automatización de Procesos: Transformamos tareas manuales en flujos automatizados, desde captura de datos hasta reportes.
- Optimización de Inventarios: Sistemas predictivos con IA que anticipan demanda y optimizan niveles de stock.
- Sistemas Personalizados: Desarrollo de software a medida (ERPs, apps especializadas) que se adapta a tus procesos.
- Agentic: Diseñamos y entrenamos agentes IA autónomos para tareas complejas.

Responde siempre en español, de forma profesional pero cercana. Sé conciso (máximo 2-3 párrafos cortos). Si no sabes algo específico, sugiere contactar al equipo o solicitar una demo.`;

const WELCOME_MESSAGE =
  '¡Entendido! Soy KINA, el asistente virtual de KINETIA. Estoy lista para ayudar a los visitantes con información sobre nuestros servicios de tecnología.';

if (typeof fetch !== 'function') {
  console.warn('Global fetch no está disponible. Usa Node 18+ para el API server.');
}

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  const envText = readFileSync(envPath, 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'" ) && value.endsWith("'" ))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (!chunks.length) {
        resolve(null);
        return;
      }

      const raw = Buffer.concat(chunks).toString('utf8');
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('invalid_json'));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

function validateFields(payload, requiredFields) {
  if (!payload || typeof payload !== 'object') {
    return 'Datos inválidos.';
  }

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim().length === 0) {
      return `Falta el campo requerido: ${field}.`;
    }
  }

  return null;
}

function toGeminiContents(messages) {
  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: WELCOME_MESSAGE }] }
  ];

  for (const msg of messages) {
    if (!msg || !msg.content || !msg.role) continue;
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(msg.content) }]
    });
  }

  return contents;
}

async function handleChat(req, res) {
  if (!GEMINI_API_KEY) {
    sendJson(res, 500, { error: 'GEMINI_API_KEY no está configurada.' });
    return;
  }

  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    if (error.message === 'payload_too_large') {
      sendJson(res, 413, { error: 'El mensaje supera el tamaño permitido.' });
      return;
    }
    sendJson(res, 400, { error: 'JSON inválido.' });
    return;
  }

  if (!body || !Array.isArray(body.messages)) {
    sendJson(res, 400, { error: 'Se requiere un arreglo de mensajes.' });
    return;
  }

  const contents = toGeminiContents(body.messages);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 429) {
        sendJson(res, 429, { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' });
        return;
      }
      if (response.status === 403) {
        sendJson(res, 403, { error: 'Error de autenticación con el servicio.' });
        return;
      }

      console.error('Gemini API error:', response.status, errorText);
      sendJson(res, 500, { error: 'No se pudo contactar al asistente.' });
      return;
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;
    if (!text) {
      sendJson(res, 500, { error: 'Respuesta inválida del asistente.' });
      return;
    }

    sendJson(res, 200, { reply: text });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error?.name === 'AbortError') {
      sendJson(res, 504, { error: 'La solicitud tardó demasiado. Intenta de nuevo.' });
      return;
    }
    console.error('Chat handler error:', error);
    sendJson(res, 500, { error: 'Error inesperado en el servidor.' });
  }
}

async function forwardToWebhook(res, url, payload) {
  if (!url) {
    if (FORM_MODE === 'log') {
      console.log('Formulario recibido:', payload);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 501, { error: 'Formulario no configurado en el servidor.' });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(payload)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error:', response.status, errorText);
      sendJson(res, 502, { error: 'El servidor de formularios no respondió correctamente.' });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error?.name === 'AbortError') {
      sendJson(res, 504, { error: 'El servidor de formularios tardó demasiado.' });
      return;
    }
    console.error('Webhook handler error:', error);
    sendJson(res, 500, { error: 'No se pudo enviar el formulario.' });
  }
}

async function handleContact(req, res) {
  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    if (error.message === 'payload_too_large') {
      sendJson(res, 413, { error: 'El formulario supera el tamaño permitido.' });
      return;
    }
    sendJson(res, 400, { error: 'JSON inválido.' });
    return;
  }

  const errorMessage = validateFields(body, ['name', 'email', 'country', 'message']);
  if (errorMessage) {
    sendJson(res, 400, { error: errorMessage });
    return;
  }

  const payload = {
    ...body,
    form: 'contact',
    submittedAt: new Date().toISOString()
  };

  await forwardToWebhook(res, process.env.CONTACT_WEBHOOK_URL || '', payload);
}

async function handleDemo(req, res) {
  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    if (error.message === 'payload_too_large') {
      sendJson(res, 413, { error: 'El formulario supera el tamaño permitido.' });
      return;
    }
    sendJson(res, 400, { error: 'JSON inválido.' });
    return;
  }

  const errorMessage = validateFields(body, ['name', 'email', 'service']);
  if (errorMessage) {
    sendJson(res, 400, { error: errorMessage });
    return;
  }

  const payload = {
    ...body,
    form: 'demo',
    submittedAt: new Date().toISOString()
  };

  await forwardToWebhook(res, process.env.DEMO_WEBHOOK_URL || '', payload);
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 404, { error: 'Ruta no encontrada.' });
    return;
  }

  if (req.url === '/api/chat') {
    await handleChat(req, res);
    return;
  }

  if (req.url === '/api/contact') {
    await handleContact(req, res);
    return;
  }

  if (req.url === '/api/demo') {
    await handleDemo(req, res);
    return;
  }

  sendJson(res, 404, { error: 'Ruta no encontrada.' });
});

server.listen(PORT, () => {
  console.log(`API server listo en http://localhost:${PORT}`);
});
```

---

## Frontend - Main & App

### `src/main.tsx`
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/App.tsx`
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
  Services,
  CaseStudies,
  Stats,
  Features,
  HowItWorks,
  About,
  FAQ,
  FinalCTA,
  Contact,
  ChatWidget,
  ScrollToTop,
  ScrollProgress
} from '@/components';
import { useSmoothScroll } from '@/hooks';

import '@/styles/main.scss';

function App() {
  useSmoothScroll();

  return (
    <>
      {/* Global Effects */}
      <PageLoader />
      <ScrollProgress />

      {/* Layout */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <ChooseRoute />
        <ProblemSolution />
        <Services />
        <CaseStudies />
        <Stats />
        <TrustBadges />
        <LogoCarousel />
        <Features />
        <HowItWorks />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />

      {/* Chat Widget */}
      <ChatWidget />

      {/* Scroll to Top */}
      <ScrollToTop />
    </>
  );
}

export default App;
```

---

## Hooks

### `src/hooks/useChat.ts`
```typescript
import { useState, useCallback, useRef } from 'react';
import type { ChatMessage } from '@/types/chat';
import { sendMessageToGemini } from '@/services/geminiService';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: '¡Hola! Soy KINA, el asistente virtual de KINETIA. ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios de automatización, optimización de inventarios, sistemas personalizados o entrenamiento de agentes IA.',
  timestamp: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    // Capturar mensajes actuales y agregar el mensaje del usuario
    let currentMessages: ChatMessage[] = [];
    setMessages(prev => {
      currentMessages = prev;
      return [...prev, userMessage];
    });

    try {
      // Filtrar mensaje de bienvenida para la API
      const messagesForAPI = [...currentMessages.filter(m => m.id !== 'welcome'), userMessage];
      const response = await sendMessageToGemini(messagesForAPI);

      const assistantMessage: ChatMessage = {
        id: `assistant-${crypto.randomUUID()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);

      const errorChatMessage: ChatMessage = {
        id: `error-${crypto.randomUUID()}`,
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
```

### `src/hooks/useSmoothScroll.ts`
```typescript
import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
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

    // Expose lenis to window for debugging and anchor links
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

---

## Servicios

### `src/services/geminiService.ts`
```typescript
import type { ChatMessage, GeminiContent, GeminiResponse } from '@/types/chat';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const REQUEST_TIMEOUT = 30000; // 30 segundos

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY no está configurada. El chat no funcionará.');
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

Información sobre los servicios:
- Automatización de Procesos: Transformamos tareas manuales en flujos automatizados, desde captura de datos hasta reportes.
- Optimización de Inventarios: Sistemas predictivos con IA que anticipan demanda y optimizan niveles de stock.
- Sistemas Personalizados: Desarrollo de software a medida (ERPs, apps especializadas) que se adapta a tus procesos.
- Agentic: Diseñamos y entrenamos agentes IA autónomos para tareas complejas.

Responde siempre en español, de forma profesional pero cercana. Sé conciso (máximo 2-3 párrafos cortos). Si no sabes algo específico, sugiere contactar al equipo o solicitar una demo.`;

function convertToGeminiFormat(messages: ChatMessage[]): GeminiContent[] {
  const contents: GeminiContent[] = [];

  // Add system instruction as first user message
  contents.push({
    role: 'user',
    parts: [{ text: SYSTEM_PROMPT }]
  });

  contents.push({
    role: 'model',
    parts: [{ text: '¡Entendido! Soy KINA, el asistente virtual de KINETIA. Estoy lista para ayudar a los visitantes con información sobre nuestros servicios de tecnología.' }]
  });

  // Add conversation history
  for (const msg of messages) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    });
  }

  return contents;
}

export async function sendMessageToGemini(messages: ChatMessage[]): Promise<string> {
  if (!API_KEY) {
    throw new Error('API key no configurada. Contacta al administrador.');
  }

  const contents = convertToGeminiFormat(messages);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Demasiadas solicitudes. Por favor, espera un momento e intenta de nuevo.');
      }
      if (response.status === 403) {
        throw new Error('Error de autenticación. Contacta al administrador.');
      }
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      throw new Error('Error al comunicarse con el asistente. Por favor, intenta de nuevo.');
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      throw new Error('Error del servicio. Por favor, intenta de nuevo.');
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No se recibió respuesta del asistente.');
    }

    const candidate = data.candidates[0];
    if (!candidate.content?.parts?.[0]?.text) {
      throw new Error('Respuesta inválida del asistente.');
    }

    return candidate.content.parts[0].text;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La solicitud tardó demasiado. Por favor, intenta de nuevo.');
      }
      throw error;
    }
    throw new Error('Error desconocido. Por favor, intenta de nuevo.');
  }
}
```

---

## Utilidades y Constantes

### `src/utils/constants.ts`
```typescript
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
```

---

## Estilos

### `src/styles/main.scss`
```scss
// ============================================ 
// MAIN STYLES
// Import order matters!
// ============================================ 

// Carbon Design System - White Theme
@use '@carbon/react/scss/themes';
@use '@carbon/react/scss/theme' with (
  $theme: themes.$white
);

// Abstracts (variables, mixins, animations)
@use 'abstracts/variables' as *;
@use 'abstracts/mixins' as *;
// animations se inyecta globalmente via vite.config.ts

// Base styles (reset, typography)
@use 'base/reset';
@use 'base/typography';

// ============================================ 
// GLOBAL UTILITIES
// ============================================ 

.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: $z-content;

  @include respond-to('md') {
    padding: 0 20px;
  }
}

// ============================================ 
// SECTION HELPERS
// ============================================ 

.section-header {
  text-align: center;
  margin-bottom: 70px;
}

.section-label {
  @include section-label;
}

.section-title {
  @include section-title;
}

.section-subtitle {
  @include section-subtitle;
}

// ============================================ 
// CLICK INSTRUCTION
// ============================================ 

.click-instruction {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: $border-radius-md;
  padding: 12px 20px;
  font-size: 12px;
  color: #8d8d8d;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: fadeSlideUp 0.5s ease forwards 2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  @include respond-to('md') {
    display: none;
  }
}

.click-instruction-icon {
  width: 24px;
  height: 24px;
  background: rgba(15, 98, 254, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### `src/styles/abstracts/_variables.scss`
```scss
// ============================================ 
// COLOR PALETTE - IBM Plex Light Theme
// ============================================ 

// Background colors (Light Theme)
$color-bg-primary: #ffffff;      // Pure white background
$color-bg-secondary: #f4f4f4;    // Light gray for sections
$color-bg-tertiary: #e0e0e0;     // Slightly darker gray
$color-bg-card: #ffffff;         // White cards
$color-bg-glass: rgba(255, 255, 255, 0.9);

// Terminal (keep dark for contrast)
$color-bg-terminal: #161616;
$color-bg-terminal-header: #262626;

// Border colors (Light Theme)
$color-border: #e0e0e0;          // Subtle light border
$color-border-hover: #c6c6c6;    // Darker on hover

// Text colors (Light Theme - High Contrast)
$color-text-primary: #161616;    // Near black
$color-text-secondary: #525252;  // Dark gray
$color-text-muted: #8d8d8d;      // Medium gray
$color-text-light: #ffffff;      // White (for dark backgrounds)

// Accent colors - IBM Blue
$color-accent-primary: #0f62fe;  // IBM Blue
$color-accent-primary-hover: #0353e9;  // Darker blue on hover
$color-accent-primary-glow: rgba(15, 98, 254, 0.2);
$color-accent-primary-subtle: rgba(15, 98, 254, 0.1);

// Secondary accent - Gray
$color-accent-secondary: #525252;  // Neutral gray
$color-accent-secondary-glow: rgba(82, 82, 82, 0.2);

// Teal accent (subtle use)
$color-accent-teal: #0f62fe;     // Use IBM blue consistently
$color-accent-teal-glow: rgba(15, 98, 254, 0.2);

// Support colors (IBM Design)
$color-success: #24a148;         // Green
$color-error: #da1e28;           // Red
$color-warning: #f1c21b;         // Yellow
$color-info: #0f62fe;            // Blue

// Aliases for backwards compatibility
$color-accent-orange: $color-accent-primary;
$color-accent-orange-hover: $color-accent-primary-hover;
$color-accent-orange-glow: $color-accent-primary-glow;
$color-accent-orange-subtle: $color-accent-primary-subtle;
$color-accent-cyan: $color-accent-teal;
$color-accent-cyan-glow: $color-accent-teal-glow;
$color-accent-purple: $color-accent-secondary;
$color-accent-purple-glow: $color-accent-secondary-glow;

// ============================================ 
// SHADOWS - Light Mode (Subtle)
// ============================================ 

$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
$shadow-xl: 0 12px 40px rgba(0, 0, 0, 0.15);

// ============================================ 
// TYPOGRAPHY
// ============================================ 

$font-display: 'IBM Plex Sans', sans-serif;
$font-body: 'IBM Plex Sans', sans-serif;
$font-mono: 'IBM Plex Sans', sans-serif;

// Font sizes - Semantic scale
$font-size-xs: 0.75rem;      // 12px - Labels, captions
$font-size-sm: 0.875rem;     // 14px - Small text, navigation
$font-size-base: 1rem;       // 16px - Body text
$font-size-md: 1.125rem;     // 18px - Lead paragraphs
$font-size-lg: 1.25rem;      // 20px - Subheadings
$font-size-xl: 1.5rem;       // 24px - Section subtitles
$font-size-2xl: 2rem;        // 32px - H3
$font-size-3xl: 2.5rem;      // 40px - H2
$font-size-4xl: 3rem;        // 48px - H1
$font-size-5xl: 3.5rem;      // 56px - Hero titles
$font-size-6xl: 4rem;        // 64px - Display

// Line heights
$line-height-tight: 1.1;
$line-height-snug: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.7;

// Font weights
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// ============================================ 
// SPACING
// ============================================ 

$section-padding: 120px;
$section-padding-mobile: 70px;
$container-max: 1200px;

// ============================================ 
// TRANSITIONS
// ============================================ 

$transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
$transition-medium: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
$transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
$transition-bounce: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

// ============================================ 
// BORDER RADIUS
// ============================================ 

$border-radius-sm: 8px;
$border-radius-md: 12px;
$border-radius-lg: 20px;
$border-radius-xl: 24px;

// ============================================ 
// BREAKPOINTS
// ============================================ 

$breakpoint-sm: 480px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1200px;

// ============================================ 
// Z-INDEX LAYERS
// ============================================ 

$z-background: 0;
$z-content: 1;
$z-header: 1000;
$z-cursor: 10000;
$z-loader: 10001;
```

---

## Componentes

### `src/components/layout/Header/Header.tsx`
```typescript
import { useState, useEffect } from 'react';
import { Container, RandomizedTextEffect, DemoModal } from '@/components/common';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <img src="/logo.png" alt="KINETIA" className={styles.logoIcon} />
            <RandomizedTextEffect text="KINETIA" />
          </a>

          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={styles.ctaButton}
            onClick={() => setIsDemoModalOpen(true)}
          >
            <span>Solicitar Diagnóstico</span>
          </button>
        </div>
      </Container>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </header>
  );
}
```

### `src/components/layout/Footer/Footer.tsx`
```typescript
import { Container } from '@/components/common';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          {/* Brand */}
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <img src="/logo.png" alt="KINETIA" className={styles.logoIcon} />
              KINETIA
            </a>
            <p className={styles.tagline}>
              Automatización inteligente y desarrollo de software a medida
            </p>
          </div>

          {/* Navigation */}
          <nav className={styles.nav}>
            <div className={styles.navGroup}>
              <h4>Navegación</h4>
              <div className={styles.navLinks}>
                <a href="#servicios">Servicios</a>
                <a href="#features">Características</a>
                <a href="#how-it-works">Proceso</a>
                <a href="#about">Nosotros</a>
                <a href="#contacto">Contacto</a>
              </div>
            </div>
          </nav>

          </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2025 KINETIA. Todos los derechos reservados.</p>
          <div className={styles.contact}>
            <a href="mailto:info@kinetia.com" className={styles.email}>info@kinetia.com</a>
            <span className={styles.separator}>·</span>
            <span className={styles.location}>Neuquén, Argentina</span>
          </div>
          <div className={styles.legal}>
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Uso</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

### `src/components/sections/Hero/Hero.tsx`
```typescript
import { Container } from '@/components/common';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Transforma tu Operación: <span className={styles.highlight}>Automatiza.</span>
          </motion.h1>

          <motion.h2
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Integración inteligente con tus sistemas actuales.
          </motion.h2>
        </div>
      </Container>
    </section>
  );
}
```

### `src/components/sections/Services/Services.tsx`
```typescript
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
    badge: 'Más solicitado',
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
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Subtle parallax - only Y movement, no opacity changes
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={styles.serviceSection}
      id={service.id}
      data-section-name={service.id}
      style={{ y }}
    >
      <Container>
        <SpotlightCard className={styles.serviceContent}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ width: '100%' }}
          >
            {service.badge && (
              <motion.div className={styles.popularBadge} variants={itemVariants}>
                <span className={styles.popularBadgePulse} />
                {service.badge}
              </motion.div>
            )}
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
    </motion.div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section className={styles.section} id="servicios">
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

      {/* CTA Estratégico */}
      <div className={styles.servicesCta}>
        <Container>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.ctaTitle}>¿No sabes por dónde empezar?</h3>
            <p className={styles.ctaText}>
              Solicita un diagnóstico gratuito y descubre qué procesos puedes automatizar
            </p>
            <button
              className={styles.ctaButton}
              onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solicitar diagnóstico gratis
              <span>→</span>
            </button>
          </motion.div>
        </Container>
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
```

### `src/components/sections/Contact/Contact.tsx`
```typescript
import { useState } from 'react';
import { Container, SendButton } from '@/components/common';
import styles from './Contact.module.scss';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', country: '', company: '', message: '' });
  };

  return (
    <section className={styles.section} id="contacto">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={styles.title}>
              <span className="text-gradient-animated">Hablemos</span>
            </h2>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 32 32" fill="currentColor">
                    <path d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z"/>
                  </svg>
                </span>
                <div>
                  <a href="mailto:info@kinetia.com" className={styles.contactValue}>info@kinetia.com</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16,18c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S18.8,18,16,18z"/>
                    <path d="M16,30l-8.4-9.9c0-0.1-0.3-0.5-0.3-0.5C5.8,17.7,5,15.4,5,13C5,6.9,9.9,2,16,2s11,4.9,11,11c0,2.4-0.8,4.7-2.2,6.6l0,0 c0,0-0.3,0.4-0.3,0.4L16,30z M8.8,18.4c0,0,0.2,0.3,0.3,0.4l6.9,8.1l6.9-8.1c0-0.1,0.3-0.4,0.3-0.4C24.4,16.8,25,15,25,13 c0-5-4-9-9-9s-9,4-9,9C7,15,7.6,16.8,8.8,18.4L8.8,18.4z"/>
                  </svg>
                </span>
                <div>
                  <span className={styles.contactValue}>Neuquén, Argentina</span>
                </div>
              </div>
            </div>

            <div className={styles.socialSection}>
              <span className={styles.socialTitle}>Seguínos</span>
              <div className={styles.socialLinks}>
                <a href="#" className={`${styles.socialLink} ${styles.youtube}`} aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.x}`} aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.linkedin}`} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.instagram}`} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Envíanos un mensaje</h3>
              <p className={styles.formSubtitle}>
                Responderemos en menos de 24 horas.
              </p>

              {submitted ? (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  <h4>¡Mensaje enviado!</h4>
                  <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                  <button
                    className={styles.resetButton}
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name">Nombre completo</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email">Correo electrónico</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-phone">Teléfono (opcional)</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-country">País</label>
                      <select
                        id="contact-country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecciona un país</option>
                        <option value="ES">España</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CL">Chile</option>
                        <option value="PE">Perú</option>
                        <option value="EC">Ecuador</option>
                        <option value="VE">Venezuela</option>
                        <option value="UY">Uruguay</option>
                        <option value="PY">Paraguay</option>
                        <option value="BO">Bolivia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="PA">Panamá</option>
                        <option value="GT">Guatemala</option>
                        <option value="HN">Honduras</option>
                        <option value="SV">El Salvador</option>
                        <option value="NI">Nicaragua</option>
                        <option value="DO">República Dominicana</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="CU">Cuba</option>
                        <option value="US">Estados Unidos</option>
                        <option value="BR">Brasil</option>
                        <option value="PT">Portugal</option>
                        <option value="FR">Francia</option>
                        <option value="DE">Alemania</option>
                        <option value="IT">Italia</option>
                        <option value="GB">Reino Unido</option>
                        <option value="OTHER">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-company">Empresa (opcional)</label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message">Mensaje</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      rows={4}
                      required
                    />
                  </div>

                  <SendButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </SendButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

### `src/components/common/ChatWidget/ChatWidget.tsx`
```typescript
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

### `src/components/common/ChatWidget/ChatPanel.tsx`
```typescript
import { useEffect } from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks';
import styles from './ChatWidget.module.scss';

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isLoading, sendMessage } = useChat();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.headerAvatar}>K</div>
          <div>
            <h3 className={styles.headerTitle}>KINA</h3>
            <span className={styles.headerSubtitle}>Asistente Virtual</span>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ChatMessages messages={messages} isLoading={isLoading} />

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
```

### `src/components/common/ChatWidget/ChatMessages.tsx`
```typescript
import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types/chat';
import styles from './ChatWidget.module.scss';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAssistant}`}
        >
          {message.role === 'assistant' && (
            <div className={styles.avatar}>K</div>
          )}
          <div className={styles.messageContent}>
            {message.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className={`${styles.message} ${styles.messageAssistant}`}>
          <div className={styles.avatar}>K</div>
          <div className={styles.messageContent}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
```

### `src/components/common/ChatWidget/ChatInput.tsx`
```typescript
import { useState, useCallback } from 'react';
import styles from './ChatWidget.module.scss';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value);
      setValue('');
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        className={styles.input}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className={styles.sendButton}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </form>
  );
}
```