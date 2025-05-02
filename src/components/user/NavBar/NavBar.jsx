import React, { useState, useEffect } from "react";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../../Images/LoginWith/neo_tokyo-logo.png";
import "./nav.css";
import SideBar from "../SIdeBar/SideBar";
import { useAuth } from '../../../Context/UserContext';

const ModernNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { token, setToken, user } = useAuth();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Changed to 1024px for laptop screens
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const navbar = document.querySelector('.navbar');

      if (currentScroll <= 0) {
        setScrolled(false);
        navbar?.classList.remove('hidden');
        return;
      }

      if (currentScroll > lastScroll && !navbar?.classList.contains('hidden')) {
        navbar?.classList.add('hidden');
      } else if (currentScroll < lastScroll && navbar?.classList.contains('hidden')) {
        navbar?.classList.remove('hidden');
      }

      setScrolled(currentScroll > 50);
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Mobile Logo */}
          <div className="logo-container mobile-only">
            <a href="/"><img src={logo} className="logo-img" alt="Logo" /></a>
          </div>

          {/* Desktop Navigation Links - Hidden on laptop screens */}
          <div className="nav-links desktop-nav">
            <a href="/products" className="nav-link">Products</a>
            <a href="/solutions" className="nav-link">Solutions</a>
            
            {/* Center Logo - Desktop Only */}
            <a href="/" className="center-logo desktop-only">
              <img src={logo} className="logo-img" alt="Logo" />
            </a>
            
            <a href="/store" className="nav-link">Store</a>
            <a href="/support" className="nav-link">Support</a>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="auth-buttons mobile-only">
            {user ? (
              ""
            ) : (
              <>
                <a href="/myorder" className="auth-btn register-btn" style={{backgroundColor:"black"}}>Sign up</a>
                <a href="/signin" className="auth-btn signin-btn">Sign In</a>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons - Now includes menu button for laptops */}
          <div className="auth-buttons desktop-only">
            {
              user ?(
                   <a href="/cart" className="auth-btn signin-btn">Cart</a>

              ):""
            }
            <button className="offcanvas-toggle" onClick={openSidebar}>
              <FaBars />
            </button>
            {/* <a href="/signin" className="auth-btn signin-btn">
              <FaUser className="auth-icon" />
              <span>Sign In</span>
            </a> */}
          </div>
        </div>
      </nav>

      {/* Custom Sidebar Component */}
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default ModernNavbar;