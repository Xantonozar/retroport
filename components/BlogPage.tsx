import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Filter, BookOpen, Calendar, Clock, Tag, HardDrive, FileText, Layout, Zap, Palette } from 'lucide-react';
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
      case 'TECH': return <Zap size={18} />;
      case 'DESIGN': return <Palette size={18} />;
      case 'RETRO': return <Layout size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Breadcrumbs */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <Link to="/" className="group inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                <ArrowLeft size={18} />
              </div>
              <span className="text-base">Exit to Home</span>
            </Link>

            <div className="flex items-center gap-3 font-mono text-sm font-bold bg-black text-white px-4 py-2 border-2 border-black shadow-retro">
              <HardDrive size={16} className="text-vivid-blue" />
              <span>C:\MAC_OS\USER\BLOG{activeCategory !== 'ALL' ? `\\${activeCategory}` : ''}</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Categories & Stats */}
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal delay={100}>
              <WindowCard title="folders.exe" headerClassName="bg-vivid-yellow">
                <div className="p-2 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-black border-2 transition-all ${
                        activeCategory === cat 
                        ? 'bg-black text-white border-black shadow-retro' 
                        : 'border-transparent hover:bg-white hover:border-black hover:shadow-retro'
                      }`}
                    >
                      <span className={activeCategory === cat ? 'text-vivid-pink' : 'text-black'}>
                        {cat === 'ALL' ? <BookOpen size={18} /> : getCategoryIcon(cat)}
                      </span>
                      <span className="truncate">{cat === 'ALL' ? 'ALL_POSTS' : cat}</span>
                    </button>
                  ))}
                </div>
              </WindowCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white border-4 border-black p-5 shadow-retro">
                <div className="font-mono text-xs font-black text-black uppercase mb-3 border-b-2 border-black pb-2">System_Status</div>
                <div className="space-y-3 text-sm font-black text-black">
                  <div className="flex justify-between"><span>TOTAL_POSTS</span> <span>{blogPosts.length}</span></div>
                  <div className="flex justify-between"><span>LATEST_UPDATE</span> <span>2024-03-15</span></div>
                  <div className="flex justify-between text-pink-600"><span>ENCRYPTION</span> <span>ACTIVE</span></div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Main Feed / Reader */}
          <div className="lg:col-span-9">
            <ScrollReveal delay={150}>
              <WindowCard 
                title={selectedPost ? `reader.exe - ${selectedPost.filename}` : "blog_feed.exe"} 
                className="min-h-[70vh] shadow-retro-xl"
                headerClassName={selectedPost ? selectedPost.headerColor : "bg-vivid-pink"}
              >
                <div className="flex flex-col h-full bg-white">
                  {/* Toolbar */}
                  <div className="p-4 border-b-2 border-black bg-gray-50 flex items-center justify-between">
                    {selectedPost ? (
                      <button 
                        onClick={() => setSelectedPostId(null)}
                        className="flex items-center gap-3 font-black text-sm hover:underline uppercase"
                      >
                        <ArrowLeft size={18} /> BACK_TO_FEED
                      </button>
                    ) : (
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={20} />
                        <input 
                          type="text"
                          placeholder="SEARCH_POSTS..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-black font-mono text-sm font-black focus:outline-none focus:ring-4 focus:ring-vivid-blue/30 bg-white shadow-inner"
                        />
                      </div>
                    )}
                  </div>

                  {/* Scrollable Area - REMOVED bg-dots for clarity */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {selectedPost ? (
                      /* Reader View */
                      <div className="max-w-3xl mx-auto space-y-10 py-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="space-y-6">
                          <div className="flex flex-wrap items-center gap-4 font-mono text-sm font-black text-black">
                            <span className="flex items-center gap-1.5"><Calendar size={14} strokeWidth={2.5}/> {selectedPost.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={2.5}/> {selectedPost.readTime}</span>
                            <span className="flex items-center gap-1.5 bg-black text-white px-2 py-1"><Tag size={14}/> {selectedPost.category}</span>
                          </div>
                          <h1 className="text-4xl md:text-6xl font-black leading-tight text-black tracking-tight">
                            {selectedPost.title}
                          </h1>
                        </div>
                        
                        <div className="border-4 border-black shadow-retro-lg overflow-hidden bg-gray-100">
                          <img src={selectedPost.img} className="w-full h-[400px] object-cover transition-all duration-700" alt={selectedPost.title} />
                        </div>

                        <div className="prose prose-xl font-bold leading-relaxed text-black space-y-8 max-w-none">
                          <p className="text-xl md:text-2xl border-l-8 border-black pl-6 py-4 italic bg-vivid-yellow font-black shadow-retro">
                            {selectedPost.excerpt}
                          </p>
                          <p className="text-lg md:text-xl leading-extra-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. 
                          </p>
                          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 mt-12">Technical Deep Dive</h2>
                          <p className="text-lg md:text-xl leading-extra-relaxed">
                            Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. 
                          </p>
                          <div className="bg-black text-vivid-green p-8 font-mono text-base md:text-lg border-4 border-black shadow-retro-lg my-8">
                             <p className="text-vivid-green/60">// Example code snippet or quote block</p>
                             <p className="mt-4">const retroAesthetic = (pixels) => {</p>
                             <p className="ml-8">return pixels.filter(p => p.isBold && p.hasBorders);</p>
                             <p>};</p>
                          </div>
                        </div>

                        <div className="pt-12 border-t-4 border-dashed border-black flex justify-center">
                           <RetroButton onClick={() => setSelectedPostId(null)} variant="outline" className="bg-white px-10 py-4 text-lg">
                              Finish Reading & Exit
                           </RetroButton>
                        </div>
                      </div>
                    ) : (
                      /* Feed View */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredPosts.map((post) => (
                          <div 
                            key={post.id}
                            onClick={() => setSelectedPostId(post.id)}
                            className="group cursor-pointer transform transition-all hover:-translate-y-2"
                          >
                            <WindowCard 
                              title={post.filename} 
                              headerClassName={post.headerColor}
                              className="h-full shadow-retro-lg group-hover:shadow-retro-xl transition-all"
                            >
                              <div className="relative h-56 overflow-hidden border-b-2 border-black">
                                <img src={post.img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={post.title} />
                                <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 font-mono text-xs font-black border-2 border-white shadow-retro">{post.category}</div>
                              </div>
                              <div className="p-6 bg-white h-full group-hover:bg-gray-50 transition-colors flex flex-col gap-3">
                                <div className="flex items-center gap-3 font-mono text-xs text-black font-black uppercase">
                                   <Calendar size={12} strokeWidth={3} /> {post.date}
                                   <span className="mx-1 opacity-40">•</span>
                                   <Clock size={12} strokeWidth={3} /> {post.readTime}
                                </div>
                                <h3 className="font-black text-2xl leading-tight group-hover:text-vivid-blue transition-colors">{post.title}</h3>
                                <p className="text-sm md:text-base text-gray-900 font-bold line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                
                                <div className="mt-4 flex items-center gap-2 font-mono text-xs font-black text-vivid-pink uppercase group-hover:translate-x-2 transition-transform">
                                  <span className="underline decoration-2 underline-offset-4">Open_File</span>
                                  <ArrowLeft size={14} className="rotate-180" strokeWidth={3} />
                                </div>
                              </div>
                            </WindowCard>
                          </div>
                        ))}

                        {filteredPosts.length === 0 && (
                          <div className="col-span-full py-24 text-center space-y-6">
                             <div className="text-8xl opacity-10 italic font-black">404</div>
                             <p className="font-mono text-lg font-black text-black uppercase tracking-widest">SECTOR_EMPTY_NO_LOGS_FOUND</p>
                             <RetroButton variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory('ALL');}} className="bg-white px-8 py-3">
                                Reset Search
                             </RetroButton>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Status */}
                  <div className="p-4 border-t-2 border-black bg-gray-50 flex items-center justify-between font-mono text-xs font-black uppercase">
                    <div className="flex gap-6">
                      <span>ENTRIES: {filteredPosts.length}</span>
                      <span className="text-black/40">OFFSET: 0x00</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-24 border-2 border-black bg-white overflow-hidden p-[2px]">
                          <div className="h-full bg-vivid-pink w-3/4 animate-pulse"></div>
                       </div>
                       <span className="text-black">READER_V2.1</span>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .leading-extra-relaxed { line-height: 1.85; }
      `}} />
    </div>
  );
};

export default BlogPage;