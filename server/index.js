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
      (value.startsWith("'") && value.endsWith("'"))
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
