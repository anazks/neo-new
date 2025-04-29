import React, { useEffect, useState } from 'react';
import './BestPairedWith.css';

function BestPairedWith() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    // Use Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    const sectionElement = document.querySelector('.paired-section');
    if (sectionElement) observer.observe(sectionElement);

    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
    };
  }, []);

  const products = [
    { 
      name: 'RAZER DEATH ADDER', 
      price: '₹2,60,000/-', 
      tag: 'BESTSELLER',
      image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/10/CYBERPOWERPC-Gamer-Xtreme-VR-Gaming-PC-240GB-2.jpg'
    },
    { 
      name: 'RAZER BLACKWIDOW V4 PRO', 
      price: '₹2,60,000/-', 
      tag: 'NEW',
      image: 'https://www.bhphotovideo.com/images/images2000x2000/cyberpowerpc_gamer_master_gma9180cpg_1617913.jpg'
    },
    { 
      name: 'TEENAGE ENGINEERING MIDI', 
      price: '₹2,60,000/-', 
      tag: 'LIMITED',
      image: 'https://www.bhphotovideo.com/images/images2000x2000/cyberpowerpc_gamer_master_gma9180cpg_1617913.jpg'
    },
    { 
      name: 'THE SPECTRE SERIES', 
      price: '₹2,60,000/-', 
      tag: 'PREMIUM',
      image: 'https://tse3.mm.bing.net/th?id=OIP.PnHeWEbsx1z3tN6V2HR1fAHaHa&pid=Api&P=0&h=180'
    },
  ];

  const handleProductHover = (index) => {
    setActiveProduct(index);
  };

  const handleQuickView = (index, e) => {
    e.stopPropagation();
    // Implement quick view functionality here
    console.log(`Quick view for product ${index}`);
  };

  const handleAddToCart = (index, e) => {
    e.stopPropagation();
    // Implement add to cart functionality here
    console.log(`Added product ${index} to cart`);
  };

  return (
    <div className={`paired-section ${isVisible ? 'visible' : ''}`}>
      <div className="paired-header">
        <div className="paired-title-bar"></div>
        <h2 className="paired-title">BEST PAIRED WITH</h2>
        <div className="paired-title-bar"></div>
      </div>
      
      <div className="paired-grid">
        {products.map((product, index) => (
          <div 
            className={`paired-card ${activeProduct === index ? 'paired-active' : ''}`} 
            key={index}
            onMouseEnter={() => handleProductHover(index)}
            onMouseLeave={() => setActiveProduct(null)}
          >
            <div className="paired-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="paired-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                }}
              />
              <div className="paired-overlay">
                <button 
                  className="paired-quick-view"
                  onClick={(e) => handleQuickView(index, e)}
                >
                  Quick View
                </button>
              </div>
            </div>
            <div className="paired-content">
              <h3 className="paired-name">{product.name}</h3>
              <p className="paired-price">{product.price}</p>
              <button 
                className="paired-cart-btn"
                onClick={(e) => handleAddToCart(index, e)}
              >
                <span>ADD TO CART</span>
              </button>
            </div>
            <div className="paired-badges">
              <span className="paired-badge">{product.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestPairedWith;