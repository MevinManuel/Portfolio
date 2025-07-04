import React from 'react';
import { Button } from './ui/button';
import { portfolioData } from '../data/mockData';

const Hero = ({ scrollToSection }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {portfolioData.hero.name}
          </h1>
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-blue-300 tracking-wide">
            {portfolioData.hero.title}
          </h2>
          
          {/* Bio */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {portfolioData.hero.bio}
          </p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {portfolioData.hero.ctaText}
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full p-1">
            <div className="w-1 h-3 bg-blue-400 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;