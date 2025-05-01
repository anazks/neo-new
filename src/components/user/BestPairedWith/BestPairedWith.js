import React, { useEffect, useState, useRef } from 'react';
import { FaCartPlus, FaChevronRight } from 'react-icons/fa';

function BestPairedWith() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.best-paired-section');
    if (section) observer.observe(section);

    // Auto-scroll function
    const autoScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 1; // pixels to scroll per interval

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          // Reset scroll position when reached the end
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollAmount;
        }
      }
    };

    // Start auto-scroll
    scrollInterval.current = setInterval(autoScroll, 30);

    // Pause scrolling when hovering
    const handleMouseEnter = () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };

    // Resume scrolling when not hovering
    const handleMouseLeave = () => {
      scrollInterval.current = setInterval(autoScroll, 30);
    };

    // Add event listeners
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (section) observer.unobserve(section);
      if (scrollInterval.current) clearInterval(scrollInterval.current);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const products = [
    { 
      id: 1,
      name: 'RAZER DEATH ADDER V3', 
      price: '₹ 5,999/-', 
      tag: 'BESTSELLER',
      image: 'https://www.pngall.com/wp-content/uploads/5/Gaming-Headset-Transparent-1.png'
    },
    { 
      id: 2,
      name: 'RAZER BLACKWIDOW V4 PRO', 
      price: '₹ 19,999/-', 
      tag: 'NEW',
      image: 'https://www.pngall.com/wp-content/uploads/5/Gaming-Headset-Transparent-1.png'
    },
    { 
      id: 3,
      name: 'RAZER KRAKEN V3', 
      price: '₹ 8,999/-', 
      tag: 'LIMITED',
      image: 'https://www.pngall.com/wp-content/uploads/5/Gaming-Headset-Transparent-1.png'
    },
    { 
      id: 4,
      name: 'RAZER VIPER MINI', 
      price: '₹ 4,999/-', 
      tag: 'VALUE',
      image: 'https://www.pngall.com/wp-content/uploads/5/Gaming-Headset-Transparent-1.png'
    },
    { 
      id: 5,
      name: 'RAZER VIPER V2 PRO', 
      price: '₹ 7,999/-', 
      tag: 'POPULAR',
      image: 'https://www.pngall.com/wp-content/uploads/5/Gaming-Headset-Transparent-1.png'
    },
  ];

  const handleProductHover = (id) => {
    setActiveProduct(id);
  };

  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    console.log(`Added product ${productId} to cart`);
    // Add your cart logic here
  };

  return (
    <section 
      className="best-paired-section py-8 transition-all duration-500"
      style={{ 
        backgroundColor: 'rgba(255, 85, 136, 1)',
        height: 'auto',
        minHeight: '60vh',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        fontFamily: 'Rajdhani, sans-serif'
      }}
    >
      <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">BEST PAIRED WITH</h2>
          <p className="text-sm md:text-base text-white text-opacity-90">Complete your setup with these premium accessories</p>
        </div>

        {/* Products Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 gap-4 md:gap-6 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-64 sm:w-72 snap-start bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              onMouseEnter={() => handleProductHover(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {/* Product Tag */}
              {product.tag && (
                <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.tag}
                </div>
              )}

              {/* Product Image - Increased height */}
              <div className="h-56 sm:h-64 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info - Adjusted spacing */}
              <div className="p-2 flex flex-col h-40 sm:h-34">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xl font-bold text-pink-600">{product.price}</p>
                </div>
                
                {/* Add to Cart Button - Now properly aligned at bottom */}
                <button
                  onClick={(e) => handleAddToCart(product.id, e)}
                  className="w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 mt-2"
                >
                  <FaCartPlus className="mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-4">
          <button className="inline-flex items-center text-white font-medium hover:text-opacity-80 transition-colors duration-300">
            View all accessories <FaChevronRight className="ml-1" />
          </button>
        </div>
        
        {/* Scroll indicator dots */}
        <div className="flex justify-center mt-4 gap-1">
          {[...Array(Math.ceil(products.length / 3))].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-white/30 hover:bg-white transition-colors cursor-pointer"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollLeft = i * scrollContainerRef.current.offsetWidth;
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestPairedWith;