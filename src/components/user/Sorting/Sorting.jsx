import React, { useState } from 'react';
import './sorting.css';

function Sorting() {
  const [activeButton, setActiveButton] = useState('GAMING PC');
  
  const categories = [
    'GAMING PC',
    'WORKSTATIONS',
    'ENTERPRISE',
    'SERVERS',
    'ACCESSORIES',
    'PERIPHERALS',
    'MERCH',
    'EXTRAS'
  ];

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <div className="sorting-containers">
      <div className="sorting-title">Browse Categories</div>
      <div className="sorting-header">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${activeButton === category ? 'active' : ''}`}
            onClick={() => handleButtonClick(category)}
          >
            {category}
            <span className="button-glow"></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sorting;