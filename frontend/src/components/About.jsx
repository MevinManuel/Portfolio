import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mockData';
import { Download } from 'lucide-react';
import RhythmClicker from './RhythmClicker';

const About = ({ audioContext, isAudioPlaying }) => {
  const handleResumeDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = portfolioData.about.resumeUrl;
    link.download = 'Mevin-Manuel-Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Bio & Resume */}
            <div className="lg:col-span-1 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {portfolioData.about.bio}
              </p>
              
              <p className="text-slate-400 leading-relaxed">
                With years of experience in both development and design, I bring a unique perspective to every project. 
                I believe in creating digital experiences that are not only visually stunning but also highly functional and user-friendly.
              </p>
              
              {/* Resume Download Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleResumeDownload}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Tools & Skills */}
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Tools & Technologies
                </h3>
                
                <div className="grid gap-4">
                  {/* Development Tools */}
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Development</h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.about.tools.slice(0, 6).map((tool, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-slate-800 text-slate-300 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Design & Other Tools */}
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Other</h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.about.tools.slice(6).map((tool, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-slate-800 text-slate-300 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Mini Game */}
            <div className="lg:col-span-2">
              <RhythmClicker 
                audioContext={audioContext} 
                isAudioPlaying={isAudioPlaying}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;