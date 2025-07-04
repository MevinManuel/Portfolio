// Mock data for the portfolio website
export const portfolioData = {
  hero: {
    name: "Mevin Manuel",
    title: "Frontend Developer & Visual Designer",
    bio: "Creative Frontend Developer & Visual Designer blending code with aesthetics to craft clean, modern user experiences.",
    ctaText: "View Portfolio"
  },
  
  about: {
    bio: "Creative Frontend Developer & Visual Designer blending code with aesthetics to craft clean, modern user experiences.",
    tools: [
      "React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js", 
      "Figma", "Adobe Creative Suite", "Photoshop", "Illustrator", "After Effects"
    ],
    resumeUrl: "/assets/resume-mevin-manuel.pdf" // Mock PDF
  },
  
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      description: "Modern e-commerce platform with seamless user experience",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
      url: "#"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      description: "Intuitive mobile banking interface with clean design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      tags: ["Figma", "Mobile UI", "Prototyping"],
      url: "#"
    },
    {
      id: 3,
      title: "Album Cover Design",
      category: "Graphic Design",
      description: "Creative album artwork for independent artists",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      tags: ["Photoshop", "Illustrator", "Branding"],
      url: "#"
    },
    {
      id: 4,
      title: "Social Media Campaign",
      category: "Digital Marketing",
      description: "Engaging social media visuals for brand campaigns",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["Instagram", "Facebook", "Creative Design"],
      url: "#"
    },
    {
      id: 5,
      title: "Dashboard Interface",
      category: "Web Development",
      description: "Analytics dashboard with interactive data visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["React", "D3.js", "Chart.js"],
      url: "#"
    },
    {
      id: 6,
      title: "Brand Identity",
      category: "Graphic Design",
      description: "Complete brand identity package for tech startup",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop",
      tags: ["Logo Design", "Brand Guidelines", "Typography"],
      url: "#"
    }
  ],
  
  services: [
    {
      id: 1,
      title: "Frontend Development",
      description: "Building responsive, interactive web applications with modern frameworks",
      icon: "Code",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"]
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that enhance user experience",
      icon: "Palette",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      id: 3,
      title: "Graphic Design",
      description: "Designing compelling visual content for digital and print media",
      icon: "Image",
      features: ["Brand Identity", "Print Design", "Digital Assets", "Illustrations"]
    }
  ],
  
  social: {
    linkedin: "https://linkedin.com/in/mevin-manuel",
    github: "https://github.com/mevin-manuel",
    behance: "https://behance.net/mevin-manuel",
    instagram: "https://instagram.com/mevin.manuel"
  }
};

export const contactFormData = {
  name: "",
  email: "",
  message: ""
};