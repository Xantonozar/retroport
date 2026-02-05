import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import Parallax from './ui/Parallax';
import ProjectGalleryModal from './ProjectGalleryModal';
import { ExternalLink, Eye, Code2 } from 'lucide-react';

export const projects = [
  {
    id: 1,
    title: 'Possimus',
    filename: '2020-04-08-project.html',
    description: 'Officia sit numquam fugiat sint molestiae id. Est modi est at debitis dolorem. Ut voluptate quod rem dolores sint molestiae maiores. Quaerat consequatur quia libero voluptatem.',
    imageUrl: 'https://picsum.photos/800/400?grayscale&blur=2',
    color: 'bg-vivid-yellow',
    websiteUrl: 'https://example.com',
    techStack: ['React', 'TypeScript', 'Tailwind'],
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4',
    ]
  },
  {
    id: 2,
    title: 'Dolorum Ullam Totam',
    filename: '2020-04-08-project.html',
    description: 'Consequatur consequatur et quisquam sit velit. Distinctio sint omnis. Vitae et sint repellendus consequatur cumque eos atque. Eligendi cupiditate praesentium est.',
    imageUrl: 'https://picsum.photos/800/401?grayscale&blur=2',
    color: 'bg-vivid-green',
    websiteUrl: 'https://example.com',
    techStack: ['Vue.js', 'Firebase', 'SCSS'],
    images: [
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6',
      'https://picsum.photos/800/600?random=7',
    ]
  },
  {
    id: 3,
    title: 'Neon Synthwave',
    filename: '2021-06-15-project.html',
    description: 'A 3D interactive music visualizer built with Three.js. Experience the retro-futuristic vibes with real-time audio analysis and procedural generation.',
    imageUrl: 'https://picsum.photos/800/402?grayscale&blur=2',
    color: 'bg-vivid-pink',
    websiteUrl: 'https://example.com',
    techStack: ['Three.js', 'React Three Fiber', 'WebGL'],
    images: [
      'https://picsum.photos/800/600?random=8',
      'https://picsum.photos/800/600?random=9',
      'https://picsum.photos/800/600?random=10',
    ]
  },
  {
    id: 4,
    title: '8-Bit Dashboard',
    filename: '2021-11-20-project.html',
    description: 'A gamified productivity dashboard with pixel art aesthetics. Track your tasks like RPG quests and level up your productivity stats.',
    imageUrl: 'https://picsum.photos/800/403?grayscale&blur=2',
    color: 'bg-vivid-purple',
    websiteUrl: 'https://example.com',
    techStack: ['Next.js', 'Supabase', 'Framer Motion'],
    images: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13',
    ]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const navigate = useNavigate();

  // Helper for hover states matching the bg colors defined in tailwind config
  const getHoverClass = (colorClass: string) => {
    if (colorClass.includes('yellow')) return 'hover:!bg-yellow-400';
    if (colorClass.includes('green')) return 'hover:!bg-green-400';
    if (colorClass.includes('blue')) return 'hover:!bg-blue-400';
    if (colorClass.includes('pink')) return 'hover:!bg-pink-400';
    if (colorClass.includes('purple')) return 'hover:!bg-purple-400';
    return 'hover:!bg-gray-200';
  };

  // Determine a complementary color for the second button to create visual interest
  const getComplementaryColor = (colorClass: string) => {
    // Pairing logic: Yellow <-> Purple, Green <-> Pink, Blue <-> Yellow
    if (colorClass.includes('yellow')) return 'bg-vivid-purple';
    if (colorClass.includes('green')) return 'bg-vivid-pink';
    if (colorClass.includes('blue')) return 'bg-vivid-yellow';
    if (colorClass.includes('pink')) return 'bg-vivid-green';
    if (colorClass.includes('purple')) return 'bg-vivid-yellow';
    return 'bg-vivid-blue'; // Default fallback
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <section id="projects" className="w-full border-b-2 border-black bg-pastel-blue py-16 relative overflow-hidden">
       {/* Background Pattern - Parallax Layer */}
       <div className="absolute inset-0 z-0 h-[120%] -top-[10%] opacity-20">
          <Parallax speed={0.05} className="w-full h-full">
            <div className="w-full h-full bg-grid"></div>
          </Parallax>
       </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Projects</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {projects.map((project, index) => {
            const complementaryColor = getComplementaryColor(project.color);
            
            return (
              <ScrollReveal key={project.id} delay={index * 100}>
                <WindowCard 
                  title={project.filename} 
                  className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-retro-xl flex flex-col"
                  headerClassName={project.color}
                >
                  <div className="flex flex-col h-full">
                    {/* Image Container - Opens Modal */}
                    <div 
                        className="w-full h-48 sm:h-64 border-b-2 border-black overflow-hidden relative group shrink-0 cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                        title="Click to view gallery"
                    >
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-vivid-blue bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 mix-blend-multiply"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6 lg:p-8 bg-white">
                      <div className="flex-1">
                        <h3 className="mb-4 text-2xl font-black">{project.title}</h3>
                        <p className="mb-6 text-sm leading-relaxed text-gray-700">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3 opacity-60">
                                <Code2 size={16} />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider">Tech Stack</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span 
                                        key={tech} 
                                        className="inline-block border border-black bg-gray-50 px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                      </div>
                      
                      {/* Buttons Area - Side by Side 50% split */}
                      <div className="mt-6 flex flex-row gap-3">
                        <RetroButton 
                          onClick={() => navigate(`/project/${project.id}`)}
                          className={`flex-1 justify-center px-2 sm:px-4 !border-black ${project.color.replace('bg-', '!bg-')} ${getHoverClass(project.color)}`}
                          title="View Details Page"
                        >
                          <span className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold">
                              <Eye size={18} className="shrink-0" strokeWidth={2.5} />
                              <span className="whitespace-nowrap">View Project</span>
                          </span>
                        </RetroButton>

                        <RetroButton 
                          onClick={() => window.open(project.websiteUrl, '_blank')}
                          className={`flex-1 justify-center px-2 sm:px-4 !border-black ${complementaryColor.replace('bg-', '!bg-')} ${getHoverClass(complementaryColor)}`}
                          title="Visit Live Site"
                        >
                          <span className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold">
                              <ExternalLink size={18} className="shrink-0" strokeWidth={2.5} />
                              <span className="whitespace-nowrap">Visit Website</span>
                          </span>
                        </RetroButton>
                      </div>

                    </div>
                  </div>
                </WindowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectGalleryModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onNextProject={handleNextProject}
          onPrevProject={handlePrevProject}
        />
      )}
    </section>
  );
};

export default Projects;