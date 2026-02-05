import React from 'react';
import WindowCard from './ui/WindowCard';
import ScrollReveal from './ui/ScrollReveal';
import { User, Heart, Coffee, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full bg-vivid-green py-16 border-b-2 border-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column - Image/Avatar */}
            <div className="w-full lg:w-1/3 flex justify-center">
                <div className="relative group">
                    <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                    <div className="relative border-2 border-black bg-white p-2 w-64 h-64 sm:w-80 sm:h-80">
                        <img 
                            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000&auto=format&fit=crop" 
                            alt="Profile" 
                            className="w-full h-full object-cover grayscale contrast-125"
                        />
                        {/* Decorative corner elements */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-vivid-pink"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-vivid-pink"></div>
                    </div>
                </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="w-full lg:w-2/3">
                <WindowCard title="bio.txt" className="shadow-retro-lg" headerClassName="bg-vivid-purple">
                    <div className="p-8 bg-white font-mono text-sm sm:text-base leading-relaxed space-y-6">
                        <p>
                            <span className="font-bold bg-vivid-yellow px-1 text-black">HELLO_WORLD!</span> I'm Mac, a creative developer with a passion for retro aesthetics and clean code.
                        </p>
                        <p>
                            Based in the digital realm, I specialize in building responsive websites that invoke nostalgia while delivering modern performance. My design philosophy is rooted in the bold, brutalist styles of the early web, fused with contemporary UX principles.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Coffee size={24} />
                                <span className="font-bold text-xs uppercase">Caffeine Powered</span>
                            </div>
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Heart size={24} />
                                <span className="font-bold text-xs uppercase">Pixel Perfect</span>
                            </div>
                            <div className="border-2 border-black p-4 flex flex-col items-center gap-2 text-center hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Cpu size={24} />
                                <span className="font-bold text-xs uppercase">Full Stack</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-xs mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                            > Current Status: Available for freelance<br/>
                            > Location: Remote / Earth
                        </p>
                    </div>
                </WindowCard>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;