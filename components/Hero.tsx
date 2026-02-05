import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RetroButton from './ui/RetroButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PenTool, Mail, User } from 'lucide-react';
import RetroParticles from './ui/RetroParticles';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. Entrance Animation - Text Stagger
    const textElements = heroTextRef.current?.children;
    if (textElements) {
      gsap.from(textElements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
      });
    }

    // 2. Continuous Floating Animation for Illustration Elements
    // Use scoped selector for safety
    const q = gsap.utils.selector(containerRef);
    const monitor = q('.hero-monitor');
    const pen = q('.hero-pen');
    const decorative = q('.hero-decor');

    if (monitor.length > 0) {
      gsap.to(monitor, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (pen.length > 0) {
      gsap.to(pen, {
        y: -25,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });
    }
    
    if (decorative.length > 0) {
      gsap.to(decorative, {
        y: -10,
        duration: 4,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // 3. Mouse Move Parallax
    const onMouseMove = (e: MouseEvent) => {
      if (!illustrationRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5);
      const yPos = (clientY / window.innerHeight - 0.5);

      // Move illustration container opposite to mouse
      gsap.to(illustrationRef.current, {
        x: xPos * -30,
        y: yPos * -30,
        duration: 1,
        ease: "power2.out"
      });

      // Move individual elements for depth - reusing scoped selectors
      if (monitor.length) {
        gsap.to(monitor, {
            x: xPos * -20,
            rotation: xPos * -5,
            duration: 1.2,
            ease: "power2.out"
        });
      }

      if (pen.length) {
        gsap.to(pen, {
            x: xPos * -50,
            rotation: xPos * 10,
            duration: 1.2,
            ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 overflow-visible relative">
      {/* Background Particles */}
      <RetroParticles className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-multiply" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center relative z-10">
        
        {/* Text Content */}
        <div ref={heroTextRef} className="flex flex-col items-start space-y-6 relative z-10 lg:pr-8">
          <h1 className="text-6xl font-black tracking-tight text-black sm:text-7xl lg:text-8xl leading-none">
            <div className="overflow-hidden">
                <span className="inline-block glitch" data-text="Hello.">Hello.</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block">I'm <span className="text-vivid-blue underline decoration-4 underline-offset-4 decoration-vivid-yellow glitch" data-text="Mac.">Mac.</span></span>
            </div>
          </h1>
          <p className="max-w-md text-lg font-medium text-black sm:text-xl leading-relaxed">
            I'm a free retro Webflow template made by <span className="underline decoration-2 decoration-vivid-pink">Mackenzie Child</span>.
            Recreated in React with vivid colors and Tailwind CSS.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <RetroButton 
              variant="accent" 
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </RetroButton>

            <RetroButton 
              variant="outline" 
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 bg-white"
            >
              <User size={20} />
              <span>About Me</span>
            </RetroButton>
          </div>
        </div>

        {/* Illustration Area */}
        <div ref={illustrationRef} className="flex justify-center lg:justify-end relative">
             {/* Background Geometric Elements */}
             <div className="hero-decor absolute -left-12 top-10 pointer-events-none z-0">
                <div className="text-6xl text-vivid-pink font-black opacity-80">×</div>
             </div>
             
             <div className="hero-decor absolute -left-8 -top-8 z-0">
                <div className="text-4xl text-vivid-blue font-black opacity-80">°</div>
             </div>
              
             <div className="hero-decor absolute -right-12 top-20 z-0">
                <div className="h-6 w-6 rounded-full border-2 border-black bg-vivid-green"></div>
             </div>
              
             {/* Main Illustration Container */}
             <div className="flex items-end gap-4 relative z-10">
                {/* The Pen */}
                <div className="hero-pen flex flex-col items-center">
                  <div className="mb-2 flex h-32 w-12 flex-col items-center rounded-t-full border-2 border-black bg-vivid-yellow shadow-retro p-2 justify-between">
                      <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                      <PenTool size={32} className="text-black" />
                      <div className="w-full border-t-2 border-black"></div>
                  </div>
                </div>

                {/* The Monitor */}
                <div className="hero-monitor relative rounded-xl border-4 border-black bg-white p-2 shadow-retro-xl">
                    <div className="relative rounded-lg border-2 border-black bg-pastel-blue p-4 md:p-8">
                      {/* Screen Content - Rectangular */}
                      <div className="flex h-32 w-48 md:h-48 md:w-64 items-center justify-center border-4 border-black bg-white overflow-hidden relative group rounded-sm shadow-inner">
                          <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                            alt="Retro Interface" 
                            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none mix-blend-overlay"></div>
                      </div>
                    </div>
                    {/* Monitor Base */}
                    <div className="mx-auto mt-2 h-4 w-32 border-2 border-black bg-white"></div>
                    <div className="mx-auto h-2 w-48 border-2 border-black bg-black"></div>
                </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;