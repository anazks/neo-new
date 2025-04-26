import React, { useEffect } from 'react';
import './gaming.css';
import triangle from '../../../Images/triangle.png';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { FaGamepad, FaRocket, FaLaptopCode, FaTrophy } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Gaming() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className='gaming-container dark-mode'>
      <motion.div 
        className="head"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="textContent">
          <h1 className="main-title">
            <span className="quote-marks">"</span>DOESN'T HAVE TO BE A BOX IN A CORNER.<span className="quote-marks">"</span>
            <br/>
            <span className="quote-marks">"</span>IT CAN BE A...<span className="quote-marks">"</span>
          </h1>
          <h1 className="gaming">
            <Typewriter
              options={{
                strings: ["GAMING REVOLUTION", "LIFESTYLE", "MASTERPIECE", "STATEMENT"],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 70,
              }}
            />
          </h1>
          <motion.div 
            className="icon-row"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FaGamepad className="feature-icon" />
            <FaRocket className="feature-icon" />
            <FaLaptopCode className="feature-icon" />
            <FaTrophy className="feature-icon" />
          </motion.div>
          <h5 className="subHeading" data-aos="fade-up">
            Built with the latest in PC hardware, highest quality components, and backed by lifetime support
          </h5>
          <motion.div 
            className="line"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 0.8, delay: 1 }}
          ></motion.div>
        </div>
      </motion.div>

      <div className="bottomSection">
        <div className="containerBox" data-aos="fade-up">
          <motion.div 
            className="leftBox"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="leftDivText">
              <h1 className="staggered-text">NEW</h1>
              <h1 className="staggered-text">
                <span className="highlight-text">EXP</span>ERIENCES
              </h1>
              <h1 className="staggered-text">&nbsp;&nbsp; BEGIN HERE</h1>
              <div className="pulsing-circle"></div>
              <h4 className="possibilities-text">Endless Possibilities</h4>
              <div className="feature-list">
                <div className="feature-item">
                  <FaRocket className="feature-item-icon" />
                  <span>Performance</span>
                </div>
                <div className="feature-item">
                  <FaGamepad className="feature-item-icon" />
                  <span>Immersion</span>
                </div>
                <div className="feature-item">
                  <FaTrophy className="feature-item-icon" />
                  <span>Victory</span>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="right-Box" data-aos="fade-left">
            <img 
              src={triangle} 
              alt="Triangle Design" 
              className="floating-image"
            />
          </div>
        </div>

        <div className="ProjectEden" data-aos="fade-up">
          <motion.div 
            className="Left"
            whileHover={{ 
              boxShadow: "0px 10px 30px rgba(218, 0, 55, 0.6)",
            }}
            transition={{ duration: 0.3 }}
          >
     
            <motion.h2
              animate={{ 
                color: ["rgba(218, 0, 55, 1)", "#ffffff", "rgba(218, 0, 55, 1)"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PROJECT EDEN
            </motion.h2>
            <motion.div 
              className="eden-badge"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              EXCLUSIVE
            </motion.div>
          </motion.div>
          <motion.div 
            className="right"
            whileHover={{ 
              x: 10,
              transition: { duration: 0.3 }
            }}
          >
            <h1>
              <span className="highlight">AT</span>{" "}
              <span className="G-Text">
                𝖯𝗋𝗈𝗃𝖾𝖼𝗍 𝖤𝖽𝖾𝗇 is a revolutionary gaming experience designed to immerse users in a world where technology meets comfort.
              </span>
            </h1>
            <button className="discover-btn">
              DISCOVER MORE <span className="btn-arrow">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}