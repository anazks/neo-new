import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaCartPlus, 
  FaSearch, 
  FaSpinner, 
  FaMoon, 
  FaSun, 
  FaFilter, 
  FaSort,
  FaShoppingCart,
  FaBolt
} from "react-icons/fa";
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Filter from '../Filter/Filter';
import Sorting from '../Sorting/Sorting';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';

function ProductsList() {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const alertTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Apply theme class to body
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    
    return () => {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
    };
  }, [darkMode]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productData = await getAllProduct();
        setProducts(productData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to show alert with automatic timeout
  const showAlert = (data) => {
    // Clear any existing timeout
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    
    // Set the alert data
    setAlertData(data);
    
    // Set timeout to clear the alert after 3 seconds
    alertTimeoutRef.current = setTimeout(() => {
      setAlertData(null);
    }, 3000);
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);
  
  const addTocart = async (id, event) => {
    event.stopPropagation(); // Prevent navigation when clicking add to cart
    try {
      if (!user?.data) {
        // Show login required alert
        showAlert({
          type: "warning",
          message: "Please log in to add items to cart"
        });
        
        // Navigate after a short delay to allow alert to be seen
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      
      setAddingToCart(id);
      let addToCart = await addToCartService(id);
      if (addToCart) {
        // Success notification
        showAlert({
          type: "success",
          message: "Item successfully added to cart",
          productId: id
        });
      }
    } catch (error) {
      console.log(error);
      // Error notification
      showAlert({
        type: "error",
        message: `Failed to add to cart: ${error.message || "Unknown error"}`,
      });
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyNow = (product, event) => {
    event.stopPropagation(); // Prevent navigation
    navigate(`/checkout/${product.id}`);
  };

  const navigateToDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen px-4 py-6 md:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {alertData && (
        <Alert 
          type={alertData.type}
          message={alertData.message}
          productId={alertData.productId}
          error={alertData.error}
          onClose={() => setAlertData(null)}
        />
      )}

      <div className={`max-w-7xl mx-auto`}>
        {/* Header Section */}
        <div className={`mb-8 p-6 md:p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'} backdrop-blur-md transition-all duration-300`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <h1 className="text-center md:text-left text-3xl md:text-4xl font-bold font-[Rajdhani] tracking-wider bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent relative pb-2">
              Our Products
              <span className="absolute bottom-0 left-0 md:left-0 w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transform translate-y-1"></span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full md:w-64 lg:w-80">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-5 pr-10 py-3 rounded-full border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500' : 'bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500'} outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-400/50`}
                />
                <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button 
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full ${filter 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  } shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md font-medium text-sm`}
                  onClick={() => {
                    setFilter(!filter);
                    if (sort) setSort(false);
                  }}
                >
                  <FaFilter className={`${filter ? 'text-white' : darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span>FILTER</span>
                </button>
                
                <button 
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full ${sort 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  } shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md font-medium text-sm`}
                  onClick={() => {
                    setSort(!sort);
                    if (filter) setFilter(false);
                  }}
                >
                  <FaSort className={`${sort ? 'text-white' : darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span>SORT</span>
                </button>
                
                {/* <button 
                  className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm ${darkMode 
                    ? 'bg-gray-700 text-yellow-300 border border-gray-600 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  } transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md`}
                  onClick={toggleDarkMode}
                  aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                  {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-600" />}
                </button> */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        {filter && (
          <div className={`mb-6 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} transition-all duration-300 animate-slideDown`}>
            <Filter />
          </div>
        )}
        
        {/* Sort Section */}
        {sort && (
          <div className={`mb-6 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} transition-all duration-300 animate-slideDown`}>
            <Sorting />
          </div>
        )}

        {/* Products Grid or Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={`text-center py-16 px-4 rounded-xl ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className="text-lg font-medium">No products found. Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => navigateToDetails(product.id)}
                className={`group rounded-xl overflow-hidden shadow-md hover:shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01] cursor-pointer relative`}
              >
                {/* Gradient Border Effect on Hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500 scale-[1.02]"></div>
                
                {/* Image Container */}
                <div className={`relative h-56 p-4 flex items-center justify-center ${darkMode ? 'bg-gray-900/60' : 'bg-gray-50/80'} overflow-hidden group-hover:bg-opacity-100 transition-all duration-500`}>
                  <img 
                    src={product.images?.[0]?.image 
                      ? baseUrl + product.images[0].image 
                      : "https://pnghq.com/wp-content/uploads/pnghq.com-gaming-computer-picture-p-4.png"
                    } 
                    alt={product.name}
                    className="max-h-48 max-w-[85%] object-contain transition-all duration-700 filter drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-100/80 to-transparent dark:from-gray-900/80"></div>
                </div>
                
                {/* Product Content */}
                <div className={`p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col h-64`}>
                  <h2 className={`font-[Rajdhani] text-xl font-semibold mb-4 line-clamp-2 h-14 ${darkMode ? 'text-blue-400 group-hover:text-white' : 'text-blue-600 group-hover:text-gray-800'} transition-colors duration-300`}>
                    {product.name}
                  </h2>
                  
                  <span className={`text-2xl font-bold mb-5 font-[Montserrat] ${darkMode ? 'text-pink-400' : 'text-pink-600'} relative inline-block`}>
                    ₹ {product.price?.toLocaleString()}
                    <span className="absolute bottom-[-6px] left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></span>
                  </span>
                  
                  <div className="mt-auto flex flex-col gap-3">
                    <button 
                      onClick={(e) => addTocart(product.id, e)}
                      disabled={addingToCart === product.id}
                      className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-[Rajdhani] font-semibold tracking-wide transition-all duration-300 ${
                        addingToCart === product.id
                          ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                          : `${darkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'} hover:bg-blue-100 hover:text-blue-700 hover:shadow-md hover:-translate-y-0.5`
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <>
                          <FaSpinner className="animate-spin" /> 
                          <span>ADDING...</span>
                        </>
                      ) : (
                        <>
                          <FaShoppingCart className="text-sm" /> 
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={(e) => handleBuyNow(product, e)}
                      className="w-full py-2.5 rounded-lg text-sm font-[Rajdhani] font-bold tracking-wider text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <FaBolt className="text-sm" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;