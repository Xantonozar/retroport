import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Heart, Coffee, Cpu, Code, Layers, Globe, Star, GraduationCap, Terminal, Activity, HardDrive, Shield, Zap } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import RetroButton from './ui/RetroButton';
import { soundEffects } from '../utils/soundEffects';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skills = {
    frontend: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'],
    backend: ['Node.js', 'PostgreSQL', 'Firebase', 'GraphQL'],
    design: ['Figma', 'Adobe CC', 'Blender', 'UI/UX']
  };

  const experience = [
    {
      role: 'Senior Creative Dev',
      company: 'Digital Dreams Ltd.',
      period: '2022 - Present',
      description: 'Leading the frontend team in building immersive web experiences.'
    },
    {
      role: 'Frontend Engineer',
      company: 'RetroSystems Inc.',
      period: '2019 - 2022',
      description: 'Developed high-performance e-commerce platforms with 90s flair.'
    }
  ];

  useGSAP(() => {
    // Parallax for decorative elements
    gsap.to('.decor-shape', {
      y: (i) => (i + 1) * -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    // Glitch entrance for windows
    const windows = gsap.utils.toArray('.window-glitch');
    windows.forEach((win: any) => {
      gsap.from(win, {
        x: -50,
        opacity: 0,
        skewX: 10,
        duration: 0.8,
        scrollTrigger: {
          trigger: win,
          start: 'top 85%',
        }
      });
    });

    // Animate CPU monitor bars on scroll
    gsap.to('.cpu-bar', {
      width: '95%',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, { scope: containerRef });

  const playDiskSound = () => {
    soundEffects.playClick();
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid & Decor */}
      <div className="fixed inset-0 bg-grid opacity-10 pointer-events-none"></div>
      <div className="decor-shape absolute top-20 right-10 w-32 h-32 border-8 border-vivid-pink rotate-12 opacity-20"></div>
      <div className="decor-shape absolute bottom-40 left-10 w-48 h-48 border-8 border-vivid-blue -rotate-12 opacity-20 rounded-full"></div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Navigation / Path Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <Link to="/" onClick={() => soundEffects.playMenuClose()} className="group inline-flex items-center gap-2 font-mono text-sm font-black uppercase tracking-wider hover:text-vivid-pink transition-colors">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={18} />
            </div>
            <span className="text-black text-lg">C:\EXIT_TO_HOME</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-sm font-black bg-black text-white px-6 py-3 border-2 border-black shadow-retro-lg">
            <Terminal size={16} className="text-vivid-green" />
            <span className="glitch" data-text="C:\MAC_OS\SYSTEM\ABOUT_ME.EXE">C:\MAC_OS\SYSTEM\ABOUT_ME.EXE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Diagnostics Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <WindowCard title="sys_monitor.dat" headerClassName="bg-vivid-blue">
              <div className="p-6 bg-white space-y-6">
                <div className="relative border-4 border-black p-2 shadow-retro group">
                  <img 
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400" 
                    alt="Profile" 
                    className="w-full grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black text-vivid-green px-2 py-1 text-[10px] font-mono animate-pulse">LIVE_FEED</div>
                </div>

                <div className="space-y-4 font-mono text-xs font-black">
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>MENTAL_CPU</span><span>88%</span></div>
                    <div className="h-3 w-full border-2 border-black bg-gray-100 p-0.5">
                      <div className="cpu-bar h-full bg-vivid-pink" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>COFFEE_RESERVE</span><span>LOW</span></div>
                    <div className="h-3 w-full border-2 border-black bg-gray-100 p-0.5">
                      <div className="h-full bg-vivid-yellow animate-pulse" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-black pt-4 flex justify-between items-center text-[10px] font-mono font-black">
                  <div className="flex items-center gap-1"><Activity size={10} className="text-red-500" /> HEARTBEAT_OK</div>
                  <div className="text-gray-400">UPTIME: 28Y_12D</div>
                </div>
              </div>
            </WindowCard>

            <div className="bg-black text-vivid-green p-4 border-4 border-black shadow-retro font-mono text-[10px] space-y-1 overflow-hidden h-32 relative">
               <div className="absolute inset-0 pointer-events-none opacity-10 bg-scanlines"></div>
               <div className="animate-pulse">&gt; SCANNING_USER_INTERESTS...</div>
               <div className="opacity-60">&gt; PIXEL_ART: DETECTED</div>
               <div className="opacity-60">&gt; BRUTALISM: ENABLED</div>
               <div className="opacity-60">&gt; CLEAN_CODE: TRUE</div>
               <div className="opacity-60">&gt; COFFEE: REQUIRED</div>
               <div className="text-white mt-2">&gt; WAITING_FOR_INPUT_</div>
            </div>
          </div>

          {/* Right Column: Content windows */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Bio Section */}
            <div className="window-glitch">
              <WindowCard title="user_profile.log" headerClassName="bg-vivid-purple">
                <div className="p-8 bg-white font-mono text-base leading-relaxed space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 border-2 border-black bg-vivid-yellow flex items-center justify-center shadow-retro">
                       <User size={24} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Identity Protocol</h2>
                  </div>
                  <p className="border-l-4 border-black pl-4 bg-gray-50 py-2">
                    <span className="font-bold text-vivid-pink">I am Mac.</span> A creative developer existing at the intersection of 90s nostalgia and modern web technology.
                  </p>
                  <p>
                    My mission is to rescue the web from generic minimalism. I build interfaces that feel physical, colorful, and alive. I believe borders should be thick, shadows should be solid, and hover states should play sounds.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <RetroButton variant="outline" className="bg-white px-4 py-2 text-xs">
                      <div className="flex items-center gap-2"><Globe size={14} /> Web_Archive</div>
                    </RetroButton>
                    <RetroButton variant="outline" className="bg-white px-4 py-2 text-xs">
                      <div className="flex items-center gap-2"><Shield size={14} /> Encrypted_CV</div>
                    </RetroButton>
                  </div>
                </div>
              </WindowCard>
            </div>

            {/* Skills: "The Diskette Grid" */}
            <div className="window-glitch">
              <h3 className="font-mono text-sm font-black uppercase mb-4 flex items-center gap-2">
                <HardDrive size={18} /> Available_Data_Storage
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[...skills.frontend, ...skills.backend, ...skills.design].map((skill, i) => (
                  <div 
                    key={skill}
                    onMouseEnter={playDiskSound}
                    className="group relative cursor-help perspective-500"
                  >
                    {/* The "Floppy Disk" */}
                    <div className="aspect-square border-4 border-black bg-vivid-blue shadow-retro group-hover:shadow-retro-lg group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-300 p-2 flex flex-col">
                      <div className="bg-white border-2 border-black h-1/3 mb-2 flex items-center justify-center">
                         <div className="w-8 h-1 bg-black/10 rounded-full"></div>
                      </div>
                      <div className="flex-1 border-2 border-black bg-gray-50 p-1 flex items-center justify-center overflow-hidden">
                        <span className="font-mono text-[10px] font-black text-center break-all">{skill.toUpperCase()}</span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-black/20 flex justify-end px-1 gap-1">
                        <div className="w-2 h-full bg-red-500"></div>
                      </div>
                    </div>
                    {/* Hover Label */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-mono px-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      READ_WRITE
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work History */}
            <div className="window-glitch">
               <WindowCard title="work_history.sys" headerClassName="bg-vivid-green">
                  <div className="p-0">
                    {experience.map((job, idx) => (
                      <div key={idx} className={`p-8 border-b-2 border-black last:border-b-0 hover:bg-vivid-yellow/5 transition-colors group`}>
                         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                           <div>
                             <div className="flex items-center gap-2">
                               <div className="w-2 h-2 bg-black group-hover:scale-150 transition-transform"></div>
                               <h4 className="text-xl font-black uppercase tracking-tight">{job.role}</h4>
                             </div>
                             <p className="text-sm font-black text-vivid-pink ml-4">{job.company}</p>
                           </div>
                           <span className="font-mono text-xs font-black bg-black text-white px-2 py-1 shadow-retro">[{job.period}]</span>
                         </div>
                         <p className="text-sm font-bold leading-relaxed ml-4 opacity-80">{job.description}</p>
                      </div>
                    ))}
                  </div>
               </WindowCard>
            </div>

            {/* Footer ASCII */}
            <ScrollReveal className="flex justify-center py-12">
               <div className="font-mono text-[10px] text-black/20 text-center leading-none select-none">
                 <pre>
{`   _________________________________
  /                                 \\
 |   DATA_TRANSFER_COMPLETE_100%     |
 |   [=========================]     |
  \\_________________________________/`}
                 </pre>
               </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-500 { perspective: 500px; }
      `}} />
    </div>
  );
};

export default AboutPage;