import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import { getMacResponse } from '../services/geminiService';
import { soundEffects } from '../utils/soundEffects';

interface ChatModalProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I\'m Mac. Ask me anything about this template or retro design.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play open sound on mount
    soundEffects.playMenuOpen();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleClose = () => {
    soundEffects.playMenuClose();
    onClose();
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-200">
        <WindowCard 
          title="ask_mac.exe" 
          className="h-[500px]"
          headerClassName="bg-blue-600 text-white" 
        >
          {/* Custom Close Button overlaid on WindowCard structure if needed, or just append extra actions */}
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 hover:bg-red-500 hover:text-white border border-black bg-gray-200 z-10"
          >
            <X size={14} />
          </button>

          <div className="flex h-full flex-col bg-white">
            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] 
                    ${msg.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-[80%] border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] bg-gray-100 text-black">
                       <div className="flex gap-1 items-center h-4 px-1">
                           <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                       </div>
                    </div>
                 </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-black bg-gray-100 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your query..."
                  className="flex-1 border-2 border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="border-2 border-black bg-blue-600 p-2 text-white shadow-retro hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </WindowCard>
      </div>
    </div>
  );
};

export default ChatModal;