import React, { useState, useEffect } from 'react';
import ModernNavbar from '../NavBar/NavBar';
import ProductFooter from '../Footer/ProductFooter';

// Professional system images
import WorkstationImage from '../../../Images/pro.jpg';
import EnterpriseImage from '../../../Images/pro2.jpg';
import ScientificImage from '../../../Images/coffyWith.png';
import CustomImage from '../../../Images/subscribeImge.jpg';

// Gaming system images
import EsportsImage from '../../../Images/game2.png';
import StreamingImage from '../../../Images/game3.png';
import VRImage from '../../../Images/vol.jpg';
import ConsoleImage from '../../../Images/gane4.png';

function Solutions() {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [isTextAnimated, setIsTextAnimated] = useState(false);
  const [activeSystem, setActiveSystem] = useState('professional');
  
  useEffect(() => {
    setIsTextAnimated(true);
    
    // Set up carousel rotation
    const intervalId = setInterval(() => {
      setActiveSystem(prev => prev === 'professional' ? 'gaming' : 'professional');
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleMouseEnter = (panelName) => {
    setHoveredPanel(panelName);
  };
  
  const handleMouseLeave = () => {
    setHoveredPanel(null);
  };

  // Define system data for both categories
  const systemsData = {
    professional: [
      {
        id: 'workstation',
        name: 'WORKSTATION',
        image: WorkstationImage,
        description: 'High-performance workstations for professional users',
        subtext: 'Optimized for content creation, 3D rendering, and video editing'
      },
      {
        id: 'enterprise',
        name: 'ENTERPRISE',
        image: EnterpriseImage,
        description: 'Scalable infrastructure for business applications',
        subtext: 'Reliable servers and networking solutions for any scale operation'
      },
      {
        id: 'scientific',
        name: 'SCIENTIFIC',
        image: ScientificImage,
        description: 'Computing solutions for research and analysis',
        subtext: 'High-performance computing for complex simulations and data processing'
      },
      {
        id: 'custom',
        name: 'CUSTOM',
        image: CustomImage,
        description: 'Tailored solutions for specialized needs',
        subtext: 'Bespoke configurations designed to your exact specifications'
      }
    ],
    gaming: [
      {
        id: 'esports',
        name: 'ESPORTS',
        image: EsportsImage,
        description: 'Competition-ready systems with ultra-low latency',
        subtext: 'Preferred by professional gamers worldwide'
      },
      {
        id: 'streaming',
        name: 'STREAMING',
        image: StreamingImage,
        description: 'Optimized for gaming and content creation',
        subtext: 'Multi-task without compromising performance'
      },
      {
        id: 'vr',
        name: 'VR READY',
        image: VRImage,
        description: 'Immersive virtual reality experiences',
        subtext: 'High-performance systems for smooth VR gaming'
      },
      {
        id: 'console',
        name: 'CONSOLE+',
        image: ConsoleImage,
        description: 'The power of PC with console convenience',
        subtext: 'Plug-and-play systems for the living room'
      }
    ]
  };

  // Content for the current active system
  const activeContent = {
    professional: {
      title: "PROFESSIONAL",
      subtitle: "SYSTEMS",
      description: "Expertly crafted computing solutions for every need",
      bgColor: "bg-black"
    },
    gaming: {
      title: "GAMING",
      subtitle: "SYSTEMS",
      description: "Cutting-edge performance for the ultimate gaming experience",
      bgColor: "bg-gray-900"
    }
  };

  return (
    <>
      <ModernNavbar/>
      <div className="mb-20 md:mb-24 lg:mb-28 xl:mb-32"></div>
      
      {/* Carousel Section */}
      <div className="w-full overflow-visible mb-10">
        <div className="font-sans w-[90%] mx-auto overflow-visible relative">
          <div className={`relative w-full h-[250px] sm:h-[300px] md:h-[350px] ${activeContent[activeSystem].bgColor} overflow-visible rounded-[30px] mb-[60px] sm:mb-[80px] md:mb-[100px] pt-[60px] md:pt-[80px] transition-colors duration-1000`}>
            {/* Banner Content */}
            <div className={`absolute top-0 left-0 p-6 sm:p-8 z-10 transition-opacity duration-500 ${isTextAnimated ? 'text-animated' : ''}`}>
              <h1 className="flex flex-col text-white m-0 leading-none">
                <span className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-black transition-all duration-500">
                  {activeContent[activeSystem].title}
                </span>
                <span className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] text-gray-500 font-black transition-all duration-500">
                  {activeContent[activeSystem].subtitle}
                </span>
              </h1>
              <p className="text-gray-300 mt-2 max-w-md transition-all duration-500">
                {activeContent[activeSystem].description}
              </p>
              
              {/* System Type Indicator */}
              <div className="flex space-x-2 mt-4">
                <div 
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${activeSystem === 'professional' ? 'bg-white scale-125' : 'bg-gray-500'}`}
                  onClick={() => setActiveSystem('professional')}
                ></div>
                <div 
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${activeSystem === 'gaming' ? 'bg-white scale-125' : 'bg-gray-500'}`}
                  onClick={() => setActiveSystem('gaming')}
                ></div>
              </div>
            </div>
            
            {/* System Panels */}
            <div className="absolute bottom-0 right-0 h-[150px] sm:h-[200px] md:h-[250px] lg:h-[350px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] flex flex-wrap sm:flex-nowrap skew-x-[-15deg] sm:skew-x-[-15deg] overflow-visible items-end gap-2.5 sm:gap-2.5">
              {systemsData[activeSystem].map((system) => (
                <div 
                  key={system.id}
                  className={`flex-[0_0_calc(50%-10px)] sm:flex-1 h-[120px] sm:h-full relative overflow-hidden bg-cover bg-center transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-md cursor-pointer origin-bottom ${
                    hoveredPanel === system.id ? 
                    'h-[180px] sm:h-[300px] md:h-[350px] lg:h-[420px] scale-[1.05] z-20 shadow-lg' : 
                    ''
                  }`}
                  style={{ backgroundImage: `url(${system.image})` }}
                  onMouseEnter={() => handleMouseEnter(system.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`absolute w-full h-full flex items-end p-4 sm:p-6 md:p-8 box-border bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 ease-in-out ${
                    hoveredPanel === system.id ? 
                    'bg-gradient-to-t from-black/90 via-black/40 to-transparent pb-8 sm:pb-10 md:pb-12' : 
                    ''
                  }`}>
                    <div className="w-full">
                      <span className={`text-white font-bold skew-x-[15deg] text-base sm:text-lg md:text-xl opacity-80 transition-all duration-300 ease-in-out ${
                        hoveredPanel === system.id ? 
                        'text-lg sm:text-xl md:text-2xl opacity-100 -translate-y-2 sm:-translate-y-2.5 skew-x-[15deg] drop-shadow-md' : 
                        ''
                      }`}>
                        {system.name}
                      </span>
                      {hoveredPanel === system.id && (
                        <div className="transition-all duration-300 ease-in-out">
                          <p className="text-white text-xs sm:text-sm md:text-base mt-1 sm:mt-2 opacity-90 skew-x-[15deg]">
                            {system.description}
                          </p>
                          <p className="text-gray-300 text-xs sm:text-xs md:text-sm mt-1 skew-x-[15deg] opacity-75">
                            {system.subtext}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Section */}
      <div className="w-[90%] h-[200px] sm:h-[250px] md:h-[300px] bg-gray-500 mx-auto my-5 rounded-[30px] relative z-[5]"></div>
      
      <ProductFooter/>
    </>
  );
}

export default Solutions;