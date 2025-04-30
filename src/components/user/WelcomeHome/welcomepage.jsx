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
      ><br /><br /><br /><br /><br /><br /><br /><br />
        <div className="text-right">TOKYO</div>
        <div className="tagline">
        <b>Experience the Power of Personalization</b>       
        </div>
        
        <br /><br /><br />
        <div className="headline-right">
          ENDLESS POSSIBILITIES
        </div>
      </div>

      {/* Center Image */}
      <div
        className="center-image"
        style={{
          width: `${imageWidth}%`,
          opacity: imageOpacity,
          backgroundImage: `url(${Tokyo})`,
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
            font-size: 3.5rem;
            font-weight: 800;
            font-family: 'Niveau Grotesk', sans-serif;
            color: #111;
            text-transform: uppercase;
            letter-spacing: 1.03em;
            line-height: 0.9;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 15px;
          }

          .text-left::after, .text-right::after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 3px;
            background: #ff1744;
          }

          .text-left::after {
            right: 0;
            width: 80%;
          }

          .text-right::after {
            left: 0;
            width: 80%;
          }

          .headline-right {
            font-size: 1rem;
            color: #333;
            font-weight: 700;
            font-family: 'Raleway', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin: 0.5rem 0;
            padding-left: 2px;
          }

          .tagline {
            font-size: 0.9rem;
            color: #555;
            font-weight: 400;
            font-family: 'Raleway', sans-serif;
            letter-spacing: 0.1em;
            line-height: 1.6;
            margin-top: 1rem;
            max-width: 300px;
          }

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
            box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
            filter: contrast(1.1) brightness(0.9);
          }

          @keyframes textGlow {
            0% { opacity: 0.95; }
            50% { opacity: 1; }
            100% { opacity: 0.95; }
          }

          .in-view .text-left, 
          .in-view .text-right {
            animation: textGlow 2.5s infinite ease-in-out;
          }

          @media (max-width: 1200px) {
            .text-left, .text-right {
              font-size: 4.5rem;
            }
          }

          @media (max-width: 992px) {
            .text-left, .text-right {
              font-size: 3.8rem;
            }
            .headline-right {
              font-size: 0.9rem;
            }
            .tagline {
              font-size: 0.85rem;
            }
          }

          @media (max-width: 768px) {
            .text-left, .text-right {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            .headline-right {
              font-size: 0.8rem;
              letter-spacing: 0.15em;
            }
            .tagline {
              font-size: 0.8rem;
              max-width: 250px;
            }
          }

          @media (max-width: 576px) {
            .text-left, .text-right {
              font-size: 2.5rem;
            }
            .headline-right {
              font-size: 0.7rem;
            }
            .tagline {
              font-size: 0.75rem;
              max-width: 200px;
            }
          }

          @media (max-width: 480px) {
            .text-left, .text-right {
              font-size: 2rem;
            }
            .headline-right {
              letter-spacing: 0.1em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ParallaxRevealSection;