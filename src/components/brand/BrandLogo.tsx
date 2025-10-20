import React from 'react';
import MonkeyMascot from './MonkeyMascot';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const getLogoContent = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className={`flex items-center justify-center ${className}`}>
            <MonkeyMascot size="sm" variant="default" />
          </div>
        );
      
      case 'text':
        return (
          <div className={`font-bold ${sizeClasses[size]} ${className}`}>
            <span className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">seven monkeys</span>
            <span className="text-pink-400 ml-2 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]">THE BAR</span>
          </div>
        );
      
      default: // full
        return (
          <div className={`flex items-center space-x-2 ${className}`}>
            <MonkeyMascot size="sm" variant="default" />
            <div className={`font-bold ${sizeClasses[size]}`}>
              <div className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">seven monkeys</div>
              <div className="text-pink-400 text-sm drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]">THE BAR</div>
            </div>
          </div>
        );
    }
  };

  return getLogoContent();
};

export default BrandLogo;
