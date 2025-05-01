import React, { useEffect, useState, useRef } from 'react';
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import { FaComputer, FaFire, FaMemory, FaHardDrive, FaMoon, FaSun } from 'react-icons/fa6';
import "@fontsource/rajdhani"; // Default font weight
import "@fontsource/rajdhani/700.css"; // Optional: specific font weight (700)

function ProductBanner() {
  // State to track dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State to track mouse position for theme transition effect
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  // Ref for the theme transition overlay
  const overlayRef = useRef(null);

  // Toggle dark mode with smooth animation
  const toggleDarkMode = () => {
    // Activate transition overlay
    if (overlayRef.current) {
      overlayRef.current.style.setProperty('--mouse-x', mousePosition.x);
      overlayRef.current.style.setProperty('--mouse-y', mousePosition.y);
      overlayRef.current.classList.add('active');
      
      // After a brief delay, toggle the dark mode
      setTimeout(() => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
        
        // Then remove the overlay
        setTimeout(() => {
          overlayRef.current.classList.remove('active');
        }, 500);
      }, 300);
    } else {
      // Fallback if ref isn't available
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark-mode');
    }
  };

  // Track mouse movement for theme transition effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: `${e.clientX}px`,
        y: `${e.clientY}px`
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Animation setup on component mount
  useEffect(() => {
    // Animate elements when component mounts
    const animateElements = () => {
      const elements = [
        '.Headers',
        '.textContents',
        '.smallText',
        '.rate',
        '.team-buttons',
        '.buy-now',
        '.shape-circle',
        '.shape-square',
        '.shape-triangle'
      ];
      
      elements.forEach((selector, index) => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
          // Add animation with delay based on index
          setTimeout(() => {
            item.classList.add('animate-fadeIn');
          }, index * 200);
        });
      });
    };
    
    animateElements();
    
    // Floating animation for shapes
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach(shape => {
      setInterval(() => {
        shape.classList.toggle('translate-y-[-20px]');
      }, 3000);
    });
  }, []);

  return (
    <>
      {/* Theme transition overlay */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-transparent pointer-events-none z-50 scale-0 rounded-full transition-transform duration-800 ease-in-out"
        style={{
          '--mouse-x': mousePosition.x,
          '--mouse-y': mousePosition.y,
        }}
      ></div>
      
      {/* Theme toggle button */}
      <button 
        className={`fixed top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center z-50 shadow-md transition-transform duration-300 hover:scale-110 ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun className="text-2xl text-gray-800" /> : <FaMoon className="text-2xl text-gray-100" />}
      </button>

      {/* Animated shapes - positioned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 opacity-10 animate-spin-slow floating-shape transition-transform duration-300"></div>
        <div className="absolute top-1/2 left-[5%] w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-500 rounded opacity-10 rotate-45 animate-spin-slow floating-shape transition-transform duration-300"></div>
        <div className="absolute bottom-[10%] right-[20%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-purple-600 opacity-10 floating-shape transition-transform duration-300"></div>
        <div className="absolute bottom-[30%] left-[20%] w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 opacity-10 floating-shape transition-transform duration-300"></div>
        <div className="absolute top-[30%] right-[30%] w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-500 rounded opacity-10 rotate-45 floating-shape transition-transform duration-300"></div>
      </div>
      
      <div className={`w-[85%] mx-auto mt-[10%] flex flex-wrap justify-around gap-5 relative z-10 ${darkMode ? 'text-white bg-gray-900 rounded-xl p-5' : ''}`}>
        <div className="w-full md:w-1/2 flex flex-col items-center relative p-5">
          <div className="textContents w-full mt-5 opacity-0 -translate-x-5 transition-all duration-600 delay-200">
            <span className="text-3xl sm:text-4xl md:text-5xl font-rajdhani font-semibold inline-block">
              FRAMES SPEAKS MORE <br /> THAN SPECS. <br />
              MEET THE <br />
              FPS <u><span className="font-mono text-purple-600 animate-glitch">MONGER</span></u>
            </span>
          </div>
          
          <div className="smallText w-full max-w-xl h-auto my-5 mx-auto opacity-0 translate-y-5 transition-all duration-600 delay-400">
            <div className="flex items-center my-2 p-2 rounded-lg transition-all duration-300 hover:bg-purple-600/10 hover:translate-x-1">
              <FaComputer className="mr-2 text-purple-600 text-lg" />
              <span className="text-base sm:text-lg">Intel Core i7 14700K - 5.6GHz Max Clock</span>
            </div>
            <div className="flex items-center my-2 p-2 rounded-lg transition-all duration-300 hover:bg-purple-600/10 hover:translate-x-1">
              <FaFire className="mr-2 text-purple-600 text-lg" />
              <span className="text-base sm:text-lg">Nvidia RTX 4070Ti - 8GB DDR6 VRAM</span>
            </div>
            <div className="flex items-center my-2 p-2 rounded-lg transition-all duration-300 hover:bg-purple-600/10 hover:translate-x-1">
              <FaMemory className="mr-2 text-purple-600 text-lg" />
              <span className="text-base sm:text-lg">Corsair Vengeance DDR5 - 16GB</span>
            </div>
            <div className="flex items-center my-2 p-2 rounded-lg transition-all duration-300 hover:bg-purple-600/10 hover:translate-x-1">
              <FaHardDrive className="mr-2 text-purple-600 text-lg" />
              <span className="text-base sm:text-lg">Samsung 970 Evo Pro - 1TB</span>
            </div>
          </div>
          
          <div className="rate text-center relative p-2 my-5 opacity-0 scale-90 transition-all duration-600 delay-600">
            <span className="text-xl sm:text-2xl font-franklin line-through">₹2,77,990</span> 
            <span className="text-xl sm:text-2xl font-franklin font-bold ml-2 inline-block relative">₹2,57,990</span>
            <div className="absolute -top-4 right-1/3 bg-purple-600 text-white px-2 py-1 text-xs sm:text-sm font-bold rounded-full -rotate-5 animate-pulse">SAVE ₹20,000</div>
          </div>

          <button className="buy-now flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white border-2 border-gray-700 rounded-lg py-3 px-6 w-40 sm:w-48 my-5 font-orbitron font-semibold text-base uppercase tracking-wide cursor-pointer transition-all duration-300 relative overflow-hidden shadow-lg hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-xl active:-translate-y-0.5 active:shadow-md">
            <IoArrowForwardCircleSharp className="text-2xl text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="font-bold text-white group-hover:text-cyan-400">BUY NOW</span>
          </button>

          {/* Particles for button hover effect */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`absolute w-2.5 h-2.5 bg-purple-600/60 rounded-full opacity-0 left-[${20 + i * 20}%]`}></span>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block w-full md:w-[45%] max-w-lg h-auto relative">
          <div className="relative w-full h-full">
            <img 
              src="/api/placeholder/500/600" 
              alt="gaming pc" 
              className="w-full h-auto max-h-[80vh] rounded-3xl transition-transform duration-500 ease-in-out hover:scale-[1.02] object-cover relative z-10"
            />
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-purple-600/50 rounded-full animate-pulse-ring"></div>
              
              <div className="absolute top-[20%] left-[30%] z-30">
                <div className="w-3 h-3 bg-purple-600 rounded-full relative animate-pulse-dot"></div>
                <div className="absolute -top-6 left-4 bg-black/70 text-white p-1 px-2 rounded text-xs whitespace-nowrap opacity-0 transition-opacity duration-300 hover:opacity-100">RGB Lighting</div>
              </div>
              
              <div className="absolute top-[40%] left-[70%] z-30">
                <div className="w-3 h-3 bg-purple-600 rounded-full relative animate-pulse-dot"></div>
                <div className="absolute -top-6 left-4 bg-black/70 text-white p-1 px-2 rounded text-xs whitespace-nowrap opacity-0 transition-opacity duration-300 hover:opacity-100">Air Cooling</div>
              </div>
              
              <div className="absolute bottom-[30%] left-[55%] z-30">
                <div className="w-3 h-3 bg-purple-600 rounded-full relative animate-pulse-dot"></div>
                <div className="absolute -top-6 left-4 bg-black/70 text-white p-1 px-2 rounded text-xs whitespace-nowrap opacity-0 transition-opacity duration-300 hover:opacity-100">GPU Power</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes glitch {
          0%, 5%, 10% {
            text-shadow: none;
            transform: none;
          }
          1%, 6%, 11% {
            text-shadow: 
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(0.01em, 0.01em);
          }
          2%, 7%, 12% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(-0.01em, -0.01em);
          }
          3%, 8%, 13% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(0.01em, 0);
          }
          4%, 9%, 14% {
            text-shadow: none;
            transform: none;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes pulse-dot {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-glitch {
          animation: glitch 5s infinite alternate;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        .animate-pulse-dot {
          animation: pulse-dot 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-fadeIn {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
          scale: 1 !important;
        }
        
        .theme-transition-overlay.active {
          transform: scale(3);
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode {
          background-color: #121212;
          color: #ffffff;
        }
        
        .font-rajdhani {
          font-family: 'Rajdhani', sans-serif;
        }
        
        .font-franklin {
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        
        /* Button particles effect */
        .buy-now:hover ~ div span {
          animation: particle-animation 1s ease-out;
          opacity: 1;
        }
        
        @keyframes particle-animation {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px);
            opacity: 0;
          }
        }
        
        /* Shine effect on button */
        .buy-now::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.15), transparent);
          transition: 0.5s;
        }
        
        .buy-now:hover::after {
          left: 100%;
        }
      `}</style>
    </>
  );
}

export default ProductBanner;