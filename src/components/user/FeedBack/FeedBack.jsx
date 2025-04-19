import React, { useEffect, useState } from "react";
import "./feedback.css";
import { FaPeopleGroup, FaUserCheck, FaCheck, FaBuilding, FaComputer } from "react-icons/fa6";
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { MdSupportAgent, MdOutlineSpeed } from "react-icons/md";

function FeedBack() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [colors, setColors] = useState({
    grid1: "#ff0055",
    grid2: "#0099ff",
    grid3: "#22cc88"
  });

  useEffect(() => {
    // Load Grid2Background dynamically
    const loadBackground = async () => {
      try {
        const Grid2Background = await import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.17/build/backgrounds/grid2.cdn.min.js");
        const canvas = document.getElementById("webgl-canvas");
        if (canvas) {
          const bg = Grid2Background.default(canvas);
          
          const handleClick = () => {
            const newColors = {
              grid1: `#${Math.floor(Math.random()*16777215).toString(16)}`,
              grid2: `#${Math.floor(Math.random()*16777215).toString(16)}`,
              grid3: `#${Math.floor(Math.random()*16777215).toString(16)}`
            };
            
            setColors(newColors);
            
            bg.grid.setColors([
              parseInt(newColors.grid1.replace("#", "0x")),
              parseInt(newColors.grid2.replace("#", "0x")),
              parseInt(newColors.grid3.replace("#", "0x")),
            ]);
            
            bg.grid.light1.color.set(parseInt(newColors.grid1.replace("#", "0x")));
            bg.grid.light1.intensity = 500 + Math.random() * 1000;
            bg.grid.light2.color.set(parseInt(newColors.grid2.replace("#", "0x")));
            bg.grid.light2.intensity = 270 + Math.random() * 250;
          };

          document.body.addEventListener("click", handleClick);
          setIsLoaded(true);
          
          return () => {
            document.body.removeEventListener("click", handleClick);
          };
        }
      } catch (error) {
        console.error("Failed to load Grid2Background:", error);
      }
    };

    loadBackground();

    // Counter animation
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 1000) {
          return prev + 20;
        } else {
          clearInterval(interval);
          return 1000;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Custom animation class adder
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    setTimeout(() => {
      elements.forEach(el => {
        el.classList.add('animated');
      });
    }, 100);
  }, []);

  return (
    <div className="feedback">
      <div className="leftB animate-on-load">
        <h1 className="title-text animate-on-load">
          <span className="icon-container">
            <BsStars className="title-icon" style={{ color: colors.grid1 }} />
          </span>
          𝙳𝚘𝚗'𝚝 𝙹𝚞𝚜𝚝 𝚃𝚊𝚔𝚎 𝚘𝚞𝚛 𝚆𝚘𝚛𝚍, 𝙻𝚒𝚜𝚝𝚎𝚗 𝚝𝚘 𝙾𝚞𝚛 𝙲𝚞𝚜𝚝𝚘𝚖𝚎𝚛𝚜
        </h1>
        
        <div className="ShortLine animate-on-load" style={{ backgroundColor: colors.grid1 }}></div>
        
        <div className="bottomBox animate-on-load">
          <h2 className="subtitle-text">
            <FaComputer className="subtitle-icon" style={{ color: colors.grid2 }} />
            𝙽𝚎𝚘 𝚃𝚘𝚔𝚢𝚘 𝙸𝚗 𝙽𝚞𝚖𝚋𝚎𝚛𝚜
          </h2>
          
          <div className="stats-container">
            <div className="contentsTokio">
              <div className="counter-container animate-on-load">
                <h1 className="thousand">
                  {counter}
                  <span className="plus-icon"><b>+</b></span>
                </h1>
                <div className="counter-icon">
                  <BsLightningChargeFill style={{ color: colors.grid1 }} />
                </div>
              </div>
              <span className="build">
                <FaCheck className="check-icon" /> Completed Builds
              </span>
            </div>
            
            <div className="numbers">
              <div className="stat-card entinies animate-on-load">
                <FaBuilding className="stat-icon" style={{ color: colors.grid2 }} />
                <span>50+ Business Entities</span>
              </div>
              
              <div className="stat-card activeCustomers animate-on-load">
                <FaPeopleGroup className="stat-icon" style={{ color: colors.grid3 }} />
                <span>500+ Active Customers</span>
              </div>
            </div>
            
            <div className="service-highlights animate-on-load">
              <div className="highlight-item">
                <MdSupportAgent className="highlight-icon" style={{ color: colors.grid1 }} />
                <span>24/7 Support</span>
              </div>
              
              <div className="highlight-item">
                <MdOutlineSpeed className="highlight-icon" style={{ color: colors.grid2 }} />
                <span>Fast Delivery</span>
              </div>
              
              <div className="highlight-item">
                <FaUserCheck className="highlight-icon" style={{ color: colors.grid3 }} />
                <span>Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rightB animate-on-load">
        <div id="app" className="canvas-container">
          <canvas id="webgl-canvas"></canvas>
          {!isLoaded && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading 3D Environment...</p>
            </div>
          )}
        </div>
        <div className="canvas-hint animate-on-load">
          <span>Click anywhere to change colors</span>
        </div>
      </div>
      
      <style jsx>{`
        /* Animation styles */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        /* Component animations */
        .animate-on-load {
          opacity: 0;
        }
        
        .animate-on-load.animated {
          opacity: 1;
          transition: all 0.6s ease-out;
        }
        
        .title-text.animated {
          animation: fadeInLeft 0.8s forwards;
        }
        
        .ShortLine.animated {
          animation: fadeInLeft 0.8s 0.2s forwards;
        }
        
        .bottomBox.animated {
          animation: fadeInUp 0.8s 0.4s forwards;
        }
        
        .counter-container.animated {
          animation: fadeInUp 0.8s 0.6s forwards;
        }
        
        .stat-card.animated {
          animation: fadeInUp 0.8s 0.8s forwards;
        }
        
        .service-highlights.animated {
          animation: fadeInUp 0.8s 1s forwards;
        }
        
        .rightB.animated {
          animation: fadeInRight 1s 0.2s forwards;
        }
        
        /* Enhanced styling */
        .feedback {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          border: none;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.1);
        }
        
        .title-text {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }
        
        .title-icon {
          margin-right: 10px;
          animation: pulse 2s infinite;
        }
        
        .subtitle-text {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .subtitle-icon {
          font-size: 24px;
        }
        
        .stats-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-top: 20px;
        }
        
        .counter-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .counter-icon {
          font-size: 30px;
          margin-left: 15px;
          animation: pulse 2s infinite;
        }
        
        .thousand {
          position: relative;
          color: #333;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          transition: color 0.3s ease;
        }
        
        .thousand:hover {
          color: ${colors.grid1};
        }
        
        .plus-icon {
          font-size: 50px;
          color: ${colors.grid2};
        }
        
        .build {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          color: #555;
          margin-top: 5px;
        }
        
        .check-icon {
          color: ${colors.grid3};
        }
        
        .numbers {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        
        .stat-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }
        
        .stat-icon {
          font-size: 24px;
        }
        
        .service-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 20px;
        }
        
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .highlight-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .highlight-icon {
          font-size: 18px;
        }
        
        .canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          z-index: 10;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: ${colors.grid1};
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        .canvas-hint {
          text-align: center;
          margin-top: 15px;
          color: #666;
          font-size: 14px;
          opacity: 0.8;
        }
        
        /* Better responsive design */
        @media screen and (max-width: 992px) {
          .ShortLine {
            margin: 15px auto;
          }
          
          .title-text, .subtitle-text {
            justify-content: center;
            text-align: center;
          }
          
          .counter-container {
            justify-content: center;
          }
          
          .canvas-container {
            max-height: 50vh;
          }
          
          .rightB {
            margin-top: 40px;
          }
        }
        
        @media screen and (max-width: 768px) {
          .service-highlights {
            justify-content: center;
          }
          
          .highlight-item {
            min-width: 45%;
            justify-content: center;
          }
        }
        
        @media screen and (max-width: 576px) {
          .numbers {
            flex-direction: column;
          }
          
          .highlight-item {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default FeedBack;