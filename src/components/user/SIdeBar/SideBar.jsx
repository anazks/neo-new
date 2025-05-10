import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../Context/UserContext';
import { 
  FiHome, FiShoppingBag, FiHelpCircle, 
  FiUser, FiLogOut, FiMenu, FiLogIn, FiUserPlus, FiMapPin 
} from 'react-icons/fi';
import Logo from '../../../Images/LoginWith/neo_tokyo-logo.png';
import { BsFillTicketFill } from 'react-icons/bs';
import { GamepadIcon, ListOrdered, Settings } from 'lucide-react';
import { FaProductHunt } from 'react-icons/fa';
import { SlCallOut } from 'react-icons/sl';
import { IoBulb } from 'react-icons/io5';
import { logout } from '../../../Services/userApi';

function SideBar({ isOpen, onClose }) {
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      setToken(null);
      localStorage.removeItem("token");
      let refresh = localStorage.getItem("refresh")
      const response = await logout(refresh,token);
      console.log(response,"logot response")
      navigate("/");
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleProfile = () => {
    try {
      navigate('/profile');
      onClose();
    } catch (error) {
      console.error("Profile navigation error:", error);
    }
  };

  return (
    <>
      {/* Overlay with blur */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1998] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar with glass morphism effect */}
      <div 
        className={`fixed top-0 right-0 z-[1999] h-screen w-full md:w-1/2 lg:w-[400px] bg-white/20 backdrop-blur-xl shadow-2xl transition-transform duration-400 overflow-y-auto border-l border-white/20 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col h-full p-6 gap-1">
          {/* Header row with logo, auth buttons, and close button */}
          <div className="flex items-center justify-between mb-8 pt-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={Logo} 
                alt="Neo Tokyo Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Auth buttons and close button */}
            <div className="flex items-center gap-3">
              {!token ? (
                <>
                  <button 
                    className="flex items-center gap-1 py-2 px-4 bg-black text-white font-medium rounded-full border border-black hover:bg-black/80 transition-all duration-300 text-sm"
                    onClick={() => { onClose(); navigate("/login"); }}
                  >
                    <FiLogIn size={14} /> Login
                  </button>
                  <button 
                    className="flex items-center gap-1 py-2 px-4 bg-black text-white font-medium rounded-full border border-black hover:bg-black/80 transition-all duration-300 text-sm"
                    onClick={() => { onClose(); navigate("/login"); }}
                  >
                    <FiUserPlus size={14} /> Register
                  </button>
                </>
              ) : (
                user && user.profile_picture_url ? (
                  <div style={{cursor:"pointer"}} className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center cursor-pointer" onClick={handleProfile}>
                    <img src={user.profile_picture_url} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer" onClick={handleProfile}>
                    {user?.first_name?.charAt(0) || 'U'}
                  </div>
                )
              )}
              
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full text-black bg-white/80 hover:bg-white transition-all duration-300"
                onClick={onClose}
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>

          {/* Rest of the content */}
          <div className="flex-1 overflow-y-auto">
            {/* Menu */}
            <ul className="flex flex-col gap-1 p-0 m-0">
              <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.1s' : 'none' }}>
                <Link to="/nvidia" onClick={onClose} className="flex items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1">
                  <FiHome className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                  <span>Nvidia</span>
                </Link>
              </li>
              <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.15s' : 'none' }}>
                <Link to="/products" onClick={onClose} className="flex items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1">
                  <FiShoppingBag className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                  <span>Products</span>
                </Link>
              </li>
              {token && (
                <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.2s' : 'none' }}>
                  <Link to="/myorder" onClick={onClose} className="flex items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1">
                    <ListOrdered className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                    <span>My Order</span>
                  </Link>
                </li>
              )}
              <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.25s' : 'none' }}>
                <Link to="/solutions" onClick={onClose} className="flex items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1">
                  <IoBulb className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                  <span>Solutions</span>
                </Link>
              </li>
              <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.3s' : 'none' }}>
                <Link to="/support" onClick={onClose} className="flex items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1">
                  <GamepadIcon className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                  <span>Support</span>
                </Link>
              </li>
              {token && (
                <>
                 
                  <li className="opacity-0 transform translate-x-5" style={{ animation: isOpen ? 'slideInRight 0.4s ease forwards 0.4s' : 'none' }}>
                    <button 
                      onClick={handleLogout} 
                      className="flex w-full items-center py-3 px-4 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 hover:translate-x-1"
                    >
                      <FiLogOut className="mr-3 text-lg min-w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300" /> 
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>

            {/* Configuration section */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <h3 className="flex items-center gap-2 text-base mb-4 text-white">
                <Settings className="text-blue-300" />
                <span>NeoTokyo.Config</span>
                <span className="text-xs">Coming soon</span>
              </h3>
            </div>

            {/* Locations */}
            <div className="mt-auto pt-6 border-t border-white/20 animate-[fadeInUp_0.5s_ease_forwards] opacity-0" style={{ animationDelay: '0.5s' }}>
              <h3 className="flex items-center gap-2 text-base mb-4 text-white">
                <FiMapPin className="text-blue-300" /> Our Locations
              </h3>
              <div className="flex flex-col gap-4">
                <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  <h4 className="m-0 mb-2 text-sm font-medium text-white">HQ - Kochi</h4>
                  <p className="m-0 text-xs text-white/80 leading-relaxed">
                    Floor no. 2, Koroth Arcade,<br />
                    Vennala High School Rd,<br />
                    opposite to V-Guard, Vennala,<br />
                    Kochi, Kerala 682028
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  <h4 className="m-0 mb-2 text-sm font-medium text-white">Kozhikode</h4>
                  <p className="m-0 text-xs text-white/80 leading-relaxed">
                    New Age Buildings, Mofussil Bus<br />
                    Stand Building, New, 61/1803,<br />
                    Mavoor Rd, Arayidathupalam,<br />
                    Kozhikode, Kerala 673004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations via style tag */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

export default SideBar;