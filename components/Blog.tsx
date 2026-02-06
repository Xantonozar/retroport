import React from 'react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import { Link } from 'react-router-dom';

export const blogPosts = [
  { 
    id: 1, 
    title: 'Structural Health Monitoring via Neural Networks',
    excerpt: 'Utilizing deep learning to interpret real-time sensor data from bridge infrastructure for predictive maintenance.',
    date: '2024-03-15',
    category: 'STRUCTURAL',
    filename: 'shm_neural_v1.log', 
    img: 'https://images.unsplash.com/photo-1545459720-aac273a27b37?w=800&q=80', 
    headerColor: 'bg-vivid-blue',
    readTime: '6MIN',
    content: 'Structural Health Monitoring (SHM) is undergoing a paradigm shift. Traditional threshold-based alerts are being replaced by Convolutional Neural Networks (CNNs) that can detect minute anomalies in vibration patterns before visible cracks appear.'
  },
  { 
    id: 2, 
    title: 'Computer Vision in Construction Safety',
    excerpt: 'Automating jobsite hazard detection using real-time video analytics and object detection algorithms.',
    date: '2024-02-28',
    category: 'CONSTRUCTION',
    filename: 'cv_safety_proc.bat', 
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', 
    headerColor: 'bg-vivid-green',
    readTime: '5MIN',
    content: 'The construction sector remains one of the highest-risk industries. Machine Learning, specifically YOLO-based object detection, allows for real-time monitoring of PPE compliance.'
  },
  { 
    id: 3, 
    title: 'Geotechnical Site Characterization & ML',
    excerpt: 'Predicting soil liquefaction potential and settlement using regression-based machine learning models.',
    date: '2024-01-12',
    category: 'GEOTECHNICAL',
    filename: 'soil_logic_ext.sys', 
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', 
    headerColor: 'bg-vivid-yellow',
    readTime: '7MIN',
    content: 'Geotechnical engineering deals with high uncertainty. ML algorithms like Random Forests are now used to correlate SPT results with liquefaction potential.'
  },
  { 
    id: 4, 
    title: 'Smart Transportation & Autonomous Grids',
    excerpt: 'Optimizing urban traffic flow and pavement management through reinforcement learning and big data.',
    date: '2023-12-05',
    category: 'TRANSPORT',
    filename: 'traffic_grid.cfg', 
    img: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77?w=800&q=80', 
    headerColor: 'bg-vivid-purple',
    readTime: '8MIN',
    content: 'Transportation engineering is evolving into a discipline of data science. Reinforcement Learning agents are managing adaptive traffic signals.'
  },
  { 
    id: 5, 
    title: 'Hydrological Forecasting with LSTMs',
    excerpt: 'Applying Long Short-Term Memory networks for precise flood stage prediction and urban runoff modeling.',
    date: '2023-11-20',
    category: 'WATER_RES',
    filename: 'flood_stage.exe', 
    img: 'https://images.unsplash.com/photo-1468433965447-33a2a8cf499a?w=800&q=80', 
    headerColor: 'bg-vivid-pink',
    readTime: '6MIN',
    content: 'Water resource management requires handling complex time-series data. LSTM networks are exceptionally effective at capturing temporal dependencies.'
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="w-full bg-pastel-pink py-20 border-b-2 border-black relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-grid"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b-4 border-black pb-8">
            <div className="space-y-2">
              <h2 className="text-5xl font-black tracking-tighter sm:text-7xl text-black uppercase italic">Technical Archive</h2>
              <div className="flex items-center gap-3">
                 <span className="h-4 w-4 bg-black animate-pulse"></span>
                 <p className="text-black font-mono text-base font-black uppercase tracking-[0.2em]">CIVIL_ENG_X_ML.LOG</p>
              </div>
            </div>
            <Link to="/blog" className="group relative inline-block font-black uppercase text-base px-8 py-3 border-4 border-black bg-vivid-yellow shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none">
              Explore All Logs
              <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] px-1.5 py-0.5 border border-white">SYS_ARCHIVE</span>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {/* Stylized "Messy Stack" with 5 cards total */}
          <div className="flex flex-col gap-10 lg:gap-16">
            {/* Top row: 3 cards with slight rotations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              <div className="lg:-rotate-1 hover:rotate-0 transition-all duration-300">
                <BlogCard post={blogPosts[0]} />
              </div>
              <div className="lg:rotate-1 lg:translate-y-4 hover:rotate-0 hover:translate-y-0 transition-all duration-300">
                <BlogCard post={blogPosts[1]} />
              </div>
              <div className="lg:-rotate-2 hover:rotate-0 transition-all duration-300">
                <BlogCard post={blogPosts[2]} />
              </div>
            </div>
            
            {/* Bottom row: 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8 lg:gap-12">
              <div className="lg:w-1/3 lg:rotate-1 hover:rotate-0 transition-all duration-300">
                <BlogCard post={blogPosts[3]} />
              </div>
              <div className="lg:w-1/3 lg:-rotate-1 lg:-translate-y-2 hover:rotate-0 hover:translate-y-0 transition-all duration-300">
                <BlogCard post={blogPosts[4]} />
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
             <div className="inline-block p-4 border-2 border-black border-dashed font-mono text-xs font-black text-gray-500 bg-white/50">
               // DATA_SYNC_COMPLETE // 5_SECTORS_LOADED //
             </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Internal Helper for moderate-sized card
const BlogCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => (
  <div className="group h-full flex flex-col">
    <WindowCard 
      title={post.filename} 
      headerClassName={post.headerColor} 
      className="h-full shadow-retro transition-all duration-300 hover:shadow-retro-lg"
    >
      <div className="flex flex-col h-full bg-white">
        <div className="relative h-48 overflow-hidden border-b-2 border-black">
          <img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-0.5 font-mono text-[10px] font-black border border-white">
            {post.readTime}
          </div>
          <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-retro">
            {post.category}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-lg mb-3 text-black leading-tight group-hover:text-vivid-blue transition-colors line-clamp-2 uppercase italic tracking-tighter">
              {post.title}
            </h3>
            <p className="text-xs font-bold text-gray-700 line-clamp-2 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-100">
             <span className="text-[10px] font-mono font-black text-gray-400">{post.date}</span>
             <Link to="/blog" className="text-[10px] font-mono font-black bg-black text-white px-3 py-1 hover:bg-vivid-pink hover:text-black transition-colors border border-black">
                READ_PROTOCOL >>
             </Link>
          </div>
        </div>
      </div>
    </WindowCard>
  </div>
);

export default Blog;