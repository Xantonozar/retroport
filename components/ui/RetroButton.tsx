import React from 'react';
import { soundEffects } from '../../utils/soundEffects';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  fullWidth?: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseStyles = "relative font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-retro disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-retro disabled:animate-pulse";
  
  const variants = {
    primary: "bg-vivid-yellow text-black shadow-retro hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-retro-lg hover:bg-yellow-400 disabled:hover:bg-vivid-yellow",
    secondary: "bg-black text-white shadow-retro hover:bg-gray-800 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-retro-lg disabled:hover:bg-black",
    accent: "bg-vivid-pink text-black shadow-retro hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-retro-lg hover:bg-pink-300 disabled:hover:bg-vivid-pink",
    outline: "bg-transparent text-black shadow-retro hover:bg-black hover:text-white hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-retro-lg disabled:hover:bg-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.disabled) {
      soundEffects.playClick();
    }
    onClick?.(e);
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} px-6 py-3 ${className}`}
      onClick={handleClick}
      onMouseEnter={() => soundEffects.playHover()}
      {...props}
    >
      {children}
    </button>
  );
};

export default RetroButton;