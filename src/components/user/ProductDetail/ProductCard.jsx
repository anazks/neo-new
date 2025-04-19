import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageError, setImageError] = useState({});

  const fallbackImage = "https://via.placeholder.com/300x200";

  const products = [
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://parspng.com/wp-content/uploads/2023/02/computerpng.parspng.com-4.png", tag: 'Popular' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://static.vecteezy.com/system/resources/previews/048/412/757/non_2x/modern-gaming-pc-isolated-on-transparent-free-png.png", tag: 'New' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://static.vecteezy.com/system/resources/previews/048/412/757/non_2x/modern-gaming-pc-isolated-on-transparent-free-png.png" },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png", tag: 'Sale' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png" },
  ];

  const handleImageError = (index) => {
    setImageError(prev => ({...prev, [index]: true}));
  };

  return (
    <div className="pc-recommendations-section">
      <h2 className="pc-recommendations-title">You May Also Like</h2>
      <div className="pc-product-carousel">
        {products.map((product, index) => (
          <div 
            className="pc-product-card" 
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="pc-product-image-container">
              <img
                src={imageError[index] ? fallbackImage : product.image}
                alt={product.name}
                className="pc-product-image"
                onError={() => handleImageError(index)}
              />
              {product.tag && <span className={`pc-product-tag pc-tag-${product.tag.toLowerCase()}`}>{product.tag}</span>}
              {hoveredIndex === index && (
                <div className="pc-quick-actions">
                  <button className="pc-action-button pc-view-button">Quick View</button>
                  <button className="pc-action-button pc-cart-button">Add to Cart</button>
                </div>
              )}
            </div>
            <div className="pc-product-info">
              <h3 className="pc-product-name">{product.name}</h3>
              <p className="pc-product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;