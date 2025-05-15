import React, { useState, useEffect, useRef, useCallback } from 'react';
import { recomendation } from '../../../Services/Products';

export default function ProductCard({product}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);

  // Memoized fetch function
  const fetchRecommendations = useCallback(async () => {
    try {
      setIsLoading(true);
      let data = {}
      data.product_id = product.id;
      const response = await recomendation();
      console.log(response,"respoonse recomendation...")
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-scroll carousel effect
  useEffect(() => {
    const scrollCarousel = () => {
      if (!carouselRef.current) return;
      
      const container = carouselRef.current;
      const scrollAmount = 1; // Pixels to scroll per interval

      // Reset to beginning if at the end
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }
    };

    // Set up the interval for scrolling
    scrollInterval.current = setInterval(scrollCarousel, 30);

    // Event handlers for pausing on hover
    const carousel = carouselRef.current;
    const handleMouseEnter = () => clearInterval(scrollInterval.current);
    const handleMouseLeave = () => {
      scrollInterval.current = setInterval(scrollCarousel, 30);
    };

    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initial data fetch
    fetchRecommendations();

    // Cleanup
    return () => {
      clearInterval(scrollInterval.current);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [fetchRecommendations]);

  // Handle product click navigation
  const handleProductClick = useCallback((productId) => {
    // Navigate to product detail page
    console.log('Navigating to product:', productId);
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 uppercase">
          YOU MAY ALSO LIKE:
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">
          YOU MAY ALSO LIKE:
        </h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchRecommendations}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render empty state
  if (!products.length) {
    return (
      <div className="bg-white p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">
          YOU MAY ALSO LIKE:
        </h2>
        <p className="text-gray-500">No recommendations available at this time</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-12 uppercase">
        YOU MAY ALSO LIKE:
      </h2>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-6 gap-8 md:gap-10 snap-x scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => (
          <div 
            className="flex-none w-60 sm:w-64 md:w-72 snap-start bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            key={`${product.id}-${index}`}
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`View ${product.name}`}
          >
            <div className="relative h-48 md:h-56 overflow-hidden bg-gray-50">
              <img
                src={product.recommended_product_details?.images[0].image || '/placeholder-product.jpg'}
                alt={product.recommended_product_details.name}
                className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
                loading="lazy"
              />
              
              {product.tag && (
                <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold uppercase text-white
                  ${product.tag === 'Popular' ? 'bg-blue-500' : 
                    product.tag === 'Sale' ? 'bg-red-500' : 
                    'bg-green-500'}`}
                >
                  {product.tag}
                </span>
              )}
              
              {hoveredIndex === index && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <button 
                    className="py-2 px-3 bg-white/20 hover:bg-white/30 text-white rounded font-medium text-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Quick view:', product.recommended_product_details.id);
                    }}
                  >
                    Quick View
                  </button>
                  <button 
                    className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium text-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Add to cart:', product.recommended_product_details.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-2 text-center">
              <h3 className="text-gray-800 font-medium truncate">{product.recommended_product_details.name}</h3>
              <p className="text-green-600 font-semibold text-lg" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                {product.recommended_product_details.price || '$0.00'}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator dots - only show if more than one page */}
      {products.length > 4 && (
        <div className="flex justify-center mt-4 gap-1">
          {[...Array(Math.ceil(products.length / 4))].map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-green-500 transition-colors focus:outline-none"
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: i * carouselRef.current.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}