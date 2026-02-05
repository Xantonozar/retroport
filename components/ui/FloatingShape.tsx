import React from 'react';

interface FloatingShapeProps {
  shape?: 'circle' | 'square' | 'diamond';
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ 
  shape = 'circle', 
  color = 'bg-black', 
  size = 40, 
  className = '',
  delay = 0 
}) => {
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-none',
    diamond: 'rotate-45 rounded-sm',
  };
  
  return (
    <div 
      className={`absolute pointer-events-none z-0 ${delay > 0 ? 'animate-float-delayed' : 'animate-float'} opacity-80 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${shapeStyles[shape] || ''} ${color} ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default FloatingShape;