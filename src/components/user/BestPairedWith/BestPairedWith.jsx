import React, { useEffect, useState, useRef } from 'react';
import { FaCartPlus, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getPairedProduct } from '../../../Services/Products';
import SingeProductOverview from '../CardPage/SingleProductOverView';
import { useNavigate } from "react-router-dom";

function BestPairedWith({ product }) {
    const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);
  const [pairedProducts, setPairedProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);

  const getProducts = async () => {
    try {
      const response = await getPairedProduct(product.id);
      setPairedProducts(response.data.paired_products || []);
    } catch (error) {
      console.error("Error fetching paired products:", error);
      setPairedProducts([]);
    }
  };

  useEffect(() => {
    getProducts();

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

    return () => {
      if (section) observer.unobserve(section);
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [product.id]);

  const handleProductHover = (id) => {
    setActiveProduct(id);
  };

  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    console.log(`Added product ${productId} to cart`);
    // Add your cart logic here
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowOverview(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  const handleView=(product)=>{
      navigate(`/Details/${product.id}`)
  }
  const closeOverview = () => {
    setShowOverview(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <>
      {/* Product Overview Modal */}
      {showOverview && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeOverview}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <FaTimes className="text-2xl" />
            </button>
            <SingeProductOverview product={selectedProduct} />
          </div>
        </div>
      )}

      {/* Main Component */}
      <section 
        className="best-paired-section py-12 transition-all duration-500 relative"
        style={{ 
          backgroundColor: 'rgba(255, 85, 136, 1)',
          minHeight: '60vh',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          fontFamily: 'Rajdhani, sans-serif'
        }}
      >
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">BEST PAIRED WITH</h2>
            <p className="text-base md:text-lg text-white text-opacity-90">
              Complete your setup with these premium accessories
            </p>
          </div>

          {/* Products Horizontal Scroll */}
          {pairedProducts.length > 0 ? (
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pairedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-72 sm:w-80 snap-start bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-3"
                    onMouseEnter={() => handleProductHover(product.id)}
                    onMouseLeave={() => setActiveProduct(null)}
                  >
                    {/* Product Tag */}
                    <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {product.paired_product_details.name.split(' ')[0]}
                    </div>

                    {/* Product Image */}
                    <div className="h-64 sm:h-72 flex items-center justify-center p-4 bg-gray-50 relative">
                      <img
                        src={product.paired_product_details.primary_image || '/default-product-image.png'}
                        alt={product.paired_product_details.brand_name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                      />
                      {activeProduct === product.id && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
                          <button 
                            className="bg-white text-pink-600 font-bold py-2 px-6 rounded-full hover:bg-pink-600 hover:text-white transition-colors"
                            onClick={() => handleView(product.paired_product_details)}
                          >
                            Quick View
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                          {product.paired_product_details.name}
                        </h3>
                        <p className="text-2xl font-bold text-pink-600">
                          ₹{product.paired_product_details.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.paired_product_details.short_description || 'Premium quality accessory'}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.id, e);
                          }}
                          className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-3 rounded-lg transition-colors duration-300"
                        >
                          <FaCartPlus className="mr-2" />
                          Add to Cart
                        </button> */}
                        <button
                          onClick={() => handleBuyNow(product.paired_product_details)}
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {pairedProducts.map((_, i) => (
                  <button
                    key={i}
                    className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-colors focus:outline-none"
                    aria-label={`Go to item ${i + 1}`}
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                          left: i * 320,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white text-opacity-80 text-lg">No paired products found</p>
            </div>
          )}

          {/* View All Button */}
          {pairedProducts.length > 0 && (
            <div className="text-center mt-8">
              <button className="inline-flex items-center text-white font-bold text-lg hover:text-opacity-80 transition-colors duration-300 group">
                View all accessories
                <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BestPairedWith;