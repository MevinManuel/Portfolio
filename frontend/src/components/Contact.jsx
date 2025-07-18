import React, { useState } from 'react';
import { Button } from './ui/button';
import { portfolioData } from '../mockData';
import { Mail, Linkedin, Github, Instagram, Pin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import RhythmClicker from './RhythmClicker'; 

const minimalBlueBg = "/data/25.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  
    

  const socialLinks = [
    { icon: Linkedin, url: portfolioData.social.linkedin, label: 'LinkedIn' },
    { icon: Github, url: portfolioData.social.github, label: 'GitHub' },
    { icon: Instagram, url: portfolioData.social.instagram, label: 'Instagram' },
    { icon: Pin, url: portfolioData.social.pinterest, label: 'Pinterest' }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 bg-slate-800 relative overflow-hidden"
      style={{
        backgroundImage: `url(${minimalBlueBg})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        opacity: 0.9,
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
            <RhythmClicker />
          </div>
          
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Whether you need a website, mobile app, or visual design, let's create something amazing together.
                </p>
                
                <div className="flex items-center text-slate-400">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span>mevinmanuel42@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-slate-800 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 border border-slate-700 transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="ml-3 text-slate-300 group-hover:text-white transition-colors duration-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
