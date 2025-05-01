import React, { useEffect, useState, useRef } from "react";
import Tokyo from '../../../Images/city.png';

const ParallaxRevealSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight/2 && rect.bottom >= 0;
        setInView(isInView);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxActive = scrollY > 200;
  const parallaxDeep = scrollY > 300;
  const panelTransformPercentage = Math.min(100, scrollY / 5);
  const imageWidth = parallaxActive ? 100 : 20;
  const imageOpacity = Math.min(1, scrollY / 300);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-container ${inView ? 'in-view' : ''} ${parallaxActive ? 'parallax-active' : ''} ${parallaxDeep ? 'parallax-deep' : ''}`}
    >
      {/* Left Panel - Contains NEO text */}
      <div 
        className="panel panel-left"
        style={{ transform: `translateX(-${panelTransformPercentage}%)` }}
      >
        <div className="text-left">NEO</div>
      </div>

      {/* Right Panel - Contains TOKYO text */}
      <div 
        className="panel panel-right"
        style={{ transform: `translateX(${panelTransformPercentage}%)` }}
      >
        <div className="text-right">
          <span className="first-part">TO</span>
          <span className="second-part">KYO</span>
        </div>
        <div className="content-wrapper">
          <div className="tagline">
            <span className="tagline-bold">Experience the Power of Personalization</span>       
          </div>
          
          <div className="headline-right">
            <span className="headline-text">ENDLESS POSSIBILITIES</span>
          </div>
        </div>
      </div>

      {/* Center Image */}
      <div
        className="center-image"
        style={{
          width: `${imageWidth}%`,
          opacity: imageOpacity,
        }}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Niveau+Grotesk:wght@400;500;700&family=Raleway:wght@300;400;600;700&display=swap');
          
          .parallax-container {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            background-color: #000;
            perspective: 2000px;
            width: 100%;
          }

          .panel {
            position: absolute;
            height: 100%;
            width: 50%;
            top: 0;
            z-index: 3;
            transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            will-change: transform;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .panel-left {
            left: 0;
            background: white;
            align-items: flex-end;
            padding-right: 5%;
          }

          .panel-right {
            right: 0;
            background: white;
            align-items: flex-start;
            padding-left: 5%;
          }

          .text-left, .text-right {
            font-size: 3.5rem; /* Keeping original desktop size */
            font-weight: 400;
            font-family: 'Niveau Grotesk', sans-serif;
            color: #111;
            text-transform: uppercase;
            letter-spacing: 1.03em;
            line-height: 0.9;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 15px;
          }

          /* Split TOKYO into two parts for styling */
          .first-part {
            position: relative;
            display: inline-block;
          }

          .second-part {
            display: inline-block;
          }
          
          /* Only apply red underline to TO - reduced width and increased gap */
          .first-part::after {
            content: '';
            position: absolute;
            bottom: -25px; /* Increased from -15px to -25px for more gap */
            left: 0;
            height: 7px;
            background: #ff1744;
            width: 5%; /* Reduced from 10% to 5% for initial width */
            transition: width 0.4s ease-in-out;
          }

          .in-view .first-part::after {
            width: 80%; /* Reduced from 100% to 80% for final width */
          }

          /* Position both texts at exact same height */
          .panel-left .text-left {
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
          }
          
          .panel-right .text-right {
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translateY(-50%);
          }
          
          .content-wrapper {
            position: absolute;
            top: 60%;
            left: 5%;
            width: 90%;
          }

          .headline-right {
            font-size: 1rem; /* Keep original size */
            color: #333;
            font-weight: 700;
            font-family: 'Raleway', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin: 2.5rem 0 0.5rem; /* Keep original spacing */
            padding-left: 2px;
          }

          .headline-text {
            position: relative;
            font-weight: 800;
            background: linear-gradient(90deg, #333 0%, #000 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }

          .tagline {
            font-size: 0.9rem; /* Keep original size */
            color: #555;
            font-weight: 400;
            font-family: 'Raleway', sans-serif;
            letter-spacing: 0.1em;
            line-height: 1.6;
            margin-top: 1rem; /* Keep original spacing */
            max-width: 300px; /* Keep original width */
          }

          .tagline-bold {
            font-weight: 700;
            color: #333;
            display: inline-block;
            position: relative;
            overflow: hidden;
          }

          .in-view .tagline-bold::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            transform: translateX(-100%);
            animation: lineReveal 1.2s forwards 0.5s;
          }

          .center-image {
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            background-size: cover;
            background-position: center;
            background-image: url(${Tokyo});
            transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s ease-in-out;
            will-change: width, opacity;
            box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
            filter: contrast(1.1) brightness(0.9);
          }

          @keyframes textGlow {
            0% { opacity: 0.95; text-shadow: 0 0 5px rgba(255, 23, 68, 0); }
            50% { opacity: 1; text-shadow: 0 0 8px rgba(255, 23, 68, 0.3); }
            100% { opacity: 0.95; text-shadow: 0 0 5px rgba(255, 23, 68, 0); }
          }

          @keyframes lineReveal {
            to { transform: translateX(0); }
          }

          .in-view .text-left, 
          .in-view .text-right {
            animation: textGlow 2.5s infinite ease-in-out;
          }

          .in-view .headline-text {
            animation: textGlow 2.5s infinite ease-in-out 0.5s;
          }

          /* Responsive Styles */
          @media (max-width: 1200px) {
            .text-left, .text-right {
              font-size: 3.5rem; /* Keep original size */
            }
            .tagline {
              max-width: 280px; /* Keep original size */
            }
          }

          @media (max-width: 992px) {
            .text-left, .text-right {
              font-size: 3rem; /* Keep original size */
            }
            .headline-right {
              font-size: 0.9rem; /* Keep original size */
              margin: 2rem 0 0.5rem; /* Keep original spacing */
            }
            .tagline {
              font-size: 0.85rem; /* Keep original size */
              max-width: 250px; /* Keep original size */
            }
            .content-wrapper {
              top: 62%;
            }
          }

          @media (max-width: 768px) {
            /* Maintain left-right layout on mobile */
            .panel {
              width: 50%; /* Keep panels at 50% width */
              position: absolute; /* Keep absolute positioning */
            }
            
            .text-left, .text-right {
              font-size: 3.2rem; /* Increased from 2.5rem to 3.2rem for mobile */
              letter-spacing: 0.7em;
            }
            
            .panel-left .text-left {
              right: 10%; /* Adjust position for smaller screen */
            }
            
            .panel-right .text-right {
              left: 10%; /* Adjust position for smaller screen */
            }
            
            .first-part::after {
              bottom: -15px;
              height: 5px;
            }
            
            .in-view .first-part::after {
              width: 70%;
            }
            
            .content-wrapper {
              top: 62%;
              left: 10%;
              width: 80%;
            }
            
            .headline-right {
              font-size: 0.95rem; /* Increased from 0.8rem to 0.95rem for mobile */
              letter-spacing: 0.15em;
              margin-top: 1.8rem; /* Slightly increased for mobile */
            }
            
            .tagline {
              font-size: 0.9rem; /* Increased from 0.8rem to 0.9rem for mobile */
              max-width: 90%;
              margin: 1rem 0; /* Increased spacing for mobile */
            }
          }

          @media (max-width: 576px) {
            .text-left, .text-right {
              font-size: 2.4rem; /* Increased from 1.8rem to 2.4rem for mobile */
              letter-spacing: 0.5em;
            }
            
            .panel-left .text-left {
              right: 8%;
            }
            
            .panel-right .text-right {
              left: 8%;
            }
            
            .headline-right {
              font-size: 0.85rem; /* Increased from 0.7rem to 0.85rem for mobile */
              margin-top: 1.5rem; /* Slightly increased for mobile */
              letter-spacing: 0.12em;
            }
            
            .tagline {
              font-size: 0.85rem; /* Increased from 0.75rem to 0.85rem for mobile */
              line-height: 1.5;
            }
            
            .first-part::after {
              bottom: -12px;
              height: 4px;
            }
            
            .content-wrapper {
              top: 65%;
            }
          }

          @media (max-width: 480px) {
            .text-left, .text-right {
              font-size: 2rem; /* Increased from 1.5rem to 2rem for mobile */
              letter-spacing: 0.4em;
            }
            
            .panel-left .text-left {
              right: 5%;
            }
            
            .panel-right .text-right {
              left: 5%;
            }
            
            .headline-right {
              font-size: 0.8rem; /* Increased from 0.65rem to 0.8rem for mobile */
              letter-spacing: 0.1em;
              margin-top: 1.3rem; /* Slightly increased for mobile */
            }
            
            .tagline {
              font-size: 0.8rem; /* Increased from 0.7rem to 0.8rem for mobile */
              line-height: 1.4;
              max-width: 95%;
            }
            
            .first-part::after {
              bottom: -10px;
              height: 3px;
            }
            
            .content-wrapper {
              top: 65%;
            }
          }
          
          /* Handle very small devices */
          @media (max-width: 360px) {
            .text-left, .text-right {
              font-size: 1.6rem; /* Increased from 1.2rem to 1.6rem for mobile */
              letter-spacing: 0.3em;
            }
            
            .headline-right {
              font-size: 0.75rem; /* Increased from 0.6rem to 0.75rem for mobile */
              letter-spacing: 0.08em;
              margin-top: 1.2rem; /* Slightly increased for mobile */
            }
            
            .tagline {
              font-size: 0.75rem; /* Increased from 0.65rem to 0.75rem for mobile */
            }
            
            .content-wrapper {
              top: 68%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ParallaxRevealSection;