import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, BookOpen, Calendar, Clock, Tag, HardDrive, FileText, Layout, Zap, Palette, Droplets, Construction, Landmark, Car, Cpu, Layers } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import { blogPosts } from './Blog';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogPosts.forEach(p => cats.add(p.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const selectedPost = useMemo(() => 
    blogPosts.find(p => p.id === selectedPostId), 
    [selectedPostId]
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'STRUCTURAL': return <Landmark size={18} />;
      case 'CONSTRUCTION': return <Construction size={18} />;
      case 'GEOTECHNICAL': return <HardDrive size={18} />;
      case 'TRANSPORT': return <Car size={18} />;
      case 'WATER_RES': return <Droplets size={18} />;
      case 'BIM': return <Layers size={18} />;
      case 'MATERIALS': return <Cpu size={18} />;
      case 'ENV_ENG': return <Zap size={18} className="text-vivid-green" />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <Link to="/" className="group inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                <ArrowLeft size={18} />
              </div>
              <span className="text-base font-black">EXIT_TO_HOME</span>
            </Link>

            <div className="flex items-center gap-3 font-mono text-sm font-bold bg-black text-white px-4 py-2 border-2 border-black shadow-retro-lg">
              <HardDrive size={16} className="text-vivid-blue" />
              <span>C:\ZADID_OS\USER\BLOG{activeCategory !== 'ALL' ? `\\${activeCategory}` : ''}</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            <WindowCard title="directories.exe" headerClassName="bg-vivid-yellow">
              <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedPostId(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black border-2 transition-all ${
                      activeCategory === cat 
                      ? 'bg-black text-white border-black shadow-retro' 
                      : 'border-transparent hover:bg-white hover:border-black hover:shadow-retro'
                    }`}
                  >
                    <span className={activeCategory === cat ? 'text-vivid-pink' : 'text-black'}>
                      {cat === 'ALL' ? <BookOpen size={16} /> : getCategoryIcon(cat)}
                    </span>
                    <span className="truncate">{cat === 'ALL' ? 'ROOT_SECTOR' : cat}</span>
                  </button>
                ))}
              </div>
            </WindowCard>

            <ScrollReveal delay={200}>
              <div className="bg-black text-white border-4 border-black p-5 shadow-retro relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-vivid-blue/30 animate-scan"></div>
                <div className="font-mono text-[10px] font-black text-vivid-green uppercase mb-3 border-b border-vivid-green/20 pb-2">Technical_Stats</div>
                <div className="space-y-3 text-xs font-mono font-black">
                  <div className="flex justify-between"><span>TOTAL_LOGS</span> <span>{blogPosts.length}</span></div>
                  <div className="flex justify-between"><span>FILTERED</span> <span>{filteredPosts.length}</span></div>
                  <div className="flex justify-between"><span>SECTOR_LOAD</span> <span>98.4%</span></div>
                  <div className="h-2 w-full border border-vivid-green/30 bg-gray-900 mt-2 p-[1px]">
                     <div className="h-full bg-vivid-blue w-[98.4%]"></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-9">
            <ScrollReveal delay={150}>
              <WindowCard 
                title={selectedPost ? `reader.exe - ${selectedPost.filename}` : "archive_feed.bat"} 
                className="min-h-[75vh] shadow-retro-xl"
                headerClassName={selectedPost ? selectedPost.headerColor : "bg-vivid-pink"}
              >
                <div className="flex flex-col h-full bg-white">
                  <div className="p-4 border-b-2 border-black bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {selectedPost ? (
                      <button 
                        onClick={() => setSelectedPostId(null)}
                        className="flex items-center gap-3 font-black text-xs hover:underline uppercase group"
                      >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_DIRECTORY
                      </button>
                    ) : (
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input 
                          type="text"
                          placeholder="SEARCH_SECTOR_DATA..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border-2 border-black font-mono text-xs font-black focus:outline-none focus:ring-4 focus:ring-vivid-blue/30 bg-white shadow-inner"
                        />
                      </div>
                    )}
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400">
                       <Zap size={12} className="text-vivid-yellow" />
                       REAL_TIME_INDEXING: ENABLED
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    {selectedPost ? (
                      <div className="max-w-3xl mx-auto space-y-10 py-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="space-y-6">
                          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] font-black text-black">
                            <span className="flex items-center gap-1.5 border-2 border-black px-2 py-1"><Calendar size={12}/> {selectedPost.date}</span>
                            <span className="flex items-center gap-1.5 border-2 border-black px-2 py-1"><Clock size={12}/> {selectedPost.readTime}</span>
                            <span className="flex items-center gap-1.5 bg-black text-white px-2 py-1 uppercase"><Tag size={12}/> {selectedPost.category}</span>
                          </div>
                          <h1 className="text-4xl md:text-5xl font-black leading-tight text-black tracking-tight uppercase italic border-l-8 border-black pl-6">
                            {selectedPost.title}
                          </h1>
                        </div>
                        
                        <div className="border-4 border-black shadow-retro-lg overflow-hidden relative group">
                          <img src={selectedPost.img} className="w-full h-[400px] object-cover" alt={selectedPost.title} />
                          <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
                        </div>

                        <div className="prose prose-xl font-bold leading-relaxed text-black space-y-8 max-w-none">
                          <p className="text-xl md:text-2xl border-4 border-black p-6 bg-vivid-yellow font-black shadow-retro relative">
                            {selectedPost.excerpt}
                            <span className="absolute -top-3 -left-3 bg-black text-white px-1 text-[8px] uppercase">Abstract</span>
                          </p>
                          <p className="text-lg md:text-xl leading-relaxed">
                            {selectedPost.content}
                          </p>
                        </div>

                        <div className="pt-12 border-t-4 border-dashed border-black flex flex-col sm:flex-row items-center justify-between gap-6">
                           <RetroButton onClick={() => setSelectedPostId(null)} variant="outline" className="bg-white px-8 py-3 text-sm">
                              EJECT_READ_PROTOCOL
                           </RetroButton>
                           <div className="font-mono text-[10px] font-black text-gray-400">
                             SECTOR_REF_ID: 0x{selectedPost.id}A7{selectedPost.category.substring(0,2)}
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                        {filteredPosts.map((post) => (
                          <div 
                            key={post.id}
                            onClick={() => setSelectedPostId(post.id)}
                            className="group cursor-pointer flex flex-col"
                          >
                            <WindowCard 
                              title={post.filename} 
                              headerClassName={post.headerColor}
                              className="h-full shadow-retro transition-all hover:shadow-retro-lg hover:-translate-y-1"
                            >
                              <div className="flex flex-col h-full bg-white">
                                <div className="relative h-44 overflow-hidden border-b-2 border-black">
                                  <img src={post.img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={post.title} />
                                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 font-mono text-[10px] font-black border-2 border-white shadow-retro uppercase">{post.category}</div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3 font-mono text-[10px] text-gray-500 font-black uppercase">
                                       <Calendar size={12} /> {post.date}
                                       <span>|</span>
                                       <Clock size={12} /> {post.readTime}
                                    </div>
                                    <h3 className="font-black text-xl leading-tight group-hover:text-vivid-blue transition-colors line-clamp-2 uppercase italic">
                                      {post.title}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-700 line-clamp-3 leading-relaxed">
                                      {post.excerpt}
                                    </p>
                                  </div>
                                  
                                  <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                                     <span className="font-mono text-[10px] font-black text-vivid-pink uppercase group-hover:translate-x-1 transition-transform">INITIALIZE_READ &gt;&gt;</span>
                                     <div className="h-1 w-12 bg-black/10"></div>
                                  </div>
                                </div>
                              </div>
                            </WindowCard>
                          </div>
                        ))}

                        {filteredPosts.length === 0 && (
                          <div className="col-span-full py-24 text-center space-y-6">
                             <div className="text-9xl opacity-5 italic font-black">404</div>
                             <p className="font-mono text-sm font-black text-black uppercase tracking-[0.3em]">DIRECTORY_SECTOR_NOT_FOUND</p>
                             <RetroButton variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory('ALL');}} className="bg-white px-8 py-3">
                                RE_INITIALIZE_FILE_SYSTEM
                             </RetroButton>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t-2 border-black bg-gray-100 flex items-center justify-between font-mono text-[9px] font-black uppercase text-gray-500">
                    <div className="flex gap-4">
                      <span>LOADED_OBJECTS: {filteredPosts.length}</span>
                      <span className="text-black/30">ZADID_TECHNICAL_V2.0</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-black hidden sm:inline">TERMINAL_SECURE</span>
                       <div className="h-4 w-4 bg-vivid-green border border-black animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-left: 2px solid black; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: black; border: 2px solid #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
      `}} />
    </div>
  );
};

export default BlogPage;