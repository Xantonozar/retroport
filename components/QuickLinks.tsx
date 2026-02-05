import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const QuickLinks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  
  const items = [
    { label: 'Blog', href: '#blog', color: 'bg-vivid-pink' },
    { label: 'Projects', href: '#projects', color: 'bg-vivid-blue' },
    { label: 'About', href: '#/about', color: 'bg-vivid-green' },
    { label: 'Contact', href: '#/contact', color: 'bg-vivid-yellow' },
    { label: 'Resume', href: '#', color: 'bg-vivid-purple' },
  ];

  // Duplicate items multiple times to ensure we have enough content to scroll seamlessly
  // and cover extra width due to rotation
  const marqueeItems = [...items, ...items, ...items, ...items];

  useGSAP(() => {
    if (trackRef.current) {
        tweenRef.current = gsap.to(trackRef.current, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1,
        });
    }
  }, { scope: containerRef });

  return (
    <section 
        ref={containerRef} 
        className="w-full border-y-2 border-black bg-white py-24 md:py-48 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-20 z-0"></div>

      {/* Tilted Marquee Container */}
      <div 
        className="absolute w-[180%] md:w-[150%] -rotate-[15deg] bg-white border-y-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
         {/* Sliding Track */}
         <div ref={trackRef} className="flex w-fit">
            {marqueeItems.map((item, index) => (
                <a 
                    key={`${item.label}-${index}`}
                    href={item.href}
                    className={`
                        group relative flex items-center gap-2 md:gap-4 px-6 py-4 md:px-12 md:py-8
                        text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter
                        transition-colors hover:bg-black hover:text-white
                        border-r-4 border-black shrink-0
                        ${item.color}
                    `}
                >
                    <span className="relative z-10">{item.label}</span>
                    <ArrowUpRight 
                        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 w-6 h-6 md:w-10 md:h-10" 
                    />
                </a>
            ))}
         </div>
      </div>
    </section>
  );
};

export default QuickLinks;