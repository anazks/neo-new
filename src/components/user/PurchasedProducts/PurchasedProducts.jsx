import React, { useEffect, useState } from "react";
import { getPurchasedProducts, getDrivers } from "../../../Services/userApi";
import Loader from "../../../Loader/Loader";
import ProductFooter from "../Footer/ProductFooter";
import ModernNavbar from "../NavBar/NavBar";
import "./PurchasedProduct.css";
import { FaSync } from "react-icons/fa";
import { ShoppingBag, ChevronDown, ChevronUp, Download, X } from "lucide-react";
import neoImage from "../../../Images/back_ground1.jpg";
import image_on_tokyo from "../../../Images/image_on_tokyo.jpg";

function PurchasedProducts() {
  const [loader, setLoader] = useState(true);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [error, setError] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [driverModalData, setDriverModalData] = useState({
    title: "",
    drivers: [],
    loading: false
  });

  // Toggle accordion open/closed state
  const toggleAccordion = (productId) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const fetchPurchasedProducts = async () => {
    try {
      setLoader(true);
      let response = await getPurchasedProducts();

      if (response && response.data) {
        setPurchasedProducts(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error.message || "Failed to load products. Please try again later."
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  // Function to get driver details from API
  const handleDriverClick = async (product, driverType) => {
    try {
      setDriverModalData({
        title: `${driverType} for ${product.name}`,
        drivers: [],
        loading: true
      });
      setShowDriverModal(true);
      
      // Make API call to get drivers
      const response = await getDrivers(product.id, driverType);
      
      // Assume response.data contains drivers array
      setDriverModalData(prev => ({
        ...prev,
        drivers: response.data || [],
        loading: false
      }));
    } catch (error) {
      setDriverModalData(prev => ({
        ...prev,
        drivers: [],
        error: "Failed to load drivers. Please try again.",
        loading: false
      }));
    }
  };

  // Function to group attributes by category
  const groupAttributesByCategory = (attributes) => {
    const grouped = {};

    attributes.forEach((attr) => {
      const categoryName = attr.attribute.category.name;
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(attr);
    });

    return grouped;
  };

  // Driver Modal Component
  const DriversModal = () => {
    if (!showDriverModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowDriverModal(false)}
        ></div>
        
        {/* Modal Content */}
        <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 shadow-xl relative z-10 transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{driverModalData.title}</h3>
            <button
              onClick={() => setShowDriverModal(false)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Body */}
          <div className="max-h-96 overflow-y-auto">
            {driverModalData.loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-pink-500"></div>
                <p className="mt-2 text-gray-600">Loading drivers...</p>
              </div>
            ) : driverModalData.error ? (
              <div className="text-center py-8 text-red-500">{driverModalData.error}</div>
            ) : driverModalData.drivers.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No drivers available for this product.
              </div>
            ) : (
              <div className="space-y-4">
                {driverModalData.drivers.map((driver, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{driver.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{driver.description}</p>
                        <span className="text-xs text-gray-500 block mt-2">Version: {driver.version}</span>
                      </div>
                      <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded flex items-center">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowDriverModal(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ModernNavbar />
      <div>
        <div className="main-container">
          <div className="titleContainer"></div>

          {loader ? (
            <Loader />
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gray-50 rounded-lg shadow-sm">
              <div className="text-5xl mb-4 bg-pink-100 p-4 rounded-full">
                ⚠️
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Error loading products
              </h3>
              <p className="text-gray-600 max-w-md mb-6">{error}</p>
              <button 
                onClick={fetchPurchasedProducts}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaSync className={loader ? "animate-spin" : ""} /> Retry
              </button>
            </div>
          ) : purchasedProducts && purchasedProducts.length > 0 ? (
            <div className="w-[80%] max-w-6xl mx-auto px-4">
              <div className="hidden md:block fixed top-[50px] w-[30%] h-[600px] rounded-[10px] overflow-hidden -z-10 right-[100px] bg-gray-100 bg-opacity-10 backdrop-blur-[2px]">
                <img
                  src={image_on_tokyo}
                  alt="Tokyo"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-6">
                Your Purchased Products
              </h2>

              <div className="space-y-6">
                {purchasedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-600 rounded-lg overflow-hidden bg-opacity-50 backdrop-blur-md"
                  >
                    {/* Product Header - Single Line Display */}
                    <div className="flex items-center p-4 p2">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden mr-4">
                        {product.primary_image ? (
                          <img
                            src={product.primary_image.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <span className="text-xs text-gray-500 block">
                              {product.product_code}
                            </span>
                            <p className="text-sm text-gray-700 mt-1">
                              {product.brand_name}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              className="text-pink-600 hover:text-pink-400 flex items-center"
                              onClick={() => toggleAccordion(product.id)}
                            >
                              {openAccordions[product.id]
                                ? "Hide Details"
                                : "Show Details"}
                              {openAccordions[product.id] ? (
                                <ChevronUp className="inline ml-1 w-4 h-4" />
                              ) : (
                                <ChevronDown className="inline ml-1 w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accordion Content with Animation */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        openAccordions[product.id] 
                          ? "max-h-[2000px] opacity-100" 
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div
                        className="relative bg-cover bg-center p-6"
                        style={{
                          backgroundImage: `url(${neoImage})`,
                          backgroundSize: "cover",
                          transform: openAccordions[product.id] ? "translateY(0)" : "translateY(-10px)",
                          transition: "transform 0.5s ease-in-out"
                        }}
                      >
                        {/* Blurred card overlay */}
                        <div className="w-11/12 mx-auto bg-white bg-opacity-50 backdrop-blur-md rounded-lg p-5 shadow-lg">
                          <h4 className="text-lg font-medium mb-2">
                            Product Details & Drivers
                          </h4>

                          {/* Group attributes by category */}
                          {product.attributes && Object.entries(
                            groupAttributesByCategory(product.attributes)
                          ).map(([category, attrs]) => (
                            <div key={category} className="mb-2">
                              <h5 className="font-medium text-gray-800 mb-1">
                                {category}
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {attrs.map((attr) => (
                                  <div
                                    key={attr.id}
                                    className="bg-white bg-opacity-80 p-1 rounded"
                                  >
                                    <span className="block text-sm font-medium">
                                      {attr.attribute.name}
                                    </span>
                                    <div className="text-xs text-gray-700 mt-1">
                                      {attr.details.map((detail, idx) => (
                                        <span key={detail.id} className="block">
                                          {detail.value}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* Driver Downloads Section */}
                          <div className="mt-4 border-t border-gray-300 pt-4">
                            <h5 className="font-medium text-gray-800 mb-2">
                              Downloads & Drivers
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              <button 
                                className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                                onClick={() => handleDriverClick(product, "User Manual")}
                              >
                                <Download className="w-3 h-3 mr-1" /> User
                                Manual
                              </button>
                              <button 
                                className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                                onClick={() => handleDriverClick(product, "Driver Package")}
                              >
                                <Download className="w-3 h-3 mr-1" /> Driver
                                Package
                              </button>
                              <button 
                                className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                                onClick={() => handleDriverClick(product, "Warranty Info")}
                              >
                                <Download className="w-3 h-3 mr-1" /> Warranty
                                Info
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <ShoppingBag className="w-12 h-12 text-pink-500" />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                No purchased products yet
              </h3>

              <p className="text-gray-500 mb-6">
                Discover amazing items to add to your collection
              </p>

              <a
                href="/products"
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center"
              >
                Browse Products
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Driver Modal */}
      <DriversModal />
      
      <ProductFooter />
    </div>
  );
}

export default PurchasedProducts;