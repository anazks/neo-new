import React, { useState, useEffect } from 'react';
import triangle from '../../../Images/triangle.png';
import './gaming.css';

export default function Gaming() {
  const [displayText, setDisplayText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = ["GAMING R1", "PROFESSIONAL SYSTEM", "ENTERPRISE SYSTEM"];
  const [activeTriangle, setActiveTriangle] = useState(0);
  
  const edenContent = [
    {
      title: "PROJECT EDEN",
      description: "<span class=\"highlight\">AT</span> Project Eden, we believe in creating a space that's uniquely yours. From personalized styling to climate control, IoT automation to immersive gaming, and a home theater experience, we've carefully chosen every element to guarantee your pleasure and comfort."
    },
    {
      title: "GAMING SUITE",
      description: "<span class=\"highlight\">IMMERSE</span> yourself in the ultimate gaming experience with our custom-built gaming suites. Featuring state-of-the-art hardware, personalized RGB lighting systems, and ergonomic design for maximum comfort during those intense gaming sessions."
    },
    {
      title: "ENTERPRISE HUB",
      description: "<span class=\"highlight\">ELEVATE</span> your business operations with our enterprise solutions. Designed for scalability and reliability, our systems feature military-grade security, seamless networking capabilities, and 24/7 technical support to keep your business running smoothly."
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
    const edenSection = document.querySelector('.project-eden');
    edenSection.classList.add('content-change');
    setTimeout(() => {
      edenSection.classList.remove('content-change');
    }, 500);
  };
  
  return (
    <div className='gaming-container'>
      {/* Header section */}
      <header className="header">
        <div className="text-content">
          <h1 className="main-title">
            <span className="quote-marks">"</span>DOESN'T HAVE TO BE A BOX IN A CORNER. IT CAN BE A...<span className="quote-marks">"</span>
          </h1>
          
          <div className="typing-wrapper">
            <h2 className="typing-text">
              {displayText}
              <span className="cursor">|</span>
            </h2>
          </div>
          
          <p className="subheading">
            Built with latest in PC hardware, highest quality components and backed by lifetime support
          </p>
          
          <div className="divider"></div>
        </div>
      </header>

      {/* Main content section */}
      <div className="content-section">
        <div className="flex-container">
          {/* Left side with staggered text */}
          <div className="text-box">
            <div className="staggered-content">
              <h2 className="staggered-text">NEW</h2>
              <h2 className="staggered-text">
                <span className="highlight-text">EXP</span>ERIENCES
              </h2>
              <h2 className="staggered-text">BEGINS HERE</h2>
              <p className="possibilities-text">Endless Possibilities</p>
            </div>
          </div>
          
          {/* Right side with interactive triangle */}
          <div className="triangle-box">
            <div className="triangle-container">
              <div className="interactive-triangle-wrapper">
                <img 
                  src={triangle} 
                  alt="Triangle Design" 
                  className="triangle-image"
                  useMap="#triangleMap"
                />
                
                <map name="triangleMap">
                  <area 
                    shape="poly" 
                    coords="150,50, 150,240, 50,240" 
                    alt="Left triangle" 
                    onClick={() => handleTriangleClick(0)}
                  />
                  <area 
                    shape="poly" 
                    coords="150,50, 250,240, 150,240" 
                    alt="Right triangle" 
                    onClick={() => handleTriangleClick(1)}
                  />
                  <area 
                    shape="poly" 
                    coords="150,120, 200,240, 100,240" 
                    alt="Center triangle" 
                    onClick={() => handleTriangleClick(2)}
                  />
                </map>
                
                <div className={`triangle-indicator triangle-indicator-${activeTriangle}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Eden section */}
        <div className="project-eden">
          <div className="eden-left">
            <div className="eden-logo">
              <div className="eden-circles">
                <div className="circle blue-circle"></div>
                <div className="circle purple-circle"></div>
              </div>
              <h3 className="eden-title">{edenContent[activeTriangle].title}</h3>
            </div>
          </div>
          <div className="eden-right">
            <p 
              className="eden-description"
              dangerouslySetInnerHTML={{ __html: edenContent[activeTriangle].description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}