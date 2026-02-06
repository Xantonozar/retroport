import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Mail, MapPin, Twitter, Github, Linkedin, Terminal, Activity, Zap, Shield, Globe } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';
import { soundEffects } from '../utils/soundEffects';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    soundEffects.playTyping();
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addLog = (msg: string) => {
    setTransmissionLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    soundEffects.playSuccess();
    setIsSubmitting(true);
    setTransmissionLogs(['> INITIALIZING_COMMS_PROTOCOL...']);

    const steps = [
      { msg: 'ESTABLISHING_HANDSHAKE...', delay: 400 },
      { msg: 'ENCRYPTING_PACKETS_AES256...', delay: 800 },
      { msg: 'ROUTING_THROUGH_PROXY_7...', delay: 1200 },
      { msg: 'UPLOADING_DATA_CHUNK...', delay: 1600 },
      { msg: 'TRANSMISSION_COMPLETE_OK', delay: 2000 }
    ];

    steps.forEach((step) => {
      setTimeout(() => addLog(step.msg), step.delay);
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start lg:justify-center">
      <div className="w-full max-w-6xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <Link to="/" className="group inline-flex items-center gap-2 font-mono text-sm font-black uppercase tracking-wider hover:text-vivid-pink transition-colors">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white shadow-retro transition-transform group-hover:-translate-x-1">
                <ArrowLeft size={18} />
              </div>
              <span className="text-black text-lg">Exit to Home</span>
            </Link>

            <div className="flex items-center gap-3 font-mono text-sm font-black bg-black text-white px-4 py-2 border-2 border-black shadow-retro">
              <Terminal size={16} className="text-vivid-green" />
              <span>C:\ZADID_OS\USER\COMMS\OUTBOX.EXE</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: System Info & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ScrollReveal delay={100}>
              <WindowCard title="system_identity.dat" headerClassName="bg-vivid-blue">
                <div className="p-6 bg-white space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 border-4 border-black bg-pastel-blue mb-4 flex items-center justify-center shadow-retro overflow-hidden group">
                      <img 
                        src="/zadid.jpg" 
                        onError={(e) => {
                           e.currentTarget.src = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop";
                           e.currentTarget.onerror = null;
                        }}
                        alt="Profile avatar" 
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl font-black uppercase tracking-tighter">ZADID_UNIT_01</h2>
                      <p className="text-xs font-mono font-black text-gray-500 uppercase">Status: Available_For_Sync</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-black pt-4 space-y-4">
                    <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 border-2 border-black bg-vivid-yellow flex items-center justify-center shadow-retro group-hover:translate-x-1 transition-transform">
                        <Mail size={16} />
                      </div>
                      <span className="font-mono text-xs font-black truncate">HELLO@ZADID.DESIGN</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 border-2 border-black bg-vivid-pink flex items-center justify-center shadow-retro group-hover:translate-x-1 transition-transform">
                        <MapPin size={16} />
                      </div>
                      <span className="font-mono text-xs font-black uppercase">Retro_Sector_Web</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 border-2 border-black bg-vivid-green flex items-center justify-center shadow-retro group-hover:translate-x-1 transition-transform">
                        <Globe size={16} />
                      </div>
                      <span className="font-mono text-xs font-black uppercase">WWW.ZADID_OS.COM</span>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-black text-white p-5 border-4 border-black shadow-retro relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-vivid-green/30 animate-scan"></div>
                <div className="font-mono text-[10px] font-black uppercase text-gray-500 mb-4 flex justify-between">
                  <span>Connection_Matrix</span>
                  <Zap size={10} className="text-vivid-yellow" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[Twitter, Github, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="aspect-square border-2 border-white bg-transparent hover:bg-vivid-pink flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} className="hidden lg:block flex-1">
              <div className="border-4 border-black bg-white p-4 h-full relative font-mono text-[10px] font-black opacity-20 flex flex-col justify-center gap-2 pointer-events-none select-none">
                 <div className="text-center mb-4">-- ASCII_ART_BUFFER --</div>
                 <div className="whitespace-pre mx-auto leading-none">
{`   _____ 
  /     \\
 | () () |
  \\  ^  /
   |||||
   |||||`}
                 </div>
                 <div className="text-center mt-4">SECURE_HANDSHAKE_V3.1</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-8">
            <ScrollReveal delay={150}>
              <WindowCard 
                title="secure_transmission_portal.exe" 
                className="w-full shadow-retro-xl h-full"
                headerClassName="bg-vivid-yellow" 
              >
                <div className="flex flex-col bg-white h-full">
                  
                  {/* Form Console Header */}
                  <div className="bg-gray-100 border-b-2 border-black p-4 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-vivid-blue" />
                        <span className="font-mono text-[10px] font-black uppercase">ENCRYPTION: AES_256</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-vivid-green" />
                        <span className="font-mono text-[10px] font-black uppercase">Latency: 12ms</span>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] font-black bg-black text-white px-2 py-0.5">READY</div>
                  </div>

                  <div className="p-6 lg:p-10 flex flex-col gap-8 bg-white">
                    {isSuccess ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-vivid-green border-4 border-black shadow-retro flex items-center justify-center mb-6">
                          <Zap size={40} className="text-black" />
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-center">Data Sent!</h3>
                        <p className="font-mono text-sm font-black text-gray-500 mt-2 text-center">YOUR_MESSAGE_HAS_BEEN_DIGITIZED_AND_ROUTED</p>
                        <button 
                          onClick={() => setIsSuccess(false)}
                          className="mt-8 font-mono text-xs font-black underline hover:text-vivid-pink uppercase"
                        >
                          Send Another Packet?
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block font-black text-xs uppercase tracking-widest font-mono text-gray-600">User_Name</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-400">#</span>
                              <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-4 border-black p-3 pl-8 font-mono text-sm font-black focus:outline-none focus:ring-4 focus:ring-vivid-yellow/30 bg-white shadow-retro transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
                                placeholder="ANONYMOUS_USER"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block font-black text-xs uppercase tracking-widest font-mono text-gray-600">Return_Path</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-400">@</span>
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-4 border-black p-3 pl-8 font-mono text-sm font-black focus:outline-none focus:ring-4 focus:ring-vivid-yellow/30 bg-white shadow-retro transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
                                placeholder="EMAIL@PROTOCOL.COM"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-black text-xs uppercase tracking-widest font-mono text-gray-600">Payload_Data</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full border-4 border-black p-4 font-mono text-sm font-black focus:outline-none focus:ring-4 focus:ring-vivid-yellow/30 bg-black text-vivid-green shadow-retro transition-all focus:translate-x-1 focus:translate-y-1 focus:shadow-none resize-none"
                            placeholder="TYPE_YOUR_MESSAGE_HERE..."
                          />
                        </div>

                        {/* Terminal Logs Viewport */}
                        {(isSubmitting || transmissionLogs.length > 0) && (
                          <div className="bg-black border-2 border-black p-3 h-28 font-mono text-[10px] text-vivid-green space-y-1 overflow-hidden shadow-inner">
                            {transmissionLogs.map((log, idx) => (
                              <div key={idx} className={idx === transmissionLogs.length - 1 ? 'animate-pulse' : 'opacity-70'}>{log}</div>
                            ))}
                            {isSubmitting && <div>&gt; ... <span className="animate-ping">_</span></div>}
                          </div>
                        )}

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                          <RetroButton 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 py-4 flex items-center justify-center gap-3 !shadow-retro-lg active:!shadow-none"
                          >
                            <Send size={20} strokeWidth={3} className={isSubmitting ? 'animate-pulse' : ''} />
                            <span className="text-lg uppercase">{isSubmitting ? 'TRANSMITTING...' : 'INITIATE_TRANSFER'}</span>
                          </RetroButton>
                          
                          <button 
                            type="reset" 
                            onClick={() => setFormData({name: '', email: '', message: ''})}
                            className="px-6 py-4 border-4 border-black font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
                          >
                            Purge_Buffer
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Footer Stats Bar */}
                  <div className="mt-auto border-t-2 border-black bg-gray-50 p-3 flex items-center justify-between font-mono text-[9px] font-black uppercase text-gray-500">
                    <div className="flex gap-4">
                      <span>MTU: 1500</span>
                      <span>HOP_COUNT: 4</span>
                      <span>PORT: 8080</span>
                    </div>
                    <div className="flex gap-4">
                      <span>SESSION_ID: {Math.random().toString(16).substring(2, 8).toUpperCase()}</span>
                      <span className="text-black">COMMS_LINK_ACTIVE</span>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;