import React from 'react';

interface MonkeyMascotProps {
  variant?: 'default' | 'dj' | 'bartender' | 'pool-party' | 'mexican-night' | 'soulful' | 'lazy-sunday';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MonkeyMascot: React.FC<MonkeyMascotProps> = ({ 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const getMonkeySVG = () => {
    switch (variant) {
      case 'dj':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* DJ headphones */}
            <ellipse cx="50" cy="40" rx="30" ry="15" fill="#00BCD4" stroke="#FFD700" strokeWidth="2" />
            {/* Headphone band */}
            <path d="M20 40 Q50 25 80 40" stroke="#00BCD4" strokeWidth="3" fill="none" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Smile */}
            <path d="M40 50 Q50 60 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Sound waves */}
            <path d="M85 35 Q90 40 85 45" stroke="#FF6B6B" strokeWidth="2" fill="none" />
            <path d="M90 30 Q95 40 90 50" stroke="#FF6B6B" strokeWidth="2" fill="none" />
          </svg>
        );
      
      case 'bartender':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Bartender hat */}
            <ellipse cx="50" cy="30" rx="20" ry="8" fill="#FF6B6B" />
            <rect x="30" y="30" width="40" height="15" fill="#FF6B6B" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Smile */}
            <path d="M40 50 Q50 60 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Cocktail glass */}
            <path d="M70 60 L70 80 L75 80 L75 60" stroke="#00BCD4" strokeWidth="2" fill="none" />
            <path d="M65 60 L80 60" stroke="#00BCD4" strokeWidth="2" fill="none" />
            <circle cx="72.5" cy="55" r="3" fill="#FFD700" />
          </svg>
        );
      
      case 'pool-party':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Swimming goggles */}
            <ellipse cx="50" cy="40" rx="20" ry="8" fill="#00BCD4" stroke="#FFD700" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Smile */}
            <path d="M40 50 Q50 60 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Pool float */}
            <circle cx="50" cy="75" r="15" fill="#FF6B6B" stroke="#FFD700" strokeWidth="2" />
            {/* Water drops */}
            <circle cx="30" cy="30" r="2" fill="#00BCD4" />
            <circle cx="70" cy="25" r="2" fill="#00BCD4" />
          </svg>
        );
      
      case 'mexican-night':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Sombrero */}
            <ellipse cx="50" cy="25" rx="25" ry="8" fill="#FFD700" />
            <path d="M25 25 Q50 15 75 25" stroke="#FF6B6B" strokeWidth="3" fill="none" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Smile */}
            <path d="M40 50 Q50 60 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Mustache */}
            <path d="M45 45 Q50 48 55 45" stroke="#8B4513" strokeWidth="3" fill="none" />
          </svg>
        );
      
      case 'soulful':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Jazz hat */}
            <ellipse cx="50" cy="30" rx="15" ry="6" fill="#8A2BE2" />
            <rect x="35" y="30" width="30" height="12" fill="#8A2BE2" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Contemplative expression */}
            <path d="M40 50 Q50 55 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Musical notes */}
            <circle cx="75" cy="35" r="2" fill="#FFD700" />
            <path d="M77 35 L77 25" stroke="#FFD700" strokeWidth="2" />
            <path d="M75 25 Q80 20 85 25" stroke="#FFD700" strokeWidth="2" fill="none" />
          </svg>
        );
      
      case 'lazy-sunday':
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Sleepy eyes */}
            <path d="M40 38 Q42 40 44 38" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M56 38 Q58 40 60 38" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Gentle smile */}
            <path d="M40 50 Q50 55 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Tea cup */}
            <path d="M70 60 L70 75 L75 75 L75 60" stroke="#00BCD4" strokeWidth="2" fill="none" />
            <path d="M65 60 L80 60" stroke="#00BCD4" strokeWidth="2" fill="none" />
            {/* Steam */}
            <path d="M72 55 Q74 50 72 45" stroke="#FFD700" strokeWidth="1" fill="none" />
            <path d="M73 55 Q75 50 73 45" stroke="#FFD700" strokeWidth="1" fill="none" />
          </svg>
        );
      
      default:
        return (
          <svg viewBox="0 0 100 100" className={`${sizeClasses[size]} ${className}`}>
            {/* Monkey head */}
            <circle cx="50" cy="45" r="25" fill="#8B4513" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="#FFD700" />
            <circle cx="58" cy="40" r="3" fill="#FFD700" />
            {/* Smile */}
            <path d="M40 50 Q50 60 60 50" stroke="#FFD700" strokeWidth="2" fill="none" />
            {/* Ears */}
            <circle cx="35" cy="35" r="8" fill="#8B4513" />
            <circle cx="65" cy="35" r="8" fill="#8B4513" />
          </svg>
        );
    }
  };

  return getMonkeySVG();
};

export default MonkeyMascot;
