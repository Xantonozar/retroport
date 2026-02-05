import React from 'react';

const Scanlines: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {/* Scanline pattern */}
      <div 
        className="absolute inset-0 bg-scanlines opacity-[0.03]" 
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
          backgroundSize: '100% 4px'
        }}
      ></div>
      {/* Slow flicker animation */}
      <div className="absolute inset-0 bg-white opacity-[0.02] animate-flicker"></div>
    </div>
  );
};

export default Scanlines;