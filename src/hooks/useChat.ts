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
