'use client';

import { useState, useCallback } from 'react';
import { chatWithKina } from '@app/actions';
import type { ChatMessage, GeminiContent } from '@/types/chat';

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

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);
    
    // 1. Optimistic Update (Mostrar mensaje del usuario inmediatamente)
    const userMsg: ChatMessage = { 
        role: 'user', 
        content: content.trim(), 
        id: `user-${Date.now()}`,
        timestamp: Date.now()
    };
    
    let currentMessages: ChatMessage[] = [];
    setMessages(prev => {
        currentMessages = prev;
        return [...prev, userMsg];
    });

    try {
        // 2. Llamada a Server Action (Directa, sin fetch)
        // Convertimos el historial al formato que espera Gemini
        const historyForAi: GeminiContent[] = currentMessages
          .filter(m => m.id !== 'welcome')
          .map(m => ({
            role: m.role === 'user' ? ('user' as const) : ('model' as const),
            parts: [{ text: m.content }]
          }));

        const response = await chatWithKina(historyForAi, content);
    
        if (response.success && response.text) {
             const assistantMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: response.text,
                timestamp: Date.now(),
            };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Manejo de errores
          throw new Error(response.error || 'Error desconocido');
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Lo siento, hubo un error de conexión.';
        setError(errorMessage);
        setMessages(prev => [
            ...prev, 
            { role: 'assistant', content: errorMessage, id: `error-${Date.now()}`, timestamp: Date.now() }
          ]);
    } finally {
        setIsLoading(false);
    }
    
  }, []);
  
  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}