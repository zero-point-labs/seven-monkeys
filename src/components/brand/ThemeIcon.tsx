import React from 'react';

interface ThemeIconProps {
  type: 'play' | 'pause' | 'volume' | 'mute' | 'upload' | 'delete' | 'edit' | 'save' | 'home' | 'music' | 'admin' | 'menu' | 'contact' | 'events' | 'cocktail' | 'food' | 'banana' | 'pool' | 'mexican' | 'soulful' | 'lazy' | 'stop' | 'external-link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({ 
  type, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const getIconSVG = () => {
    const baseClasses = `${sizeClasses[size]} ${className}`;
    
    switch (type) {
      case 'play':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        );
      
      case 'pause':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        );
      
      case 'volume':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        );
      
      case 'mute':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        );
      
      case 'upload':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            <path d="M12,12L16,16H13.5V19H10.5V16H8L12,12Z"/>
          </svg>
        );
      
      case 'delete':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
          </svg>
        );
      
      case 'edit':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
          </svg>
        );
      
      case 'save':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
          </svg>
        );
      
      case 'home':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
        );
      
      case 'music':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13A4,4 0 0,0 6,17A4,4 0 0,0 10,21A4,4 0 0,0 14,17V7H18V3H12Z"/>
          </svg>
        );
      
      case 'admin':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
          </svg>
        );
      
      case 'menu':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
          </svg>
        );
      
      case 'contact':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/>
          </svg>
        );
      
      case 'events':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
          </svg>
        );
      
      case 'cocktail':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z"/>
          </svg>
        );
      
      case 'food':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53C16.22,12.87 16.22,15.1 14.88,16.44L13.79,15.35L12.71,14.27L13.79,13.18L14.88,11.53M14.88,5.64L13.79,6.73L12.71,7.81L13.79,8.9L14.88,5.64M14.88,1.75L13.79,2.84L12.71,3.92L13.79,5L14.88,1.75M10.93,4.5L3.91,11.5C2.35,13.07 2.35,15.6 3.91,17.16L8.1,13.34L10.93,4.5Z"/>
          </svg>
        );
      
      case 'banana':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        );
      
      case 'pool':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,2C6.48,2 2,6.48 2,12S6.48,22 12,22 22,17.52 22,12 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12S7.59,4 12,4 20,7.59 20,12 16.41,20 12,20M12,6C8.69,6 6,8.69 6,12S8.69,18 12,18 18,15.31 18,12 15.31,6 12,6M12,16C9.79,16 8,14.21 8,12S9.79,8 12,8 16,9.79 16,12 14.21,16 12,16Z"/>
          </svg>
        );
      
      case 'mexican':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
          </svg>
        );
      
      case 'soulful':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
          </svg>
        );
      
      case 'lazy':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        );
      
      case 'stop':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M6,6H18V18H6V6Z"/>
          </svg>
        );
      
      case 'external-link':
        return (
          <svg viewBox="0 0 24 24" className={baseClasses} fill="currentColor">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return getIconSVG();
};

export default ThemeIcon;
