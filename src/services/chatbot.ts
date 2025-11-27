const WEBHOOK_URL = 'https://n8n.tusolucionautomatica.com/webhook/1d3d29c8-6e4c-475e-a509-c7af6fb5527b';

export type ChatRole = 'user' | 'assistant';

export interface ChatHistoryEntry {
  role: ChatRole;
  text: string;
  timestamp: number;
}

const defaultFallback = 'No pude obtener una respuesta del asistente. Intenta nuevamente en unos segundos.';

export async function sendChatMessage(
  message: string,
  history: ChatHistoryEntry[] = []
): Promise<string> {
  const payload = {
    message,
    history,
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain;q=0.9,*/*;q=0.8',
    },
    body: JSON.stringify(payload),
  });

  const rawBody = await safeReadBody(response);

  if (!response.ok) {
    throw new Error(rawBody || `El webhook respondió con ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const trimmedBody = rawBody.trim();

  if (trimmedBody && contentType.includes('application/json')) {
    const data = safeParseJson(trimmedBody);
    const parsed = parseWebhookPayload(data);
    if (parsed) {
      return parsed;
    }
  }

  return trimmedBody || defaultFallback;
}

async function safeReadBody(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch (error) {
    console.error('No se pudo leer el texto de la respuesta:', error);
    return '';
  }
}

const safeParseJson = (payload: string): unknown => {
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    console.warn('La respuesta no contenía JSON válido:', error);
    return null;
  }
};

function parseWebhookPayload(payload: unknown): string | null {
  if (!payload) {
    return null;
  }

  if (typeof payload === 'string') {
    return payload.trim() || null;
  }

  if (typeof payload === 'object') {
    if (
      'reply' in payload &&
      typeof (payload as { reply: unknown }).reply === 'string'
    ) {
      return ((payload as { reply: string }).reply || '').trim() || null;
    }

    if (
      'message' in payload &&
      typeof (payload as { message: unknown }).message === 'string'
    ) {
      return ((payload as { message: string }).message || '').trim() || null;
    }

    if (
      'text' in payload &&
      typeof (payload as { text: unknown }).text === 'string'
    ) {
      return ((payload as { text: string }).text || '').trim() || null;
    }

    if (Array.isArray(payload)) {
      for (const item of payload) {
        const parsed = parseWebhookPayload(item);
        if (parsed) {
          return parsed;
        }
      }
    }
  }

  return null;
}
