import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import WindowCard from './ui/WindowCard';
import { getMacResponse } from '../services/geminiService';
import ScrollReveal from './ui/ScrollReveal';
import { soundEffects } from '../utils/soundEffects';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I\'m Mac. Ask me anything about this template or retro design.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    soundEffects.playSuccess();
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getMacResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    soundEffects.playTyping();
    setInput(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
       <div className="w-full max-w-4xl">
         <ScrollReveal>
           <Link to="/" className="group mb-6 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                 <ArrowLeft size={16} />
              </div>
              <span>Back to Index</span>
           </Link>
         </ScrollReveal>

         <ScrollReveal delay={150} className="w-full">
            <WindowCard 
              title="ask_mac.exe" 
              className="h-[75vh] w-full shadow-retro-xl"
              headerClassName="bg-blue-600 text-white" 
            >
              <div className="flex h-full flex-col bg-white">
                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 font-mono"
                >
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] sm:max-w-[75%] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] 
                        ${msg.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-[85%] sm:max-w-[75%] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] bg-gray-100 text-black">
                           <div className="flex gap-1.5 items-center h-6 px-1">
                               <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                               <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                               <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
                           </div>
                        </div>
                     </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t-2 border-black bg-gray-100 p-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your query..."
                      className="flex-1 border-2 border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-black/20"
                      autoFocus
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading}
                      className="border-2 border-black bg-blue-600 px-6 py-2 text-white shadow-retro hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all disabled:opacity-50 font-bold flex items-center gap-2"
                    >
                      <Send size={20} />
                      <span className="hidden sm:inline">SEND</span>
                    </button>
                  </div>
                </div>
              </div>
            </WindowCard>
         </ScrollReveal>
       </div>
    </div>
  );
};

export default ChatPage;