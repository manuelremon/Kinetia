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
