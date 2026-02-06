import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent scrolling on the main body when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      soundEffects.playMenuOpen();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = (open: boolean) => {
    if (!open) soundEffects.playMenuClose();
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    soundEffects.playClick();
    if (isOpen) toggleMenu(false);
  };

  const links = [
    { name: 'Projects', href: '/projects', isInternal: true },
    { name: 'Blog', href: '/blog', isInternal: true },
    { name: 'About', href: '/about', isInternal: true },
    { name: 'Contact', href: '/contact', isInternal: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b-2 border-black bg-vivid-yellow">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-black bg-white shadow-retro transition-transform group-hover:scale-105 active:scale-95">
              <Coffee size={20} />
            </div>
            <span 
              className="hidden font-mono text-xl font-bold tracking-tight sm:block text-black glitch" 
              data-text="ZADID"
            >
              ZADID
            </span>
          </Link>

          {/* Spacer to fill center area */}
          <div className="flex-1"></div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:gap-8 shrink-0">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-bold text-black hover:underline decoration-2 underline-offset-4 hover:text-gray-800"
                onClick={() => soundEffects.playClick()}
                onMouseEnter={() => soundEffects.playHover()}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => toggleMenu(true)}
              className="p-2 border-2 border-black bg-white shadow-retro transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex md:hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'}`}
      >
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => toggleMenu(false)}
        />
        
        <div 
          className={`relative flex h-full w-[85%] max-w-[300px] flex-col border-r-2 border-black bg-vivid-yellow shadow-retro-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between border-b-2 border-black bg-white p-4">
             <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-black bg-vivid-yellow">
                  <Coffee size={16} />
                </div>
                <span className="font-mono font-bold tracking-tighter">MENU.EXE</span>
             </div>
             <button 
              onClick={() => toggleMenu(false)}
              className="flex items-center justify-center border-2 border-black bg-white p-1 hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Close menu"
             >
               <X size={20} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-retro-bg p-4">
            <nav className="flex flex-col space-y-3">
              {links.map((link, idx) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`group flex items-center border-2 border-transparent px-3 py-3 text-lg font-bold hover:border-black hover:bg-vivid-pink hover:shadow-retro transition-all duration-500 ease-out ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${isOpen ? 100 + (idx * 50) : 0}ms` }}
                  onClick={handleLinkClick}
                >
                  <span className="mr-3 text-gray-400 group-hover:text-black">&gt;</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t-2 border-black bg-white p-4">
             <div className="w-full h-2 border-2 border-black bg-white mb-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-black opacity-20 animate-pulse"></div>
             </div>
             <p className="font-mono text-xs text-center text-gray-500">SYSTEM READY</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;