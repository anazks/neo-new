import React, { useState, useEffect } from 'react';

export default function GamingSingleView() {
  const [displayText, setDisplayText] = useState("GAMING R1");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = ["GAMING R1", "PRO SYSTEM", "ENTERPRISE"];
  const [activeTriangle, setActiveTriangle] = useState(0);
  
  const edenContent = [
    {
      title: "PROJECT EDEN",
      description: "AT Project Eden, we believe in creating a space that's uniquely yours. From personalized styling to climate control, IoT automation to immersive gaming, and a home theater experience, we've carefully chosen every element to guarantee your pleasure and comfort."
    },
    {
      title: "GAMING SUITE",
      description: "IMMERSE in ultimate gaming with state-of-the-art hardware, RGB lighting, and ergonomic design for intense sessions."
    },
    {
      title: "ENTERPRISE HUB",
      description: "ELEVATE your business with scalable solutions featuring military-grade security and 24/7 support."
    },
    {
      title: "SMART HOME",
      description: "TRANSFORM your living space with intelligent automation, voice control, and seamless integration of all your devices."
    },
    {
      title: "CREATIVE STUDIO",
      description: "UNLEASH your creativity with powerful workstations optimized for design, video editing, and content creation."
    },
    {
      title: "EDUCATION CENTER",
      description: "EMPOWER learning with interactive tools, collaborative platforms, and resources for students of all ages."
    }
  ];
  
  // Typing effect
  useEffect(() => {
    const fullText = phrases[currentPhrase];
    let currentIndex = 0;
    let isDeleting = false;
    let timer;
    
    const typeEffect = () => {
      const current = fullText.substring(0, currentIndex);
      setDisplayText(current);
      
      const typingSpeed = isDeleting ? 75 : 150;
      
      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => {
          isDeleting = true;
          timer = setTimeout(typeEffect, 1000);
        }, 1500);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        timer = setTimeout(typeEffect, 500);
      } else {
        currentIndex = isDeleting ? currentIndex - 1 : currentIndex + 1;
        timer = setTimeout(typeEffect, typingSpeed);
      }
    };
    
    timer = setTimeout(typeEffect, 100);
    return () => clearTimeout(timer);
  }, [currentPhrase]);
  
  const handleTriangleClick = (index) => {
    setActiveTriangle(index);
  };
  
  return (
    <div className="w-full h-screen bg-white overflow-hidden flex flex-col" style={{maxWidth:"1200px", height:'97vh', borderRadius:"30px"}}>
      {/* Logo in top-left corner */}
      <div className="absolute top-4 left-4 z-10">
        
      </div>

      {/* Main container with reduced padding to fit everything */}
      <div className="flex flex-col h-full p-4">
        {/* Header section with quote - taking less space */}
        <div className="text-center mb-2 pt-8 md:pt-10">
          <div className="flex items-center justify-center">
            <span className="text-pink-600 text-2xl md:text-3xl font-bold mr-1">"</span>
            <h1 className="text-gray-600 text-lg md:text-xl font-semibold tracking-wide">
              DOESN'T HAVE TO BE A BOX IN A CORNER. IT CAN BE A ...
            </h1>
            <span className="text-pink-600 text-2xl md:text-3xl font-bold ml-1">"</span>
          </div>
          
          <div className="my-2">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
              {displayText}
              <span className="inline-block w-1 h-8 bg-black ml-1 animate-blink"></span>
            </h2>
          </div>
          
          <p className="text-gray-500 text-xs">
            Built with latest in PC hardware, highest quality components and backed by lifetime support
          </p>
          <div className="w-full max-w-2xl mx-auto h-px bg-pink-600 mt-2" style={{height: "3px"}}></div>
        </div>

        {/* Middle content section - matching the image layout */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 flex-grow p-4">
          {/* Left side text */}
          <div className="md:w-1/3 border-r border-pink-600 pr-6" style={{borderRightWidth: "3px"}}>
            <div className="flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl font-bold mb-1">NEW</h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-pink-600">EXP</span>ERIENCES
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">BEGINS HERE</h2>
              <p className="text-gray-600 mt-4">Endless Possibilities</p>
            </div>
          </div>
          
          {/* Right side triangles - Improved to match the image */}
          <div className="md:w-2/3 px-2">
            <div className="flex justify-center items-center h-full">
              <div className="relative w-full">
                <svg viewBox="0 0 600 200" className="w-full">
                  <defs>
                    {/* Improved gradients */}
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    
                    <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1F2937" />
                      <stop offset="100%" stopColor="#111827" />
                    </linearGradient>
                    
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#4C1D95" />
                    </linearGradient>
                    
                    <linearGradient id="cityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    
                    <linearGradient id="cyberpunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    
                    {/* Filter to create a reflective/glossy effect */}
                    <filter id="glossy" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                      <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                      <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" 
                                        specularExponent="20" lightingColor="white" result="specOut">
                        <fePointLight x="250" y="20" z="50" />
                      </feSpecularLighting>
                      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" 
                                k1="0" k2="1" k3="1" k4="0" result="litPaint" />
                    </filter>
                  </defs>
                  
                  {/* Triangles with better styling, no tilting and overlapping */}
                  <g>
                    {/* First triangle - blue/pink gradient */}
                    <polygon 
                      points="45,40 100,140 -10,140" 
                      fill="url(#blueGradient)" 
                      stroke={activeTriangle === 0 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(0)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Second triangle - dark car theme - overlapping first */}
                    <polygon 
                      points="130,40 185,140 75,140" 
                      fill="url(#darkGradient)" 
                      stroke={activeTriangle === 1 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(1)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Third triangle - neon cityscape - overlapping second */}
                    <polygon 
                      points="215,40 270,140 160,140" 
                      fill="url(#neonGradient)" 
                      stroke={activeTriangle === 2 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(2)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Fourth triangle - purple theme - overlapping third */}
                    <polygon 
                      points="300,40 355,140 245,140" 
                      fill="url(#purpleGradient)" 
                      stroke={activeTriangle === 3 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(3)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Fifth triangle - city blue - overlapping fourth */}
                    <polygon 
                      points="385,40 440,140 330,140" 
                      fill="url(#cityGradient)" 
                      stroke={activeTriangle === 4 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(4)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Sixth triangle - cyberpunk city - overlapping fifth */}
                    <polygon 
                      points="470,40 525,140 415,140" 
                      fill="url(#cyberpunkGradient)" 
                      stroke={activeTriangle === 5 ? "white" : "transparent"}
                      strokeWidth="2"
                      filter="url(#glossy)"
                      onClick={() => handleTriangleClick(5)} 
                      style={{cursor: 'pointer'}}
                    />
                    
                    {/* Overlay effects to simulate the image textures */}
                    <g opacity="0.4">
                      {/* First triangle pattern */}
                      <polygon 
                        points="45,40 100,140 -10,140" 
                        fill="url(#blueGradient)" 
                        opacity="0.6"
                      >
                        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                      </polygon>
                      
                      {/* Second triangle car pattern */}
                      <polygon 
                        points="130,40 185,140 75,140" 
                        opacity="0.7"
                      >
                        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
                      </polygon>
                      
                      {/* Third triangle city pattern */}
                      <polygon 
                        points="215,40 270,140 160,140" 
                        fill="url(#neonGradient)" 
                        opacity="0.5"
                      >
                        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2.5s" repeatCount="indefinite" />
                      </polygon>
                      
                      {/* Fourth triangle pattern */}
                      <polygon 
                        points="300,40 355,140 245,140" 
                        fill="url(#purpleGradient)" 
                        opacity="0.6"
                      >
                        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3.5s" repeatCount="indefinite" />
                      </polygon>
                      
                      {/* Fifth triangle pattern */}
                      <polygon 
                        points="385,40 440,140 330,140" 
                        fill="url(#cityGradient)" 
                        opacity="0.7"
                      >
                        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
                      </polygon>
                      
                      {/* Sixth triangle pattern */}
                      <polygon 
                        points="470,40 525,140 415,140" 
                        fill="url(#cyberpunkGradient)" 
                        opacity="0.6"
                      >
                        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                      </polygon>
                    </g>
                    
                    {/* Light reflections and gleam effects */}
                    <g opacity="0.3">
                      <polygon points="45,40 55,60 35,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="130,40 140,60 120,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="215,40 225,60 205,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="300,40 310,60 290,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="385,40 395,60 375,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.2s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="470,40 480,60 460,60" fill="white">
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.7s" repeatCount="indefinite" />
                      </polygon>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Project Eden section - moved up */}
        <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row shadow-md mt-1 mb-6">
          <div className="md:w-1/4 bg-gray-200 p-3 md:p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-10 h-10 md:w-12 md:h-12 mx-auto mb-2">
                <div className="absolute top-0 left-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500"></div>
                <div className="absolute bottom-0 right-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500"></div>
              </div>
              <h3 className="uppercase text-xs font-bold tracking-wider">{edenContent[activeTriangle].title}</h3>
            </div>
          </div>
          <div className="md:w-3/4 p-3 md:p-4 flex items-center">
            <p className="text-gray-800 text-xs md:text-sm">
              <span className="text-pink-600 font-bold">{edenContent[activeTriangle].title.split(" ")[0]}</span> {edenContent[activeTriangle].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}