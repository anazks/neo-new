
import React from 'react';
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FiMail, FiPhone } from "react-icons/fi";
import './MobileFooter.css'; // We'll create this CSS file

function MobileFooter() {
  return (
    <div className="mobile-footer">
      {/* Contact Information */}
      <div className="footer-section">
        <h3 className="footer-heading">Contact Us</h3>
        <div className="contact-item">
          <FiPhone className="contact-icon" />
          <a href="tel:+917920938981">+91 7920938981</a>
        </div>
        <div className="contact-item">
          <FiMail className="contact-icon" />
          <a href="mailto:support@neotokyo.in">support@neotokyo.in</a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="footer-section">
        <h3 className="footer-heading">Quick Links</h3>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Store</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-section">
        <h3 className="footer-heading">Follow Us</h3>
        <div className="social-icons">
          <a href="https://wa.me/917920938981" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <SlSocialFacebook />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© 2024 Neo Tokyo. All rights reserved.</p>
      </div>
    </div>
  );
}

export default MobileFooter;