import React, { useEffect, useState } from 'react';
import { ShoppingBag, MapPin, CreditCard, Check, ChevronRight, PlusCircle, X } from 'lucide-react';
import { AddDelievryAddress, getMyDeliveryAddress, getMyCart, getMyPrimaryAddress, CreateOrder } from '../../../Services/userApi';
import BaseURL from '../../../Static/Static';
import RenderRazorpay from '../RazorPay/RenderRazorpay';

function Overview() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState({ items: [], total_price: 0 });
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});
    
    const [newAddress, setNewAddress] = useState({
        delivery_person_name: "",
        phone_number: "",
        district: "",
        state: "",
        country: "",
        zip_code: "",
        address: "",
        is_primary: false,
        errors: {}
    });

    // Calculate order totals
    const subtotal = orders.total_price || 0;
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

    // Fetch addresses on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await getMyDeliveryAddress();
                setAddresses(response.data);
                if (response.data.length > 0) {
                    const primaryAddress = response.data.find(addr => addr.is_primary) || response.data[0];
                    setSelectedAddressId(primaryAddress.id);
                }
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch addresses');
                setLoading(false);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await getMyCart();
                console.log(response.data, "orders");
                setOrders(response.data || { items: [], total_price: 0 });
            } catch (err) {
                console.error(err);
                alert("Error fetching orders");
            }
        }

        fetchOrders();
        fetchAddresses();
    }, []);

    const handleAddressSelect = (id) => {
        setSelectedAddressId(id);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: type === 'checkbox' ? checked : value,
            errors: {
                ...newAddress.errors,
                [name]: undefined // Clear error when user types
            }
        });
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Delivery Person Name validation
        if (!newAddress.delivery_person_name.trim()) {
            errors.delivery_person_name = 'Name is required';
            isValid = false;
        }

        // Phone Number validation
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!newAddress.phone_number.trim()) {
            errors.phone_number = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(newAddress.phone_number)) {
            errors.phone_number = 'Enter a valid phone number (10-15 digits)';
            isValid = false;
        }

        // Address validation
        if (!newAddress.address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        } else if (newAddress.address.trim().length < 10) {
            errors.address = 'Address should be at least 10 characters';
            isValid = false;
        }

        // District validation
        if (!newAddress.district.trim()) {
            errors.district = 'District is required';
            isValid = false;
        }

        // State validation
        if (!newAddress.state.trim()) {
            errors.state = 'State is required';
            isValid = false;
        }

        // Country validation
        if (!newAddress.country.trim()) {
            errors.country = 'Country is required';
            isValid = false;
        }

        // Zip Code validation
        const zipRegex = /^[0-9]{5,10}$/;
        if (!newAddress.zip_code.trim()) {
            errors.zip_code = 'Zip code is required';
            isValid = false;
        } else if (!zipRegex.test(newAddress.zip_code)) {
            errors.zip_code = 'Enter a valid zip code (5-10 digits)';
            isValid = false;
        }

        setNewAddress(prev => ({
            ...prev,
            errors
        }));

        return isValid;
    };

    const handleAddNewAddress = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            // Create a copy of newAddress without the errors property
            const { errors, ...addressData } = newAddress;
            const response = await AddDelievryAddress(addressData);
            const newAddressObj = response.data;
            
            // Update addresses list
            let updatedAddresses = [...addresses];
            if (newAddressObj.is_primary) {
                updatedAddresses = updatedAddresses.map(addr => ({
                    ...addr,
                    is_primary: false
                }));
            }
            
            setAddresses([...updatedAddresses, newAddressObj]);
            setSelectedAddressId(newAddressObj.id);
            
            // Reset form
            setNewAddress({
                delivery_person_name: "",
                phone_number: "",
                district: "",
                state: "",
                country: "",
                zip_code: "",
                address: "",
                is_primary: false,
                errors: {}
            });
            
            setShowAddressModal(false);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add address');
            setLoading(false);
        }
    };

    const handleCreateOrder = async () => {
        try {
            let getPrimaryAddress = await getMyPrimaryAddress();
            console.log(getPrimaryAddress, "primary address");
            let order = await CreateOrder(selectedAddressId);
            let newData = order;
            console.log(newData, "order data");
            
            setOrderDetails(newData);
            setDisplayRazorpay(true);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    if (loading && addresses.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <>
            {displayRazorpay && orderDetails && (
                <RenderRazorpay
                    orderDetails={orderDetails}
                    setDisplayRazorpay={setDisplayRazorpay}
                />
            )}
            <div className="max-w-6xl mx-auto p-6 bg-white">
                <div className="mb-8">
                    <br />
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Address and Items */}
                    <div className="flex-1">
                        {/* Address Section */}
                        <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <MapPin className="text-blue-600 mr-2" size={20} />
                                    <h2 className="text-lg font-medium text-gray-800">Shipping Address</h2>
                                </div>
                                <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                                    onClick={() => setShowAddressModal(true)}
                                    disabled={loading}
                                >
                                    <PlusCircle size={16} className="mr-1" /> Add New Address
                                </button>
                            </div>
                            
                            {addresses.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No addresses found</p>
                                    <button
                                        onClick={() => setShowAddressModal(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add Your First Address
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map(address => (
                                        <div 
                                            key={address.id} 
                                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                                                selectedAddressId === address.id 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                            onClick={() => handleAddressSelect(address.id)}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <div className="font-medium text-gray-800">{address.delivery_person_name}</div>
                                                {address.is_primary && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Primary</span>
                                                )}
                                            </div>
                                            <div className="text-gray-600 text-sm space-y-1">
                                                <p>{address.address}</p>
                                                <p>{address.district}</p>
                                                <p>{address.state} {address.zip_code}</p>
                                                <p>{address.country}</p>
                                                <p className="pt-1">{address.phone_number}</p>
                                            </div>
                                            <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                                                    Edit
                                                </button>
                                                {selectedAddressId === address.id && (
                                                    <div className="flex items-center text-green-600 text-sm">
                                                        <Check size={16} className="mr-1" /> Selected
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Orders Section */}
                        <div className="mb-8 bg-gray-50 rounded-lg p-6 shadow-sm">
                            <div className="flex items-center mb-4">
                                <ShoppingBag className="text-blue-600 mr-2" size={20} />
                                <h2 className="text-lg font-medium text-gray-800">Selected Items</h2>
                            </div>
                            
                            <div className="divide-y divide-gray-200">
                                {orders.items && orders.items.length > 0 ? (
                                    orders.items.map(item => (
                                        <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between">
                                            <div className="flex items-center mb-2 sm:mb-0">
                                                <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-4 overflow-hidden">
                                                    {item.primary_image && item.primary_image.length > 0 ? (
                                                        <img src={BaseURL + item.primary_image[0].image} alt={item.name} className="object-cover" />
                                                    ) : (
                                                        <ShoppingBag size={24} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{item.product_name}</h3>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:w-1/4">
                                                <span className="font-medium text-gray-900 sm:hidden">Price:</span>
                                                <span className="font-medium">INR. <span></span> {item.price || 0}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-gray-500">
                                        No items in your cart
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column - Summary and Payment */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-6">
                            {/* Order Summary */}
                            <div className="mb-6 bg-gray-50 rounded-lg p-6 shadow-sm">
                                <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal ({orders.items?.length || 0} items)</span>
                                        <span className="font-medium">INR.<span></span>{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Coupon Discount</span>
                                        <span className="font-medium">INR. <span></span>{orders.coupon_discount}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between text-base font-medium">
                                            <span className="text-gray-900">Order Total</span>
                                            <span className="text-blue-600">INR. <span></span>{orders.total_price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Payment Button */}
                            <button 
                                onClick={handleCreateOrder}
                                className={`w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 shadow-sm ${
                                    !selectedAddressId || orders.items?.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                }`}
                                disabled={!selectedAddressId || orders.items?.length === 0 || loading}
                            >
                                {loading ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>Proceed to Payment</span>
                                        <ChevronRight size={20} className="ml-2" />
                                    </>
                                )}
                            </button>
                            
                            <p className="text-xs text-center text-gray-500 mt-4">
                                By proceeding, you agree to our Terms of Service and Privacy Policy
                            </p>
                            
                            {/* Order Status Indicators */}
                            <div className="mt-8 flex justify-between items-center">
                                {['Cart', 'Shipping', 'Review', 'Payment'].map((step, index) => (
                                    <React.Fragment key={step}>
                                        <div className="flex flex-col items-center flex-1">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                index < 3 ? 'bg-blue-600' : 'bg-gray-200'
                                            }`}>
                                                {index < 3 ? (
                                                    <Check size={16} className="text-white" />
                                                ) : (
                                                    <CreditCard size={16} className="text-gray-500" />
                                                )}
                                            </div>
                                            <span className="text-xs mt-1 text-gray-600">{step}</span>
                                        </div>
                                        {index < 3 && <div className="h-1 w-4 bg-blue-200"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Add Address Modal */}
                {showAddressModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h3 className="text-lg font-medium text-gray-900">Add New Address</h3>
                                <button 
                                    onClick={() => {
                                        setShowAddressModal(false);
                                        setNewAddress(prev => ({
                                            ...prev,
                                            errors: {}
                                        }));
                                    }}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                    disabled={loading}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleAddNewAddress} className="p-6 space-y-4" noValidate>
                                {/* Delivery Person Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Delivery Person Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="delivery_person_name"
                                        value={newAddress.delivery_person_name}
                                        onChange={handleInputChange}
                                        onBlur={() => validateForm()}
                                        className={`w-full border ${newAddress.errors?.delivery_person_name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Full name"
                                        required
                                        disabled={loading}
                                    />
                                    {newAddress.errors?.delivery_person_name && (
                                        <p className="mt-1 text-sm text-red-600">{newAddress.errors.delivery_person_name}</p>
                                    )}
                                </div>
                                
                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={newAddress.phone_number}
                                        onChange={handleInputChange}
                                        onBlur={() => validateForm()}
                                        className={`w-full border ${newAddress.errors?.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Phone number"
                                        required
                                        disabled={loading}
                                    />
                                    {newAddress.errors?.phone_number && (
                                        <p className="mt-1 text-sm text-red-600">{newAddress.errors.phone_number}</p>
                                    )}
                                </div>
                                
                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address*
                                    </label>
                                    <textarea
                                        name="address"
                                        value={newAddress.address}
                                        onChange={handleInputChange}
                                        onBlur={() => validateForm()}
                                        className={`w-full border ${newAddress.errors?.address ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Street address"
                                        required
                                        rows={3}
                                        disabled={loading}
                                    />
                                    {newAddress.errors?.address && (
                                        <p className="mt-1 text-sm text-red-600">{newAddress.errors.address}</p>
                                    )}
                                </div>
                                
                                {/* District and State */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            District*
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={newAddress.district}
                                            onChange={handleInputChange}
                                            onBlur={() => validateForm()}
                                            className={`w-full border ${newAddress.errors?.district ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="District"
                                            required
                                            disabled={loading}
                                        />
                                        {newAddress.errors?.district && (
                                            <p className="mt-1 text-sm text-red-600">{newAddress.errors.district}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State*
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleInputChange}
                                            onBlur={() => validateForm()}
                                            className={`w-full border ${newAddress.errors?.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="State"
                                            required
                                            disabled={loading}
                                        />
                                        {newAddress.errors?.state && (
                                            <p className="mt-1 text-sm text-red-600">{newAddress.errors.state}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Zip Code and Country */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Zip Code*
                                        </label>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            value={newAddress.zip_code}
                                            onChange={handleInputChange}
                                            onBlur={() => validateForm()}
                                            className={`w-full border ${newAddress.errors?.zip_code ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Zip code"
                                            required
                                            disabled={loading}
                                        />
                                        {newAddress.errors?.zip_code && (
                                            <p className="mt-1 text-sm text-red-600">{newAddress.errors.zip_code}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country*
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={newAddress.country}
                                            onChange={handleInputChange}
                                            onBlur={() => validateForm()}
                                            className={`w-full border ${newAddress.errors?.country ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Country"
                                            required
                                            disabled={loading}
                                        />
                                        {newAddress.errors?.country && (
                                            <p className="mt-1 text-sm text-red-600">{newAddress.errors.country}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Primary Address Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_primary"
                                        name="is_primary"
                                        checked={newAddress.is_primary}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                    <label htmlFor="is_primary" className="ml-2 block text-sm text-gray-700">
                                        Set as primary address
                                    </label>
                                </div>
                                
                                {/* Form Actions */}
                                <div className="flex justify-end pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddressModal(false);
                                            setNewAddress(prev => ({
                                                ...prev,
                                                errors: {}
                                            }));
                                        }}
                                        className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        disabled={loading || Object.values(newAddress.errors || {}).some(error => error)}
                                    >
                                        {loading ? 'Saving...' : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Overview;