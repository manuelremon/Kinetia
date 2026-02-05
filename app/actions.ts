'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import type { GeminiContent } from '@/types/chat';

// Configuración Singleton del Cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Esquema de Validación para GeminiContent
const GeminiContentSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(z.object({ text: z.string() }))
});

// Esquema para Contact Form
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

Información sobre los servicios:
- Automatización de Procesos: Transformamos tareas manuales en flujos automatizados, desde captura de datos hasta reportes.
- Optimización de Inventarios: Sistemas predictivos con IA que anticipan demanda y optimizan niveles de stock.
- Sistemas Personalizados: Desarrollo de software a medida (ERPs, apps especializadas) que se adapta a tus procesos.
- Agentic: Diseñamos y entrenamos agentes IA autónomos para tareas complejas.

Responde siempre en español, de forma profesional pero cercana. Sé conciso (máximo 2-3 párrafos cortos). Si no sabes algo específico, sugiere contactar al equipo o solicitar una demo.`;

export async function chatWithKina(history: GeminiContent[], newMessage: string): Promise<ChatResponse> {
  if (!process.env.GEMINI_API_KEY) {
    console.error('API Key missing');
    return { success: false, error: 'Server Config Error: API Key missing' };
  }

  // Validar que newMessage sea un string válido
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
    // 1. Extraer datos del formulario
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      message: formData.get('message'),
    };

    // 2. Validar con Zod
    const validation = ContactFormSchema.safeParse(rawData);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validación fallida: ${errors}` };
    }

    const validData: ContactFormData = validation.data;

    // 3. Enviar a webhook (Zapier/Slack/etc)
    // TODO: Implementar envío real
    console.log('Server Action: Contact Form received and validated', validData);

    // Simulación de envío
    // const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(validData),
    //   });
    // }

    return { success: true, message: 'Formulario enviado exitosamente' };
  } catch (error) {
    console.error('Contact Form Error:', error);
    return { success: false, error: 'Error al procesar el formulario' };
  }
}
