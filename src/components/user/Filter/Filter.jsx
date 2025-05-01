import React, { useState } from 'react';

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
    <div className="w-full bg-white font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Category Column */}
          <div className="w-full md:w-64">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center px-4 py-3 mb-2 rounded cursor-pointer border-l-3 transition-all duration-200 ${
                  activeCategory === index 
                    ? 'bg-gray-100 border-l-blue-500 shadow-sm' 
                    : 'bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'
                }`}
                onClick={() => toggleCategory(index)}
              >
                <h3 className={`text-xs uppercase font-medium tracking-wide ${
                  activeCategory === index ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {category}
                </h3>
                <span className="relative w-3 h-3">
                  <span className={`absolute top-1/2 left-0 w-3 h-0.5 -mt-px ${
                    activeCategory === index ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                  <span className={`absolute top-0 left-1/2 h-3 w-0.5 -ml-px transition-transform duration-200 ${
                    activeCategory === index ? 'bg-blue-500 rotate-90' : 'bg-gray-500'
                  }`}></span>
                </span>
              </div>
            ))}
          </div>

          {/* Options Column */}
          <div className="w-full">
            {activeCategory !== null && (
              <div className="animate-fade-in">
                <div className="space-y-3">
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-700 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                    <option value="">Select option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-700 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                    <option value="">Select option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-700 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                    <option value="">Select option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button className="px-5 py-2 bg-blue-500 text-white font-medium rounded-full text-xs uppercase tracking-wide hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Apply Filter
                    </button>
                    <button className="px-5 py-2 bg-white text-gray-700 border border-gray-300 font-medium rounded-full text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add animation with style tag
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  /* Custom border width - Tailwind doesn't have border-l-3 by default */
  .border-l-3 {
    border-left-width: 3px;
  }
`;
document.head.appendChild(style);

export default Filter;