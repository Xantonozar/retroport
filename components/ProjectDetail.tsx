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
                                <img src={project.imageUrl} alt="Project icon" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
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
                           <div className="border-b-2 border-black pb-2 mb-3 font-bold text-center tracking-widest">FILE_METADATA</div>
                           {/* Grid on mobile to save vertical space, Stack on desktop */}
                           <div className="grid grid-cols-2 gap-y-2 gap-x-4 lg:flex lg:flex-col lg:gap-y-3 lg:space-y-0">
                               <div className="flex justify-between items-center"><span className="text-gray-500">STATUS</span> <span className="bg-green-100 text-green-700 px-1 border border-green-700 font-bold">ONLINE</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">SIZE</span> <span>1.44 MB</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">TYPE</span> <span>DIR/JSX</span></div>
                               <div className="flex justify-between"><span className="text-gray-500">MODIFIED</span> <span>1999-12-31</span></div>
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
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">{title}</h1>
                                <a 
                                    href={project.websiteUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="inline-flex w-fit items-center gap-1 text-xs font-bold font-mono border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
                                >
                                    <ExternalLink size={12} /> LIVE_PREVIEW
                                </a>
                            </div>
                            
                            {project.description ? (
                               <div className="prose prose-lg max-w-none mb-8">
                                   <p className="text-base sm:text-lg leading-relaxed text-gray-800 font-medium border-l-4 border-black pl-4 sm:pl-6 py-1">
                                       {project.description}
                                   </p>
                                   <p className="text-gray-600 mt-4 text-sm sm:text-base">
                                     Additional project details, challenges faced, and architectural decisions would typically be displayed here. The project focuses on creating a unique user experience through {project.techStack?.join(', ')}.
                                   </p>
                               </div>
                            ) : (
                               <div className="font-mono text-sm leading-relaxed text-gray-600 mb-8 border-l-4 border-vivid-blue pl-4 bg-blue-50/30 p-4">
                                    <div className="mb-2 text-xs font-bold uppercase tracking-widest text-vivid-blue opacity-70">
                                         // System Message: Data Retrieval Failed
                                    </div>
                                    <p>Accessing classified project archives...</p>
                                    <p className="mt-2"><span className="text-red-500 font-bold">Error 404:</span> Description data corrupted in transit.</p>
                               </div>
                            )}
                        </div>

                        {/* Image Gallery Section */}
                        {project.images && project.images.length > 0 && (
                            <div className="mb-10">
                                <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 pb-2">
                                    <ImageIcon size={20} />
                                    <h3 className="font-black text-xl">Gallery</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.images.slice(0, 4).map((img, idx) => (
                                        <div key={idx} className="group relative border-2 border-black shadow-retro overflow-hidden aspect-[4/3] bg-gray-100">
                                            <img 
                                                src={img} 
                                                alt={`Screenshot ${idx + 1}`} 
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                                            />
                                            <div className="absolute inset-0 ring-4 ring-black/0 group-hover:ring-black/10 transition-all"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Spacer to push footer down */}
                        <div className="flex-1 min-h-[1rem]"></div>

                        {/* Action Footer */}
                        <div className="border-t-2 border-dashed border-gray-300 pt-8">
                           {/* Retro Console */}
                           <div className="p-4 bg-black text-green-400 font-mono text-xs rounded border-2 border-black shadow-retro mb-6 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-[1px] bg-green-400/30 animate-scan"></div>
                              <p>> initiating_sequence...</p>
                              <p>> verification_complete</p>
                              <p>> ready_for_download <span className="animate-pulse">_</span></p>
                           </div>
                           
                           <div className="flex flex-col sm:flex-row gap-4">
                              <RetroButton 
                                variant="primary" 
                                className="group flex-1 justify-center"
                                onClick={() => window.open(project.websiteUrl, '_blank')}
                              >
                                 <div className="flex items-center gap-2">
                                    <ExternalLink size={18} className="transition-transform duration-300 group-hover:scale-110" />
                                    <span>Visit Live Site</span>
                                 </div>
                              </RetroButton>

                              <RetroButton 
                                variant="secondary" 
                                onClick={() => alert("Source code is currently encrypted. Check back later.")}
                                className="group flex-1 justify-center"
                              >
                                 <div className="flex items-center gap-2">
                                    <FileCode size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                                    <span>View Source</span>
                                 </div>
                              </RetroButton>

                              <RetroButton 
                                variant="secondary"
                                onClick={() => alert("Download started...")}
                                className="group flex-1 justify-center"
                              >
                                 <div className="flex items-center gap-2">
                                    <Download size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
                                    <span>.ZIP Asset</span>
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