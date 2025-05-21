import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import RenderRazorpay from "../RazorPay/RenderRazorpay";
import BaseURL from "../../../Static/Static";
import AddNewAddress from "../Profile/AddNewAddress";
import Overview from "./OverView";

import {
  getMyCart,
  RemoveFromCart,
  cartIncrement,
  cartDecrement,
  CreateOrder,
  getMyDeliveryAddress,
  getMyPrimaryAddress,
} from "../../../Services/userApi";

const CartPage = () => {
  // Cart state
  const [cartItems, setCartItems] = useState({ items: [], id: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Checkout state
  const [showOverview, setShowOverview] = useState(false);
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    amount: 0,
    currency: "INR",
    orderId: null,
    keyId: null,
    razorpayOrderId: null,
  });

  // Address state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressModal, setAddressModal] = useState(false);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Fetch cart data
  const fetchCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getMyCart();
      if (response.data) {
        setCartItems(response.data);
      }
    } catch (error) {
      setError("Failed to load cart. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    try {
      const response = await getMyDeliveryAddress();
      if (response.data?.length > 0) {
        setAddresses(response.data);
        const primary = response.data.find((addr) => addr.is_primary);
        setSelectedAddressId(primary?.id || response.data[0]?.id);
      }
    } catch (error) {
      console.error("Address fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, [fetchCartItems, fetchAddresses]);

  // Handle quantity changes - OPTIMIZED VERSION
  const handleQuantityChange = async (productId, action) => {
    try {
      // Optimistic UI update
      setCartItems((prev) => ({
        ...prev,
        items: prev.items.map((item) => {
          if (item.product === productId) {
            return {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            };
          }
          return item;
        }),
      }));

      // API call
      if (action === "increase") {
        await cartIncrement(productId, cartItems.id);
      } else {
        await cartDecrement(productId, cartItems.id);
      }
    } catch (error) {
      // Revert on error
      setError("Failed to update quantity");
      fetchCartItems();
    }
  };

  // Remove item from cart - OPTIMIZED VERSION
  const handleRemoveItem = async (itemId) => {
    try {
      // Optimistic UI update
      setCartItems((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));

      await RemoveFromCart(itemId);
    } catch (error) {
      setError("Failed to remove item");
      fetchCartItems(); // Revert on error
    }
  };

  // Apply promo code
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "GEEKY2023") {
      setPromoApplied(true);
      setError(null);
    } else {
      setError("Invalid promo code");
    }
    setTimeout(() => setError(null), 3000);
  };

  // Initiate checkout
  const handleCheckout = () => {
    if (!selectedAddressId) {
      setError("Please select delivery address");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setShowOverview(true);
  };

  // Process payment
  const handlePayment = async () => {
    try {
      const order = await CreateOrder(selectedAddressId);
      const { data } = order;

      setOrderDetails({
        razorpayOrderId: data.raz_order_id,
        currency: data.currency,
        amount: data.amount,
        keyId: data.key,
      });

      setDisplayRazorpay(true);
      setShowOverview(false);
    } catch (error) {
      setError("Payment failed. Please try again.");
    }
  };

  // Handle new address added
  const handleAddressAdded = async () => {
    await fetchAddresses();
    setAddressModal(false);
  };

  // Calculate totals
  const subtotal = cartItems.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? 500 : 0;
  const grandTotal = subtotal - discount;
  const isCartEmpty = !cartItems.items?.length;

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative">
      <NavBar />

      {/* Payment Gateway */}
      {displayRazorpay && (
        <RenderRazorpay
          orderDetails={orderDetails}
          setDisplayRazorpay={setDisplayRazorpay}
        />
      )}

      {/* Address Modal */}
      {addressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <AddNewAddress
              onClose={() => setAddressModal(false)}
              fetchAddresses={handleAddressAdded}
            />
          </div>
        </div>
      )}

      {/* Overview Popup */}
      <AnimatePresence>
        {showOverview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 z-50 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-300 transition-colors"
              onClick={() => setShowOverview(false)}
            >
              ×
            </button>

            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Overview
                cartItems={cartItems}
                address={addresses.find((a) => a.id === selectedAddressId)}
                total={grandTotal}
                onBack={() => setShowOverview(false)}
                onConfirm={handlePayment}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Cart Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isLoading && cartItems.items.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : isCartEmpty ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">YOUR CART</h2>

              <div className="space-y-6">
                {cartItems.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                ORDER SUMMARY
              </h2>

              <PromoCodeSection
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoApplied={promoApplied}
                setPromoApplied={setPromoApplied}
                onApply={handleApplyPromo}
              />

              <AddressSection
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelect={setSelectedAddressId}
                onAddNew={() => setAddressModal(true)}
              />

              <OrderTotals
                subtotal={subtotal}
                discount={discount}
                grandTotal={grandTotal}
              />

              <button
                className={`w-full py-3 rounded font-bold mt-6 transition-colors ${
                  !selectedAddressId
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800 text-white"
                }`}
                onClick={handleCheckout}
                disabled={!selectedAddressId}
              >
                PROCEED TO CHECKOUT
              </button>

              {!selectedAddressId && addresses.length > 0 && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Please select a delivery address to continue.
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Sub-components

const EmptyCart = () => (
  <motion.div
    className="text-center py-6 bg-white rounded-lg shadow-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="text-5xl mb-12">🛒</div>
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
);

const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <motion.div
    className="flex flex-col md:flex-row items-center border-b border-gray-200 py-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="relative w-full md:w-72 h-72 mb-6 md:mb-0 flex-shrink-0">
      <img
        src={BaseURL + (item.primary_image?.image || "")}
        alt={item.product_name}
        className="w-full h-full object-contain"
      />
    </div>

    <div className="flex-grow md:ml-8 w-full">
      <div className="mb-4">
        <h3 className="text-md font-medium text-black uppercase">GAMING PC</h3>
        <h2 className="text-lg font-bold text-black uppercase tracking-wide">
          THE {item.product_name}
        </h2>
      </div>

      <div className="mb-6 text-left">
        <span className="text-xl font-bold text-green-600">
          ₹ {item.price.toLocaleString("en-IN")}/-
        </span>
      </div>

      <div className="mb-8">
        <StockStatus stock={item.product_stock} />
      </div>

      <div className="flex flex-wrap items-center space-x-4">
        <button
          className="flex items-center space-x-2 text-gray-600"
          onClick={() => onRemove(item.id)}
        >
          <TrashIcon />
          <span>REMOVE</span>
        </button>

        <QuantityControls
          quantity={item.quantity}
          onIncrease={() => onQuantityChange(item.product, "increase")}
          onDecrease={() => onQuantityChange(item.product, "decrease")}
        />
      </div>
    </div>
  </motion.div>
);

const StockStatus = ({ stock }) => (
  <div
    className="inline-flex items-center px-5 py-2 rounded-md"
    style={{
      backgroundColor:
        stock >= 1 ? "rgba(99, 163, 117, 0.1)" : "rgba(255, 0, 0, 0.05)",
    }}
  >
    <span style={{ color: stock >= 1 ? "#63A375" : "red" }}>
      {stock >= 1 ? "In Stock" : "Out of Stock"}
    </span>
  </div>
);

const QuantityControls = ({ quantity, onIncrease, onDecrease }) => (
  <div className="flex items-center border border-gray-300 rounded">
    <button
      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      onClick={onDecrease}
      disabled={quantity <= 1}
    >
      <span className="text-xl">−</span>
    </button>
    <span className="w-6 h-6 text-center border-x border-gray-300">
      {quantity}
    </span>
    <button
      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50"
      onClick={onIncrease}
    >
      <span className="text-xl">+</span>
    </button>
  </div>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const PromoCodeSection = ({
  promoCode,
  setPromoCode,
  promoApplied,
  setPromoApplied,
  onApply,
}) => (
  <div className="border-dashed border-2 rounded-lg p-4 mb-6 bg-green-50 border-green-300">
    <p className="text-center font-medium mb-2 text-green-700">
      HAVE A PROMO CODE?
    </p>

    {promoApplied ? (
      <div className="bg-white rounded p-2 flex justify-between items-center">
        <span className="text-sm font-medium">GEEKY2023</span>
        <button
          className="text-xs text-gray-500"
          onClick={() => setPromoApplied(false)}
        >
          REMOVE
        </button>
      </div>
    ) : (
      <div className="flex">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          className="flex-grow rounded-l border border-gray-300 px-3 py-2 focus:outline-none"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-r"
          onClick={onApply}
          disabled={!promoCode}
        >
          APPLY
        </button>
      </div>
    )}
  </div>
);

const AddressSection = ({
  addresses,
  selectedAddressId,
  onSelect,
  onAddNew,
}) => (
  <div className="mb-4">
    <h3 className="text-lg font-medium mb-2">Delivery Address</h3>

    {addresses.length > 0 ? (
      <>
        <div className="space-y-2">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isSelected={selectedAddressId === addr.id}
              onSelect={() => onSelect(addr.id)}
            />
          ))}
        </div>
        <button
          className="mt-2 text-sm font-medium text-green-700 hover:underline"
          onClick={onAddNew}
        >
          + Add New Address
        </button>
      </>
    ) : (
      <button
        className="w-full py-2 text-sm font-medium text-green-700 hover:underline"
        onClick={onAddNew}
      >
        + Add Your First Address
      </button>
    )}
  </div>
);

const AddressCard = ({ address, isSelected, onSelect }) => (
  <div
    className={`border p-3 rounded-md cursor-pointer transition-colors ${
      isSelected
        ? "border-green-500 bg-green-50"
        : "border-gray-200 hover:bg-gray-50"
    }`}
    onClick={onSelect}
  >
    <div className="flex justify-between">
      <h4 className="font-medium">{address.delivery_person_name}</h4>
      {address.is_primary && (
        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
          Primary
        </span>
      )}
    </div>
    <p className="text-sm text-gray-600">{address.phone_number}</p>
    <p className="text-sm text-gray-600">
      {address.address}, {address.district}, {address.state}, {address.country}{" "}
      - {address.zip_code}
    </p>
  </div>
);

const OrderTotals = ({ subtotal, discount, grandTotal }) => (
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-gray-700">DISCOUNT</span>
      <span className="text-gray-700">₹ {discount}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-700">SUB TOTAL</span>
      <span className="text-gray-700">
        ₹ {subtotal.toLocaleString("en-IN")}
      </span>
    </div>

    <div className="flex justify-between pt-3 border-t border-gray-200">
      <span className="font-bold text-black">GRAND TOTAL</span>
      <span className="font-bold text-black">
        ₹ {grandTotal.toLocaleString("en-IN")}
      </span>
    </div>
  </div>
);

export default CartPage;
