import { useState, useEffect } from 'react';
import styles from './PageLoader.module.scss';

export function PageLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 600);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className={`${styles.pageLoader} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <p className={styles.text}>Inicializando...</p>
      </div>
    </div>
  );
}
