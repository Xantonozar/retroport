import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import ChatPage from './components/ChatPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import { MessageSquare } from 'lucide-react';
import { soundEffects } from './utils/soundEffects';
import BootScreen from './components/ui/BootScreen';
import Scanlines from './components/ui/Scanlines';
import CustomCursor from './components/ui/CustomCursor';
import MusicWidget from './components/ui/MusicWidget';

const App: React.FC = () => {
  const location = useLocation();
  const showChatButton = location.pathname !== '/chat';
  
  // Show boot screen only on initial mount
  const [showBoot, setShowBoot] = useState(true);

  // Optional: Check session storage to only show boot screen once per session
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      setShowBoot(false);
    } else {
      sessionStorage.setItem('hasBooted', 'true');
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <Scanlines />
      
      {showBoot ? (
        <BootScreen onComplete={() => setShowBoot(false)} />
      ) : (
        <div className="min-h-screen bg-retro-bg font-sans text-black relative flex flex-col animate-in fade-in duration-1000 overflow-x-hidden">
          <Navbar />
          
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          
          <Footer />

          {/* Floating Chat Button - Hides when on the chat page */}
          {showChatButton && (
            <Link
              to="/chat"
              onClick={() => soundEffects.playClick()}
              onMouseEnter={() => soundEffects.playHover()}
              className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-vivid-yellow shadow-retro-lg transition-all hover:-translate-y-1 hover:shadow-retro-xl active:translate-y-0 active:shadow-retro hover:bg-vivid-pink"
              aria-label="Ask Mac"
            >
              <MessageSquare size={24} strokeWidth={2.5} />
            </Link>
          )}

          {/* Retro Music Widget */}
          <MusicWidget />
        </div>
      )}
    </>
  );
};

export default App;