import React, { useState, useEffect } from 'react';
import './footer.css';
import { ImArrowUpRight2 } from "react-icons/im";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Handle visibility on scroll
    const handleScroll = () => {
      const footer = document.querySelector('.main-footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= viewportHeight * 0.9) {
          setIsVisible(true);
        }
      }
    };
    
    // Initialize states
    checkMobile();
    handleScroll();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        staggerChildren: isMobile ? 0.1 : 0.15,
        ease: "easeOut"
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemHoverVariants = {
    hover: { 
      x: 10, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <motion.div 
      className="main-footer"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="box-inside-main-footer">
        <motion.div className="about-footer" variants={childVariants}>
          <div className="forabout-footer">
            <h1 className="aboutheading-footer">Building Experiences <br />Since 20s </h1>
            <div className="tagline">Creating next-gen PC solutions</div>
          </div>
          <motion.div 
            className="getintouch-footer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="boxinsidegetintouch-footer">
              <div className="getintouchslider-footer">
                <ImArrowUpRight2 className='uprightarrow-footer' />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="contact-footer" variants={childVariants}>
          <div className="boxinsidecontact-footer">
            <motion.div 
              className="logo-footer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="heading-footer">NT <br />KO </h1>
              <div className="logo-glow"></div>
            </motion.div>
            <div className="description-footer">
              <span className="secheading-footer">Priority One By Neo Tokyo </span>
            </div>
            <div className="support-footer">
              <motion.a 
                href="tel:+917920938981"
                className="support-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiPhone className="support-icon" />
                <span className="thirdheading-footer">+91 7920938981</span>
              </motion.a>
              <motion.a 
                href="mailto:support@neotokyo.in"
                className="support-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiMail className="support-icon" />
                <span className="thirdheading-footer">support@neotokyo.in</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div className="option-footer" variants={childVariants}>
          <div className="boxinsideoption-footer">
            <div className="firstbox-footer">
              <motion.div className="fstbox-footer">
                <span className="heading-company">Company</span>
                <div className="links-container">
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">About</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">FAQ's</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Blog</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Careers</span>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div className="sdbox-footer">
                <span className="enterprise-solutions">Enterprise Solutions</span>
                <div className="links-container">
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Gaming Rigs</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Accounts</span>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div className="thrdbox-footer">
                <span className="store">Store</span>
                <div className="links-container">
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">PC's</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Peripherals</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Gear</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Accessories</span>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div className="forthbox-footer">
                <span className="soluthions">Solutions</span>
                <div className="links-container">
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Home PC's</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Gaming PC's</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Workstations</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Enterprise Solutions</span>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div className="fifthbox-footer">
                <span className="legal">Legal</span>
                <div className="links-container">
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Privacy Policy</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Cookie Policy</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Terms And Conditions</span>
                  </motion.a>
                  <motion.a href="#" variants={itemHoverVariants} whileHover="hover" className="footer-link">
                    <span className="list-company">Return And Refunds</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="secondbox-footer"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="fbisecondbox-footer">
                <div className="reachus-footer">
                  <span className="reachus">Reach Us</span>
                </div>
                <div className="location-footer">
                  <span className="neotokyo">NEO TOKYO</span> 
                  <motion.div
                    animate={{ 
                      x: [0, 3, -3, 0], 
                      y: [0, -3, 3, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="location-icon-container"
                  >
                    <CiLocationArrow1 className='location-icon'/>
                  </motion.div>
                  <span className="neotokyo">Head Quarters</span>
                </div>
              </div>
              <div className="sbisecondbox-footer">
                <span className="detailedlocation">Floor no. 2, Koroth Arcade, </span>
                <span className="detailedlocation">Vennala High School Rd, </span>
                <span className="detailedlocation">opposite to V-Guard, Vennala,</span>
                <span className="detailedlocation">Kochi, Kerala 682028 </span>
              </div>
            </motion.div>
            
            <div className="thirdbox-footer">
              <div className="social">
                <span className="heading-social">Connect With Us</span>
                <div className="social-underline"></div>
              </div>
              <div className="social-icons">
                <motion.a
                  href="https://wa.me/917920938981"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="social-icon-container"
                >
                  <FaWhatsapp className="social-iconszz"/>
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="social-icon-container"
                >
                  <SlSocialFacebook className="social-iconszz"/>
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="social-icon-container"
                >
                  <FaInstagram className="social-iconszz"/>
                </motion.a>
              </div>
              <div className="all-rights">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="shield-container"
                >
                  <BsShieldLock className='shield-icon'/>
                </motion.div>
                <span>© All Rights Reserved. 2024 Neo Tokyo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Footer;