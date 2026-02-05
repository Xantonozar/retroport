import React from 'react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import RetroButton from './ui/RetroButton';
import { User, Heart, Coffee, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section id="about" className="w-full bg-vivid-green py-24 border-b-2 border-black relative overflow-hidden">
      {/* Decorative Binary Background */}
      <div className="absolute inset-0 font-mono text-[10px] text-black opacity-[0.03] select-none pointer-events-none break-all leading-tight p-4">
        {Array(100).fill("010110100010101011110001010101010110").join(" ")}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column - Image/Avatar */}
            <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative group">
                    <div className="absolute inset-0 bg-black translate-x-6 translate-y-6 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
                    <div className="relative border-4 border-black bg-white p-2 w-72 h-72 sm:w-96 sm:h-96 overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000" 
                            alt="Profile" 
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-110"
                        />
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-scanlines"></div>
                        <div className="absolute top-4 left-4 bg-vivid-yellow border-2 border-black px-2 py-1 font-mono text-xs font-black shadow-retro">UNIT_01</div>
                    </div>
                </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="w-full lg:w-3/5">
                <div className="mb-8">
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">System Identity</h2>
                  <div className="h-2 w-32 bg-black"></div>
                </div>

                <WindowCard title="identity.txt" className="shadow-retro-xl" headerClassName="bg-vivid-purple">
                    <div className="p-8 bg-white font-mono text-base leading-relaxed space-y-8">
                        <p className="text-xl font-black border-l-8 border-black pl-6 py-2">
                           &gt; Status: <span className="bg-vivid-yellow px-2">ONLINE</span><br/>
                           &gt; Location: <span className="underline">RETRO_SECTOR_7</span>
                        </p>
                        
                        <p className="font-bold">
                            I'm a creative developer obsessed with raw pixels and brutalist design. I build modern experiences that feel like high-performance workstations from 1999.
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-vivid-pink transition-colors shadow-retro cursor-default group">
                                <Coffee size={24} className="group-hover:rotate-12 transition-transform" />
                                <span className="font-black text-[10px] uppercase">Fuel_Ready</span>
                            </div>
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-vivid-blue transition-colors shadow-retro cursor-default group">
                                <Heart size={24} className="group-hover:scale-125 transition-transform" />
                                <span className="font-black text-[10px] uppercase">Pixel_Perfect</span>
                            </div>
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-vivid-yellow transition-colors shadow-retro cursor-default group sm:col-span-1 col-span-2">
                                <Cpu size={24} className="group-hover:animate-pulse" />
                                <span className="font-black text-[10px] uppercase">Core_System</span>
                            </div>
                        </div>

                        <div className="pt-8 border-t-2 border-dashed border-gray-300 flex flex-col sm:flex-row gap-6">
                           <RetroButton 
                             onClick={() => navigate('/about')}
                             className="flex-1 flex items-center justify-center gap-2 group"
                           >
                              <Terminal size={20} strokeWidth={3} />
                              <span className="text-lg">Full Diagnostics</span>
                              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                           </RetroButton>
                           
                           <div className="flex-1 font-mono text-[10px] text-gray-500 flex items-center">
                              // Click diagnostics for detailed skill matrix and archival logs.
                           </div>
                        </div>
                    </div>
                </WindowCard>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;