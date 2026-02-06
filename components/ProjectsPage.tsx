import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Folder, FileCode, ArrowLeft, Grid, List, Monitor, Filter, HardDrive, Terminal, Palette, Zap } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import { projects } from './Projects';

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const projectTypes = useMemo(() => {
    const types = new Set<string>();
    projects.forEach(p => types.add(p.type));
    return ['ALL', ...Array.from(types)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeType === 'ALL' || p.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, activeType]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsScanning(true);
    setSearchQuery(e.target.value);
    setTimeout(() => setIsScanning(false), 300);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WEB_APP': return <Terminal size={18} />;
      case 'UI_DESIGN': return <Palette size={18} />;
      case 'EXPERIMENT': return <Zap size={18} />;
      default: return <Folder size={18} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Navigation / Breadcrumbs */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <Link to="/" className="group inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                <ArrowLeft size={16} />
              </div>
              <span className="font-black">Return to OS</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs font-black bg-black text-white px-3 py-1 border-2 border-black shadow-retro">
              <HardDrive size={14} className="text-vivid-green" />
              <span>C:\ZADID_OS\USER\PROJECTS{activeType !== 'ALL' ? `\\${activeType}` : ''}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <WindowCard 
            title="project_explorer.exe" 
            className="min-h-[70vh] shadow-retro-xl"
            headerClassName="bg-vivid-blue"
          >
            <div className="flex flex-col lg:flex-row h-full bg-white">
              {/* Sidebar: Directories by Type */}
              <div className="w-full lg:w-64 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-gray-50 flex flex-col shrink-0">
                <div className="p-4 border-b-2 border-black bg-gray-100 flex items-center gap-2">
                  <Filter size={16} />
                  <span className="font-black text-xs uppercase tracking-tighter">File System</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-black border-2 transition-all group ${
                        activeType === type 
                        ? 'bg-black text-white border-black shadow-retro' 
                        : 'border-transparent hover:bg-white hover:border-black hover:shadow-retro'
                      }`}
                    >
                      <span className={activeType === type ? 'text-vivid-yellow' : 'text-black group-hover:text-black'}>
                        {type === 'ALL' ? <Folder size={18} /> : getTypeIcon(type)}
                      </span>
                      <span className="truncate">{type === 'ALL' ? 'ROOT_DIR' : type}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t-2 border-black bg-white mt-auto">
                   <div className="text-[10px] font-mono text-black font-black mb-1 uppercase">Disk_Usage</div>
                   <div className="h-3 w-full bg-white border-2 border-black overflow-hidden">
                      <div className="h-full bg-vivid-blue w-2/3"></div>
                   </div>
                </div>
              </div>

              {/* Main Area: Grid */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Search & Tool Bar */}
                <div className="p-4 border-b-2 border-black flex flex-col sm:flex-row gap-4 items-center bg-gray-50">
                  <div className="relative flex-1 w-full group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black group-focus-within:text-black">
                      <Search size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="SEARCH_SECTOR_DATA..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border-2 border-black font-mono text-sm font-black focus:outline-none focus:ring-4 focus:ring-vivid-blue/20 bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 border-2 border-black bg-white shadow-retro hover:bg-gray-100 active:shadow-none transition-colors"><Grid size={18} className="text-black"/></button>
                     <button className="p-2 border-2 border-black bg-white shadow-retro hover:bg-gray-100 active:shadow-none opacity-30 cursor-not-allowed"><List size={18} className="text-black"/></button>
                  </div>
                </div>

                {/* File Grid */}
                <div className="flex-1 p-6 overflow-y-auto relative bg-white">
                  {isScanning && (
                    <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                       <div className="font-mono text-lg font-black flex items-center gap-4 text-black">
                          <div className="w-8 h-8 border-4 border-black border-t-vivid-pink rounded-full animate-spin"></div>
                          SCANNING...
                       </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
                    {filteredProjects.map((project) => (
                      <div 
                        key={project.id}
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="group flex flex-col items-center gap-3 cursor-pointer"
                      >
                        <div className="relative">
                          {/* Folder/Icon Visual with max contrast */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-2 border-black shadow-retro group-hover:-translate-y-1 group-hover:shadow-retro-lg transition-all flex items-center justify-center relative overflow-hidden">
                             <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 grayscale transition-all duration-300"
                             />
                             {/* Overlay Icon */}
                             <div className={`w-12 h-12 flex items-center justify-center ${project.color.replace('bg-', 'text-')} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-10`}>
                                <FileCode size={40} strokeWidth={2.5} />
                             </div>
                             <div className="absolute bottom-0 right-0 bg-black text-white px-1 text-[8px] font-mono font-black z-20">
                                {project.type}
                             </div>
                          </div>
                          {/* Selection Glow */}
                          <div className="absolute -inset-2 bg-vivid-blue/0 group-hover:bg-vivid-blue/10 rounded-lg -z-10 transition-all"></div>
                        </div>

                        <div className="text-center w-full">
                          {/* Title with solid black for max legibility */}
                          <div className="font-mono text-xs font-black text-black truncate max-w-full px-1">{project.title.toUpperCase()}</div>
                          {/* Subtitle with dark gray */}
                          <div className="text-[10px] text-black/70 font-black uppercase tracking-tighter">{project.techStack[0]}</div>
                        </div>
                      </div>
                    ))}

                    {filteredProjects.length === 0 && (
                      <div className="col-span-full py-20 text-center">
                         <div className="text-6xl mb-4 opacity-10 italic font-black">404</div>
                         <p className="font-mono text-sm text-black font-black">SECTOR_EMPTY_OR_CORRUPT</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="border-t-2 border-black bg-gray-100 p-2 flex items-center justify-between font-mono text-[10px] font-black">
                   <div className="flex gap-4 text-black uppercase">
                      <span>FILES: {filteredProjects.length}</span>
                      <span className="hidden sm:inline">TYPE: {activeType}</span>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="h-3 w-32 border-2 border-black bg-white p-[2px] hidden sm:block">
                         <div className="h-full bg-vivid-green w-full"></div>
                      </div>
                      <span className="text-black">ZADID_OS V1.0</span>
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

export default ProjectsPage;