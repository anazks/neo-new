import React, { useEffect, useState } from 'react';
import { 
  FiPackage, 
  FiUser, 
  FiCreditCard, 
  FiTruck, 
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { AllOrders } from '../../../Services/Order';
import Loader from '../../../Loader/Loader';

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await AllOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    if (!status) return (
      <span className="flex items-center bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
        <FiClock className="mr-1" /> Pending
      </span>
    );
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <span className="flex items-center bg-green-600 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm">
            <FiCheckCircle className="mr-1" /> Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="flex items-center bg-blue-600 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm">
            <FiTruck className="mr-1" /> Shipped
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            <FiClock className="mr-1" /> Processing
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      default:
        return (
          <span className="flex items-center bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            <FiClock className="mr-1" /> Pending
          </span>
        );
    }
  };

  const getPaymentBadge = (status) => {
    if (!status) return (
      <span className="flex items-center bg-red-600 bg-opacity-20 text-red-400 px-3 py-1 rounded-full text-sm">
        <FiAlertCircle className="mr-1" /> Unpaid
      </span>
    );
    
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <span className="flex items-center bg-green-600 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm">
            <FiCheckCircle className="mr-1" /> Paid
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center bg-yellow-600 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center bg-red-600 bg-opacity-20 text-red-400 px-3 py-1 rounded-full text-sm">
            <FiAlertCircle className="mr-1" /> Failed
          </span>
        );
      default:
        return (
          <span className="flex items-center bg-red-600 bg-opacity-20 text-red-400 px-3 py-1 rounded-full text-sm">
            <FiAlertCircle className="mr-1" /> Unpaid
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-rajdhani">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-rajdhani p-6">
        <div className="text-red-500 text-4xl mb-4">
          <FiAlertCircle />
        </div>
        <p className="text-xl mb-6">{error}</p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
          onClick={fetchOrders}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-rajdhani p-6">
        <FiPackage className="text-4xl text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">No Orders Found</h2>
        <p className="text-gray-400 mb-4">There are currently no orders in the system.</p>
      </div>
    );
  }

  const order = orders[selectedOrderIndex];
  const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-rajdhani">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Order Management</h1>
        
        {orders.length > 1 && (
          <div className="w-full md:w-auto">
            <select 
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedOrderIndex}
              onChange={(e) => setSelectedOrderIndex(Number(e.target.value))}
            >
              {orders.map((order, index) => (
                <option key={order.id} value={index}>
                  Order #{order.invoice_number} - {order.user_name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Order #{order.invoice_number}</h2>
            <div className="flex items-center space-x-4 text-gray-400 mt-2">
              <span className="flex items-center">
                <FiCalendar className="mr-1" /> {formattedDate}
              </span>
              <span>|</span>
              <span>Customer: {order.user_name}</span>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {getStatusBadge(order.order_status)}
            {getPaymentBadge(order.payment_status)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Details */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiUser className="text-xl mr-2" />
            <h3 className="text-lg font-semibold">Customer Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Full Name</span>
              <span>{order.user_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">User ID</span>
              <span>{order.user}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone</span>
              <span>{order.delivery_address_details?.phone_number || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiTruck className="text-xl mr-2" />
            <h3 className="text-lg font-semibold">Shipping Address</h3>
          </div>
          <div className="space-y-2">
            <p>{order.delivery_address_details?.delivery_person_name || order.user_name}</p>
            <p>{order.delivery_address_details?.address || 'N/A'}</p>
            <p>
              {order.delivery_address_details?.district || 'N/A'}, {order.delivery_address_details?.state || 'N/A'} {order.delivery_address_details?.postal_code || 'N/A'}
            </p>
            <p>{order.delivery_address_details?.country || 'N/A'}</p>
            <p>{order.delivery_address_details?.phone_number || 'N/A'}</p>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiCreditCard className="text-xl mr-2" />
            <h3 className="text-lg font-semibold">Payment Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Payment Status</span>
              {getPaymentBadge(order.payment_status)}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment ID</span>
              <span>{order.payment_order_id || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method</span>
              <span>{order.payment_method || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiPackage className="text-xl mr-2" />
            <h3 className="text-lg font-semibold">Order Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>₹{Number(order.price_before_tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Discount</span>
              <span>₹{Number(order.total_discount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax</span>
              <span>₹{Number(order.total_tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-3 font-medium">
              <span>Total</span>
              <span>₹{Number(order.total_price).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <FiPackage className="text-xl mr-2" />
          <h3 className="text-lg font-semibold">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {order.items && order.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src="https://www.pngmart.com/files/23/Gaming-Pc-PNG.png" 
                          alt={item.product_name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{item.product_name}</div>
                        <div className="text-sm text-gray-400">SKU: {item.product_id || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{Number(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium">
          Print Invoice
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium">
          Update Status
        </button>
      </div>
    </div>
  );
}

export default Order;