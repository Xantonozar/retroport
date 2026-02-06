import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Globe, Terminal, HardDrive, Shield, Activity, Cpu, Code, Book, Palette, Zap } from 'lucide-react';
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
    engineering: ['AutoCAD', 'C', 'C++', 'Civil Engineering'],
    mern_stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
    ui_ux: ['Tailwind CSS', 'DaisyUI', 'Chakra UI', 'shadcn/ui'],
    other: ['Vite', 'Socket.io', 'Prompt Engineering (PSW)', 'Content Writing', 'Poetry']
  };

  const experience = [
    {
      role: 'Sub-Executive (2026) / Web Developer',
      company: 'AUST Environmental and Social Welfare Club (ESWC)',
      period: '2024 - 2026',
      description: 'Progressed from Batch Ambassador (2024) to Junior Executive (2025) and Sub-Executive (2026). Solo project: Designed and developed austeswc.org.'
    },
    {
      role: 'Sub-Executive (2025) / Web & Content',
      company: 'AUST Architecture Research and Planning Club (ARPC)',
      period: '2025',
      description: 'Web Developer and Content Writer focusing on digital asset management and architecture planning resources.'
    },
    {
      role: 'Executive (2026) / Content Writer',
      company: 'AUST ACI Student Chapter',
      period: '2025 - 2026',
      description: 'Progressed from Junior Executive (2025) to Executive (2026). Specialized in technical and creative engineering content.'
    },
    {
      role: 'Co-Founder / Full Stack Developer',
      company: 'AAMGOP (Online Mango Platform)',
      period: 'Active',
      description: 'Full-stack development of a scalable mango sales ecosystem. Bridging agriculture with tech.'
    }
  ];

  useGSAP(() => {
    gsap.to('.decor-shape', {
      y: (i) => (i + 1) * -50,
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 }
    });
    const windows = gsap.utils.toArray('.window-glitch');
    windows.forEach((win: any) => {
      gsap.from(win, { x: -50, opacity: 0, skewX: 10, duration: 0.8, scrollTrigger: { trigger: win, start: 'top 85%' } });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="fixed inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <Link to="/" onClick={() => soundEffects.playMenuClose()} className="group inline-flex items-center gap-2 font-mono text-sm font-black uppercase tracking-wider hover:text-vivid-pink transition-colors">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={18} />
            </div>
            <span className="text-black text-lg">C:\ROOT_INDEX</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-sm font-black bg-black text-white px-6 py-3 border-2 border-black shadow-retro-lg">
            <Terminal size={16} className="text-vivid-green" />
            <span className="glitch" data-text="C:\ZADID_OS\BIO\ZADID.BAT">C:\ZADID_OS\BIO\ZADID.BAT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <WindowCard title="user_status.dat" headerClassName="bg-vivid-blue">
              <div className="p-6 bg-white space-y-6">
                <div className="relative border-4 border-black p-2 shadow-retro">
                  <img 
                    src="/zadid.jpg" 
                    onError={(e) => {
                       e.currentTarget.src = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400";
                       e.currentTarget.onerror = null;
                    }}
                    alt="Salman Ahmed Zadid" 
                    className="w-full grayscale contrast-125"
                  />
                </div>
                <div className="space-y-4 font-mono text-xs font-black">
                   <div className="flex justify-between border-b border-black pb-1"><span>ID</span> <span>ZADID_UNIT_01</span></div>
                   <div className="flex justify-between border-b border-black pb-1"><span>MAJOR</span> <span>CIVIL_ENG @ AUST</span></div>
                   <div className="flex justify-between border-b border-black pb-1"><span>YEAR</span> <span>CLASS_OF_2024+</span></div>
                   <div className="flex justify-between"><span>UPTIME</span> <span>ACTIVE_SINCE_DEC_24</span></div>
                </div>
              </div>
            </WindowCard>

            <div className="bg-black text-vivid-green p-4 border-4 border-black shadow-retro font-mono text-[10px] space-y-1">
                <div className="animate-pulse">&gt; ANALYZING_SYSTEM_CORES...</div>
                <div className="text-white">&gt; CIVIL_ENGINEERING: ESTABLISHED</div>
                <div className="text-white">&gt; MERN_STACK: OPTIMIZED</div>
                <div className="text-white">&gt; TECHNICAL_WRITING: ENABLED</div>
                <div className="text-white">&gt; CREATIVE_OUTPUT: HIGH</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="window-glitch">
              <WindowCard title="identity_protocol.txt" headerClassName="bg-vivid-purple">
                <div className="p-8 bg-white font-mono text-base leading-relaxed space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 border-2 border-black bg-vivid-yellow flex items-center justify-center shadow-retro"><User size={24} /></div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Personal Context</h2>
                  </div>
                  <p className="border-l-4 border-black pl-4 bg-gray-50 py-2">
                    <span className="font-bold text-vivid-pink">I bridge physical and digital sectors.</span> Currently pursuing B.Sc. in Civil Engineering at Ahsanullah University of Science and Technology (AUST) while mastering the MERN stack.
                  </p>
                  <p>
                    My professional focus lies in building modern, maintainable, and scalable web applications. I emphasize reusable component-based architectures, accessibility, and high-performance UI design. With leadership roles in AUST's ESWC, ARPC, and ACI student chapters, I thrive at the intersection of technical engineering and creative software solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <RetroButton variant="outline" className="bg-white px-4 py-2 text-xs" onClick={() => window.open('https://civilhub.vercel.app', '_blank')}>
                      <div className="flex items-center gap-2"><Globe size={14} /> CIVILHUB</div>
                    </RetroButton>
                    <RetroButton variant="outline" className="bg-white px-4 py-2 text-xs" onClick={() => window.open('https://bilkhata.vercel.app', '_blank')}>
                      <div className="flex items-center gap-2"><Activity size={14} /> BILLKHATA</div>
                    </RetroButton>
                  </div>
                </div>
              </WindowCard>
            </div>

            <div className="window-glitch">
              <h3 className="font-mono text-sm font-black uppercase mb-4 flex items-center gap-2"><HardDrive size={18} /> Skill_Sector_Matrix</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(skills).flatMap(([key, items]) => items.map(skill => (
                  <div key={skill} className="border-2 border-black bg-white p-3 shadow-retro text-center font-mono text-[10px] font-black hover:bg-vivid-pink transition-colors cursor-default">
                    {skill.toUpperCase()}
                  </div>
                )))}
              </div>
            </div>

            <div className="window-glitch">
               <WindowCard title="organizational_logs.sys" headerClassName="bg-vivid-green">
                  <div className="p-0">
                    {experience.map((job, idx) => (
                      <div key={idx} className="p-6 border-b-2 border-black last:border-b-0 hover:bg-vivid-yellow/10 transition-colors">
                         <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
                           <h4 className="text-xl font-black uppercase">{job.role}</h4>
                           <span className="font-mono text-[10px] font-black bg-black text-white px-2 py-1 h-fit">{job.period}</span>
                         </div>
                         <p className="text-sm font-black text-vivid-pink mb-2">{job.company}</p>
                         <p className="text-xs font-bold leading-relaxed opacity-80">{job.description}</p>
                      </div>
                    ))}
                  </div>
               </WindowCard>
            </div>

            <div className="window-glitch bg-black text-white p-8 border-4 border-black shadow-retro">
               <h3 className="text-2xl font-black uppercase mb-4">Long Term Objectives</h3>
               <ul className="space-y-3 font-mono text-sm">
                  <li className="flex gap-3"><span className="text-vivid-pink">[1]</span> Integrate civil engineering principles with advanced software architecture.</li>
                  <li className="flex gap-3"><span className="text-vivid-pink">[2]</span> Develop impactful, scalable digital platforms for academic and social initiatives.</li>
                  <li className="flex gap-3"><span className="text-vivid-pink">[3]</span> Continue evolving as both a technical professional and a creative author.</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;