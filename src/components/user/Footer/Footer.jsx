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
import { motion } from "framer-motion"; // You would need to install framer-motion

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if footer is in viewport
      const footer = document.querySelector('.Main-Footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="Main-Footer"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="BoxInsideMain-Footer">
        <motion.div className="About-Footer" variants={childVariants}>
          <div className="Forabout-Footer">
            <h1 className="Aboutheading-Footer">Building Experiences <br />Since 20s </h1>
          </div>
          <div className="Getintouch-Footer">
            <div className="Boxinsidegetintouch-Footer">
              <div className="Getintouchslider-Footer">
                <ImArrowUpRight2 className='Uprightarrow-Footer' />
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECOND DIV FOR CONTACT */}
        <motion.div className="Contact-Footer" variants={childVariants}>
          <div className="Boxinsidecontact-Footer">
            <motion.div 
              className="Logo-Footer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="Heading-Footer">NT <br />KO </h1>
            </motion.div>
            <div className="Description-Footer">
              <span className="Secheading-Footer">Priority One By Neo Tokyo </span>
            </div>
            <div className="Support-Footer">
              <div className="Support-Item">
                <FiPhone className="Support-Icon" />
                <span className="ThirdHeading-Footer">+91 7920938981</span>
              </div>
              <div className="Support-Item">
                <FiMail className="Support-Icon" />
                <span className="ThirdHeading-Footer">support@neotokyo.in</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* THIRD DIV FOR SITEOPTIONS */}
        <motion.div className="Option-Footer" variants={childVariants}>
          <div className="Boxinsideoption-Footer">
            <div className="Firstbox-Footer">
              <motion.div 
                className="Fstbox-Footer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="Heading-Company">Company</span><br /><br />
                <ul className="List-Company">About</ul><br />
                <ul className="List-Company">FAQ's</ul><br />
                <ul className="List-Company">Blog</ul><br />
                <ul className="List-Company">Careers</ul>
              </motion.div>
              <motion.div 
                className="Sdbox-Footer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="Enterprise-Solutions">Enterprise Solutions</span><br /><br /><br />
                <span className="Enterprise-Solutions">Gaming Rigs</span><br /><br /><br />
                <span className="Enterprise-Solutions">Accounts</span><br /><br />
              </motion.div>
              <motion.div 
                className="Thrdbox-Footer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="Store">Store</span><br /><br />
                <ul className="List-Company">PC's</ul><br />
                <ul className="List-Company">Peripherals</ul><br />
                <ul className="List-Company">Gear</ul><br />
                <ul className="List-Company">Accessories</ul>
              </motion.div>
              <motion.div 
                className="Forthbox-Footer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="Soluthions">Solutions</span><br /><br />
                <ul className="List-Company">Home PC's</ul><br />
                <ul className="List-Company">Gaming PC's</ul><br />
                <ul className="List-Company">Workstations </ul><br />
                <ul className="List-Company">Enterprise Solutions</ul><br />
              </motion.div>
              <motion.div 
                className="Fifthbox-Footer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="Legal">Legal</span><br /><br />
                <ul className="List-Company">Privacy Policy</ul><br />
                <ul className="List-Company">Cookie Policy</ul><br />
                <ul className="List-Company">Terms And Conditions</ul><br />
                <ul className="List-Company">Return And Refunds</ul><br />
              </motion.div>
            </div>
            <motion.div 
              className="Secondbox-Footer"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="FbiSecondbox-Footer">
                <div className="Reachus-Footer">
                  <span className="Reachus">Reach Us</span>
                </div>
                <div className="Location-Footer">
                  <span className="Neotokyo">NEO TOKYO</span> 
                  <motion.div
                    animate={{ x: [0, 2, -2, 0], y: [0, -2, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CiLocationArrow1 className='Location-icon'/>
                  </motion.div>
                  <br />
                  <span className="Neotokyo">Head Quarters</span>
                </div>
              </div>
              <div className="SbiSecondbox-Footer">
                <span className="DetailedLocation">Floor no. 2, Koroth Arcade, </span><br />
                <span className="DetailedLocation">Vennala High School Rd, </span><br />
                <span className="DetailedLocation">opposite to V-Guard, Vennala,</span><br />
                <span className="DetailedLocation">Kochi, Kerala 682028 </span>
              </div>
            </motion.div>
            <div className="Thirdbox-Footer">
              <div className="Social">
                <span className="Heading-Social">Social</span>
              </div>
              <div className="Social-Icons">
                <motion.div
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaWhatsapp className="Social-Iconszz"/>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SlSocialFacebook className="Social-Iconszz"/>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaInstagram className="Social-Iconszz"/>
                </motion.div>
              </div>
              <div className="All-Rights">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <BsShieldLock className='Shield-Icon'/>
                </motion.div>
                <span>All Rights Reserved. 2024 Neo Tokyo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Footer;