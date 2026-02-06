import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import Parallax from './ui/Parallax';
import ProjectGalleryModal from './ProjectGalleryModal';
import { ExternalLink, Eye } from 'lucide-react';

export const projects = [
  {
    id: 1,
    title: 'BillKhata',
    filename: 'bill_khata.exe',
    type: 'WEB_APP',
    description: 'A comprehensive bill and meal management system designed for bachelor and shared-living environments.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390838/Screenshot_2026-02-06_210623_wqovdt.png',
    color: 'bg-vivid-yellow',
    websiteUrl: 'https://bilkhata.vercel.app',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390838/Screenshot_2026-02-06_210623_wqovdt.png']
  },
  {
    id: 2,
    title: 'CivilHub',
    filename: 'civil_hub.sys',
    type: 'ACADEMIC',
    description: 'An academic resource platform for university students, centralizing notes and engineering tools.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390845/Screenshot_2026-02-06_210645_ztpkx8.png',
    color: 'bg-vivid-green',
    websiteUrl: 'https://civilhub.vercel.app',
    techStack: ['Next.js', 'Tailwind CSS', 'Firebase'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390845/Screenshot_2026-02-06_210645_ztpkx8.png']
  },
  {
    id: 3,
    title: 'Poetroo',
    filename: 'poetroo.log',
    type: 'CREATIVE',
    description: 'A poetry platform supporting anonymous reactions, comments, and email submissions.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390838/Screenshot_2026-02-06_210702_gzx42e.png',
    color: 'bg-vivid-pink',
    websiteUrl: 'https://poetroo.vercel.app',
    techStack: ['React', 'Socket.io', 'MERN'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390838/Screenshot_2026-02-06_210702_gzx42e.png']
  },
  {
    id: 4,
    title: 'AAMGOP',
    filename: 'aamgop.bat',
    type: 'E-COMMERCE',
    description: 'Online Mango Sales Platform co-founded by Zadid. Full website design and development.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390854/Screenshot_2026-02-06_210723_tl2ulb.png',
    color: 'bg-vivid-purple',
    websiteUrl: 'https://aamgo.vercel.app',
    techStack: ['Next.js', 'Tailwind', 'E-commerce'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390854/Screenshot_2026-02-06_210723_tl2ulb.png']
  },
  {
    id: 5,
    title: 'AUST ESWC',
    filename: 'eswc_main.exe',
    type: 'ORGANIZATIONAL',
    description: 'Official website for AUST Environmental and Social Welfare Club. Solo developed project.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390839/Screenshot_2026-02-06_210740_b7shfb.png',
    color: 'bg-vivid-blue',
    websiteUrl: 'https://austeswc.org',
    techStack: ['React', 'Node.js', 'Tailwind'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390839/Screenshot_2026-02-06_210740_b7shfb.png']
  },
  {
    id: 11,
    title: 'Restoriaa',
    filename: 'restoriaa.sys',
    type: 'RESTAURANT',
    description: 'A scalable restaurant web application built for modern dining.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_211018_eaqnfu.png',
    color: 'bg-vivid-pink',
    websiteUrl: 'https://restoriaa.vercel.app',
    techStack: ['MERN', 'shadcn/ui', 'Tailwind'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_211018_eaqnfu.png']
  },
  {
    id: 6,
    title: 'Ozly',
    filename: 'ozly.sh',
    type: 'UTILITY',
    description: 'High-performance URL shortening service with clean UI and fast redirection.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390845/Screenshot_2026-02-06_210801_k7bfuf.png',
    color: 'bg-vivid-pink',
    websiteUrl: 'https://ozly.vercel.app',
    techStack: ['Node.js', 'Express', 'Vite'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390845/Screenshot_2026-02-06_210801_k7bfuf.png']
  },
  {
    id: 7,
    title: 'Festoriaa',
    filename: 'festoriaa.cfg',
    type: 'RESTAURANT',
    description: 'Modern restaurant website featuring a clean layout and menu showcase.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390839/Screenshot_2026-02-06_210848_lz6yoc.png',
    color: 'bg-vivid-yellow',
    websiteUrl: 'https://festoriaa.vercel.app',
    techStack: ['React', 'Tailwind', 'UI/UX'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390839/Screenshot_2026-02-06_210848_lz6yoc.png']
  },
  {
    id: 8,
    title: 'Keithstoon',
    filename: 'keithstoon.mid',
    type: 'CAFE',
    description: 'Boutique coffee shop website with aesthetic design and cozy interface.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_210903_vencpe.png',
    color: 'bg-vivid-green',
    websiteUrl: 'https://keithstoon.vercel.app',
    techStack: ['Vite', 'CSS Modules', 'React'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_210903_vencpe.png']
  },
  {
    id: 9,
    title: 'Floarista',
    filename: 'floarista.app',
    type: 'RESTAURANT',
    description: 'Elegant dining experience website with focus on high-quality visuals.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390841/Screenshot_2026-02-06_210931_yc0iwm.png',
    color: 'bg-vivid-blue',
    websiteUrl: 'https://floarista.vercel.app',
    techStack: ['Next.js', 'Tailwind', 'Framermotion'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390841/Screenshot_2026-02-06_210931_yc0iwm.png']
  },
  {
    id: 10,
    title: 'Unidinee',
    filename: 'unidinee.log',
    type: 'RESTAURANT',
    description: 'A unique restaurant portal for high-end dining services.',
    imageUrl: 'https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_211002_degu1u.png',
    color: 'bg-vivid-purple',
    websiteUrl: 'https://unidinee.vercel.app',
    techStack: ['React', 'DaisyUI', 'Chakra UI'],
    images: ['https://res.cloudinary.com/chirkut/image/upload/v1770390840/Screenshot_2026-02-06_211002_degu1u.png']
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const navigate = useNavigate();

  return (
    <section id="projects" className="w-full border-b-2 border-black bg-pastel-blue py-16 relative overflow-hidden">
       <div className="absolute inset-0 z-0 h-[120%] -top-[10%] opacity-20">
          <Parallax speed={0.05} className="w-full h-full">
            <div className="w-full h-full bg-grid"></div>
          </Parallax>
       </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase italic">Project Archives</h2>
            <button onClick={() => navigate('/projects')} className="font-mono text-sm font-black underline decoration-2 hover:text-vivid-pink">VIEW_ALL_SECTORS</button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {projects.slice(0, 6).map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <WindowCard 
                title={project.filename} 
                className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-retro-xl flex flex-col"
                headerClassName={project.color}
              >
                <div className="flex flex-col h-full bg-white">
                  <div 
                      className="w-full h-48 sm:h-64 border-b-2 border-black overflow-hidden relative group shrink-0 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                  >
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-2xl font-black text-black uppercase">{project.title}</h3>
                         <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.5">{project.type}</span>
                      </div>
                      <p className="mb-6 text-sm leading-relaxed text-black font-bold">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-row gap-3 mt-4">
                      <RetroButton onClick={() => navigate(`/project/${project.id}`)} className="flex-1 py-2 bg-white">
                        <div className="flex items-center justify-center gap-2 text-xs font-black"><Eye size={16} /> Details</div>
                      </RetroButton>
                      <RetroButton onClick={() => window.open(project.websiteUrl, '_blank')} className={`flex-1 py-2 ${project.color}`}>
                        <div className="flex items-center justify-center gap-2 text-xs font-black"><ExternalLink size={16} /> Live</div>
                      </RetroButton>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectGalleryModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;