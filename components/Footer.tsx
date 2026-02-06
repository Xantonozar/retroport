import React, { useState, useEffect } from 'react';
import { Twitter, Github, Linkedin, Mail, Power, Terminal, Activity, Database, Cpu } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import { soundEffects } from '../utils/soundEffects';
import TetrisAnimation from './ui/TetrisAnimation';
import gsap from 'gsap';

const Footer: React.FC = () => {
  const [uptime, setUptime] = useState(0);
  const [logs, setLogs] = useState<string[]>(['INITIALIZING_FOOTER_PROTOCOLS...']);

  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    const logInterval = setInterval(() => {
        const mockLogs = [
            'PINGING_SECTOR_7...',
            'RENDER_BLOCK_COMPLETE',
            'UPDATING_SOCIAL_BUFFER',
            'MEMORY_FLUSH_SUCCESS',
            'SCANNING_FOR_GHOST_PIXELS...',
            'RETRO_OVERRIDE_ACTIVE'
        ];
        setLogs(prev => [mockLogs[Math.floor(Math.random() * mockLogs.length)], ...prev].slice(0, 5));
    }, 4000);

    return () => {
        clearInterval(timer);
        clearInterval(logInterval);
    };
  }, []);
  
  const handleReboot = () => {
    soundEffects.playClick();
    
    // Clear boot flag so user sees the boot screen again
    sessionStorage.removeItem('hasBooted');

    // Create the overlay container
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center font-mono text-green-500 p-10 overflow-hidden select-none';
    
    // CRT Effect Layer
    const crt = document.createElement('div');
    crt.className = 'absolute inset-0 pointer-events-none opacity-20';
    crt.style.background = 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))';
    crt.style.backgroundSize = '100% 2px, 3px 100%';
    overlay.appendChild(crt);

    // Terminal container
    const terminal = document.createElement('div');
    terminal.className = 'w-full max-w-2xl space-y-2';
    overlay.appendChild(terminal);

    document.body.appendChild(overlay);

    const shutdownLogs = [
        "TERMINATING_SESSIONS...",
        "DUMPING_MEMORY_BUFFER...",
        "RELEASING_GRAPHICS_DRIVERS...",
        "FLUSHING_CACHE...",
        "SYSTEM_HALTED.",
        "REBOOTING_IN_3...",
        "REBOOTING_IN_2...",
        "REBOOTING_IN_1..."
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
        if (logIndex < shutdownLogs.length) {
            const logLine = document.createElement('div');
            logLine.innerHTML = `<span class="text-green-800 mr-2">></span> ${shutdownLogs[logIndex]}`;
            terminal.appendChild(logLine);
            logIndex++;
            soundEffects.playClick();
        } else {
            clearInterval(logInterval);
            
            // Dramatic CRT Shutdown Animation
            const tl = gsap.timeline({
                onComplete: () => {
                    window.location.reload();
                }
            });

            // 1. Horizontal collapse
            tl.to(overlay, {
                scaleY: 0.005,
                duration: 0.4,
                ease: "power4.inOut",
                backgroundColor: "#fff" // Flash white briefly
            });

            // 2. Vertical collapse to a point
            tl.to(overlay, {
                scaleX: 0,
                duration: 0.3,
                ease: "power4.in",
                backgroundColor: "#000"
            });
        }
    }, 200);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <footer className="relative border-t-4 border-black bg-white text-black overflow-hidden">
      {/* Dynamic Tetris Background */}
      <TetrisAnimation />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            
            {/* Column 1: System Monitor */}
            <div className="flex flex-col gap-4 border-4 border-black p-6 bg-retro-bg shadow-retro relative">
                <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black font-mono text-xs font-bold uppercase">
                    Status_Monitor
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-sm">
                        <span className="flex items-center gap-2"><Activity size={14} /> UPTIME:</span>
                        <span className="font-bold text-vivid-pink">{formatTime(uptime)}</span>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
                            <span>CPU_LOAD</span>
                            <span>42%</span>
                        </div>
                        <div className="h-4 w-full border-2 border-black bg-white p-0.5">
                            <div className="h-full w-[42%] bg-vivid-blue animate-pulse"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
                            <span>RAM_USAGE</span>
                            <span>128kb</span>
                        </div>
                        <div className="h-4 w-full border-2 border-black bg-white p-0.5">
                            <div className="h-full w-[65%] bg-vivid-yellow"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2: System Logs (Terminal) */}
            <div className="flex flex-col border-4 border-black bg-black p-4 shadow-retro min-h-[160px]">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2 mb-2">
                    <Terminal size={14} className="text-green-500" />
                    <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">System_Console</span>
                </div>
                <div className="flex-1 font-mono text-[10px] text-green-500 space-y-1 overflow-hidden">
                    {logs.map((log, i) => (
                        <div key={i} className={i === 0 ? 'animate-pulse' : 'opacity-60'}>
                            {`> ${log}`}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </div>

            {/* Column 3: Social Connectivity */}
            <div className="flex flex-col justify-between border-4 border-black p-6 bg-pastel-pink shadow-retro relative">
                <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black font-mono text-xs font-bold uppercase">
                    Connect_UI
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="group flex items-center justify-center h-12 border-2 border-black bg-white shadow-retro hover:bg-vivid-blue transition-colors">
                        <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="group flex items-center justify-center h-12 border-2 border-black bg-white shadow-retro hover:bg-vivid-purple transition-colors">
                        <Github size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="group flex items-center justify-center h-12 border-2 border-black bg-white shadow-retro hover:bg-vivid-pink transition-colors">
                        <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="group flex items-center justify-center h-12 border-2 border-black bg-white shadow-retro hover:bg-vivid-green transition-colors">
                        <Mail size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                </div>
                <p className="mt-4 text-[10px] font-mono text-center text-gray-600">ENCRYPTED_PORT: 8080</p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between border-t-2 border-black pt-8 md:flex-row gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black text-black flex items-center gap-2">
                <Cpu size={20} /> Zadid's Portfolio
              </h3>
              <p className="font-mono text-[10px] font-bold text-gray-500 mt-1 uppercase">
                Est. 1999 • Built with nostalgic pixels and React
              </p>
            </div>
            
            <button 
              onClick={handleReboot}
              onMouseEnter={() => soundEffects.playHover()}
              className="group flex items-center gap-3 border-4 border-black bg-vivid-yellow px-6 py-2 font-mono text-xs font-black uppercase tracking-widest text-black shadow-retro-lg hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:shadow-retro-xl active:translate-y-0 transition-all"
            >
              <Power size={16} className="group-hover:animate-pulse" />
              <span>Emergency Reboot</span>
            </button>
            
            <div className="font-mono text-[10px] text-gray-400">
               © 2024 DESIGN_CORE_V2.0
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Retro Circuit Pattern Strip */}
      <div className="h-2 w-full bg-black flex overflow-hidden">
         {Array.from({length: 20}).map((_, i) => (
             <div key={i} className={`h-full flex-1 border-r border-gray-800 ${i % 3 === 0 ? 'bg-vivid-pink/20' : ''}`}></div>
         ))}
      </div>
    </footer>
  );
};

export default Footer;