import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Heart, Coffee, Cpu, Code, Layers, Globe, Star, GraduationCap } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import Parallax from './ui/Parallax';
import FloatingShape from './ui/FloatingShape';

const AboutPage: React.FC = () => {
  const skills = {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'GSAP', 'Three.js'],
    backend: ['Node.js', 'PostgreSQL', 'Firebase', 'Python', 'GraphQL'],
    design: ['Figma', 'Adobe CC', 'Blender', 'UI/UX Principles']
  };

  const experience = [
    {
      role: 'Senior Creative Developer',
      company: 'Digital Dreams Ltd.',
      period: '2022 - Present',
      description: 'Leading the frontend team in building immersive web experiences. Spearheaded the migration to React 18 and introduced 3D elements to client projects.'
    },
    {
      role: 'Frontend Engineer',
      company: 'RetroSystems Inc.',
      period: '2019 - 2022',
      description: 'Developed high-performance e-commerce platforms. Specialized in accessibility and component library architecture.'
    },
    {
      role: 'Junior Web Designer',
      company: 'PixelPerfect Studio',
      period: '2017 - 2019',
      description: 'Collaborated with designers to translate high-fidelity mockups into pixel-perfect HTML/CSS templates.'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Decorative Shapes */}
      <FloatingShape shape="diamond" color="bg-vivid-blue" size={50} className="top-20 left-10" />
      <FloatingShape shape="circle" color="bg-vivid-pink" size={30} className="bottom-40 right-10" delay={1} />
      <FloatingShape shape="square" color="bg-vivid-yellow" size={60} className="top-1/3 right-5" delay={2} />

      <div className="w-full max-w-6xl relative z-10">
        <ScrollReveal>
           <Link to="/" className="group mb-8 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                 <ArrowLeft size={16} />
              </div>
              <span>Back to Index</span>
           </Link>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Column - Image/Avatar - Sticky on Desktop */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-8">
                <ScrollReveal delay={150}>
                    <Parallax speed={0.05} className="z-10 flex justify-center lg:justify-start">
                        <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
                            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                            <div className="relative border-2 border-black bg-white p-2 w-full h-full">
                                <img 
                                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover grayscale contrast-125"
                                />
                                {/* Decorative corner elements */}
                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-vivid-pink"></div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-vivid-pink"></div>
                            </div>
                        </div>
                    </Parallax>
                </ScrollReveal>
                
                <ScrollReveal delay={250}>
                    <div className="bg-white border-2 border-black p-4 shadow-retro hidden lg:block">
                        <div className="font-mono text-xs font-bold uppercase tracking-wider mb-2 text-gray-500 border-b-2 border-gray-100 pb-2">Status</div>
                        <div className="flex items-center gap-2 text-sm font-bold">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span>OPEN TO WORK</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                             Timezone: UTC-5 (EST)
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Right Column - Content Stack */}
            <div className="w-full lg:w-2/3 flex flex-col gap-10 pb-20">
                
                {/* 1. Bio Section */}
                <ScrollReveal delay={200}>
                    <WindowCard title="bio.txt" className="shadow-retro-lg" headerClassName="bg-vivid-purple">
                        <div className="p-6 sm:p-8 bg-white font-mono text-sm sm:text-base leading-relaxed space-y-6">
                            <p>
                                <span className="font-bold bg-vivid-yellow px-1 text-black">HELLO_WORLD!</span> I'm Mac, a creative developer with a passion for retro aesthetics and clean code.
                            </p>
                            <p>
                                Based in the digital realm, I specialize in building responsive websites that invoke nostalgia while delivering modern performance. My design philosophy is rooted in the bold, brutalist styles of the early web, fused with contemporary UX principles.
                            </p>
                            <p>
                                I believe in the power of simplicity and the charm of raw data. When I'm not coding, I'm probably optimizing my dotfiles or hunting for vintage tech.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-dashed border-gray-200 mt-6">
                                <div className="flex flex-col items-center gap-2 text-center p-2">
                                    <Coffee size={24} className="text-gray-700" />
                                    <span className="font-bold text-xs uppercase">Caffeine Powered</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center p-2">
                                    <Heart size={24} className="text-gray-700" />
                                    <span className="font-bold text-xs uppercase">Pixel Perfect</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center p-2">
                                    <Cpu size={24} className="text-gray-700" />
                                    <span className="font-bold text-xs uppercase">Full Stack</span>
                                </div>
                            </div>
                        </div>
                    </WindowCard>
                </ScrollReveal>

                {/* 2. Skills Section */}
                <ScrollReveal delay={300}>
                    <WindowCard title="skills.json" className="shadow-retro-lg" headerClassName="bg-vivid-pink">
                       <div className="p-6 sm:p-8 bg-white">
                           <div className="space-y-6">
                               {/* Frontend */}
                               <div>
                                   <div className="flex items-center gap-2 mb-3">
                                       <Code size={18} />
                                       <h3 className="font-bold uppercase tracking-wider text-sm">Frontend</h3>
                                   </div>
                                   <div className="flex flex-wrap gap-2">
                                       {skills.frontend.map(skill => (
                                           <span key={skill} className="px-3 py-1 border-2 border-black bg-pastel-blue font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                                               {skill}
                                           </span>
                                       ))}
                                   </div>
                               </div>

                               {/* Backend */}
                               <div>
                                   <div className="flex items-center gap-2 mb-3">
                                       <Layers size={18} />
                                       <h3 className="font-bold uppercase tracking-wider text-sm">Backend</h3>
                                   </div>
                                   <div className="flex flex-wrap gap-2">
                                       {skills.backend.map(skill => (
                                           <span key={skill} className="px-3 py-1 border-2 border-black bg-pastel-pink font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                                               {skill}
                                           </span>
                                       ))}
                                   </div>
                               </div>

                               {/* Design */}
                               <div>
                                   <div className="flex items-center gap-2 mb-3">
                                       <Globe size={18} />
                                       <h3 className="font-bold uppercase tracking-wider text-sm">Design & Tools</h3>
                                   </div>
                                   <div className="flex flex-wrap gap-2">
                                       {skills.design.map(skill => (
                                           <span key={skill} className="px-3 py-1 border-2 border-black bg-vivid-yellow font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                                               {skill}
                                           </span>
                                       ))}
                                   </div>
                               </div>
                           </div>
                       </div>
                    </WindowCard>
                </ScrollReveal>

                {/* 3. Experience Section */}
                <ScrollReveal delay={400}>
                    <WindowCard title="work_history.log" className="shadow-retro-lg" headerClassName="bg-vivid-blue">
                       <div className="p-6 sm:p-8 bg-white">
                           <div className="relative border-l-2 border-black ml-3 space-y-10 py-2">
                               {experience.map((job, index) => (
                                   <div key={index} className="relative pl-8">
                                       {/* Timeline Dot */}
                                       <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-black bg-vivid-blue"></div>
                                       
                                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                           <h3 className="text-lg font-black">{job.role}</h3>
                                           <span className="font-mono text-xs font-bold bg-gray-100 px-2 py-0.5 border border-black">{job.period}</span>
                                       </div>
                                       <div className="text-sm font-bold text-gray-600 mb-2">{job.company}</div>
                                       <p className="text-sm text-gray-800 leading-relaxed max-w-xl">
                                           {job.description}
                                       </p>
                                   </div>
                               ))}
                           </div>
                       </div>
                    </WindowCard>
                </ScrollReveal>

                {/* 4. Education & Volunteer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ScrollReveal delay={500}>
                        <WindowCard title="education.db" headerClassName="bg-vivid-yellow" className="h-full shadow-retro-lg">
                            <div className="p-6 bg-white h-full">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 border-2 border-black bg-gray-50 shrink-0">
                                        <GraduationCap size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg leading-tight mb-1">BS Computer Science</h3>
                                        <p className="text-sm font-bold text-gray-600 mb-2">Retro State University</p>
                                        <p className="text-xs font-mono text-gray-500">2013 - 2017</p>
                                        <p className="text-sm mt-3 leading-relaxed">
                                            Focus on Human-Computer Interaction and Computer Graphics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </WindowCard>
                    </ScrollReveal>

                    <ScrollReveal delay={600}>
                         <WindowCard title="volunteer.txt" headerClassName="bg-vivid-green" className="h-full shadow-retro-lg">
                            <div className="p-6 bg-white h-full flex flex-col justify-center">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Star size={16} className="mt-1 shrink-0 text-black fill-vivid-yellow" />
                                        <div>
                                            <span className="font-bold block">Open Source Maintainer</span>
                                            <span className="text-sm text-gray-600">Contributor to various UI libraries</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star size={16} className="mt-1 shrink-0 text-black fill-vivid-yellow" />
                                        <div>
                                            <span className="font-bold block">Code Camp Mentor</span>
                                            <span className="text-sm text-gray-600">Teaching web basics to students</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                         </WindowCard>
                    </ScrollReveal>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;