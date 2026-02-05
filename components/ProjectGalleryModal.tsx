import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

interface Project {
  id: number;
  title: string;
  filename: string;
  description: string;
  imageUrl: string;
  color: string;
  images: string[];
}

interface ProjectGalleryModalProps {
  project: Project;
  onClose: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
}

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose, onNextProject, onPrevProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomState, setZoomState] = useState({ x: 50, y: 50, isHovering: false });
  const navigate = useNavigate();

  // Reset current index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEffects.playClick();
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEffects.playClick();
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const goToDetail = () => {
    navigate(`/project/${project.id}`);
  };

  const handleClose = () => {
      soundEffects.playMenuClose();
      onClose();
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomState.isHovering) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomState(prev => ({ ...prev, x, y }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl relative h-full max-h-[90vh] flex flex-col">
        {/* Close button outside/corner for easy access */}
        <button 
            onClick={handleClose}
            className="absolute -top-4 -right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-vivid-pink shadow-retro hover:scale-110 transition-transform active:scale-95"
            aria-label="Close Gallery"
        >
            <X size={20} strokeWidth={3} />
        </button>

        <WindowCard 
          title={`gallery_viewer.exe - ${project.title}`} 
          className="h-full flex flex-col shadow-2xl"
          headerClassName="bg-black text-white"
        >
          <div className="flex flex-col h-full bg-gray-100 overflow-hidden">
            {/* Main Image Viewport */}
            <div 
                className="relative flex-1 bg-dots bg-gray-50 flex items-center justify-center overflow-hidden border-b-2 border-black cursor-crosshair group"
                onMouseEnter={() => setZoomState(prev => ({ ...prev, isHovering: true }))}
                onMouseLeave={() => setZoomState(prev => ({ ...prev, isHovering: false }))}
                onMouseMove={handleMouseMove}
            >
              {/* Zoom Hint Overlay */}
              <div className={`absolute top-4 right-4 z-20 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono flex items-center gap-1 transition-opacity duration-300 pointer-events-none ${zoomState.isHovering ? 'opacity-0' : 'opacity-100'}`}>
                <ZoomIn size={12} />
                <span>HOVER TO ZOOM</span>
              </div>

              {/* The Image */}
              <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center">
                  <img 
                    src={project.images[currentIndex]} 
                    alt={`Gallery image ${currentIndex + 1}`} 
                    className="max-w-full max-h-full object-contain transition-transform duration-100 ease-out will-change-transform shadow-lg bg-white"
                    style={{
                        transform: zoomState.isHovering ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomState.x}% ${zoomState.y}%`
                    }}
                    key={currentIndex} 
                  />
              </div>
              
              {/* Overlay Controls - Only show if not zooming to avoid obstruction, or keep them but ensure z-index */}
              <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between p-4 pointer-events-none z-30 transition-opacity duration-300 ${zoomState.isHovering ? 'opacity-0' : 'opacity-100'}`}>
                <button 
                  onClick={handlePrev}
                  className="pointer-events-auto p-3 rounded-full bg-white border-2 border-black shadow-retro hover:translate-y-1 hover:shadow-none hover:bg-vivid-yellow transition-all disabled:opacity-50 group"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleNext}
                  className="pointer-events-auto p-3 rounded-full bg-white border-2 border-black shadow-retro hover:translate-y-1 hover:shadow-none hover:bg-vivid-yellow transition-all disabled:opacity-50 group"
                  aria-label="Next Image"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Counter Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-black text-white px-3 py-1 font-mono text-xs border-2 border-white shadow-retro pointer-events-none">
                IMG_{String(currentIndex + 1).padStart(2, '0')}_OF_{String(project.images.length).padStart(2, '0')}
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="bg-white p-4 border-t-2 border-gray-100 shrink-0">
               <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                   {/* Thumbnails */}
                   <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto max-w-full md:max-w-xl scrollbar-hide">
                     {project.images.map((img, idx) => (
                       <button
                         key={idx}
                         onClick={() => {
                             soundEffects.playClick();
                             setCurrentIndex(idx);
                         }}
                         className={`h-12 w-12 md:h-16 md:w-16 flex-shrink-0 border-2 transition-all relative overflow-hidden group ${
                           idx === currentIndex ? 'border-black opacity-100 ring-2 ring-vivid-yellow ring-offset-2' : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-black'
                         }`}
                       >
                         <img src={img} className="h-full w-full object-cover" alt={`thumbnail ${idx + 1}`} />
                         {/* Selection indicator overlay */}
                         {idx === currentIndex && <div className="absolute inset-0 bg-vivid-yellow/20 mix-blend-multiply"></div>}
                       </button>
                     ))}
                   </div>

                   {/* Actions */}
                   <div className="flex gap-2 w-full md:w-auto shrink-0">
                      {onPrevProject && (
                        <RetroButton variant="outline" onClick={(e) => { e.stopPropagation(); onPrevProject(); }} className="px-3" title="Previous Project">
                          <ChevronLeft size={18} />
                        </RetroButton>
                      )}
                      
                      {onNextProject && (
                        <RetroButton variant="outline" onClick={(e) => { e.stopPropagation(); onNextProject(); }} className="px-3" title="Next Project">
                           <ChevronRight size={18} />
                        </RetroButton>
                      )}
                      
                      <RetroButton variant="secondary" onClick={handleClose} className="flex-1 md:flex-none py-2 text-sm">
                        Close
                      </RetroButton>
                      <RetroButton variant="primary" onClick={goToDetail} className="flex-1 md:flex-none py-2 text-sm">
                        Project Details
                      </RetroButton>
                   </div>
               </div>
            </div>
          </div>
        </WindowCard>
      </div>
    </div>
  );
};

export default ProjectGalleryModal;
