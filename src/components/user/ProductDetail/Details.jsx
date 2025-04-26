import React, { useState, useEffect } from 'react';
import './Detail.css';
import NavBar from '../NavBar/NavBar';
import { FaCartPlus, FaCheck, FaInfoCircle } from "react-icons/fa6";
import BaseURL from '../../../Static/Static';

function Details({ product }) {
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [price, setPrice] = useState(0);

  // Calculate price based on selections
  useEffect(() => {
    if (product && selectedStorage && selectedRam) {
      let basePrice = product.price;
      
      // Add price for storage upgrade
      if (selectedStorage === '1') basePrice += 1000;
      else if (selectedStorage === '2') basePrice += 3000;
      else if (selectedStorage === '3') basePrice += 6000;
      
      // Add price for RAM upgrade
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

  // Handle selections
  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleRamSelect = (ram) => {
    setSelectedRam(ram);
  };

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
      <div  className="DetailsBox">
        <div className="pcPic">
          <img 
            src={product.images?.[0]?.image ? BaseURL + product.images[0].image : "https://via.placeholder.com/400x300"} 
            alt={product.name || "Product Image"}
            onLoad={() => setIsImageLoaded(true)}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
            className={isImageLoaded ? "image-loaded" : ""}
          />
        </div>
        <br /><br />
        <div className="descreption">
          <div>
            <h2 >{product.name || "GAMING PC"}</h2>
            <div className="rate">
              <h1>{product.name || "THE SPECTRE SERIES"}</h1>
              <h1 className="price">
                {product.originalPrice && <del>₹ {product.originalPrice.toLocaleString()}</del>}  
                ₹ {price.toLocaleString()}/-
              </h1>
            </div>
          </div>
          
          <div className="detailedDescrption">
            {product.description || "No description available."}
          </div>

          <h4 className='selectionHeading'><b>SELECT STORAGE (TB)</b></h4>
          <div className='circleBox'>
            {['.5', '1', '2', '3'].map((storage) => (
              <div 
                key={`storage-${storage}`}
                className={`circle ${selectedStorage === storage ? 'selected' : ''}`}
                onClick={() => handleStorageSelect(storage)}
              >
                {storage}
                {selectedStorage === storage && (
                  <span className="selected-indicator"><FaCheck size={10} /></span>
                )}
              </div>
            ))}
          </div>

          <h4 className='selectionHeading'><b>RAM (GB)</b></h4>
          <div className='circleBox'>
            {['8', '16', '32', '64'].map((ram) => (
              <div 
                key={`ram-${ram}`}
                className={`circle ${selectedRam === ram ? 'selected' : ''}`}
                onClick={() => handleRamSelect(ram)}
              >
                {ram}
                {selectedRam === ram && (
                  <span className="selected-indicator"><FaCheck size={10} /></span>
                )}
              </div>
            ))}
          </div>

          <div className="buttondSection">
            <div className="addtoCart">
              <span>
                <FaCartPlus /> Add To Cart
              </span>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;