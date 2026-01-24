import React from 'react';
import styles from './SliceButton.module.scss';

interface SliceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  href?: string;
  onClick?: () => void;
}

export function SliceButton({ children, className = '', href, onClick, ...props }: SliceButtonProps) {
  if (href) {
    return (
      <a 
        href={href} 
        className={`${styles.sliceBtn} ${className}`} 
        data-content={children}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={`${styles.sliceBtn} ${className}`} 
      data-content={children} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}