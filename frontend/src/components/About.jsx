import React from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { portfolioData } from '../mockData';

const About = ({ audioContext, isAudioPlaying }) => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = portfolioData.about.resumeUrl;
    link.download = 'Resume_MevinManuel.pdf';
    link.click();
  };

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full mb-16">
            {/* Image */}
            <div className="w-48 h-68 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30">
              <img
                src="/mevin.jpg"
                alt="Mevin Manuel"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {portfolioData.about.bio}
              </p>
              <p className="text-slate-400 leading-relaxed">
                With a foot in both design and dev worlds, I like to keep things fresh — building stuff that’s not just pretty to look at, but smooth to use too.
              </p>
              <Button 
                onClick={handleResumeDownload}
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          <div className="space-y-6 pt-6 w-full">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Tools & Technologies
            </h3>
            <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden h-40 flex justify-center">
              <div className="absolute flex whitespace-nowrap animate-scrollTicker gap-16 text-slate-300 text-1.5xl font-extrabold items-center w-max">
                {[...portfolioData.about.tools, ...portfolioData.about.tools].map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 px-14 py-6 rounded-full border-2 border-slate-700 bg-slate-800 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={`/icons/${tool.toLowerCase().replace(/\s/g, '-')}.svg`}
                      alt={`${tool} icon`}
                      className="w-16 h-16"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-20 space-y-4">
            <h2 className="text-4xl font-bold text-white relative inline-block after:block after:h-1 after:bg-blue-500 after:w-20 after:mx-auto after:mt-2">
              Poster Designs
            </h2>
            <p className="text-slate-400 text-lg">
              I love making bold poster designs, music covers, and graphic art in my free time — check them out!
            </p>
            <button
              onClick={() => window.scrollBy({ top: 500, behavior: 'smooth' })}
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
