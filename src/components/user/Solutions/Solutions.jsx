import { useState, useEffect, useRef } from 'react';
import gameImg from '../../../Images/Valorant Game - Clove asset.jpg';
import GameImg2 from '../../../Images/game2.png';
import GameImg3 from '../../../Images/game3.png';
import GameImg4 from '../../../Images/gane4.png';
import pro1 from '../../../Images/pro1.jpg';
import pro2 from '../../../Images/LoginWith/Loginbg.jpg';
import pro3 from '../../../Images/pro3.jpg';
import pro4 from '../../../Images/pro4.jpg';
import ProductFooter from '../Footer/ProductFooter';
import ModernNavbar from '../NavBar/NavBar';

export default function SolutionsPage() {
  const solutionsImages = [gameImg, GameImg2, GameImg3, GameImg4];
  const enterpriseImages = [pro1, pro2, pro3, pro4];
  
  const [isStandard, setIsStandard] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [hoveredDiagonal, setHoveredDiagonal] = useState(null);
  const autoplayTimerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const standardSolutions = [
    { title: "Cloud Solutions", icon: "☁️", desc: "Scalable cloud infrastructure" },
    { title: "Web Development", icon: "🌐", desc: "Custom web applications" },
    { title: "Mobile Apps", icon: "📱", desc: "Cross-platform development" },
    { title: "UI/UX Design", icon: "🎨", desc: "User-centered interfaces" },
    { title: "E-commerce", icon: "🛒", desc: "Online store solutions" }
  ];

  const enterpriseSolutions = [
    { title: "Enterprise Systems", icon: "🏢", desc: "Large-scale business solutions" },
    { title: "Data Analytics", icon: "📊", desc: "Business intelligence tools" },
    { title: "AI Integration", icon: "🤖", desc: "Machine learning solutions" },
    { title: "Security", icon: "🔒", desc: "Enterprise-grade protection" },
    { title: "Consulting", icon: "💼", desc: "Strategic IT consulting" }
  ];

  const toggleSolutionType = () => {
    setIsStandard(prev => !prev);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % (isStandard ? solutionsImages.length : enterpriseImages.length));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + (isStandard ? solutionsImages.length : enterpriseImages.length)) % (isStandard ? solutionsImages.length : enterpriseImages.length));
  };

  const startAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      nextImage();
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoplay) setIsStandard(prev => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isStandard, isAutoplay, activeImageIndex]);

  const currentImages = isStandard ? solutionsImages : enterpriseImages;
  const currentSpecs = isStandard ? standardSolutions : enterpriseSolutions;

  return (
    <>
    <ModernNavbar/>
        <div className="w-full min-h-screen bg-white overflow-hidden shadow-md flex flex-col">
      {/* Header with Logo and Menu */}
      <div className="flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl sm:text-2xl font-bold">S</span>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button 
            className={`py-1 sm:py-2 px-3 sm:px-4 border-none rounded-full text-xs sm:text-sm ${isStandard ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800'} font-semibold cursor-pointer transition-all duration-300`}
            onClick={() => setIsStandard(true)}
          >
            Standard
          </button>
          <button 
            className={`py-1 sm:py-2 px-3 sm:px-4 border-none rounded-full text-xs sm:text-sm ${!isStandard ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800'} font-semibold cursor-pointer transition-all duration-300`}
            onClick={() => setIsStandard(false)}
          >
            Enterprise
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 bg-black overflow-hidden">
        {/* Left section with text */}
        <div className="absolute left-0 h-full w-1/2 sm:w-2/5 md:w-1/3 flex flex-col justify-center pl-4 sm:pl-6 z-10">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide leading-none">DIGITAL</h1>
          <h2 className="text-blue-400 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide leading-none">SOLUTIONS</h2>
        </div>

        {/* Right section with diagonal image strips */}
        <div className="absolute right-0 w-1/2 sm:w-3/5 md:w-2/3 h-full overflow-hidden">
          {/* Diagonal graphics */}
          <div className="absolute top-0 left-0 w-full h-full flex overflow-hidden">
            {/* First diagonal */}
            <div 
              className={`h-full w-1/4 transform -skew-x-12 translate-x-2 sm:translate-x-4 md:translate-x-6 bg-blue-900 relative overflow-hidden transition-all duration-300 ease-out ${hoveredDiagonal === 0 ? 'h-40 md:h-52 -top-4' : ''}`}
              onMouseEnter={() => setHoveredDiagonal(0)}
              onMouseLeave={() => setHoveredDiagonal(null)}
            >
              <img src={currentImages[0]} alt="Solution 1" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
            </div>
            
            {/* Second diagonal */}
            <div 
              className={`h-full w-1/4 transform -skew-x-12 translate-x-2 sm:translate-x-4 md:translate-x-6 bg-blue-800 relative overflow-hidden flex items-center justify-center transition-all duration-300 ease-out ${hoveredDiagonal === 1 ? 'h-40 md:h-52 -top-4' : ''}`}
              onMouseEnter={() => setHoveredDiagonal(1)}
              onMouseLeave={() => setHoveredDiagonal(null)}
            >
              <img src={currentImages[1]} alt="Solution 2" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
            </div>
            
            {/* Third diagonal */}
            <div 
              className={`h-full w-1/4 transform -skew-x-12 translate-x-2 sm:translate-x-4 md:translate-x-6 bg-blue-700 relative overflow-hidden transition-all duration-300 ease-out ${hoveredDiagonal === 2 ? 'h-40 md:h-52 -top-4' : ''}`}
              onMouseEnter={() => setHoveredDiagonal(2)}
              onMouseLeave={() => setHoveredDiagonal(null)}
            >
              <img src={currentImages[2]} alt="Solution 3" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
            </div>
            
            {/* Fourth diagonal */}
            <div 
              className={`h-full w-1/4 transform -skew-x-12 translate-x-2 sm:translate-x-4 md:translate-x-6 bg-blue-600 relative overflow-hidden transition-all duration-300 ease-out ${hoveredDiagonal === 3 ? 'h-40 md:h-52 -top-4' : ''}`}
              onMouseEnter={() => setHoveredDiagonal(3)}
              onMouseLeave={() => setHoveredDiagonal(null)}
            >
              <img src={currentImages[3]} alt="Solution 4" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
            </div>
          </div>
        </div>

        {/* Current solution title */}
        <div className="absolute bottom-1 md:bottom-2 right-4 sm:right-1/4 text-white text-xs font-medium">
          {isStandard ? "STANDARD" : "ENTERPRISE"}
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="bg-gray-200 p-3 sm:p-4 md:p-6 flex-grow">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 h-full">
          {currentSpecs.map((solution, index) => (
            <div key={index} className="group relative bg-black rounded-lg aspect-square cursor-pointer shadow-md overflow-hidden">
              {/* Wrapper div that scales */}
              <div className="absolute inset-0 bg-black transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:h-[130%] group-hover:-top-[15%]">
                {/* Content inside the box */}
                <img 
                  src={currentImages[index % currentImages.length]} 
                  alt={solution.title} 
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Solution info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xs sm:text-sm font-bold">{solution.title}</h3>
                  <p className="text-xs hidden sm:block">{solution.desc}</p>
                </div>
                {/* Icon badge */}
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg">
                  {solution.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-0">
      <ProductFooter/>
    </div>
    </>
  );
}