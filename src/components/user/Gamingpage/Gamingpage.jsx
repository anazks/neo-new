import React, { useEffect, useState, useRef } from 'react';
import './gamingpage.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaLaptop, FaDesktop, FaHeadset, FaShoppingCart, FaInfoCircle, FaMoon, FaSun } from 'react-icons/fa';
import { SiNvidia, SiAmd, SiIntel, SiAsus } from 'react-icons/si';

// Import images
import gameImg from '../../../Images/Valorant Game - Clove asset.jpg';
import GameImg2 from '../../../Images/game2.png';
import GameImg3 from '../../../Images/game3.png';
import GameImg4 from '../../../Images/gane4.png';

import pro1 from '../../../Images/pro1.jpg';
import pro2 from '../../../Images/LoginWith/Loginbg.jpg';
import pro3 from '../../../Images/pro3.jpg';
import pro4 from '../../../Images/pro4.jpg';

function Gamingpage() {
  const gamingImages = [gameImg, GameImg2, GameImg3, GameImg4];
  const proImages = [pro1, pro2, pro3, pro4];
  const [isGaming, setIsGaming] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const autoplayTimerRef = useRef(null);

  const gamingSpecs = [
    { title: "RTX Gaming", icon: <SiNvidia />, desc: "Ultimate gaming performance" },
    { title: "AMD Powered", icon: <SiAmd />, desc: "High-end processing" },
    { title: "Pro Graphics", icon: <SiAsus />, desc: "Immersive visual experience" },
    { title: "16GB RAM", icon: <FaDesktop />, desc: "Smooth multitasking" },
    { title: "VR Ready", icon: <FaHeadset />, desc: "Ultimate immersion" }
  ];

  const proSpecs = [
    { title: "Intel Core i9", icon: <SiIntel />, desc: "Professional grade CPU" },
    { title: "32GB DDR5", icon: <FaLaptop />, desc: "Workstation performance" },
    { title: "CAD Ready", icon: <SiAmd />, desc: "3D Modeling optimized" },
    { title: "4TB Storage", icon: <FaDesktop />, desc: "Massive file capacity" },
    { title: "Multi-Display", icon: <SiAsus />, desc: "Productivity enhancement" }
  ];

  const toggleSystemType = () => {
    setIsGaming(prev => !prev);
    setActiveImageIndex(0);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const nextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % (isGaming ? gamingImages.length : proImages.length));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + (isGaming ? gamingImages.length : proImages.length)) % (isGaming ? gamingImages.length : proImages.length));
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoplay) setIsGaming(prev => !prev);
    }, 8000); // Toggle every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoplay]);

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isGaming, isAutoplay, activeImageIndex]);

  const currentImages = isGaming ? gamingImages : proImages;
  const currentSpecs = isGaming ? gamingSpecs : proSpecs;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`Gaming-page ${isDarkMode ? 'dark-theme' : ''}`}
    >
      <div className="theme-toggle">
        <button 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </div>

      <div className="system-toggle">
        <button 
          className={`toggle-btn ${isGaming ? 'active' : ''}`}
          onClick={() => setIsGaming(true)}
        >
          <FaGamepad /> Gaming Systems
        </button>
        <button 
          className={`toggle-btn ${!isGaming ? 'active' : ''}`}
          onClick={() => setIsGaming(false)}
        >
          <FaLaptop /> Professional Systems
        </button>
      </div>

      <div className="Bigaming-page">
        <AnimatePresence mode="wait">
          <motion.div 
            key={isGaming ? 'gaming' : 'professional'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="Banner-firstrow"
          >
            <div className="Divfor-heading">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {isGaming ? "GAMING\nSYSTEMS" : "PROFESSIONAL\nSYSTEMS"}
              </motion.h1>
              <br />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="subtitle"
              > 

                {isGaming 
                  ? "Built for ultimate gaming performance"
                  : "Designed for professional workloads"
                }
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button"
              >
                <FaShoppingCart /> Explore Now
              </motion.button>
            </div>

            <div className="image-carousel">
              <button className="carousel-arrow prev" onClick={prevImage}>❮</button>
              
              <div className="carousel-container">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="Divfor-image active"
                    onHoverStart={() => setIsAutoplay(false)}
                    onHoverEnd={() => setIsAutoplay(true)}
                  >
                    <img 
                      src={currentImages[activeImageIndex]}
                      alt={isGaming ? `Gaming System ${activeImageIndex + 1}` : `Professional System ${activeImageIndex + 1}`}
                    />
                    <div className="image-overlay">
                      <FaInfoCircle /> Learn More
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button className="carousel-arrow next" onClick={nextImage}>❯</button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-indicators">
          {currentImages.map((_, index) => (
            <button 
              key={index} 
              className={`indicator ${activeImageIndex === index ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="Banner-secondrow"
        >
          <div className="Bibanner-secondrow">
            {currentSpecs.map((spec, index) => (
              <motion.div 
                key={index} 
                className="spec-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
                }}
              >
                <div className="spec-icon">
                  {spec.icon}
                </div>
                <h3>{spec.title}</h3>
                <p>{spec.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Gamingpage;