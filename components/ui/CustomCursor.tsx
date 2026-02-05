import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor via JS only when component mounts
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, .cursor-pointer');
      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    // Hide cursor when leaving window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      // Restore cursor on unmount
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      {/* Main Cursor Shape */}
      <div 
        className={`
          flex items-center justify-center transition-all duration-200 ease-out
          ${isHovering ? 'h-10 w-10' : 'h-6 w-6'}
          ${isClicking ? 'scale-75' : 'scale-100'}
        `}
      >
        <div className={`
           relative h-full w-full rounded-full border-2 border-white bg-white/20 backdrop-invert transition-all duration-200
        `}>
            {/* Crosshair details inside when not hovering */}
            {!isHovering && (
                <>
                    <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-white"></div>
                    <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 bg-white"></div>
                </>
            )}
            
            {/* Subtle indicator for hover state without changing to a box */}
            {isHovering && (
              <div className="absolute inset-0 m-1 rounded-full border border-white/40"></div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;