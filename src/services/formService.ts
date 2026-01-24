const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function extractErrorMessage(response: Response) {
  try {
    const data = await response.json();
    if (data?.error) {
      return data.error;
    }
  } catch {
    return null;
  }
  return null;
}

async function postJson(path: string, payload: unknown) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    if (message) {
      throw new Error(message);
    }
    throw new Error('No se pudo enviar el formulario. Intenta de nuevo.');
  }

  return response.json().catch(() => ({}));
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
}

export interface DemoFormPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export async function submitContactForm(payload: ContactFormPayload) {
  await postJson('/api/contact', payload);
}

export async function submitDemoRequest(payload: DemoFormPayload) {
  await postJson('/api/demo', payload);
}
