import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../Images/LoginWith/neo_tokyo-logo.png";
import "./nav.css";
import LoginPopup from "../Login/LoginPopup";
import { useAuth } from "../../../Context/UserContext";
import { getUserInfo as fetchUserInfo } from '../../../Services/userApi';
import SideBar from "../SIdeBar/SideBar";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, setToken, user, setUser } = useAuth();
  const [userFetched, setUserFetched] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const navbar = document.querySelector('.navbar');
      
      if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
      }
      
      if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        navbar.classList.add('hidden');
      } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
      }
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const fetchUserData = useCallback(async () => {
    if (token && !userFetched) {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          setUser(userInfo);
          setUserFetched(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserFetched(true);
      }
    } else if (!token) {
      setUser(null);
      setUserFetched(false);
    }
  }, [token, userFetched, setUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    setUserFetched(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openLogin = () => {
    setIsLoginOpen(true);
    closeSidebar(); // Close sidebar when opening login popup
  };
  const closeLogin = () => setIsLoginOpen(false);

  const navigateToCart = () => navigate("/cart");
  const navigateToProfile = () => navigate("/profile");

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Left Navigation Links */}
          <div className="nav-links left-links">
            <Link to="/products" className="nav-link-item">Products</Link>
            <Link to="#" className="nav-link-item">Solutions</Link>
          </div>

          {/* Centered Logo */}
          <div className="logo-container">
            <Link to="/">
              <img src={logo} className="logo-img" alt="Neo Tokyo Logo" />
            </Link>
          </div>

          {/* Right Navigation Links */}
          <div className="nav-links right-links">
            <Link to="/store" className="nav-link-item">Store</Link>
            <Link to="/support" className="nav-link-item">Support</Link>
          </div>

          {/* Right Side Buttons */}
          <div className="nav-buttons">
            <button className="cart-btn" onClick={navigateToCart}>
              <FaShoppingCart className="cart-icon" />
            </button>

            {token ? (
              <div className="user-dropdown">
                <button className="user-btn" onClick={toggleDropdown}>
                  <FaUser className="user-icon" />
                  <span className="user-name">
                    {user?.data?.first_name || "User"}
                  </span>
                  {isDropdownOpen ? '▲' : '▼'}
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={navigateToProfile}>
                      <FaUser className="dropdown-icon" /> Profile
                    </button>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-btn" onClick={openLogin}>
                Sign In
              </button>
            )}

            {/* Menu Button - Always on Right */}
            <button className="menu-btn" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} openLogin={openLogin} />
      
      {/* Login Popup */}
      <LoginPopup isOpen={isLoginOpen} onClose={closeLogin} />
      
      {/* Overlay */}
      {(isSidebarOpen || isLoginOpen) && (
        <div className="overlay active" onClick={() => {
          if (isSidebarOpen) closeSidebar();
          if (isLoginOpen) closeLogin();
        }} />
      )}
    </>
  );
}

export default NavBar;