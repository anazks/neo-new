import React, { useState, useEffect } from 'react';
import triangle from '../../../Images/triangle.png';
import './gamingMobile.css';

export default function GamingMobile() {
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
    const edenSection = document.querySelector('.mobile-project-eden');
    edenSection.classList.add('content-change');
    setTimeout(() => {
      edenSection.classList.remove('content-change');
    }, 500);
  };
  
  return (
    <div className='gaming-mobile-container'>
      {/* Header section */}
      <header className="mobile-header">
        <div className="mobile-text-content">
          <h1 className="mobile-main-title">
            <span className="mobile-quote-marks">"</span>DOESN'T HAVE TO BE A BOX IN A CORNER. IT CAN BE A...<span className="mobile-quote-marks">"</span>
          </h1>
          
          <div className="mobile-typing-wrapper">
            <h2 className="mobile-typing-text">
              {displayText}
              <span className="mobile-cursor">|</span>
            </h2>
          </div>
          
          <p className="mobile-subheading">
            Built with latest in PC hardware, highest quality components and backed by lifetime support
          </p>
          
          <div className="mobile-divider"></div>
        </div>
      </header>

      {/* Main content section */}
      <div className="mobile-content-section">
        {/* Staggered text */}
        <div className="mobile-text-box">
          <div className="mobile-staggered-content">
            <h2 className="mobile-staggered-text">NEW</h2>
            <h2 className="mobile-staggered-text">
              <span className="mobile-highlight-text">EXP</span>ERIENCES
            </h2>
            <h2 className="mobile-staggered-text">BEGINS HERE</h2>
            <p className="mobile-possibilities-text">Endless Possibilities</p>
          </div>
        </div>
        
        {/* Triangle selector */}
        <div className="mobile-triangle-box">
          <div className="mobile-triangle-container">
            <h3 className="mobile-triangle-title">Select Your Experience</h3>
            
            <div className="mobile-triangle-options">
              <div 
                className={`mobile-triangle-option ${activeTriangle === 0 ? 'active' : ''}`}
                onClick={() => handleTriangleClick(0)}
              >
                PROJECT EDEN
              </div>
              <div 
                className={`mobile-triangle-option ${activeTriangle === 1 ? 'active' : ''}`}
                onClick={() => handleTriangleClick(1)}
              >
                GAMING SUITE
              </div>
              <div 
                className={`mobile-triangle-option ${activeTriangle === 2 ? 'active' : ''}`}
                onClick={() => handleTriangleClick(2)}
              >
                ENTERPRISE HUB
              </div>
            </div>
          </div>
        </div>

        {/* Project Eden section */}
        <div className="mobile-project-eden">
          <div className="mobile-eden-header">
            <div className="mobile-eden-circles">
              <div className="mobile-circle mobile-blue-circle"></div>
              <div className="mobile-circle mobile-purple-circle"></div>
            </div>
            <h3 className="mobile-eden-title">{edenContent[activeTriangle].title}</h3>
          </div>
          
          <div className="mobile-eden-content">
            <p 
              className="mobile-eden-description"
              dangerouslySetInnerHTML={{ __html: edenContent[activeTriangle].description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}