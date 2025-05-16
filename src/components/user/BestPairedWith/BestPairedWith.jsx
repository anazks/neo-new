import React, { useEffect, useState, useRef } from "react";
import { FaCartPlus, FaChevronRight, FaTimes } from "react-icons/fa";
import { getPairedProduct } from "../../../Services/Products";
import SingeProductOverview from "../CardPage/SingleProductOverView";
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

    const section = document.querySelector(".best-paired-section");
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
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };
  const handleView = (product) => {
    navigate(`/Details/${product.id}`);
  };
  const closeOverview = () => {
    setShowOverview(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
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
        className="best-paired-section py-4 transition-all duration-500 relative"
        style={{
          backgroundColor: "rgba(255, 85, 136, 1)",
          minHeight: "30vh",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          fontFamily: "Rajdhani, sans-serif",
        }}
      >
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          {/* Header */}
          <div className="text-center mb-1">
            <h3 className="text-md md:text-md font-bold text-white">
              BEST PAIRED WITH
            </h3>
            <p className="text-base md:text-xsm text-white text-opacity-90">
              Complete your setup with these premium accessories
            </p>
          </div>

          {/* Products Horizontal Scroll */}
          {pairedProducts.length > 0 ? (
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-2 gap-4 snap-x scrollbar-hide px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {pairedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-60 snap-start bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    onMouseEnter={() => handleProductHover(product.id)}
                    onMouseLeave={() => setActiveProduct(null)}
                  >
                    {/* Product Tag */}
                    {/* <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
                      {product.paired_product_details.name.split(" ")[0]}
                    </div> */}

                    {/* Product Image */}
                    <div className="h-48 flex items-center justify-center p-3 bg-gray-50 relative">
                      <img
                        src={
                          product.paired_product_details.primary_image ||
                          "/default-product-image.png"
                        }
                        alt={product.paired_product_details.brand_name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                      {activeProduct === product.id && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
                          <button
                            className="bg-white text-pink-600 font-bold py-1 px-4 rounded-full hover:bg-pink-600 hover:text-white transition-colors text-sm"
                            onClick={() =>
                              handleView(product.paired_product_details)
                            }
                          >
                            Quick View
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3 flex flex-col">
                      <div className="flex-grow">
                        <h3 className="text-base font-bold text-gray-900 mb-0.5 line-clamp-2">
                          {product.paired_product_details.name}
                        </h3>
                        <p className="text-lg font-bold text-pink-600">
                          ₹
                          {product.paired_product_details.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {product.paired_product_details.short_description ||
                            "Premium quality accessory"}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="mt-2">
                        <button
                          onClick={() =>
                            handleBuyNow(product.paired_product_details)
                          }
                          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-1.5 px-2 rounded-md transition-colors duration-300 text-sm"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center mt-1 gap-1.5">
                {pairedProducts.map((_, i) => (
                  <button
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/30 hover:bg-white transition-colors focus:outline-none"
                    aria-label={`Go to item ${i + 1}`}
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                          left: i * 240,
                          behavior: "smooth",
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-opacity-80 text-base">
                No paired products found
              </p>
            </div>
          )}

          {/* View All Button */}
          {/* {pairedProducts.length > 0 && (
            <div className="text-center mt-1">
              <button className="inline-flex items-center text-white font-bold text-md hover:text-opacity-80 transition-colors duration-300 group">
                View all accessories
                <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
}

export default BestPairedWith;
