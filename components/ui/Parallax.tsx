import React, { useRef, useEffect } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  horizontal?: boolean;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.1, className = "", horizontal = false }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const value = scrollY * speed;
      
      // Use requestAnimationFrame for smoother performance
      animationFrameId = requestAnimationFrame(() => {
        if (ref.current) {
           if (horizontal) {
            ref.current.style.transform = `translateX(${value}px)`;
           } else {
            ref.current.style.transform = `translateY(${value}px)`;
           }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, horizontal]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Parallax;