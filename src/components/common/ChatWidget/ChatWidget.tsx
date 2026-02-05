'use client';

import { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import styles from './ChatWidget.module.scss';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.widget}>
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
