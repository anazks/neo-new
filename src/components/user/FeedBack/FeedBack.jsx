import React, { useEffect, useState } from "react";
import "./feedback.css";

function FeedBack() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Set theme to light/white mode by default
    document.body.classList.add('light-theme');
    
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

    return () => {
      clearInterval(interval);
      document.body.classList.remove('light-theme');
    };
  }, []);

  return (
    <div className="feedback light-mode">
      <div className="leftB">
        <h1 className="title-text">
          Don't Just Take our Word, Listen to Our Customers
        </h1>
        
        <div className="ShortLine"></div>
        
        <div className="bottomBox">
          <h2 className="subtitle-text">
            Neo Tokyo In Numbers
          </h2>
          
          <div className="stats-container">
            <div className="contentsTokio">
              <div className="counter-container">
                <h1 className="thousand">
                  {counter}
                  <span className="plus-icon"><b>+</b></span>
                </h1>
              </div>
              <span className="build">
                Completed Builds
              </span>
            </div>
            
            <div className="numbers">
              <div className="business-entity">
                <span>50+ Business Entities</span>
              </div>
              
              <div className="active-customers">
                <span>500+ Active Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rightB">
        {/* <div className="gray-box"></div> */}
      </div>
      
      <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Poppins:wght@400;600;700&display=swap');
        /* Light theme variables */
        :root {
          --bg-color: #ffffff;
          --text-color: #333333;
          --accent-color: #ff0055;
          --card-bg: #ffffff;
          --shadow-color: rgba(0, 0, 0, 0.05);
        }
        
        /* Global light theme styles */
        body.light-theme {
          background-color: #ffffff;
          color: #333333;
        }
        
        /* Component styles */
        .feedback {
          width: 95vw;
          height: 100vh;
          padding: 45px;
          background-color: white;
          border-radius: 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        /* Removing animations */
        
        /* Layout and styling */
        .leftB {
          width: 48%;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        
        .title-text {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          font-family: 'Montserrat', sans-serif;
          color: var(--text-color);
        }
        
        .ShortLine {
          width: 80px;
          height: 4px;
          background-color: var(--accent-color);
          margin: 1rem 0 2rem 0;
        }
        
        .subtitle-text {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-color);
        }
        
        .stats-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .thousand {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          display: flex;
          align-items: center;
        }
        
        .plus-icon {
          font-size: 2.5rem;
          margin-left: 5px;
          color: var(--text-color);
        }
        
        .build {
          display: block;
          font-size: 1.1rem;
          color: #555;
          margin-top: 0.5rem;
        }
        
        .numbers {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        
        .business-entity, .active-customers {
          padding: 10px 15px;
          color: #ffffff;
          font-size: 1.1rem;
          background-color: #000000;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        
        .business-entity span, .active-customers span {
          font-weight: 500;
        }
        
        .rightB {
          width: 48%;
          height: 85vh;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          background-color: gray;
        }
        
        .gray-box {
          width: 100%;
          height: 100%;
          background-color: #f0f0f0;
          border-radius: 16px;
        }
        
        /* Responsive design */
        @media screen and (max-width: 992px) {
          .feedback {
            flex-direction: column;
            padding: 30px;
          }
          
          .leftB, .rightB {
            width: 100%;
          }
          
          .ShortLine {
            margin: 1rem 0 1.5rem 0;
          }
          
          .rightB {
            margin-top: 40px;
            height: 50vh;
          }
        }
        
        @media screen and (max-width: 768px) {
          .title-text {
            font-size: 2rem;
          }
          
          .subtitle-text {
            font-size: 1.3rem;
          }
          
          .thousand {
            font-size: 3rem;
          }
        }
        
        @media screen and (max-width: 576px) {
          .numbers {
            flex-direction: column;
            gap: 10px;
          }
          
          .title-text {
            font-size: 1.8rem;
          }
          
          .thousand {
            font-size: 2.5rem;
          }
          
          .subtitle-text {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default FeedBack;