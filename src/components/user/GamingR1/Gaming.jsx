import React, { useState, useEffect } from 'react';
import Image1 from '../../../Images/Recoments.png';
import Image2 from '../../../Images/gane4.png';
import Image3 from '../../../Images/subscribeImge.jpg';
import Image4 from '../../../Images/TokyoCity.jpg';
import Image5 from '../../../Images/tokyo.jpg';
import Image6 from '../../../Images/game3.png';

export default function GamingSingleView() {
  const [displayText, setDisplayText] = useState("GAMING R1");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = ["GAMING R1", "PRO SYSTEM", "ENTERPRISE"];
  const [activeTriangle, setActiveTriangle] = useState(0);
  
  const triangleImages = [
    Image6,  // Gaming image
    Image2,  // Car/Pro image
    Image4,  // City/Enterprise image
    Image3,  // Purple theme
    Image5,  // Tokyo city
    Image1   // Cyberpunk
  ];
  
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
    <div className="w-full h-screen bg-white overflow-hidden flex flex-col" style={{ width:"97vw", height:'97vh', borderRadius:"30px"}}>
      {/* Main container */}
      <div className="flex flex-col h-full p-4">
        {/* Header section */}
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

        {/* Middle content section */}
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
          
          {/* Right side triangles with images */}
          <div className="md:w-2/3 px-2">
            <div className="flex justify-center items-center h-full">
              <div className="relative w-full">
                <svg viewBox="0 0 600 200" className="w-full">
                  <defs>
                    {/* Clip paths for each triangle */}
                    <clipPath id="triangle1">
                      <polygon points="45,40 100,140 -10,140" />
                    </clipPath>
                    <clipPath id="triangle2">
                      <polygon points="130,40 185,140 75,140" />
                    </clipPath>
                    <clipPath id="triangle3">
                      <polygon points="215,40 270,140 160,140" />
                    </clipPath>
                    <clipPath id="triangle4">
                      <polygon points="300,40 355,140 245,140" />
                    </clipPath>
                    <clipPath id="triangle5">
                      <polygon points="385,40 440,140 330,140" />
                    </clipPath>
                    <clipPath id="triangle6">
                      <polygon points="470,40 525,140 415,140" />
                    </clipPath>
                    
                    {/* Glow effect for active triangle */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Background images for each triangle */}
                  <image 
                    href={triangleImages[0]} 
                    clipPath="url(#triangle1)" 
                    x="-10" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image 
                    href={triangleImages[1]} 
                    clipPath="url(#triangle2)" 
                    x="75" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image 
                    href={triangleImages[2]} 
                    clipPath="url(#triangle3)" 
                    x="160" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image 
                    href={triangleImages[3]} 
                    clipPath="url(#triangle4)" 
                    x="245" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image 
                    href={triangleImages[4]} 
                    clipPath="url(#triangle5)" 
                    x="330" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <image 
                    href={triangleImages[5]} 
                    clipPath="url(#triangle6)" 
                    x="415" y="40" 
                    width="110" height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  
                  {/* Transparent clickable triangles with hover effects */}
                  <g>
                    <polygon 
                      points="45,40 100,140 -10,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 0 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 0 ? "3" : "1"}
                      filter={activeTriangle === 0 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(0)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                    <polygon 
                      points="130,40 185,140 75,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 1 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 1 ? "3" : "1"}
                      filter={activeTriangle === 1 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(1)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                    <polygon 
                      points="215,40 270,140 160,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 2 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 2 ? "3" : "1"}
                      filter={activeTriangle === 2 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(2)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                    <polygon 
                      points="300,40 355,140 245,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 3 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 3 ? "3" : "1"}
                      filter={activeTriangle === 3 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(3)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                    <polygon 
                      points="385,40 440,140 330,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 4 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 4 ? "3" : "1"}
                      filter={activeTriangle === 4 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(4)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                    <polygon 
                      points="470,40 525,140 415,140" 
                      fill="transparent" 
                      stroke={activeTriangle === 5 ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth={activeTriangle === 5 ? "3" : "1"}
                      filter={activeTriangle === 5 ? "url(#glow)" : ""}
                      onClick={() => handleTriangleClick(5)} 
                      style={{cursor: 'pointer'}}
                      className="transition-all duration-300"
                    />
                  </g>
                  
                  {/* Labels for each triangle */}
                  <g className="font-bold" fontSize="10" fill="white" textAnchor="middle">
                    <text x="45" y="80" filter="url(#glow)">GAMING</text>
                    <text x="130" y="80">PRO</text>
                    <text x="215" y="80">ENTERPRISE</text>
                    <text x="300" y="80">SMART</text>
                    <text x="385" y="80">CREATIVE</text>
                    <text x="470" y="80">EDUCATION</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Project Eden section */}
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
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}