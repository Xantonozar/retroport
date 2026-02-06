import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import { ArrowLeft, HardDrive, FileCode, Download, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { projects } from './Projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const title = project?.title || `Project Protocol #${id}`;
  const filename = project?.filename || `project_data_${id}.exe`;
  const headerColor = project?.color || 'bg-vivid-purple';

  if (!project) {
    return (
        <div className="min-h-screen w-full bg-retro-bg py-16 px-4 flex items-center justify-center">
             <WindowCard title="error.log" className="max-w-md w-full" headerClassName="bg-red-500 text-white">
                <div className="p-8 text-center">
                    <div className="text-6xl mb-4">404</div>
                    <p className="font-mono mb-6">Project data not found in sector {id}.</p>
                    <Link to="/">
                        <RetroButton fullWidth>Return to Index</RetroButton>
                    </Link>
                </div>
             </WindowCard>
        </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
       <div className="mx-auto max-w-6xl">
         {/* Navigation */}
         <ScrollReveal>
           <Link to="/" className="group mb-6 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                 <ArrowLeft size={16} />
              </div>
              <span>Back to Index</span>
           </Link>
         </ScrollReveal>

         {/* Content Window */}
         <ScrollReveal delay={150}>
            <WindowCard 
              title={filename} 
              className="min-h-[500px] lg:min-h-[600px] shadow-retro-xl" 
              headerClassName={headerColor}
            >
                <div className="flex flex-col lg:flex-row h-full">
                    
                    {/* Left Sidebar (Retro visual & Metadata) */}
                    <div className="w-full lg:w-80 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-gray-50 p-4 lg:p-6 flex flex-col gap-6 shrink-0">
                        {/* Main Thumbnail */}
                        <div className="w-full aspect-video lg:aspect-square border-2 border-black shadow-retro overflow-hidden relative group bg-white">
                           {project.imageUrl ? (
                             <>
                                <img src={project.imageUrl} alt="Project icon" className="h-full w-full object-cover transition-all duration-500" />
                                <div className="absolute inset-0 bg-vivid-blue/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             </>
                           ) : (
                             <div className="flex h-full w-full items-center justify-center bg-vivid-yellow">
                                <HardDrive size={48} strokeWidth={1.5} />
                             </div>
                           )}
                        </div>

                        {/* Metadata Panel */}
                        <div className="font-mono text-xs border-2 border-black bg-white p-4 shadow-retro">
                           <div className="border-b-2 border-black pb-2 mb-3 font-bold text-center tracking-widest uppercase">File Metadata</div>
                           <div className="grid grid-cols-2 gap-y-2 gap-x-4 lg:flex lg:flex-col lg:gap-y-3 lg:space-y-0">
                               <div className="flex justify-between items-center"><span className="text-gray-500">STATUS</span> <span className="bg-green-100 text-green-700 px-1 border border-green-700 font-bold uppercase">Ready</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">SIZE</span> <span>1.44 MB</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">TYPE</span> <span>DIR/SOURCE</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">SECTOR</span> <span>AUST_B01</span></div>
                           </div>
                        </div>

                        {/* Tech Stack */}
                        {project.techStack && (
                            <div className="space-y-2">
                                <div className="font-bold font-mono text-xs uppercase text-gray-500 flex items-center gap-2">
                                    <FileCode size={12} /> Tech Stack
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="bg-white border border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-6 md:p-10 flex flex-col bg-white">
                        <div className="mb-8">
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 mb-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase italic">{title}</h1>
                                <a 
                                    href={project.websiteUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="inline-flex w-fit items-center gap-1 text-xs font-bold font-mono border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
                                >
                                    <ExternalLink size={12} /> LIVE_PREVIEW
                                </a>
                            </div>
                            
                            <div className="prose prose-lg max-w-none mb-8">
                                <p className="text-base sm:text-lg leading-relaxed text-gray-800 font-medium border-l-4 border-black pl-4 sm:pl-6 py-1">
                                    {project.description}
                                </p>
                                <p className="text-gray-600 mt-4 text-sm sm:text-base">
                                  This project represents an implementation focused on modern web architectures using the MERN stack. Developed with a high emphasis on scalability, maintainability, and user accessibility.
                                </p>
                            </div>
                        </div>

                        {/* Image Gallery Section */}
                        {project.images && project.images.length > 0 && (
                            <div className="mb-10">
                                <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 pb-2">
                                    <ImageIcon size={20} />
                                    <h3 className="font-black text-xl uppercase italic">Visual Buffer</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {project.images.map((img, idx) => (
                                        <div key={idx} className="group relative border-2 border-black shadow-retro overflow-hidden bg-gray-100">
                                            <img 
                                                src={img} 
                                                alt={`Screenshot ${idx + 1}`} 
                                                className="w-full h-auto transition-transform duration-500 group-hover:scale-102" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Footer */}
                        <div className="border-t-2 border-dashed border-gray-300 pt-8 mt-auto">
                           <div className="flex flex-col sm:flex-row gap-4">
                              <RetroButton 
                                variant="primary" 
                                className="group flex-1 justify-center"
                                onClick={() => window.open(project.websiteUrl, '_blank')}
                              >
                                 <div className="flex items-center gap-2">
                                    <ExternalLink size={18} className="transition-transform duration-300 group-hover:scale-110" />
                                    <span>Access Live Terminal</span>
                                 </div>
                              </RetroButton>

                              <RetroButton 
                                variant="secondary" 
                                onClick={() => alert("Code access restricted to administrators.")}
                                className="group flex-1 justify-center"
                              >
                                 <div className="flex items-center gap-2">
                                    <FileCode size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                                    <span>Source Code</span>
                                 </div>
                              </RetroButton>
                           </div>
                        </div>
                    </div>
                </div>
            </WindowCard>
         </ScrollReveal>
       </div>
    </div>
  );
};

export default ProjectDetail;