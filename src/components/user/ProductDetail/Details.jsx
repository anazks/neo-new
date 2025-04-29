import React, { useState, useEffect, useRef } from 'react';
import './Detail.css';
import NavBar from '../NavBar/NavBar';
import { FaCartPlus, FaCheck, FaPlay, FaDownload, FaYoutube } from "react-icons/fa";
import BaseURL from '../../../Static/Static';

function Details({ product }) {
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState('.5');
  const [selectedRam, setSelectedRam] = useState('8');
  const [price, setPrice] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
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
      // Log product data for debugging
      console.log("Product data:", product);
      
      // Animate options after initial load
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [product]);
  
  // Animation observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimationComplete(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

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
      window.open(`${BaseURL}${product.broacher}`, '_blank');
    }
  };
  
  const handleWatchYoutube = () => {
    if (product?.youtube_url) {
      window.open(product.youtube_url, '_blank');
    }
  };

  // Get product image with proper error handling
  const getProductImage = () => {
    // Check if images array exists and has items
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      // Handle both object format { image: 'url' } and string format
      if (typeof product.images[0] === 'object' && product.images[0].image) {
        console.log("Using image from array (object format):", product.images[0].image);
        return `${BaseURL}${product.images[0].image}`;
      } else if (typeof product.images[0] === 'string') {
        console.log("Using image from array (string format):", product.images[0]);
        return `${BaseURL}${product.images[0]}`;
      }
    }
    // Fallback to single image property
    else if (product?.image) {
      console.log("Using single image:", product.image);
      return `${BaseURL}${product.image}`;
    }
    
    // No image found
    console.log("No image found in product:", product);
    return null;
  };

  const videoId = getYoutubeVideoId(product?.youtube_url);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading product details...</h2>
      </div>
    );
  }

  const productImage = getProductImage();

  return (
    <div className="dark-theme">
      <NavBar />
      {/* <img src={productImage} alt="" /> */}
      {/* Main product container */}
      <div className="product-container">
        {/* Video Popup */}
        {showVideoPopup && videoId && (
          <div className="video-popup-overlay">
            <div className="video-popup" ref={videoPopupRef}>
              <div className="video-popup-close" onClick={() => setShowVideoPopup(false)}>×</div>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                title="Product video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        {/* Product content layout */}
        <div className="product-layout">
          {/* Left side - Product image */}
          <div className="product-image-container" ref={imageRef}>
            <div className="product-images">
              {productImage ? (
                <>
                  <img
                    src={productImage}
                    alt={product.name || 'Product image'}
                    onLoad={() => {
                      console.log("Image loaded successfully");
                      setImageLoaded(true);
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", e);
                      setImageLoaded(false);
                    }}
                    className={imageLoaded ? 'image-loaded' : ''}
                  />
                  {videoId && (
                    <div className="play-button-overlay" onClick={handlePlayVideo}>
                      <div className="play-button">
                        <FaPlay />
                      </div>
                    </div>
                  )}
            <div className="media-buttons">
                    {videoId && (
                      <button className="media-button play-video-button" onClick={handlePlayVideo}>
                        <FaPlay size={14} /> <span>Watch Video</span>
                      </button>
                    )}
                    {product?.broacher && (
                      <button className="media-button download-button" onClick={handleDownloadBrochure}>
                        <FaDownload size={14} /> <span>Download Brochure</span>
                      </button>
                    )}
                    {videoId && (
                      <button className="media-button youtube-button" onClick={handleWatchYoutube}>
                        <FaYoutube size={16} /> <span>Watch on YouTube</span>
                      </button>
                    )}
            </div>
                </>
             
              ) : (
                <div className="no-image-placeholder">
                  No product image available
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Product details */}
          <div className="product-details" ref={detailsRef}>
            <div className="product-header">
              <h1 className="product-title">{product.name || "THE SPECTRE SERIES"}</h1>
              <h3 className="product-subtitle">{product.subtitle || "GAMING PC"}</h3>
              <div className="price-tag">
                {product.originalPrice && <del>₹ {formatPrice(product.originalPrice)}</del>}  
                <span>₹ {formatPrice(price)}/-</span>
              </div>
            </div>
            
            <div className="product-description">
              {product.description || "Experience the ultimate gaming performance with our custom-built gaming PC, featuring the latest technology and components designed to deliver exceptional speed, graphics, and reliability for all your gaming needs."}
            </div>

            {/* Media buttons */}
            {/* <div className="media-buttons">
              {videoId && (
                <button className="media-button play-video-button" onClick={handlePlayVideo}>
                  <FaPlay size={14} /> <span>Watch Video</span>
                </button>
              )}
              {product?.broacher && (
                <button className="media-button download-button" onClick={handleDownloadBrochure}>
                  <FaDownload size={14} /> <span>Download Brochure</span>
                </button>
              )}
              {videoId && (
                <button className="media-button youtube-button" onClick={handleWatchYoutube}>
                  <FaYoutube size={16} /> <span>Watch on YouTube</span>
                </button>
              )}
            </div> */}

            <div className={`product-options ${showOptions ? 'show-options' : ''}`}>
              <div className="option-section">
                <h4 className="option-heading">SELECT STORAGE (TB)</h4>
                <div className="option-grid">
                  {['.5', '1', '2', '3'].map((storage, index) => (
                    <div 
                      key={`storage-${storage}`}
                      className={`option-tile ${selectedStorage === storage ? 'selected' : ''}`}
                      onClick={() => handleStorageSelect(storage)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span>{storage}</span>
                      {selectedStorage === storage && (
                        <span className="check-mark"><FaCheck size={10} /></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="option-section">
                <h4 className="option-heading">RAM (GB)</h4>
                <div className="option-grid">
                  {['8', '16', '32', '64'].map((ram, index) => (
                    <div 
                      key={`ram-${ram}`}
                      className={`option-tile ${selectedRam === ram ? 'selected' : ''}`}
                      onClick={() => handleRamSelect(ram)}
                      style={{ animationDelay: `${(index * 0.1) + 0.4}s` }}
                    >
                      <span>{ram}</span>
                      {selectedRam === ram && (
                        <span className="check-mark"><FaCheck size={10} /></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons">
              <button className="cart-button">
                <FaCartPlus size={18} /> <span>Add To Cart</span>
              </button>
              <button className="buy-button">
                <FaBolt size={18} /> <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Debug info - remove in production */}
      {/* <div style={{padding: '20px', fontSize: '12px', color: 'gray', backgroundColor: 'rgba(0,0,0,0.3)'}}>
        <p>Image path: {productImage || 'No image path available'}</p>
        <p>Product data: {JSON.stringify(product)}</p>
      </div> */}
    </div>
  );
}

// Import FaBolt since it wasn't in the imports but was used in the JSX
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

export default Details;