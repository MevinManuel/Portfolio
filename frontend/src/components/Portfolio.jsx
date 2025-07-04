import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { portfolioData } from '../data/mockData';
import { ExternalLink, Eye } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Development', 'Mobile Development', 'Machine Learning', 'Computer Vision', 'Creative Coding', 'Programming'];
  
  const filteredProjects = filter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in development and design
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className={`transition-all duration-300 ${
                filter === category 
                  ? 'bg-blue-500 hover:bg-blue-400 text-white' 
                  : 'border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-300'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-slate-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-400 text-white w-full"
                      onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {project.category}
                  </Badge>
                  <ExternalLink 
                    className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors duration-300 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.url, '_blank', 'noopener,noreferrer');
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="outline"
                      className="text-xs border-slate-600 text-slate-400 hover:border-blue-500 hover:text-blue-300 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;