import React, { useState, useEffect, useRef } from 'react';
import { FaCartPlus, FaCheck, FaPlay, FaDownload, FaYoutube } from "react-icons/fa";
import {getMyPrimaryAddress,CreateSIngeleOrder} from "../../../Services/userApi"
import SingeProductOverview from '../CardPage/SingleProductOverView'
import BaseURL from '../../../Static/Static';
import NavBar from '../NavBar/NavBar'
import { addTocart } from '../../../Services/userApi';
import Rating  from "../ProductDetail/Rating"
import Alert from '../Alert/Alert';
import {useAuth} from '../../../Context/UserContext'

import Loader from '../Loader/Loader'
function Details({ product }) {
  const { token, setToken, user } = useAuth();
  
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState('.5');
  const [selectedRam, setSelectedRam] = useState('8');
  const [price, setPrice] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [cartData, setCartData] = useState(false);
  const [overView,setOverView] = useState(false)
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
  const handleAddToCart =  async(id) => {
    try {
        console.log("Adding to cart:", id);
        let cartData = await addTocart(id)
        console.log("Cart data:", cartData);
        setCartData(cartData);
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      
    }
  }
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
    // Fixed the variable name from broacher to brochure
    if (product?.broacher) {
      window.open(BaseURL+product.broacher, '_blank');
    } else {
      console.log("Brochure not available");
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


const handleBuyNow = async () => {
  try {
    console.log("buy now")
    setOverView(true)
  } catch (error) {
    console.error("Error in buy now:", error);
    alert("Error in buy now:", error);
  }
}

  if (!product) {
    return (
      <>
        <Loader/>
      </>
    );
  }

  const productImage = getProductImage();

  return (
   <>
    <NavBar/>
    {
      cartData && (
        <div>
          <Alert
            type="success"
            message="Added to cart successfully"
            productId={null}
          />
        </div>
      )
    }
    {
      overView && (
        <SingeProductOverview product={product}/>
      )
    }
   <>
   <br />
   <br />
   <br />
   <br />
   
   <div className="min-h-screen bg-white">
      {/* Main product container */}
      <div className="w-full min-h-screen">
        {/* Video Popup */}
        {showVideoPopup && videoId && (
          <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 animate-fade-in">
            <div className="relative w-11/12 max-w-4xl" ref={videoPopupRef}>
              <div 
                className="absolute -top-10 -right-10 w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-black hover:scale-110 transition-all duration-300"
                onClick={() => setShowVideoPopup(false)}
              >
                ×
              </div>
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
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
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 lg:px-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10 opacity-0 translate-y-8 animate-fade-up">
          {/* Left side - Product image and actions - FIXED HEIGHT */}
          <div className="w-full md:w-2/5 md:sticky md:top-20 self-start" ref={imageRef}>
            {/* Image container with fixed height */}
            <div className="w-full rounded-xl overflow-hidden bg-white p-4 border border-gray-100 transition-transform duration-300 hover:-translate-y-1">
              {productImage ? (
                <div className="relative h-72 flex items-center justify-center">
                  <img
                    src={BaseURL+productImage}
                    alt={product.name || 'Product image'}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto object-contain max-h-72 rounded-lg transform transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  {videoId && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer" 
                      onClick={handlePlayVideo}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black text-white transform transition-transform duration-300 hover:scale-105">
                        <FaPlay />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-72 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                  No product image available
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              {videoId && (
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 border border-gray-300 text-black hover:bg-gray-200 transition-all duration-300" 
                  onClick={handlePlayVideo}
                >
                  <FaPlay size={12} /> <span>Watch Video</span>
                </button>
              )}
              {/* Fixed variable name from broacher to brochure for consistency */}
              {product?.broacher && (
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 border border-gray-300 text-black hover:bg-gray-200 transition-all duration-300"
                  onClick={handleDownloadBrochure}
                >
                  <FaDownload size={12} /> <span>Download Brochure</span>
                </button>
              )}
              {videoId && (
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 border border-gray-300 text-black hover:bg-gray-200 transition-all duration-300"
                  onClick={handleWatchYoutube}
                >
                  <FaYoutube size={14} /> <span>Watch on YouTube</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Right side - Product details - FIXED POSITION */}
          <div 
            ref={detailsRef}
            className="w-full md:w-3/5 flex flex-col rounded-xl p-5 lg:p-6 relative"
          >
            <div className="absolute top-0 left-0 w-full h-1"></div>
            
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 uppercase font-rajdhani tracking-tight text-black">
                {product.name || "THE SPECTRE SERIES"}
              </h1>
              
              <h3 className="relative uppercase tracking-wider text-xs pl-3 mb-3 font-medium text-gray-500 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:bg-black">
                {product.subtitle || "GAMING PC"}
              </h3>
              
              <div className="text-2xl font-bold mb-3 pb-3 border-b border-gray-200" style={{ color: '#63A375' }}>
                  {product.originalPrice && (
                    <del className="text-base mr-3 font-normal opacity-60 align-super">
                      ₹ {formatPrice(product.originalPrice)}
                    </del>
                  )}
                  <span>₹ {formatPrice(price)}/-</span>
                </div>
            </div>
            
            <div className="text-sm leading-relaxed mb-4 pb-4 border-b border-gray-200 font-questrial">
              {product.description || "Experience the ultimate gaming performance with our custom-built gaming PC, featuring the latest technology and components designed to deliver exceptional speed, graphics, and reliability for all your gaming needs."}
            </div>
            
            {/* Improved button responsiveness with taller buttons on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button 
                onClick={() => handleAddToCart(product.id)}
                className="flex-1 h-16 sm:h-12 md:h-10 py-4 sm:py-3 md:py-2 rounded-lg font-semibold uppercase tracking-wider text-sm sm:text-xs flex items-center justify-center gap-2 transition-all duration-300 bg-gray-100 border border-gray-400 text-black hover:bg-gray-200"
              >
                <FaCartPlus size={16} className="sm:text-sm" /> <span>Add To Cart</span>
              </button>
              {
                token ? (
                  <>
                     <button 
                onClick={handleBuyNow}
                className="flex-1 h-16 sm:h-12 md:h-10 py-4 sm:py-3 md:py-2 rounded-lg font-bold uppercase tracking-wider text-sm sm:text-xs flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-all duration-300"
              >
                <FaBolt size={16} className="sm:text-sm" /> <span>Buy Now</span>
              </button>
                  </>
                ) :""
              }
             
            </div>

          </div>
        </div>
      </div>
    </div>
    
   </>
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
  
  /* Improved mobile responsiveness */
  @media (max-width: 768px) {
    .md\\:sticky {
      position: relative;
      top: 0;
    }
    
    /* Add more spacing and larger touch targets for buttons on mobile */
    .flex-col button {
      margin-bottom: 12px;
      padding-top: 12px;
      padding-bottom: 12px;
      min-height: 60px;
    }
  }
  
  /* Add specific styles for very small screens */
  @media (max-width: 380px) {
    .flex-col button {
      min-height: 64px;
    }
  }
`;
document.head.appendChild(style);

export default Details;