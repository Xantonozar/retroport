import React, { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../../utils/soundEffects';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "BIOS DATE 01/01/99 14:22:55 VER 1.0.2",
    "CPU: INTEL 80486, SPEED: 66 MHz",
    "640K RAM SYSTEM... OK",
    "VIDEO ADAPTER... INITIALIZED",
    "LOADING KERNEL...",
    "MOUNTING VOLUMES...",
    "LOADING UI ASSETS...",
    "EXECUTING PORTFOLIO.EXE...",
    "WELCOME USER."
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    // Play a sound when boot starts (optional/subtle)
    // soundEffects.playClick(); 

    const interval = setInterval(() => {
      if (currentIndex >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait a bit after last line
        return;
      }

      setLines(prev => [...prev, bootSequence[currentIndex]]);
      
      // Auto scroll to bottom
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      
      // Randomize typing speed slightly
      currentIndex++;
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-start justify-start bg-black p-8 font-mono text-lg md:text-xl font-bold text-green-500 antialiased cursor-wait">
      <div ref={scrollRef} className="w-full max-w-3xl space-y-2 overflow-hidden">
        {lines.map((line, index) => (
          <div key={index} className="animate-in fade-in duration-100">
            <span className="mr-2 text-green-700">{`>`}</span>
            {line}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-xs text-green-800 uppercase tracking-widest">
        Memory Test: 65536KB OK
      </div>
    </div>
  );
};

export default BootScreen;