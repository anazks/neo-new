import React, { useState, useEffect } from "react";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../../Images/LoginWith/neo_tokyo-logo.png";
import "./nav.css";
import SideBar from "../SIdeBar/SideBar"; // Adjust import path as needed

const ModernNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const navbar = document.querySelector('.navbar');

      if (currentScroll <= 0) {
        setScrolled(false);
        navbar.classList.remove('hidden');
        return;
      }

      if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        navbar.classList.add('hidden');
      } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
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
  {/* This logo will only show on mobile */}
  <div className="logo-container mobile-only" style={{ display: isMobile ? 'block' : 'none' }}>
    <a href="/"><img src={logo} className="logo-img" alt="Logo" /></a>
  </div>

  <div className="nav-links">
    <a href="/products" className="nav-link">Products</a>
    <a href="/solutions" className="nav-link">Solutions</a>
    {/* This center logo will only show on desktop */}
    <a href="/" className="center-logo desktop-only"><img src={logo} className="logo-img" alt="Logo" /></a>
    <a href="/store" className="nav-link">Store</a>
    <a href="/support" className="nav-link">Support</a>
  </div>

  <div className="nav-actions">
    {/* <a href="/cart" className="cart-btn"><FaShoppingCart /><span>Cart</span></a> */}
    {/* <a href="/login" className="login-btn"><FaUser /><span>Login</span></a> */}
    <button className="offcanvas-toggle" onClick={openSidebar}><FaBars /></button>
  </div>
</div>
      </nav>

      {/* Custom Sidebar Component */}
      {isSidebarOpen && (
        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
      )}
    </>
  );
};

export default ModernNavbar;
