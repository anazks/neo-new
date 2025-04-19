import React, { useEffect, useState, useRef } from "react";
import Tokyo from '../../../Images/city.png';
import Drone from "../Drone/Drone";

const ParallaxRevealSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if section is in viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight/2 && rect.bottom >= 0;
        setInView(isInView);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate parallax effects based on scroll
  const parallaxActive = scrollY > 200;
  const parallaxDeep = scrollY > 300;
  const panelTransformPercentage = Math.min(100, scrollY / 5);
  
  // Ensure the image is always full width when revealed
  const imageWidth = parallaxActive ? 100 : 20;
  const imageOpacity = Math.min(1, scrollY / 300);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-container ${inView ? 'in-view' : ''} ${parallaxActive ? 'parallax-active' : ''} ${parallaxDeep ? 'parallax-deep' : ''}`}
    >
      {/* Left Panel */}
      <div 
        className="panel panel-left"
        style={{ transform: `translateX(-${panelTransformPercentage}%)` }}
      />

      {/* Right Panel */}
      <div 
        className="panel panel-right"
        style={{ transform: `translateX(${panelTransformPercentage}%)` }}
      />

      {/* Center Image - Revealed */}
      <div
        className="center-image"
        style={{
          width: `${imageWidth}%`,
          opacity: imageOpacity,
          backgroundImage: `url(${Tokyo})`,
        }}
      />
      
      {/* Drone positioned above subtitle section */}
      <div className="drone-container">
        <Drone />
      </div>

      {/* Subtitle section - Positioned at the top */}
      <div className="subtitle-section">
        <div className="tagline">
          Experience the power of personalization
        </div>
        <h2 className="headline">
          ENDLESS POSSIBILITIES
        </h2>
        <div className="cta-container">
          <button className="cta-button">
            <span className="cta-text">EXPERIENCE NOW</span>
            <span className="cta-icon">→</span>
          </button>
        </div>
      </div>
      
      {/* Text - NEO TOKYO - Now positioned below subtitle section */}
      <div className="neo-tokyo-container">
        <div className="text text-left">NEO</div>
        <div className="text text-right">TOKYO</div>
      </div>

      {/* Styling */}
      <style>
        {`
          /* Base styling */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* Parallax container */
          .parallax-container {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            background-color: #000;
            perspective: 2000px;
            width: 100%;
          }

          /* Panel styling */
          .panel {
            position: absolute;
            height: 100%;
            width: 50%;
            top: 0;
            background: white;
            z-index: 3;
            transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            will-change: transform;
            
          }

          .panel-left {
            left: 0;
          }

          .panel-right {
            right: 0;
          }

          /* Center image */
          .center-image {
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            background-size: cover;
            background-position: center;
            transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s ease-in-out;
            will-change: width, opacity;
          }

          /* Neo Tokyo container */
          .neo-tokyo-container {
            position: absolute;
            top: 75%;
            width: 100%;
            z-index: 4;
            display: flex;
            justify-content: center;
            gap: 20px;
          }

          /* Text styling */
          .text {
            font-size: 6rem;
            font-weight: 800;
            letter-spacing: 0.5em;
            white-space: nowrap;
            transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            will-change: transform, opacity;
            font-family: 'Blade Runner', 'Orbitron', sans-serif;
            color: black;
            padding: 5px 20px 10px;
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
            display: inline-block;
            border-bottom: 3px solid red;
          }

          /* Subtitle section */
          .subtitle-section {
            position: absolute;
            top: 40%;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 6;
            transition: all 0.8s ease-in-out;
            padding: 0 20px;
          }

          /* Adjust subtitle section based on parallax state */
          .parallax-active .subtitle-section {
            top: 20%;
          }

          .parallax-active .neo-tokyo-container {
            top: 60%;
          }

          .tagline {
            font-size: 1.2rem;
            color: ${parallaxActive ? "white" : "black"};
            margin-bottom: 0.8rem;
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            transition: color 0.5s ease;
          }

          .headline {
            font-size: 3rem;
            color: ${parallaxActive ? "white" : "black"};
            font-weight: bold;
            margin: 0.8rem 0 2rem;
            font-family: 'Blade Runner', 'Orbitron', sans-serif;
            border-bottom: 3px solid red;
            display: inline-block;
            padding-bottom: 0.5rem;
            transition: color 0.5s ease;
          }

          /* CTA button */
          .cta-container {
            margin-top: 2rem;
          }

          .cta-button {
            background: rgba(255, 0, 0, 0.8);
            color: white;
            border: none;
            padding: 0.8rem 1.8rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            border-radius: 3px;
          }

          .cta-text {
            letter-spacing: 0.1em;
          }

          .cta-icon {
            margin-left: 0.5rem;
            font-size: 1.2rem;
            transition: transform 0.3s ease;
          }

          .cta-button:hover {
            background: rgba(255, 0, 0, 1);
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }

          .cta-button:hover .cta-icon {
            transform: translateX(5px);
          }

          /* Drone container */
          .drone-container {
            position: absolute;
            z-index: 10;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 150px;
            opacity: 1;
            transition: opacity 1s ease-in-out, transform 1.5s ease-in-out;
            animation: droneHover 4s infinite ease-in-out;
            display: block !important;
            pointer-events: all !important;
            visibility: visible !important;
          }

          /* Animation keyframes */
          @keyframes droneHover {
            0% { transform: translate(-50%, -50%); }
            50% { transform: translate(-50%, calc(-50% - 15px)); }
            100% { transform: translate(-50%, -50%); }
          }

          @keyframes textGlow {
            0% { text-shadow: 0 0 5px rgba(0,0,0,0.5); }
            50% { text-shadow: 0 0 15px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7); }
            100% { text-shadow: 0 0 5px rgba(0,0,0,0.5); }
          }

          @keyframes textReveal {
            0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
            100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          }

          /* Apply animations when in view */
          .in-view .text {
            animation: textGlow 3s infinite ease-in-out, textReveal 1.2s forwards;
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          }

          /* Responsive styles */
          @media (max-width: 1200px) {
            .text {
              font-size: 5rem;
              letter-spacing: 0.4em;
            }
            .headline {
              font-size: 2.6rem;
            }
          }

          @media (max-width: 992px) {
            .text {
              font-size: 4rem;
              letter-spacing: 0.3em;
            }
            .headline {
              font-size: 2.2rem;
            }
            .drone-container {
              width: 120px;
              height: 120px;
            }
          }

          @media (max-width: 768px) {
            .text {
              font-size: 3rem;
              letter-spacing: 0.2em;
            }
            .headline {
              font-size: 1.8rem;
            }
            .tagline {
              font-size: 1rem;
            }
            .drone-container {
              width: 100px;
              height: 100px;
            }
            .neo-tokyo-container {
              gap: 10px;
            }
          }

          @media (max-width: 576px) {
            .text {
              font-size: 2rem;
              letter-spacing: 0.15em;
              padding: 5px 10px 8px;
            }
            .headline {
              font-size: 1.5rem;
              margin: 0.5rem 0 1.5rem;
            }
            .tagline {
              font-size: 0.9rem;
            }
            .drone-container {
              width: 80px;
              height: 80px;
            }
            .cta-button {
              padding: 0.6rem 1.2rem;
              font-size: 0.9rem;
            }
            .neo-tokyo-container {
              gap: 5px;
            }
          }

          @media (max-width: 480px) {
            .text {
              font-size: 1.5rem;
            }
            .headline {
              font-size: 1.3rem;
            }
            .tagline {
              font-size: 0.8rem;
            }
            .cta-button {
              padding: 0.5rem 1rem;
              font-size: 0.8rem;
            }
            .drone-container {
              width: 60px;
              height: 60px;
            }
            .cta-container {
              margin-top: 1.5rem;
            }
          }
            .parallax-deep .neo-tokyo-container {
              opacity: 0;
              visibility: hidden;
            }
         
        `}
      </style>
    </div>
  );
};

export default ParallaxRevealSection;