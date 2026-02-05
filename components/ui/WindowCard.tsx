import React from 'react';

interface WindowCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

const WindowCard: React.FC<WindowCardProps> = ({ 
  title = "untitled.html", 
  children, 
  className = "",
  headerClassName = "bg-vivid-pink"
}) => {
  return (
    <div className={`flex flex-col border-2 border-black bg-white shadow-retro-lg ${className}`}>
      {/* Window Header */}
      <div className={`relative flex items-center border-b-2 border-black px-3 py-2 ${headerClassName}`}>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full border border-black bg-white"></div>
          <div className="h-3 w-3 rounded-full border border-black bg-transparent"></div>
        </div>
        <div className="mx-auto font-mono text-xs font-bold tracking-tight text-black opacity-80 uppercase truncate px-2 relative z-10">
          {title}
        </div>
        {/* Placeholder for spacing balance */}
        <div className="w-8"></div>

        {/* Animated Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-black/5">
           <div className="h-full w-1/5 bg-white/60 animate-scan"></div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="relative flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default WindowCard;