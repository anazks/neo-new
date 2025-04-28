import React, { useState, useEffect } from 'react';
import './Detail.css';
import NavBar from '../NavBar/NavBar';
import { FaCartPlus, FaCheck } from "react-icons/fa6";
import BaseURL from '../../../Static/Static';

function Details({ product }) {
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [price, setPrice] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Calculate price based on selections
  useEffect(() => {
    if (product && selectedStorage && selectedRam) {
      let basePrice = product.price;
      
      if (selectedStorage === '1') basePrice += 1000;
      else if (selectedStorage === '2') basePrice += 3000;
      else if (selectedStorage === '3') basePrice += 6000;
      
      if (selectedRam === '16') basePrice += 1500;
      else if (selectedRam === '32') basePrice += 3500;
      else if (selectedRam === '64') basePrice += 8000;
      
      setPrice(basePrice);
    }
  }, [product, selectedStorage, selectedRam]);

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      setSelectedStorage('.5');
      setSelectedRam('8');
      setPrice(product.price);
    }
  }, [product]);

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleRamSelect = (ram) => {
    setSelectedRam(ram);
  };

  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(product?.youtube_url);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading product details...</h2>
      </div>
    );
  }

  return (
    <div className="dark-theme">
      <NavBar />
      
      {/* Main product container */}
      <div className="product-container">
        {/* Background video if available */}
        {videoId && (
          <div className="video-background">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`}
              title="Product video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
            ></iframe>
            <div className={`video-overlay ${videoLoaded ? 'video-loaded' : ''}`}></div>
          </div>
        )}
        
        {/* Product content layout */}
        <div className="product-layout">
          {/* Left side - Product image */}
          <div className="product-image-container">
            {product.image && (
              <div className="product-image">
                <img 
                  src={`${BaseURL}${product.image}`} 
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={imageLoaded ? 'image-loaded' : ''}
                />
              </div>
            )}
          </div>
          
          {/* Right side - Product details */}
          <div className="product-details">
            <div className="product-header">
              <h1 className="product-title">{product.name || "THE SPECTRE SERIES"}</h1>
              <h3 className="product-subtitle">{product.name || "GAMING PC"}</h3>
              <div className="price-tag">
                {product.originalPrice && <del>₹ {product.originalPrice.toLocaleString()}</del>}  
                <span>₹ {price.toLocaleString()}/-</span>
              </div>
            </div>
            
            <div className="product-description">
              {product.description || "No description available."}
            </div>

            <div className="product-options">
              <h4 className="option-heading">SELECT STORAGE (TB)</h4>
              <div className="option-grid">
                {['.5', '1', '2', '3'].map((storage) => (
                  <div 
                    key={`storage-${storage}`}
                    className={`option-tile ${selectedStorage === storage ? 'selected' : ''}`}
                    onClick={() => handleStorageSelect(storage)}
                  >
                    {storage}
                    {selectedStorage === storage && (
                      <span className="check-mark"><FaCheck size={10} /></span>
                    )}
                  </div>
                ))}
              </div>

              <h4 className="option-heading">RAM (GB)</h4>
              <div className="option-grid">
                {['8', '16', '32', '64'].map((ram) => (
                  <div 
                    key={`ram-${ram}`}
                    className={`option-tile ${selectedRam === ram ? 'selected' : ''}`}
                    onClick={() => handleRamSelect(ram)}
                  >
                    {ram}
                    {selectedRam === ram && (
                      <span className="check-mark"><FaCheck size={10} /></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons">
              <button className="cart-button">
                <FaCartPlus /> Add To Cart
              </button>
              <button className="buy-button">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;