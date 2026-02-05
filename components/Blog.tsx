import React from 'react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';

const posts = [
  { id: 1, filename: '2020-04-07-blog.pdf', img: 'https://picsum.photos/600/300?grayscale', headerColor: 'bg-vivid-blue' },
  { id: 2, filename: '2020-04-06-blog.pdf', img: 'https://picsum.photos/600/301?grayscale', headerColor: 'bg-vivid-green' },
  { id: 3, filename: '2020-04-06-blog.pdf', img: 'https://picsum.photos/600/302?grayscale', headerColor: 'bg-vivid-yellow' },
  { id: 4, filename: '2020-04-06-blog.pdf', img: 'https://picsum.photos/600/303?grayscale', headerColor: 'bg-vivid-purple' },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="w-full bg-pastel-pink py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">From the blog</h2>
            <a href="#" className="mt-2 inline-block font-bold underline decoration-2 decoration-vivid-blue underline-offset-4 hover:text-gray-600">
              View all blog posts
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative w-full">
              {/* Desktop Layout - "Messy Stack" visual trick using Grid with offsets */}
              <div className="hidden lg:grid grid-cols-12 gap-0 pb-32 pt-8 px-4">
                  {/* Post 1 - Base Left */}
                  <div className="col-span-6 col-start-1 relative z-10 transform transition-all duration-500 hover:z-50 hover:scale-105 hover:-rotate-1 group">
                       <WindowCard title={posts[0].filename} headerClassName={posts[0].headerColor} className="shadow-retro-lg group-hover:shadow-retro-xl">
                          <div className="relative">
                            <img src={posts[0].img} className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all border-b-2 border-black" />
                            <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs">READ_TIME: 5MIN</div>
                          </div>
                       </WindowCard>
                  </div>

                  {/* Post 2 - Offset Right & Rotated */}
                  <div className="col-span-5 col-start-7 -ml-12 mt-12 relative z-20 transform rotate-3 transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0 group">
                       <WindowCard title={posts[1].filename} headerClassName={posts[1].headerColor} className="shadow-retro-lg group-hover:shadow-retro-xl">
                          <div className="relative">
                            <img src={posts[1].img} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all border-b-2 border-black" />
                            <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs">READ_TIME: 3MIN</div>
                          </div>
                       </WindowCard>
                  </div>

                  {/* Post 3 - Bottom Center/Left Overlay */}
                  <div className="col-span-5 col-start-3 -mt-32 relative z-30 transform -rotate-2 transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0 group">
                       <WindowCard title={posts[2].filename} headerClassName={posts[2].headerColor} className="shadow-retro-lg group-hover:shadow-retro-xl">
                          <div className="relative">
                            <img src={posts[2].img} className="w-full h-56 object-cover grayscale hover:grayscale-0 transition-all border-b-2 border-black" />
                            <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs">READ_TIME: 8MIN</div>
                          </div>
                       </WindowCard>
                  </div>

                  {/* Post 4 - Bottom Right Overlay */}
                  <div className="col-span-6 col-start-7 -mt-48 ml-8 relative z-40 transform rotate-1 transition-all duration-500 hover:z-50 hover:scale-105 hover:rotate-0 group">
                       <WindowCard title={posts[3].filename} headerClassName={posts[3].headerColor} className="shadow-retro-lg group-hover:shadow-retro-xl">
                          <div className="relative">
                            <img src={posts[3].img} className="w-full h-72 object-cover grayscale hover:grayscale-0 transition-all border-b-2 border-black" />
                            <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs">READ_TIME: 4MIN</div>
                          </div>
                       </WindowCard>
                  </div>
              </div>

              {/* Mobile Layout - Simple Stack */}
              <div className="flex flex-col gap-8 lg:hidden pb-12">
                  {posts.map((post, idx) => (
                      <div key={post.id} className={`transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                        <WindowCard title={post.filename} headerClassName={post.headerColor}>
                            <img src={post.img} className="w-full h-48 object-cover grayscale hover:grayscale-0 border-b-2 border-black" />
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