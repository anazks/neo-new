import React, { useEffect, useState } from 'react';
import { getCategoryForUser } from '../../../Services/Settings';
import { getAllProduct } from '../../../Services/Products';

function Sorting({ setProducts }) {
  const [activeButton, setActiveButton] = useState(null);
  const [activeSortButton, setActiveSortButton] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);

  // Fetch categories and all products once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await getCategoryForUser();
        setCategories(categoryResponse.data || []);
        
        // Fetch all products
        const productResponse = await getAllProduct();
        setAllProducts(productResponse);
        setProducts(productResponse);
        
        // Trigger animation after data is loaded
        setTimeout(() => setAnimateIn(true), 100);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, [setProducts]);

  // Show all products
  const showAllProducts = () => {
    setProducts(allProducts);
    setActiveButton(null);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    const filtered = allProducts.filter(prod => prod.category === category.id);
    setProducts(filtered);
    setActiveButton(category.id);
    // Keep the current sort if there is one
    if (activeSortButton) {
      sortProducts(filtered, activeSortButton);
    }
  };

  // Sort products by price or date
  const sortProducts = (productsToSort, sortType) => {
    let sortedProducts = [...productsToSort];
    
    switch (sortType) {
      case 'price-high-low':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'price-low-high':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        break;
      default:
        // No sorting
        break;
    }
    
    setProducts(sortedProducts);
    setActiveSortButton(sortType);
  };

  // Handle sort button click
  const handleSortClick = (sortType) => {
    // Get the current filtered products or all products if no filter
    const currentProducts = activeButton 
      ? allProducts.filter(prod => prod.category === activeButton) 
      : [...allProducts];
    
    sortProducts(currentProducts, sortType);
  };

  return (
    <div className={`rounded-lg shadow-md border border-gray-200 p-6 my-6 transition-all duration-700 ease-out ${animateIn ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      {/* Font import for Rajdhani */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        
        .rajdhani-font {
          font-family: 'Rajdhani', sans-serif;
        }
      `}</style>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-center text-xl font-bold text-black pb-3 mb-4 border-b-2 border-gray-200 rajdhani-font">
          Browse Categories
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className={`relative overflow-hidden px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ease-out transform hover:shadow-lg animate-fade-slide-up rajdhani-font ${
                  activeButton === category.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-200 text-gray-900 hover:shadow-lg'
                }`}
              >
                {category.name}
                <span className="absolute inset-0 bg-white/30 opacity-0 transition-opacity duration-300 pointer-events-none" />
              </button>
            ))
          ) : (
            <p className="text-amber-700 text-sm animate-pulse rajdhani-font">Loading categories...</p>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={showAllProducts}
            className={`text-sm px-4 py-2 rounded-sm transition-all duration-300 ease-out transform hover:shadow-lg rajdhani-font
              ${activeButton === null
                ? 'bg-black text-white shadow-md'
                : 'bg-white border-2 border-gray-300 text-black hover:shadow-lg'
              }`}
          >
            Show All Products
          </button>
        </div>
      </div>

      {/* Sorting Section */}
      <div className={`transition-all duration-500 ease-out ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-center text-xl font-bold text-black pb-3 mb-4 border-b-2 border-gray-200 rajdhani-font">
          Sort By
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={() => handleSortClick('price-high-low')}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ease-out transform hover:shadow-lg rajdhani-font ${
              activeSortButton === 'price-high-low'
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-gray-900 hover:shadow-lg'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Price: High to Low
          </button>
          
          <button
            onClick={() => handleSortClick('price-low-high')}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ease-out transform hover:shadow-lg rajdhani-font ${
              activeSortButton === 'price-low-high'
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-gray-900 hover:shadow-lg'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Price: Low to High
          </button>
          
          <button
            onClick={() => handleSortClick('newest')}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 ease-out transform hover:shadow-lg rajdhani-font ${
              activeSortButton === 'newest'
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-gray-900 hover:shadow-lg'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Newest First
          </button>
        </div>

        {/* Clear Sort Button (only visible when sorting is active) */}
        {activeSortButton && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                // Clear sorting but keep category filter if any
                const currentProducts = activeButton 
                  ? allProducts.filter(prod => prod.category === activeButton) 
                  : [...allProducts];
                setProducts(currentProducts);
                setActiveSortButton(null);
              }}
              className="text-sm px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-sm hover:shadow-lg transition-all duration-300 ease-out transform rajdhani-font"
            >
              Clear Sort
            </button>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Sorting;