// React Component - Quick.jsx with updated hover behavior and sizes
import React, { useState, useEffect, useRef } from 'react';
import './quick.css';
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { RiShieldKeyholeLine } from "react-icons/ri";

function Quick() {
  // State to track which product is being hovered
  const [hoveredProduct, setHoveredProduct] = useState(null);
  // State to handle animation class application
  const [isAnimating, setIsAnimating] = useState(false);
  // Ref for hover timers to avoid race conditions
  const hoverTimerRef = useRef(null);
  // Ref for intersection observer to trigger entrance animations
  const productRowRef = useRef(null);
  // Ref for parallax effect on the banner
  const bannerRef = useRef(null);
  
  // Product data
  const products = [
    { 
      id: 'aspire', 
      name: 'Aspire Series', 
      price: '$1,40,000/-', 
      description: 'Performance Minimal, Sleek',
      image: "http://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
      color: "linear-gradient(135deg, #2a2a72 0%, #009ffd 74%)"
    },
    { 
      id: 'ion', 
      name: 'Ion Drive', 
      price: '$95,000/-', 
      description: 'Compact Power',
      image: "https://static.vecteezy.com/system/resources/previews/048/412/757/non_2x/modern-gaming-pc-isolated-on-transparent-free-png.png",
      color: "linear-gradient(135deg, #000000 0%, #434343 74%)"
    },
    { 
      id: 'e75', 
      name: 'E-75', 
      price: '$1,20,000/-', 
      description: 'Professional Grade',
      image: "https://parspng.com/wp-content/uploads/2023/02/computerpng.parspng.com-4.png",
      color: "linear-gradient(135deg, #5f2c82 0%, #49a09d 74%)"
    },
    { 
      id: 'phantom', 
      name: 'Phantom', 
      price: '$1,60,000/-', 
      description: 'Ultimate Gaming',
      image: "https://parspng.com/wp-content/uploads/2023/02/computerpng.parspng.com-4.png",
      color: "linear-gradient(135deg, #380036 0%, #0CBABA 74%)"
    },
  ];

  // Set up intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    if (productRowRef.current) {
      observer.observe(productRowRef.current);
    }

    return () => {
      if (productRowRef.current) {
        observer.unobserve(productRowRef.current);
      }
    };
  }, []);

  // Enhanced parallax effect for banner
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollPosition = window.scrollY;
        const bannerOffset = bannerRef.current.getBoundingClientRect().top + scrollPosition;
        const parallaxValue = (scrollPosition - bannerOffset) * 0.3;
        
        const imageContainer = bannerRef.current.querySelector('.imageContainer');
        if (imageContainer) {
          // Apply subtle parallax to banner image
          imageContainer.style.backgroundPosition = `center ${parallaxValue}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle animation reset when switching between products
  useEffect(() => {
    if (hoveredProduct !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [hoveredProduct]);

  // Handle mouseEnter with slight delay to prevent accidental hovers
  const handleMouseEnter = (productId) => {
    // Clear any existing timers to prevent race conditions
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    // Set a slight delay for better user experience
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(productId);
    }, 50);
  };

  // Handle mouseLeave with a slight delay for smoother transitions
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(null);
    }, 100);
  };

  return (
    <div className="fullWindow">
      <div className="mainBox">
        {/* Banner Section */}
        <div className="banner parallax" ref={bannerRef}>
          <div className="imageContainer">
            <div className="glow-overlay"></div>
          </div>
          <div className="subcribe">
            <div className="contentsdiv">
              <div>
                <p className="squad-text">SQUAD GAMING</p>
                <h2 className="gaming">Gaming Computers</h2>
                <p className="partnership-text">In partnership with top brands</p>
              </div>
            </div>
            <div className="arrow">
              <IoIosArrowForward className="arrowText pulse" />
            </div>
            <div className="sub">
              <div className="exclusive">
                <p>Get exclusive offers and early access to new releases</p>
              </div>
              <button className="subscribe-button">
                <span>Subscribe</span>
                <IoArrowForwardCircleSharp className="iconsbtn" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="product-row-container">
          <div className="product-row fade-in" ref={productRowRef}>
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-card ${hoveredProduct === product.id ? 'expanded' : ''}`}
                style={{ background: product.color }}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-glow"></div>
                <div className="product-content">
                  {/* Content for expanded view */}
                  {hoveredProduct === product.id && (
                    <>
                      <div className="product-details">
                        <div className="subheading-prebuild">
                          <RiShieldKeyholeLine className="prebuild-icon spin-on-hover" />
                          <span>PRE-BUILT GAMING PC</span>
                        </div>
                        <h2 className="heading">{product.name}</h2>
                        <p className="subheading">{product.description}</p>
                        <div className="rowCIricle">
                          <div className="pink"></div>
                          <div className="yellow"></div>
                          <div className="blue"></div>
                          <div className="black"></div>
                        </div>
                        <p className="price">{product.price}</p>
                        <button className="buyNow-button">
                          <span>Buy Now</span>
                          <IoArrowForwardCircleSharp className="iconsbtn-buynow" />
                        </button>
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`product-image ${!isAnimating ? 'animate-in' : ''}`}
                      />
                    </>
                  )}
                  
                  {/* Content for compact view */}
                  {hoveredProduct !== product.id && (
                    <>
                      <div className="compact-product-image">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="imgage floating" 
                        />
                      </div>
                      <div className="PcName">
                        <span>{product.name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quick;