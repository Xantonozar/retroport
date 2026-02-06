import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Minus, Square, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import gsap from 'gsap';

const TRACKS = [
  {
    title: "NEON_NIGHTS_V2.MID",
    artist: "ZADID_CHIPTUNES",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1550741827-4bd374c3f58b?w=200&h=200&fit=crop&q=80"
  },
  {
    title: "CYBER_DREAM_X.MID",
    artist: "VIRTUAL_OS",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=200&h=200&fit=crop&q=80"
  },
  {
    title: "LOFI_BUFFER_01.MID",
    artist: "ZADID_CORE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=200&h=200&fit=crop&q=80"
  }
];

const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
    }
    setIsPlaying(!isPlaying);
    soundEffects.playClick();
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(false); // Reset play state for new load
    soundEffects.playClick();
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(false);
    soundEffects.playClick();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  // Effect for visualizer bars
  useEffect(() => {
    if (isPlaying && visualizerRef.current) {
      const bars = visualizerRef.current.children;
      gsap.to(bars, {
        height: () => Math.random() * 100 + "%",
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
        ease: "power1.inOut"
      });
    } else if (visualizerRef.current) {
      gsap.killTweensOf(visualizerRef.current.children);
      gsap.to(visualizerRef.current.children, { height: "20%", duration: 0.3 });
    }
  }, [isPlaying]);

  // Effect for cover rotation
  useEffect(() => {
    if (isPlaying && coverRef.current) {
      gsap.to(coverRef.current, {
        rotation: "+=360",
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    } else {
      gsap.killTweensOf(coverRef.current);
    }
  }, [isPlaying]);

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ease-in-out ${isMinimized ? 'w-12 h-12 overflow-hidden' : 'w-80 sm:w-96'}`}>
      {/* Audio Element */}
      <audio 
        key={currentTrackIndex} // Force reload on track change
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        autoPlay={isPlaying} // Resume playing if was already playing
      />

      {/* Minimized Trigger */}
      {isMinimized && (
        <button 
          onClick={() => { setIsMinimized(false); soundEffects.playMenuOpen(); }}
          className="flex h-12 w-12 items-center justify-center border-4 border-black bg-vivid-blue shadow-retro hover:scale-110 transition-transform"
        >
          <Music size={20} className={isPlaying ? 'animate-bounce' : ''} />
        </button>
      )}

      {/* Player Window */}
      {!isMinimized && (
        <div className="flex flex-col border-4 border-black bg-white shadow-retro-lg animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b-4 border-black bg-black px-3 py-1 text-white">
            <div className="flex items-center gap-2">
              <Music size={14} className="text-vivid-blue" />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">player.exe</span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => { setIsMinimized(true); soundEffects.playMenuClose(); }}
                className="flex h-5 w-5 items-center justify-center border-2 border-white bg-gray-800 hover:bg-vivid-blue hover:text-black transition-colors"
              >
                <Minus size={12} />
              </button>
              <button className="flex h-5 w-5 items-center justify-center border-2 border-white bg-gray-800 hover:bg-red-500 transition-colors">
                <Square size={8} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex p-4 gap-4 bg-retro-bg/30">
            {/* Cover Art Viewport */}
            <div className="relative h-24 w-24 flex-shrink-0 border-4 border-black bg-black overflow-hidden shadow-retro group">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-30 bg-scanlines bg-[length:100%_2px]"></div>
              
              {/* Image Container with rotation */}
              <div ref={coverRef} className="h-full w-full p-1">
                 <img 
                   src={currentTrack.cover} 
                   alt="Cover" 
                   className="h-full w-full object-cover grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 rounded-full border-2 border-white/20" 
                 />
              </div>

              {/* Center hole for "Vinyl" look */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-white rounded-full z-20"></div>
              
              <div className="absolute inset-0 bg-vivid-blue/10 mix-blend-multiply pointer-events-none"></div>
            </div>

            {/* Info & Controls */}
            <div className="flex flex-1 flex-col justify-between overflow-hidden">
              <div className="overflow-hidden mb-2">
                <div className="font-mono text-[10px] font-black text-black opacity-50 uppercase mb-0.5">Currently playing:</div>
                <div className={`whitespace-nowrap font-mono text-sm font-black uppercase ${isPlaying ? 'animate-marquee' : ''}`}>
                  {currentTrack.title} — {currentTrack.artist}
                </div>
              </div>

              {/* Visualizer */}
              <div ref={visualizerRef} className="flex h-8 items-end gap-1 px-1 opacity-60 mb-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-black" style={{ height: '20%' }}></div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Transport Controls */}
                <div className="flex gap-1">
                   <button 
                     onClick={prevTrack}
                     className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro hover:bg-vivid-pink active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                   >
                     <SkipBack size={14} fill="black" />
                   </button>
                   <button 
                     onClick={togglePlay}
                     className="flex h-10 w-10 items-center justify-center border-2 border-black bg-vivid-yellow shadow-retro hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                   >
                     {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-1" />}
                   </button>
                   <button 
                     onClick={nextTrack}
                     className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro hover:bg-vivid-pink active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                   >
                     <SkipForward size={14} fill="black" />
                   </button>
                </div>
                
                {/* Progress Bar Area */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between font-mono text-[8px] font-bold text-gray-500">
                    <span>BUFF_0x{currentTrackIndex}</span>
                    <Volume2 size={10} />
                  </div>
                  <div className="h-2 w-full border-2 border-black bg-gray-200 p-[1px]">
                    <div 
                      className="h-full bg-vivid-blue transition-all duration-300 relative" 
                      style={{ width: `${progress}%` }}
                    >
                      {/* Progress bead */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-black"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex h-6 items-center border-t-2 border-black bg-black px-3">
             <div className="w-full overflow-hidden flex gap-8 items-center">
                <div className="flex gap-1">
                   <div className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-vivid-green animate-pulse' : 'bg-red-500'}`}></div>
                   <div className="h-1.5 w-1.5 rounded-full bg-vivid-blue"></div>
                </div>
                <span className="font-mono text-[8px] text-vivid-green uppercase tracking-[0.2em] whitespace-nowrap animate-scan">
                   PCM_16BIT_44.1KHZ_STEREO_LINK_ESTABLISHED_OK
                </span>
             </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-150%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}} />
    </div>
  );
};

export default MusicWidget;