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
    // 1. Entrance Animation
    const textLines = heroTextRef.current?.querySelectorAll('.animate-line');
    if (textLines) {
      gsap.from(textLines, {
        y: 60,
        rotationX: -45,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    }

    // 2. Floating Animation for Illustration
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
      gsap.to(monitor, {
        x: "+=0.5",
        y: "+=0.5",
        duration: 0.05,
        repeat: -1,
        yoyo: true,
        ease: "none"
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
        y: (i) => i % 2 === 0 ? -15 : 15,
        rotation: (i) => i % 2 === 0 ? 10 : -10,
        duration: (i) => 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!illustrationRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xPos = ((e.clientX - rect.left) / rect.width - 0.5);
      const yPos = ((e.clientY - rect.top) / rect.height - 0.5);

      gsap.to('.hero-decor-far', { x: xPos * -15, y: yPos * -15, duration: 2, ease: "power2.out" });
      gsap.to(decorative, { x: xPos * -40, y: yPos * -40, duration: 1.5, ease: "power2.out" });
      gsap.to(illustrationRef.current, { x: xPos * -20, y: yPos * -20, duration: 1, ease: "power2.out" });
      if (monitor.length) {
        gsap.to(monitor, { rotationY: xPos * 15, rotationX: yPos * -10, duration: 1.2, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 overflow-visible relative perspective-1000">
      <RetroParticles className="hero-decor-far absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply" />
      
      <div className="hero-decor-far absolute inset-0 z-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border-4 border-dashed border-black rounded-full scale-150"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border-4 border-black rotate-12"></div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center relative z-10">
        <div ref={heroTextRef} className="flex flex-col items-start space-y-6 relative z-10 lg:pr-8">
          <h1 className="text-6xl font-black tracking-tight text-black sm:text-7xl lg:text-8xl leading-none">
            <div className="overflow-hidden mb-2">
                <span className="animate-line inline-block glitch" data-text="Hello.">Hello.</span>
            </div>
            <div className="overflow-hidden">
              <span className="animate-line inline-block glitch" data-text="I'm Zadid.">I'm <span className="text-vivid-blue underline decoration-4 underline-offset-4 decoration-vivid-yellow">Zadid.</span></span>
            </div>
          </h1>
          <div className="animate-line">
            <p className="max-w-md text-lg font-medium text-black sm:text-xl leading-relaxed">
              Civil Engineer @ AUST & <span className="underline decoration-2 decoration-vivid-pink">MERN Stack Architect</span>. I bridge the gap between physical structures and digital ecosystems with clean code and bold design.
            </p>
          </div>
          <div className="animate-line pt-4 flex flex-wrap gap-4">
            <RetroButton 
              variant="accent" 
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2"
            >
              <Mail size={20} />
              <span>Initiate Sync</span>
            </RetroButton>

            <RetroButton 
              variant="outline" 
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 bg-white"
            >
              <User size={20} />
              <span>Full Profile</span>
            </RetroButton>
          </div>
        </div>

        <div ref={illustrationRef} className="flex justify-center lg:justify-end relative">
             <div className="flex items-end gap-4 relative z-10 preserve-3d">
                <div className="hero-pen flex flex-col items-center">
                  <div className="mb-2 flex h-32 w-12 flex-col items-center rounded-t-full border-2 border-black bg-vivid-yellow shadow-retro p-2 justify-between">
                      <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                      <PenTool size={32} className="text-black" />
                      <div className="w-full border-t-2 border-black"></div>
                  </div>
                </div>

                <div className="hero-monitor relative rounded-xl border-4 border-black bg-white p-2 shadow-retro-xl">
                    <div className="relative rounded-lg border-2 border-black bg-pastel-blue p-4 md:p-8 overflow-hidden">
                      <div className="flex h-32 w-48 md:h-48 md:w-64 items-center justify-center border-4 border-black bg-white overflow-hidden relative group rounded-sm shadow-inner">
                          <img 
                            src="https://res.cloudinary.com/chirkut/image/upload/v1770391931/WhatsApp_Image_2026-02-06_at_9.30.44_PM_lnzhrq.jpg" 
                            alt="Zadid" 
                            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 animate-monitor-glow"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none mix-blend-overlay"></div>
                      </div>
                    </div>
                    <div className="mx-auto mt-2 h-4 w-32 border-2 border-black bg-white"></div>
                    <div className="mx-auto h-2 w-48 border-2 border-black bg-black"></div>
                </div>
             </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}} />
    </section>
  );
};

export default Hero;