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
          className={`${styles.message} ${
            message.role === 'user' ? styles.messageUser : styles.messageAssistant
          }`}
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
