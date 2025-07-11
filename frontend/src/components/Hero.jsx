import React from 'react';
import { Button } from './ui/button';
import { portfolioData } from '../mockData';
const bgImg = "/data/bg4.jpg";
import { ArrowRight } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      
      
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 z-0 pointer-events-none" />

      <div
        className="relative z-10 px-6 sm:px-10 py-14 sm:py-16 border border-white/20 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full text-center animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 glow-border"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
          backgroundBlendMode: 'darken',
        }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
          {portfolioData.hero.name}
        </h1>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-blue-300 mt-4 tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
          {portfolioData.hero.title}
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 mt-6 max-w-3xl mx-auto leading-relaxed">
          {portfolioData.hero.bio}
        </p>

        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => scrollToSection('portfolio')}
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/30 min-w-[200px]"
          >
            {portfolioData.hero.ctaText}
          </Button>

          <Button
            as="a"
            href="https://mevinportfolio.framer.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fdf6e3] hover:bg-[#f5eedd] text-slate-800 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-yellow-100/50 min-w-[200px] flex items-center justify-center gap-2"
          >
            Design Portfolio
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full p-1">
          <div className="w-1 h-3 bg-blue-400 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
