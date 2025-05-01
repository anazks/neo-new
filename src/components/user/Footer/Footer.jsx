import React, { useEffect, useState } from 'react';
import './footer.css';
import { ImArrowUpRight2 } from "react-icons/im";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import TestFooter from './TestFooter';

function NeoFooter() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initialize states
    checkMobile();
    
    // Add event listeners
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // return(
  //   <div className="neo-main-footers">
  //       {
  //         isMobile ? (
  //           <div className="neo-box-inside-main-footer">
  //             <TestFooter/>
             
  //           </div>
  //         ) : null
  //       }
  //     </div>
  // )
  return (
   <>
   
      {
        isMobile ? (
          <div className="neo-box-inside-main-footer">
            <TestFooter/>
          </div>
        ) :   <div className="neo-main-footer">
        <div className="neo-box-inside-main-footer">
          <div className="neo-about-footer">
            <div className="neo-forabout-footer">
              <h1 className="neo-aboutheading-footer">Building Experiences <br />Since 20s </h1>
              <div className="neo-tagline">Creating next-gen PC solutions</div>
            </div>
            <div className="neo-getintouch-footer">
              <div className="neo-boxinsidegetintouch-footer">
                <div className="neo-getintouchslider-footer">
                  <ImArrowUpRight2 className='neo-uprightarrow-footer' />
                </div>
              </div>
            </div>
          </div>
  
          <div className="neo-contact-footer">
            <div className="neo-boxinsidecontact-footer">
              <div className="neo-logo-footer">
                <h1 className="neo-heading-footer">NT <br />KO </h1>
              </div>
              <div className="neo-description-footer">
                <span className="neo-secheading-footer">Priority One By Neo Tokyo </span>
              </div>
              <div className="neo-support-footer">
                <a href="tel:+917920938981" className="neo-support-item">
                  <FiPhone className="neo-support-icon" />
                  <span className="neo-thirdheading-footer">+91 7920938981</span>
                </a>
                <a href="mailto:support@neotokyo.in" className="neo-support-item">
                  <FiMail className="neo-support-icon" />
                  <span className="neo-thirdheading-footer">support@neotokyo.in</span>
                </a>
              </div>
            </div>
          </div>
  
          <div className="neo-option-footer">
            <div className="neo-boxinsideoption-footer">
              <div className="neo-firstbox-footer">
                <div className="neo-fstbox-footer">
                  <span className="neo-heading-company">Company</span>
                  <div className="neo-links-container">
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">About</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">FAQ's</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Blog</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Careers</span>
                    </a>
                  </div>
                </div>
                
                <div className="neo-sdbox-footer">
                  <span className="neo-enterprise-solutions">Enterprise Solutions</span>
                  <div className="neo-links-container">
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Gaming Rigs</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Accounts</span>
                    </a>
                  </div>
                </div>
                
                <div className="neo-thrdbox-footer">
                  <span className="neo-store">Store</span>
                  <div className="neo-links-container">
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">PC's</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Peripherals</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Gear</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Accessories</span>
                    </a>
                  </div>
                </div>
                
                <div className="neo-forthbox-footer">
                  <span className="neo-solutions">Solutions</span>
                  <div className="neo-links-container">
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Home PC's</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Gaming PC's</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Workstations</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Enterprise Solutions</span>
                    </a>
                  </div>
                </div>
                
                <div className="neo-fifthbox-footer">
                  <span className="neo-legal">Legal</span>
                  <div className="neo-links-container">
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Privacy Policy</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Cookie Policy</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Terms And Conditions</span>
                    </a>
                    <a href="#" className="neo-footer-link">
                      <span className="neo-list-company">Return And Refunds</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="neo-secondbox-footer">
                <div className="neo-fbisecondbox-footer">
                  <div className="neo-reachus-footer">
                    <span className="neo-reachus">Reach Us</span>
                  </div>
                  <div className="neo-location-footer">
                    <span className="neo-neotokyo">NEO TOKYO</span> 
                    <div className="neo-location-icon-container">
                      <CiLocationArrow1 className='neo-location-icon'/>
                    </div>
                    <span className="neo-neotokyo">Head Quarters</span>
                  </div>
                </div>
                <div className="neo-sbisecondbox-footer">
                  <span className="neo-detailedlocation">Floor no. 2, Koroth Arcade, </span>
                  <span className="neo-detailedlocation">Vennala High School Rd, </span>
                  <span className="neo-detailedlocation">opposite to V-Guard, Vennala,</span>
                  <span className="neo-detailedlocation">Kochi, Kerala 682028 </span>
                </div>
              </div>
              
              <div className="neo-thirdbox-footer">
                <div className="neo-social">
                  <span className="neo-heading-social">Connect With Us</span>
                  <div className="neo-social-underline"></div>
                </div>
                <div className="neo-social-icons">
                  <a
                    href="https://wa.me/917920938981"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-social-icon-container"
                  >
                    <FaWhatsapp className="neo-social-iconszz"/>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-social-icon-container"
                  >
                    <SlSocialFacebook className="neo-social-iconszz"/>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-social-icon-container"
                  >
                    <FaInstagram className="neo-social-iconszz"/>
                  </a>
                </div>
                <div className="neo-all-rights">
                  <div className="neo-shield-container">
                    <BsShieldLock className='neo-shield-icon'/>
                  </div>
                  <span>© All Rights Reserved. 2024 Neo Tokyo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
   </>
  );
}

export default NeoFooter;