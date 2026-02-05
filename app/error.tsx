'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      background: '#ffffff'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#161616', marginBottom: '1rem' }}>
        Oops, algo salió mal
      </h1>
      <p style={{ fontSize: '1rem', color: '#525252', marginBottom: '2rem' }}>
        {error.message || 'Parece que ocurrió un error inesperado'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 24px',
          background: '#0f62fe',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
