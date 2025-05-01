import React, { useState, useEffect, useRef } from 'react';
import { FaCartPlus, FaCheck, FaPlay, FaDownload, FaYoutube } from "react-icons/fa";
import BaseURL from '../../../Static/Static';
import NavBar from '../NavBar/NavBar'
function Details({ product }) {
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState('.5');
  const [selectedRam, setSelectedRam] = useState('8');
  const [price, setPrice] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  
  // Refs for animations
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const videoPopupRef = useRef(null);

  // Calculate price based on selections
  useEffect(() => {
    if (product) {
      let basePrice = product.price || 0;
      
      if (selectedStorage === '1') basePrice += 1000;
      else if (selectedStorage === '2') basePrice += 3000;
      else if (selectedStorage === '3') basePrice += 6000;
      
      if (selectedRam === '16') basePrice += 1500;
      else if (selectedRam === '32') basePrice += 3500;
      else if (selectedRam === '64') basePrice += 8000;
      
      setPrice(basePrice);
    }
  }, [product, selectedStorage, selectedRam]);

  // Animation and initial setup
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Click outside video popup to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (videoPopupRef.current && !videoPopupRef.current.contains(event.target)) {
        setShowVideoPopup(false);
      }
    };

    if (showVideoPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVideoPopup]);

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleRamSelect = (ram) => {
    setSelectedRam(ram);
  };

  // Get YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayVideo = () => {
    setShowVideoPopup(true);
  };
  
  const handleDownloadBrochure = () => {
    if (product?.brochure) {
      window.open(product.brochure, '_blank');
    }
  };
  
  const handleWatchYoutube = () => {
    if (product?.youtube_url) {
      window.open(product.youtube_url, '_blank');
    }
  };

  // Get product image with proper error handling
  const getProductImage = () => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      if (typeof product.images[0] === 'object' && product.images[0].image) {
        return product.images[0].image;
      } else if (typeof product.images[0] === 'string') {
        return product.images[0];
      }
    }
    else if (product?.image) {
      return product.image;
    }
    
    return null;
  };

  const videoId = getYoutubeVideoId(product?.youtube_url);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800">Loading product details...</h2>
      </div>
    );
  }

  const productImage = getProductImage();

  return (
   <>
    <NavBar/>
     <div className="min-h-screen bg-white">
      {/* Proper NavBar with content */}
      
      {/* Main product container */}
      <div className="w-full min-h-screen">
        {/* Video Popup */}
        {showVideoPopup && videoId && (
          <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 animate-fade-in">
            <div className="relative w-11/12 max-w-4xl" ref={videoPopupRef}>
              <div 
                className="absolute -top-10 -right-10 w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-blue-500 hover:scale-110 transition-all duration-300"
                onClick={() => setShowVideoPopup(false)}
              >
                ×
              </div>
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                  title="Product video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        
        {/* Product content layout */}
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 lg:px-8 min-h-screen flex flex-col md:flex-row md:items-center gap-6 md:gap-10 opacity-0 translate-y-8 animate-fade-up">
          {/* Left side - Product image and actions */}
          <div className="w-full md:w-2/5" ref={imageRef}>
            {/* Image container */}
            <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white p-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              {productImage ? (
                <div className="relative">
                  <img
                    src={BaseURL+productImage}
                    alt={product.name || 'Product image'}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto rounded-lg transform transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  {videoId && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer" 
                      onClick={handlePlayVideo}
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <FaPlay />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                  No product image available
                </div>
              )}
            </div>

            {/* Action buttons - now outside the image container */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              {videoId && (
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md" 
                  onClick={handlePlayVideo}
                >
                  <FaPlay size={14} /> <span>Watch Video</span>
                </button>
              )}
              {product?.broacher && (
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-100 border border-cyan-300 text-cyan-700 hover:bg-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  onClick={handleDownloadBrochure}
                >
                  <FaDownload size={14} /> <span>Download Brochure</span>
                </button>
              )}
              {videoId && (
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-100 border border-red-300 text-red-700 hover:bg-red-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  onClick={handleWatchYoutube}
                >
                  <FaYoutube size={16} /> <span>Watch on YouTube</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Right side - Product details */}
          <div 
            ref={detailsRef}
            className="w-full md:w-3/5 flex flex-col rounded-xl p-6 lg:p-8 shadow-lg bg-white border border-gray-200 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl font-bold mb-1 uppercase font-rajdhani tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {product.name || "THE SPECTRE SERIES"}
              </h1>
              
              <h3 className="relative uppercase tracking-wider text-sm pl-3 mb-4 font-medium text-gray-500 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-4 before:bg-gradient-to-b before:from-blue-500 before:to-blue-600">
                {product.subtitle || "GAMING PC"}
              </h3>
              
              <div className="text-3xl font-bold mb-4 pb-4 border-b border-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {product.originalPrice && <del className="text-lg mr-3 font-normal opacity-60 align-super">₹ {formatPrice(product.originalPrice)}</del>}  
                <span>₹ {formatPrice(price)}/-</span>
              </div>
            </div>
            
            <div className="text-sm leading-relaxed mb-4 pb-4 max-h-20 overflow-y-auto text-gray-600 border-b border-gray-200 font-questrial scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              {product.description || "Experience the ultimate gaming performance with our custom-built gaming PC, featuring the latest technology and components designed to deliver exceptional speed, graphics, and reliability for all your gaming needs."}
            </div>

            <div className={`flex flex-wrap gap-5 ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-700 ease-out`}>
              <div className="flex-1 min-w-[40%]">
                <h4 className="text-xs uppercase tracking-wider mb-3 inline-block relative after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-600 text-gray-500">
                  SELECT STORAGE (TB)
                </h4>
                <div className="flex flex-wrap gap-2 mb-0">
                  {['.5', '1', '2', '3'].map((storage, index) => (
                    <div 
                      key={`storage-${storage}`}
                      className={`w-14 h-14 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden transition-all duration-300 ease-out border ${
                        selectedStorage === storage
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 border-gray-300 hover:border-blue-400 hover:-translate-y-1 hover:shadow-md'
                      }`}
                      onClick={() => handleStorageSelect(storage)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="relative z-10 font-semibold">{storage}</span>
                      {selectedStorage === storage && (
                        <span className="absolute top-0 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white -mt-2 -mr-2 border-2 border-blue-400 transform scale-0 animate-pop-in">
                          <FaCheck size={10} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-w-[40%]">
                <h4 className="text-xs uppercase tracking-wider mb-3 inline-block relative after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-600 text-gray-500">
                  RAM (GB)
                </h4>
                <div className="flex flex-wrap gap-2 mb-0">
                  {['8', '16', '32', '64'].map((ram, index) => (
                    <div 
                      key={`ram-${ram}`}
                      className={`w-14 h-14 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden transition-all duration-300 ease-out border ${
                        selectedRam === ram
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 border-gray-300 hover:border-blue-400 hover:-translate-y-1 hover:shadow-md'
                      }`}
                      onClick={() => handleRamSelect(ram)}
                      style={{ animationDelay: `${(index * 0.1) + 0.4}s` }}
                    >
                      <span className="relative z-10 font-semibold">{ram}</span>
                      {selectedRam === ram && (
                        <span className="absolute top-0 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white -mt-2 -mr-2 border-2 border-blue-400 transform scale-0 animate-pop-in">
                          <FaCheck size={10} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                className="flex-1 h-12 sm:h-14 md:h-16 rounded-lg font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-blue-100 border-2 border-blue-400 text-blue-700 hover:bg-blue-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <FaCartPlus size={18} /> <span>Add To Cart</span>
              </button>
              <button 
                className="flex-1 h-12 sm:h-14 md:h-16 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <FaBolt size={18} /> <span>Buy Now</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
   </>
  );
}

// FaBolt component
function FaBolt(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 320 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      {...props}
    >
      <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
    </svg>
  );
}

// Add the required keyframe animations and font faces
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-up {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pop-in {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease forwards;
  }
  
  .animate-fade-up {
    animation: fade-up 1s ease forwards;
  }
  
  .animate-pop-in {
    animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  
  .font-rajdhani {
    font-family: 'Rajdhani', sans-serif;
  }
  
  .font-questrial {
    font-family: 'Questrial', sans-serif;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 5px;
  }
  
  .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb {
    background: #3B82F6;
    border-radius: 3px;
  }
  
  .scrollbar-track-gray-200::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
`;
document.head.appendChild(style);

export default Details;