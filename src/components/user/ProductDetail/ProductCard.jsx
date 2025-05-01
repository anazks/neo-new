import React, { useState, useEffect, useRef } from 'react';

export default function ProductCard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);
  
  // Product data
  const products = [
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://wallpapers.com/images/hd/a-s-u-s-r-o-g-gaming-setup-75b6r01o0uzy3yh4.png", tag: 'Popular' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://wallpapers.com/images/hd/a-s-u-s-r-o-g-gaming-setup-75b6r01o0uzy3yh4.png", tag: 'New' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://wallpapers.com/images/hd/gaming-p-c-tower-with-r-g-b-lighting-j0j1cc6bqh37eb7s.png" },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://wallpapers.com/images/hd/gaming-p-c-tower-with-blue-l-e-d-fan-nzi15aur7dkuhphy.png", tag: 'Sale' },
    { name: 'Neuron 4000D RTS', price: '₹1,20,000/-', image: "https://wallpapers.com/images/hd/gaming-p-c-tower-with-blue-l-e-d-fan-nzi15aur7dkuhphy.png" },
  ];

  // Auto-scroll carousel effect
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollAmount = 1; // Pixels to scroll per interval

        // If we've scrolled to the end, reset to beginning
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollAmount;
        }
      }
    };

    // Set up the interval for scrolling
    scrollInterval.current = setInterval(scrollCarousel, 30);

    // Pause scrolling when hovering over the carousel
    const handleMouseEnter = () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };

    const handleMouseLeave = () => {
      scrollInterval.current = setInterval(scrollCarousel, 30);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    // Clean up interval and event listeners on component unmount
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

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
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-48 md:h-56 overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
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
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-3 bg-gradient-to-t from-black/80 to-transparent transform transition-transform duration-300">
                  <button className="py-2 px-3 bg-white/20 hover:bg-white/30 text-white rounded font-medium text-sm">
                    Quick View
                  </button>
                  <button className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium text-sm">
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-2 text-center">
              <h3 className="text-gray-800 font-medium">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg" style={{fontFamily: 'Rajdhani, sans-serif'}}>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator dots */}
      <div className="flex justify-center mt-4 gap-1">
        {[...Array(Math.ceil(products.length / 4))].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-green-500 transition-colors cursor-pointer"
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollLeft = i * carouselRef.current.offsetWidth;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}