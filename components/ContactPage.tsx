import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Mail, MapPin, Twitter, Github, Linkedin } from 'lucide-react';
import WindowCard from './ui/WindowCard';
import RetroButton from './ui/RetroButton';
import ScrollReveal from './ui/ScrollReveal';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      alert(`Thanks ${formData.name}! Your message has been transmitted.`);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-retro-bg py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl">
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
              title="contact_form.exe" 
              className="w-full shadow-retro-xl"
              headerClassName="bg-vivid-yellow" 
            >
              <div className="flex flex-col lg:flex-row bg-white min-h-[500px]">
                {/* Contact Info Sidebar */}
                <div className="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-pastel-blue p-8 flex flex-col gap-8">
                    <div>
                        <h2 className="text-3xl font-black mb-4">Get in Touch</h2>
                        <p className="font-medium text-gray-700 leading-relaxed">
                            Have a project in mind or just want to say hi? Fill out the form or reach out through the digital ether.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-retro">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase text-gray-500">Email</div>
                                <div className="font-mono text-sm font-bold">hello@mac.design</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-retro">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase text-gray-500">Location</div>
                                <div className="font-mono text-sm font-bold">Retro City, Web</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="text-xs font-bold uppercase text-gray-500 mb-3">Socials</div>
                        <div className="flex gap-3">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border-2 border-black bg-white hover:bg-vivid-pink flex items-center justify-center shadow-retro hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-retro-lg transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 p-8 lg:p-12 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block font-bold text-sm uppercase tracking-wide">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-vivid-yellow/50 focus:border-black transition-all bg-gray-50"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block font-bold text-sm uppercase tracking-wide">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-vivid-yellow/50 focus:border-black transition-all bg-gray-50"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block font-bold text-sm uppercase tracking-wide">Message</label>
                            <textarea 
                                id="message" 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-vivid-yellow/50 focus:border-black transition-all bg-gray-50 resize-none"
                                placeholder="Type your message here..."
                            />
                        </div>

                        <RetroButton 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2"
                            fullWidth
                        >
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    <Send size={18} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </RetroButton>
                    </form>
                </div>
              </div>
            </WindowCard>
         </ScrollReveal>
      </div>
    </div>
  );
};

export default ContactPage;