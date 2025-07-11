// Mock data for the portfolio website
export const portfolioData = {
  hero: {
    name: "Mevin Manuel",
    title: "Frontend Developer & Visual Designer",
    bio: "Creative Frontend Developer & Visual Designer blending code with aesthetics to craft clean, modern user experiences.",
    ctaText: "View Portfolio"
  },
  
  about: {
    bio: "Creative Frontend Developer & Visual Designer blending code and creativity to build sleek, stylish interfaces that just feels right.",
    tools: [
      "React", "React Native", "JavaScript", "Python", "C++", "C", 
      "Figma", "Streamlit", "Framer", "CSS", "HTML", "Git"
    ],
    resumeUrl: "/Resume_MevinManuel.pdf" // PDF
  },
  
  projects: [
    {
      id: 1,
      title: "Bits - Game App",
      category: "Mobile Development",
      description: "A collection of fun mini-games built with React Native, featuring Snake, 2048, Wordle, and more. Swipe, tap, and play—all in one app!",
      image: "/portfolio/01.png",
      tags: ["React Native", "JavaScript", "Mobile Games"],
      url: "https://github.com/MevinManuel/Bits"
    },
    {
      id: 2,
      title: "PyCar Game",
      category: "Computer Vision",
      description: "A Python game that uses real-time finger tracking with MediaPipe to control a car on screen. Powered by OpenCV and Pygame for a touchless gaming experience.",
      image: "/portfolio/1.png",
      tags: ["Python", "OpenCV", "MediaPipe", "Pygame"],
      url: "https://github.com/MevinManuel/PyCar_game"
    },
    {
      id: 3,
      title: "Spam Classifier App",
      category: "Machine Learning",
      description: "Streamlit app for SMS spam detection using Naive Bayes and NLP. Clean interface for real-time spam classification.",
      image: "/portfolio/10.png",
      tags: ["Python", "Streamlit", "NLP", "Machine Learning"],
      url: "https://github.com/MevinManuel/spam-classifier-app"
    },
    {
      id: 6,
      title: "AGT - ASCII Glitch Terminal",
      category: "Creative Coding",
      description: "ASCII Glitch Art Generator using Flask + Dithering. Transform images into stunning ASCII art with glitch effects.",
      image: "/portfolio/11.png",
      tags: ["Python", "Flask", "ASCII Art", "Image Processing"],
      url: "https://github.com/MevinManuel/AGT-ascii_glitch_terminal"
    },
    {
      id: 7,
      title: "QBus - Bus Booking System",
      category: "Mobile Development",
      description: "Dynamic bus timing and ticket booking system built with Flutter. Streamlined transportation management solution.",
      image: "/portfolio/5.png",
      tags: ["Flutter", "Dart", "Mobile App", "Booking System"],
      url: "https://github.com/MevinManuel/QBus"
    },
    {
      id: 4,
      title: "LancerApp",
      category: "Web Development",
      description: "Freelancing platform built with modern JavaScript. Connecting freelancers with clients seamlessly.",
      image: "/portfolio/2.png",
      tags: ["JavaScript", "Web App", "Freelancing"],
      url: "https://github.com/MevinManuel/lancerapp"
    },
    {
      id: 5,
      title: "Pinion",
      category: "Mobile Development",
      description: "Modern web application for pinning user opinions and suggestions on map. Clean architecture and responsive design.",
      image: "/portfolio/4.png",
      tags: ["JavaScript", "React Native", "Web Development", "Frontend"],
      url: "https://github.com/MevinManuel/Pinion"
    },
    {
      id: 8,
      title: "Calm - Meditation App",
      category: "Web Development",
      description: "Peaceful meditation and mindfulness web application. Built with JavaScript for a serene user experience.",
      image: "/portfolio/6.png",
      tags: ["JavaScript", "Wellness", "Web App"],
      url: "https://github.com/MevinManuel/Calm"
    },
    {
      id: 9,
      title: "DSA Problem Solutions",
      category: "Programming",
      description: "Collection of Data Structures and Algorithms problems. Comprehensive coding practice repository.",
      image: "/portfolio/07.png",
      tags: ["Python","Java", "C++", "DSA", "Algorithms", "Problem Solving"],
      url: "https://github.com/MevinManuel/DSA"
    },
    {
      id: 10,
      title: "Summarizer App",
      category: "Web Development",
      description: "Text summarization web application with clean CSS styling. Efficient content processing tool.",
      image: "/portfolio/9.png",
      tags: ["CSS", "Web App", "Text Processing"],
      url: "https://github.com/MevinManuel/Summarizer_app"
    },
    {
      id: 11,
      title: "Lock In",
      category: "Web Development",
      description: "A react app made with Lovable AI that helps you track your study habits, beat procrastination, and stay on top of your tasks with ease.",
      image: "/portfolio/8.png",
      tags: ["Lovable AI", "React", "Web App"],
      url: "https://github.com/MevinManuel/Lock-In"
    },
    {
      id: 12,
      title: "Portfolio Website",
      category: "Creative Coding",
      description: "Personal portfolio website showcasing projects and skills. Modern design with responsive layout.",
      image: "/portfolio/03.png",
      tags: ["Portfolio", "React", "Web Development", "Frontend"],
      url: "https://github.com/MevinManuel/Portfolio"
    }
  ],
  
  services: [
    {
      id: 1,
      title: "Frontend Development",
      description: "Building responsive, interactive web applications with modern frameworks",
      icon: "Code",
      features: ["React & React Native", "JavaScript", "Responsive Design", "Performance Optimization"]
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Creating native and cross-platform mobile applications with seamless user experiences",
      icon: "Palette",
      features: ["React Native", "UI/UX Design", "iOS & Android", "Cross-platform Solutions"]
    },
    {
      id: 3,
      title: "Full-Stack Development",
      description: "End-to-end application development from frontend to backend with modern technologies",
      icon: "Image",
      features: ["Python/Flask", "Database Design", "API Development", "PostgreSQL"]
    }
  ],
  
  social: {
    linkedin: "https://linkedin.com/in/mevin-manuel",
    github: "https://github.com/MevinManuel",
    pinterest: "https://in.pinterest.com/mevinmnl123/",
    instagram: "https://instagram.com/mevin_manuel"
  }
};

export const contactFormData = {
  name: "",
  email: "",
  message: ""
};