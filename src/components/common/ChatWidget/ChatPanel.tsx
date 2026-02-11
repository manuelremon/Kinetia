'use client';

import { useEffect, useState } from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks';
import styles from './ChatWidget.module.scss';

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleRetry = () => {
    setShowError(false);
    clearChat();
  };

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

      {showError && error && (
        <div className={styles.errorBanner} role="alert">
          <span>No se pudo conectar con KINA. Verifica tu conexión.</span>
          <button onClick={handleRetry} className={styles.retryButton}>Reiniciar chat</button>
        </div>
      )}

      <ChatMessages messages={messages} isLoading={isLoading} />

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
