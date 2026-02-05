import React from 'react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import { Link } from 'react-router-dom';

export const blogPosts = [
  { 
    id: 1, 
    title: 'The Future of Brutalist Design',
    excerpt: 'Why raw pixels and heavy borders are making a massive comeback in the modern web.',
    date: '2024-03-15',
    category: 'DESIGN',
    filename: '2024-03-15-brutalism.pdf', 
    img: 'https://images.unsplash.com/photo-1550741827-4bd374c3f58b?w=800&q=80', 
    headerColor: 'bg-vivid-blue',
    readTime: '5MIN'
  },
  { 
    id: 2, 
    title: 'Optimizing for 56k Modems',
    excerpt: 'Lost arts of image compression and asset loading from the golden age of the internet.',
    date: '2024-02-28',
    category: 'TECH',
    filename: '2024-02-28-modems.pdf', 
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', 
    headerColor: 'bg-vivid-green',
    readTime: '3MIN'
  },
  { 
    id: 3, 
    title: 'The Aesthetic of CRT Flicker',
    excerpt: 'Recreating the warm glow and scanning lines of classic monitors in modern CSS.',
    date: '2024-01-12',
    category: 'RETRO',
    filename: '2024-01-12-crt.pdf', 
    img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80', 
    headerColor: 'bg-vivid-yellow',
    readTime: '8MIN'
  },
  { 
    id: 4, 
    title: 'CSS Grid vs. Tables',
    excerpt: 'A nostalgic look at how we used to layout websites before the flexbox revolution.',
    date: '2023-12-05',
    category: 'TECH',
    filename: '2023-12-05-layout.pdf', 
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', 
    headerColor: 'bg-vivid-purple',
    readTime: '4MIN'
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="w-full bg-pastel-pink py-16 border-b-2 border-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl font-black tracking-tight sm:text-6xl text-black">From the blog</h2>
              <p className="mt-3 text-black font-mono text-base font-black uppercase tracking-widest">ARCHIVED_THOUGHTS.LOG</p>
            </div>
            <Link to="/blog" className="inline-block font-black uppercase text-sm px-6 py-2 border-2 border-black bg-white shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all">
              View all blog posts
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative w-full">
              {/* Desktop Layout - "Messy Stack" visual trick */}
              <div className="hidden lg:grid grid-cols-12 gap-0 pb-32 pt-8 px-4">
                  {blogPosts.map((post, idx) => {
                    const rotations = ['-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];
                    const colSpans = ['col-span-6 col-start-1', 'col-span-5 col-start-7 -ml-12 mt-12', 'col-span-5 col-start-3 -mt-32', 'col-span-6 col-start-7 -mt-48 ml-8'];
                    const zIndices = ['z-10', 'z-20', 'z-30', 'z-40'];
                    
                    return (
                      <div key={post.id} className={`${colSpans[idx]} relative ${zIndices[idx]} transform ${rotations[idx]} transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0 group`}>
                           <WindowCard title={post.filename} headerClassName={post.headerColor} className="shadow-retro-lg group-hover:shadow-retro-xl">
                              <div className="relative overflow-hidden bg-white">
                                <img src={post.img} className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 border-b-4 border-black opacity-100" />
                                <div className="absolute bottom-0 left-0 bg-black text-white px-3 py-1 font-mono text-xs font-black border-r-2 border-t-2 border-white shadow-retro">READ_TIME: {post.readTime}</div>
                                <div className="absolute top-0 right-0 bg-white border-b-4 border-l-4 border-black px-3 py-1 font-mono text-xs font-black uppercase text-black">{post.category}</div>
                              </div>
                              <div className="p-6 bg-white group-hover:bg-gray-50 transition-colors border-t-2 border-black/5">
                                <h3 className="font-black text-2xl mb-3 text-black leading-tight group-hover:text-vivid-blue transition-colors">{post.title}</h3>
                                <div className="flex items-center justify-between mt-4">
                                  <p className="text-xs text-black font-mono font-black uppercase bg-black/5 px-2 py-0.5">{post.date}</p>
                                  <div className="h-2 w-16 bg-black group-hover:bg-vivid-pink transition-all duration-500"></div>
                                </div>
                              </div>
                           </WindowCard>
                      </div>
                    );
                  })}
              </div>

              {/* Mobile Layout - Simple Stack */}
              <div className="flex flex-col gap-10 lg:hidden pb-12">
                  {blogPosts.map((post, idx) => (
                      <div key={post.id} className={`transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                        <WindowCard title={post.filename} headerClassName={post.headerColor} className="shadow-retro-lg">
                            <div className="bg-white">
                              <img src={post.img} className="w-full h-56 object-cover border-b-4 border-black opacity-100" />
                              <div className="p-5 bg-white">
                                <h3 className="font-black text-2xl text-black leading-tight">{post.title}</h3>
                                <div className="flex justify-between items-center mt-4">
                                  <p className="text-xs text-black font-mono font-black uppercase">{post.date} — {post.category}</p>
                                  <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5">V1.0</span>
                                </div>
                              </div>
                            </div>
                        </WindowCard>
                      </div>
                  ))}
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Blog;