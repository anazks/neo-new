import React, { useEffect, useState, useRef } from 'react'
import './Pbanner.css'
import image from '../../../Images/Rectangle 532.jpg'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { FaComputer, FaFire, FaMemory, FaHardDrive, FaMoon, FaSun } from 'react-icons/fa6'
import "@fontsource/rajdhani"; // Default font weight
import "@fontsource/rajdhani/700.css"; // Optional: specific font weight (600)

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
        '.textContenst',
        '.smallText',
        '.rate',
        '.team-buttons',
        '.Buy-now',
        '.shape-circle',
        '.shape-square',
        '.shape-triangle'
      ];
      
      elements.forEach((selector, index) => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
          // Add animation with delay based on index
          setTimeout(() => {
            item.classList.add('animated');
          }, index * 200);
        });
      });
    };
    
    animateElements();
    
    // Floating animation for shapes
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach(shape => {
      setInterval(() => {
        shape.classList.toggle('float-up');
      }, 3000);
    });
  }, []);

  return (
    <>
      {/* Theme transition overlay */}
      <div ref={overlayRef} className="theme-transition-overlay"></div>
      
      {/* Theme toggle button */}
      <button 
        className={`theme-toggle ${darkMode ? 'dark-theme' : 'light-theme'}`}
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
      </button>

      {/* Animated shapes - positioned absolutely */}
      <div className="shape-container">
        <div className="shape-circle floating-shape"></div>
        <div className="shape-square floating-shape"></div>
        <div className="shape-triangle floating-shape"></div>
        <div className="shape-circle shape-sm floating-shape"></div>
        <div className="shape-square shape-sm floating-shape"></div>
      </div>
      
      <div className={`ProductBanneBox ${darkMode ? 'dark-theme' : ''}`}>
        <div className="LeftBox">
          <div className="textContenst">
            <span>FRAMES SPEAKS MORE <br /> THAN SPECS. <br />
              MEET THE  <br />
              FPS <u><span className='MONGER'>MONGER</span></u>
            </span>
          </div>
          <div className='smallText'>
            <div className="spec-item">
              <FaComputer className="spec-icon" />
              <span>Intel Core i7 14700K - 5.6GHz Max Clock</span>
            </div>
            <div className="spec-item">
              <FaFire className="spec-icon" />
              <span>Nvidia RTX 4070Ti - 8GB DDR6 VRAM</span>
            </div>
            <div className="spec-item">
              <FaMemory className="spec-icon" />
              <span>Corsair Vengeance DDR5 - 16GB</span>
            </div>
            <div className="spec-item">
              <FaHardDrive className="spec-icon" />
              <span>Samsung 970 Evo Pro - 1TB</span>
            </div>
          </div>
          <div className="rate">
            <span className="original-price"><del>₹2,77,990</del></span> 
            <span className="price-highlight">₹2,57,990</span>
            <div className="discount-badge">SAVE ₹20,000</div>
          </div>

          <button className='Buy-now'>
            <IoArrowForwardCircleSharp className='iconsbtn-team' />
            <span className='Team'>BUY NOW</span>
          </button>

          {/* Particles for button hover effect */}
          <div className="particles">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="particle"></span>
            ))}
          </div>
        </div>
        <div className="rightBox">
          <div className="image-containersx">
            <img src={image} alt="gaming pc" />
            <div className="image-overlay">
              <div className="pulse-circle"></div>
              <div className="feature-point" style={{top: '20%', left: '30%'}}>
                <div className="feature-dot"></div>
                <div className="feature-label">RGB Lighting</div>
              </div>
              <div className="feature-point" style={{top: '40%', left: '70%'}}>
                <div className="feature-dot"></div>
                <div className="feature-label">Air Cooling</div>
              </div>
              <div className="feature-point" style={{bottom: '30%', left: '55%'}}>
                <div className="feature-dot"></div>
                <div className="feature-label">GPU Power</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductBanner