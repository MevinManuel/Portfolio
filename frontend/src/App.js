import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [audioContext, setAudioContext] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleAudioContextChange = (context) => {
    setAudioContext(context);
    setIsAudioPlaying(context !== null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App min-h-screen bg-slate-900">
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <About 
          audioContext={audioContext} 
          isAudioPlaying={isAudioPlaying}
        />
        <Portfolio />
        <Services />
        <Contact />
      </main>
      
      <AudioPlayer onAudioContextChange={handleAudioContextChange} />
      <Toaster />
    </div>
  );
}

export default App;