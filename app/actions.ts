'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { checkRateLimit } from '@/utils/rate-limit';
import type { GeminiContent } from '@/types/chat';

// Configuración Singleton del Cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Resend client (lazy — only created if key exists)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

async function getClientIp(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim()
    || h.get('x-real-ip')
    || 'unknown';
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
  // Rate limit: 20 req/min por IP
  const ip = await getClientIp();
  const rl = checkRateLimit(`chat:${ip}`, { maxRequests: 20, windowMs: 60_000 });
  if (!rl.allowed) {
    return { success: false, error: 'Demasiadas solicitudes. Intenta de nuevo en unos segundos.' };
  }

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
  // Rate limit: 3 req/5min por IP
  const ip = await getClientIp();
  const rl = checkRateLimit(`contact:${ip}`, { maxRequests: 3, windowMs: 5 * 60_000 });
  if (!rl.allowed) {
    return { success: false, error: 'Has enviado demasiados formularios. Intenta de nuevo en unos minutos.' };
  }

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

    // 3. Enviar email con Resend
    if (resend) {
      const contactEmail = process.env.CONTACT_EMAIL || 'info@kinetia.com';
      await resend.emails.send({
        from: 'KINETIA Web <onboarding@resend.dev>',
        to: contactEmail,
        subject: `Nuevo contacto: ${validData.name}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 32px;">
            <div style="background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <h2 style="margin: 0 0 24px; color: #0f62fe; font-size: 20px;">Nuevo mensaje de contacto</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #6b7280; width: 120px;">Nombre</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-weight: 500;">${validData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #6b7280;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;"><a href="mailto:${validData.email}" style="color: #0f62fe;">${validData.email}</a></td>
                </tr>
                ${validData.phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #6b7280;">Teléfono</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${validData.phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; vertical-align: top;">Mensaje</td>
                  <td style="padding: 12px 0; color: #1a1a1a; line-height: 1.6;">${validData.message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Enviado desde kinetia.tech</p>
          </div>
        `,
        replyTo: validData.email,
      });
    } else {
      // Fallback: log to console when Resend is not configured
      console.log('Contact form received (Resend not configured):', validData);
    }

    return { success: true, message: 'Formulario enviado exitosamente' };
  } catch (error) {
    console.error('Contact Form Error:', error);
    return { success: false, error: 'Error al procesar el formulario' };
  }
}
