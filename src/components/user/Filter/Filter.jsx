import React, { useState } from 'react';
import './filter.css';

function Filter() {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = [
    "NEO TOKYO CERTIFIED",
    "BY BRAND",
    "CATEGORY",
    "PRICE",
    "AVAILABILITY",
    "RATING",
    "NEO TOKYO PRIORITY ONE FULFILLED"
  ];
  
  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };
  
  return (
    <div className="filter-container">
      <div className="filter-content">
        <div className="category-column">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`category-item ${activeCategory === index ? 'active' : ''}`}
              onClick={() => toggleCategory(index)}
            >
              <h3>{category}</h3>
              <span className="toggle-icon"></span>
            </div>
          ))}
        </div>

        <div className="options-column">
          {activeCategory !== null && (
            <div className="option-group active">
              <select><option value="">Select option</option><option>Option 1</option><option>Option 2</option></select>
              <select><option value="">Select option</option><option>Option 1</option><option>Option 2</option></select>
              <select><option value="">Select option</option><option>Option 1</option><option>Option 2</option></select>
              
              <div className="button-container">
                <button className="apply-button">APPLY FILTER</button>
                <button className="reset-button">RESET</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;