import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import Loader from '../Loader/Loader';
import RenderRazorpay from "../RazorPay/RenderRazorpay";
import BaseURL from "../../../Static/Static";
import { 
  getMyCart, 
  RemoveFromCart, 
  cartIncrement, 
  cartDecrement, 
  CreateOrder, 
  AddDelievryAddress, 
  getMyDeliveryAddress,
  getMyPrimaryAddress 
} from "../../../Services/userApi";

// Using the Rajadhanai color scheme with #63A375 (green) and black
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
      let getPrimaryAddress = await getMyPrimaryAddress();
      console.log(getPrimaryAddress, "primary address")
      let order = await CreateOrder(selectedAddressId);
      let newData = order.data;
      
      setOrderDetails({
        razorpayOrderId: newData.raz_order_id,
        currency: newData.currency,
        amount: newData.amount,
        keyId: newData.key,
      });
      
      setDisplayRazorpay(true);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

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
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
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
      
      await fetchCartItems();
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
      await fetchCartItems();
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
      setTimeout(() => setError(null), 3000);
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
      
      const response = await AddDelievryAddress(addressToAdd);
      
      if (response && response.data) {
        await fetchAddresses();
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

  // Calculations
  const subtotal = calculateSubtotal();
  const discount = promoApplied ? 500 : 0;
  const shipping = subtotal > 0 ? 1200 : 0;
  const grandTotal = subtotal - discount + shipping;

  const isCartEmpty = !cartItems?.items || cartItems.items.length === 0;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {displayRazorpay && (
        <RenderRazorpay
          orderDetails={orderDetails}
          setDisplayRazorpay={setDisplayRazorpay}
        />
      )}
      
      <NavBar />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-12 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <motion.button 
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <motion.div 
              className="lg:w-2/3 bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-black mb-6">YOUR CART</h2>

              {isCartEmpty ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                  <Link to="/products">
                    <motion.button 
                      className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {cartItems.items.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row border-b border-gray-200 pb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="sm:w-32 sm:h-32 mb-4 sm:mb-0 flex-shrink-0">
                          <img
                            src={BaseURL + (item.primary_image ? item.primary_image.image : '')}
                            alt={item.product_name || "Product"}
                            className="w-full h-full object-cover rounded-md"
                            loading="lazy"
                            onError={(e) => {e.target.src = "/path/to/placeholder.jpg"}}
                          />
                        </div>
                        
                        <div className="flex-grow sm:ml-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <p className="text-sm text-gray-500">{item.type}</p>
                              <p className="text-lg font-medium text-black">{item.product_name}</p>
                              <div className="flex items-center mt-1">
                                <span 
                                  className="inline-block w-2 h-2 rounded-full mr-1" 
                                  style={{backgroundColor: item.status === "In Stock" ? "#63A375" : "red"}}
                                ></span>
                                <span 
                                  className="text-xs" 
                                  style={{color: item.status === "In Stock" ? "#63A375" : "red"}}
                                >
                                  {item.status === "In Stock" ? "In Stock" : "Out of Stock"}
                                </span>
                              </div>
                              
                              <div className="mt-4 space-x-2">
                                <motion.button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-sm text-gray-500 hover:text-black flex items-center"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  disabled={isLoading}
                                >
                                  <span className="mr-1">○</span> REMOVE
                                </motion.button>
                                <motion.button 
                                  className="text-sm text-gray-500 hover:text-black flex items-center"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <span className="mr-1">○</span> SAVE FOR LATER
                                </motion.button>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex sm:flex-col sm:items-end justify-between">
                              <div className="text-lg font-bold text-black">
                                ₹ {item.price.toLocaleString("en-IN")}/-
                              </div>
                              
                              <div className="flex items-center border border-gray-300 rounded-md mt-2">
                                <motion.button 
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleQuantityChange(item.product, 'decrease')}
                                  whileHover={{ backgroundColor: "#f3f4f6" }}
                                  whileTap={{ scale: 0.95 }}
                                  disabled={isLoading || item.quantity <= 1}
                                >
                                  -
                                </motion.button>
                                <input 
                                  type="text" 
                                  value={item.quantity} 
                                  readOnly
                                  className="w-12 text-center border-none focus:outline-none"
                                  aria-label="Item quantity"
                                />
                                <motion.button 
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleQuantityChange(item.product, 'increase')}
                                  whileHover={{ backgroundColor: "#f3f4f6" }}
                                  whileTap={{ scale: 0.95 }}
                                  disabled={isLoading}
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Order Summary Section */}
            {!isCartEmpty && (
              <motion.div 
                className="lg:w-1/3 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-black mb-2">ORDER SUMMARY</h2>
                
                {/* Promo Code Section */}
                <div 
                  className="border-dashed border-2 rounded-lg p-4 mb-6" 
                  style={{backgroundColor: "rgba(99, 163, 117, 0.2)", borderColor: "#63A375"}}
                >
                  <p className="text-center font-medium mb-2" style={{color: "#63A375"}}>HAVE A PROMO CODE?</p>
                  
                  <AnimatePresence>
                    {promoApplied ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-white rounded p-2 flex justify-between items-center">
                          <span className="text-sm font-medium">GEEKY2023</span>
                          <button 
                            className="text-xs text-gray-500"
                            onClick={() => setPromoApplied(false)}
                          >
                            REMOVE
                          </button>
                        </div>
                        <p className="text-sm mt-2 text-center" style={{color: "#63A375"}}>Hurray! You've got a discount</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <input 
                          type="text" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-grow rounded-l border border-gray-300 px-3 py-2 focus:outline-none"
                        />
                        <motion.button 
                          className="bg-black text-white px-4 py-2 rounded-r"
                          onClick={handleApplyPromo}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!promoCode}
                        >
                          APPLY
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Address Section */}
                {addresses.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Delivery Address</h3>
                    <div className="space-y-2">
                      {addresses.map(addr => (
                        <motion.div
                          key={addr.id}
                          className={`border p-3 rounded-md cursor-pointer ${selectedAddressId === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                          style={selectedAddressId === addr.id ? {borderColor: "#63A375", backgroundColor: "rgba(99, 163, 117, 0.1)"} : {}}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">{addr.delivery_person_name}</h4>
                            {addr.is_primary && (
                              <span className="text-xs px-2 py-1 rounded" style={{backgroundColor: "rgba(99, 163, 117, 0.2)", color: "#63A375"}}>Primary</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{addr.phone_number}</p>
                          <p className="text-sm text-gray-600">{addr.address}, {addr.district}, {addr.state}, {addr.country} - {addr.zip_code}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      className="mt-2 text-sm font-medium"
                      style={{color: "#63A375"}}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddressForm(!showAddressForm)}
                    >
                      {showAddressForm ? 'Cancel' : '+ Add New Address'}
                    </motion.button>
                  </div>
                )}
                
                {/* Address Form */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.form
                      className="mb-4 border border-gray-200 rounded-md p-4"
                      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddAddress}
                    >
                      {/* Form fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="delivery_person_name"
                            value={newAddress.delivery_person_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">Phone</label>
                          <input
                            type="text"
                            name="phone_number"
                            value={newAddress.phone_number}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm text-gray-600 mb-1">Address</label>
                          <textarea
                            name="address"
                            value={newAddress.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="2"
                            required
                          ></textarea>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">District</label>
                          <input
                            type="text"
                            name="district"
                            value={newAddress.district}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">State</label>
                          <input
                            type="text"
                            name="state"
                            value={newAddress.state}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={newAddress.country}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                          <input
                            type="text"
                            name="zip_code"
                            value={newAddress.zip_code}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="col-span-2 flex items-center mt-1">
                          <input
                            type="checkbox"
                            id="is_primary"
                            name="is_primary"
                            checked={newAddress.is_primary}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <label htmlFor="is_primary" className="text-sm text-gray-700">Set as primary address</label>
                        </div>
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full mt-3 bg-black text-white p-2 rounded"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Save Address
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">DISCOUNT</span>
                    <span className="text-gray-700 font-medium">₹ {discount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700">SUB TOTAL</span>
                    <span className="text-gray-700 font-medium">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700">SHIPPING</span>
                    <span className="text-gray-700 font-medium">₹ {shipping}</span>
                  </div>
                  
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-bold text-black">GRAND TOTAL</span>
                    <span className="font-bold text-black">₹ {(cartItems.total_price || grandTotal).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <motion.button 
                  className="w-full bg-black text-white py-3 rounded font-bold mt-6 hover:bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateOrder}
                  disabled={isLoading || !selectedAddressId}
                >
                  PROCEED TO CHECKOUT
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;