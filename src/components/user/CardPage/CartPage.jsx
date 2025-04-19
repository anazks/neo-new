import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./cartpage.css";
import "@fontsource/rajdhani";
import "@fontsource/rajdhani/700.css";
import { getMyCart, RemoveFromCart, cartIncrement, cartDecrement, CreateOrder, AddDelievryAddress, getMyDeliveryAddress ,getMyPrimaryAddress} from "../../../Services/userApi";
import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom"; // Assuming you're using React Router
import BaseURL from "../../../Static/Static";
import Axios from '../../../Axios/Axios'
import RazorPay from "../RazorPay/RazorPay";
import RenderRazorpay from "../RazorPay/RenderRazorpay";
import PaymentDone from "../PaymentDone/PaymentDone";
import TestDone from "../PaymentDone/TestDone";

const CartPage = () => {
  const [cartItems, setCartItems] = useState({ items: [], id: null });
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState(null);
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    amount: 0,
    currency: "INR",
    orderId: null,
    keyId: null,
    razorpayOrderId: null,
  });
  
  // Address related states
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    delivery_person_name: "",
    phone_number: "",
    district: "",
    state: "",
    country: "",
    zip_code: "",
    address: "",
    is_primary: false,
  });

  const handleCreateOrder = async () => {
      try {
        let getPrimaryAddress = await  getMyPrimaryAddress()
        console.log(selectedAddressId,"get prim--")
          let order = await CreateOrder(selectedAddressId)
          console.log(order,"order--")
          let newData = order.data
          console.log(newData,"order data--")
          setOrderDetails({
            razorpayOrderId: newData.raz_order_id,
            currency: newData.currency,
            amount: newData.amount,
            keyId: newData.key,
          })
          console.log(orderDetails,"order details--")
          setDisplayRazorpay(true);
  //         if(data){
  //           setOrderDetails({
  //             orderId: data.raz_order_id,
  //             currency: data.currency,
  //             amount: data.amount,
  //           });
  //           console.log(orderDetails,"order details--")
  //           setDisplayRazorpay(true);   
  // }
} catch (error) {
        
  }
  }
  const fetchCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getMyCart();
      if (response.data) {
        setCartItems(response.data);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load your cart. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await getMyDeliveryAddress();
      console.log("Fetched addresses:", response);
      
      // If we have real addresses from the API, use them
      if (response && response.data && Array.isArray(response.data)) {
        setAddresses(response.data);
        // Set primary address as selected by default
        const primaryAddress = response.data.find(addr => addr.is_primary);
        if (primaryAddress) {
          setSelectedAddressId(primaryAddress.id);
        } else if (response.data.length > 0) {
          // If no primary address, select the first one
          setSelectedAddressId(response.data[0].id);
        }
        return;
      }
      
      // Fallback to mock data if API doesn't return expected data
      const mockAddresses = [
        {
          id: 1,
          delivery_person_name: "John Doe",
          phone_number: "9876543210",
          district: "Central District",
          state: "Karnataka",
          country: "India",
          zip_code: "560001",
          address: "123, Main Street, Bangalore",
          is_primary: true
        }
      ];
      
      setAddresses(mockAddresses);
      // Set primary address as selected by default
      const primaryAddress = mockAddresses.find(addr => addr.is_primary);
      if (primaryAddress) {
        setSelectedAddressId(primaryAddress.id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
    fetchAddresses(); // Consolidated address fetching into one function
  }, [fetchCartItems, fetchAddresses]);

  const handleQuantityChange = async (productId, action) => {
    try {
      setIsLoading(true);
      const cartId = cartItems.id;
      
      if (!cartId || !productId) {
        throw new Error("Missing cart or product information");
      }
      
      if (action === 'increase') {
        await cartIncrement(productId, cartId);
      } else if (action === 'decrease') {
        await cartDecrement(productId, cartId);
      }
      
      await fetchCartItems(); // Refresh cart data after update
    } catch (error) {
      console.error(`Error ${action}ing quantity:`, error);
      setError(`Unable to update quantity. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setIsLoading(true);
      await RemoveFromCart(itemId);
      await fetchCartItems(); // Refresh cart data after removal
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "GEEKY2023") {
      setPromoApplied(true);
    } else {
      setError("Invalid promo code");
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Create a copy of the address object (without any id field)
      const addressToAdd = {
        delivery_person_name: newAddress.delivery_person_name,
        phone_number: newAddress.phone_number,
        district: newAddress.district,
        state: newAddress.state,
        country: newAddress.country,
        zip_code: newAddress.zip_code,
        address: newAddress.address,
        is_primary: newAddress.is_primary,
      };
      
      // Send address to the API
      const response = await AddDelievryAddress(addressToAdd);
      
      // If API call successful
      if (response && response.data) {
        // Add new address to state with the ID from response
        const addedAddress = { 
          ...addressToAdd,
          id: response.data.id || Date.now() // Use API-provided ID or fallback to timestamp
        };
        
        // If this is marked as primary or it's the first address
        if (addedAddress.is_primary || addresses.length === 0) {
          // Update existing addresses to not be primary if the new one is
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            is_primary: false
          }));
          
          setAddresses([...updatedAddresses, addedAddress]);
        } else {
          setAddresses([...addresses, addedAddress]);
        }
        
        // Select the new address
        setSelectedAddressId(addedAddress.id);
        
        // Close form and reset fields
        setShowAddressForm(false);
        setNewAddress({
          delivery_person_name: "",
          phone_number: "",
          district: "",
          state: "",
          country: "",
          zip_code: "",
          address: "",
          is_primary: false,
        });
        
        // Fetch addresses again to ensure we have updated data
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error adding address:", error);
      setError("Failed to add address. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSubtotal = () => {
    if (!cartItems || !cartItems.items || !cartItems.items.length) return 0;
    
    return cartItems.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Memoize calculations to prevent unnecessary re-calculations
  const subtotal = calculateSubtotal();
  const discount = promoApplied ? 500 : 0;
  const shipping = subtotal > 0 ? 1200 : 0;
  const grandTotal = subtotal - discount + shipping;

  const isCartEmpty = !cartItems?.items || cartItems.items.length === 0;

  // Animation variants for consistent animations
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="cart-container">
      
      {displayRazorpay && (
        <RenderRazorpay
           orderDetails={orderDetails}
           setDisplayRazorpay={setDisplayRazorpay}
        />
      )}
      
      <NavBar />
      <div className="cart-content" style={{ marginTop: "120px" }}>
        {isLoading ? (
          <div className="loading-container">
            <motion.div 
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p>Loading your cart...</p>
          </div>
        ) : error ? (
          <motion.div 
            className="error-container"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            <p className="error-message">{error}</p>
            <motion.button 
              className="retry-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                fetchCartItems();
                fetchAddresses();
              }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Cart Items */}
            <motion.div 
              className="cart-items"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="section-title"
                {...fadeIn}
                transition={{ delay: 0.2 }}
              >
                Your Cart
              </motion.h2>

              {isCartEmpty ? (
                <motion.div 
                  className="empty-cart"
                  {...fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <div className="empty-cart-icon">🛒</div>
                  <p>Your cart is empty</p>
                  <Link to="/shop">
                    <motion.button 
                      className="continue-shopping"
                      whileHover={{ scale: 1.05, backgroundColor: "#ff4081" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {cartItems.items.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="cart-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(255, 64, 129, 0.05)" }}
                    >
                      <div className="item-image-container">
                        <img
                          src={BaseURL + (item.primary_image ? item.primary_image.image : '')}
                          alt={item.product_name || "Product"}
                          className="item-image"
                          loading="lazy" // Lazy load images for better performance
                          onError={(e) => {e.target.src = "/path/to/placeholder.jpg"}} // Fallback image
                        />
                      </div>
                      <div className="item-info">
                        <p className="item-type">{item.type}</p>
                        <p className="item-name">{item.product_name}</p>
                        <p className={`item-status ${item.status === "In Stock" ? "in-stock" : "out-of-stock"}`}>
                          <span className={`status-dot ${item.status === "In Stock" ? "in-stock-dot" : "out-of-stock-dot"}`}></span>
                          {item.status === "In Stock" ? "In Stock" : "Out of Stock"}
                        </p>
                        <div className="item-actions">
                          <motion.button 
                            onClick={() => handleRemoveItem(item.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                          >
                            Remove
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Save for Later
                          </motion.button>
                        </div>
                      </div>
                      <div className="item-price">
                        ₹ {item.price.toLocaleString("en-IN")}/-
                      </div>
                      <div className="item-quantity">
                        <div className="quantity-control">
                          <motion.button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.product, 'decrease')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            -
                          </motion.button>
                          <input 
                            type="text" 
                            value={item.quantity} 
                            readOnly
                            className="quantity-input"
                            aria-label="Item quantity"
                          />
                          <motion.button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.product, 'increase')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={isLoading}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>

            {/* Order Summary */}
            {!isCartEmpty && (
              <motion.div 
                className="order-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h1 
                  {...fadeIn}
                  transition={{ delay: 0.6 }}
                >
                  ORDER SUMMARY
                </motion.h1>
                
                <AnimatePresence>
                  {promoApplied ? (
                    <motion.p 
                      className="promo-success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Promo code applied successfully!
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="sub-title"
                      {...fadeIn}
                      transition={{ delay: 0.7 }}
                    >
                      COMPLETE YOUR ORDER
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* Delivery Address Section */}
                <motion.div 
                  className="delivery-address-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="address-title">Delivery Address</h2>
                  
                  {/* Address Cards */}
                  <div className="address-cards">
                    <AnimatePresence>
                      {addresses.map((addr) => (
                        <motion.div 
                          key={addr.id}
                          className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <div className="address-card-header">
                            <h3>{addr.delivery_person_name}</h3>
                            {addr.is_primary && <span className="primary-badge">Primary</span>}
                          </div>
                          <p className="address-phone">{addr.phone_number}</p>
                          <p className="address-full">{addr.address}</p>
                          <p className="address-location">
                            {addr.district}, {addr.state}, {addr.country} - {addr.zip_code}
                          </p>
                          <div className="address-actions">
                            <motion.button
                              className="edit-address-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              className="remove-address-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Remove
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Add Address Button */}
                    <motion.button
                      className="add-address-btn"
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      whileHover={{ scale: 1.05, backgroundColor: "#444" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showAddressForm ? 'Cancel' : '+ Add New Address'}
                    </motion.button>
                  </div>
                  
                  {/* Address Form */}
                  <AnimatePresence>
                    {showAddressForm && (
                      <motion.form
                        className="address-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleAddAddress}
                      >
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="delivery_person_name">Full Name *</label>
                            <input
                              type="text"
                              id="delivery_person_name"
                              name="delivery_person_name"
                              value={newAddress.delivery_person_name}
                              onChange={handleInputChange}
                              required
                              maxLength={255}
                              minLength={1}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone_number">Phone Number *</label>
                            <input
                              type="text"
                              id="phone_number"
                              name="phone_number"
                              value={newAddress.phone_number}
                              onChange={handleInputChange}
                              required
                              maxLength={20}
                              minLength={1}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group full-width">
                          <label htmlFor="address">Address *</label>
                          <textarea
                            id="address"
                            name="address"
                            value={newAddress.address}
                            onChange={handleInputChange}
                            required
                            minLength={1}
                            rows={3}
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="district">District *</label>
                            <input
                              type="text"
                              id="district"
                              name="district"
                              value={newAddress.district}
                              onChange={handleInputChange}
                              required
                              maxLength={20}
                              minLength={1}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="state">State *</label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={newAddress.state}
                              onChange={handleInputChange}
                              required
                              maxLength={20}
                              minLength={1}
                            />
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="country">Country *</label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={newAddress.country}
                              onChange={handleInputChange}
                              required
                              maxLength={20}
                              minLength={1}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="zip_code">Zip Code *</label>
                            <input
                              type="text"
                              id="zip_code"
                              name="zip_code"
                              value={newAddress.zip_code}
                              onChange={handleInputChange}
                              required
                              maxLength={10}
                              minLength={1}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <input
                            type="checkbox"
                            id="is_primary"
                            name="is_primary"
                            checked={newAddress.is_primary}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="is_primary">Set as primary address</label>
                        </div>
                        
                        <div className="form-actions">
                          <motion.button
                            type="submit"
                            className="save-address-btn"
                            whileHover={{ scale: 1.05, backgroundColor: "#ff4081" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Save Address
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="promo-code">
                  <p>Have a Promo Code?</p>
                  <div className="promo-input-container">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="promo-input"
                      disabled={promoApplied || isLoading}
                    />
                    <motion.button 
                      className="apply-promo-btn"
                      onClick={handleApplyPromo}
                      whileHover={{ scale: 1.05, backgroundColor: "#444" }}
                      whileTap={{ scale: 0.95 }}
                      disabled={promoApplied || !promoCode || isLoading}
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>
                
                <motion.div 
                  className="summary-details"
                  {...fadeIn}
                  transition={{ delay: 0.8 }}
                >
                  <p>
                    Sub Total <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                  </p>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="discount-row"
                    >
                      Discount <span>- ₹ {discount.toLocaleString("en-IN")}</span>
                    </motion.p>
                  )}
                  <p>
                    Shipping <span>₹ {shipping.toLocaleString("en-IN")}</span>
                  </p>
                </motion.div>
                
                <motion.div
                  className="grand-total-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="grand-total">
                    GRAND TOTAL <span>₹ {cartItems.total_price ? cartItems.total_price.toLocaleString("en-IN") : grandTotal.toLocaleString("en-IN")}</span>
                  </p>
                </motion.div>
                
                <motion.button 
                  onClick={() => handleCreateOrder(cartItems.total_price || grandTotal, 'INR')}
                  className="checkout-button"
                  whileHover={{ scale: 1.05, backgroundColor: "#ff4081" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  disabled={isLoading || (addresses.length > 0 && !selectedAddressId)}
                >
                  PROCEED TO CHECKOUT
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;