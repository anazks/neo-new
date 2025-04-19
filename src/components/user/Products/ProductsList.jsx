import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './producsList.css';
import { FaCartPlus, FaSearch, FaSpinner } from "react-icons/fa";
import { getAllProduct } from '../../../Services/Products';
import baseUrl from '../../../Static/Static';
import { useAuth } from '../../../Context/UserContext';
import { addTocart as addToCartService } from '../../../Services/userApi';
import Filter from '../Filter/Filter';
import Sorting from '../Sorting/Sorting';
import Alert from '../Alert/Alert';

function ProductsList() {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const alertTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      {alertData && (
        <Alert 
          type={alertData.type}
          message={alertData.message}
          productId={alertData.productId}
          error={alertData.error}
          onClose={() => setAlertData(null)}
        />
      )}
      <div className="page-header">
        <h1 style={{color:"black"}}>Our Products</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="buttonContainer">
        <button 
          className={`special ${filter ? 'active' : ''}`} 
          onClick={() => {
            setFilter(!filter);
            if (sort) setSort(false);
          }}
        >
          FILTERS
        </button>
        <button 
          className={`special ${sort ? 'active' : ''}`} 
          onClick={() => {
            setSort(!sort);
            if (filter) setFilter(false);
          }}
        >
          SORT
        </button> 
      </div>

      {sort && (
        <div className="section-container">
          <Sorting />
        </div>
      )}
      
      {filter && (
        <div className="section-container">
          <Filter />
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-container">
          <p>No products found. Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="products">
          {filteredProducts.map((product) => (
            <div 
              className="card" 
              key={product.id}
              onClick={() => navigateToDetails(product.id)}
            >
              <div className="image-container">
                <img 
                  src={product.images?.[0]?.image 
                    ? baseUrl + product.images[0].image 
                    : "https://via.placeholder.com/150"
                  } 
                  alt={product.name}
                />
              </div>
              <div className="card-content">
                <h2>{product.name}</h2>
                <p className="price">₹ {product.price?.toLocaleString()}</p>
                <div className="buttons">
                  <button 
                    className="add-to-cart"
                    onClick={(e) => addTocart(product.id, e)}
                    disabled={addingToCart === product.id}
                  >
                    {addingToCart === product.id ? (
                      <><FaSpinner className="spin-icon" /> Adding...</>
                    ) : (
                      <><FaCartPlus /> Add To Cart</>
                    )}
                  </button>
                  <button 
                    className="buy-now"
                    onClick={(e) => handleBuyNow(product, e)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsList;