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
import './order.css';

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await AllOrders();
      console.log(response.data, "orders...");
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
    if (!status) return <span className="badge badge-pending"><FiClock /> Pending</span>;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <span className="badge badge-success"><FiCheckCircle /> Delivered</span>;
      case 'shipped':
        return <span className="badge badge-info"><FiTruck /> Shipped</span>;
      case 'processing':
        return <span className="badge badge-warning"><FiClock /> Processing</span>;
      case 'pending':
        return <span className="badge badge-pending"><FiClock /> Pending</span>;
      default:
        return <span className="badge badge-pending"><FiClock /> Pending</span>;
    }
  };

  const getPaymentBadge = (status) => {
    if (!status) return <span className="badge badge-danger"><FiAlertCircle /> Unpaid</span>;
    
    switch (status.toLowerCase()) {
      case 'paid':
        return <span className="badge badge-success"><FiCheckCircle /> Paid</span>;
      case 'pending':
        return <span className="badge badge-warning"><FiClock /> Pending</span>;
      case 'failed':
        return <span className="badge badge-danger"><FiAlertCircle /> Failed</span>;
      default:
        return <span className="badge badge-danger"><FiAlertCircle /> Unpaid</span>;
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-message">
          <FiAlertCircle />
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchOrders}>Try Again</button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="admin-container">
        <div className="empty-state">
          <FiPackage size={48} />
          <h2>No Orders Found</h2>
          <p>There are currently no orders in the system.</p>
        </div>
      </div>
    );
  }

  // Get the selected order from the Orders array
  const order = orders[selectedOrderIndex];
  const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Order Management</h1>
        
        {orders.length > 1 && (
          <div className="order-selector">
            <select 
              className="select-dropdown"
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

      <div className="order-overview">
        <div className="overview-header">
          <div className="overview-title">
            <h2>Order #{order.invoice_number}</h2>
            <div className="overview-meta">
              <span><FiCalendar /> {formattedDate}</span>
              <span>|</span>
              <span>Customer: {order.user_name}</span>
            </div>
          </div>
          <div className="overview-badges">
            {getStatusBadge(order.order_status)}
            {getPaymentBadge(order.payment_status)}
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <div className="grid-item customer-section">
          <div className="section-header">
            <FiUser />
            <h3>Customer Details</h3>
          </div>
          <div className="section-content">
            <div className="detail-row">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{order.user_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">User ID</span>
              <span className="detail-value">{order.user}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{order.delivery_address_details?.phone_number || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="grid-item address-section">
          <div className="section-header">
            <FiTruck />
            <h3>Shipping Address</h3>
          </div>
          <div className="section-content">
            <p className="address-line">{order.delivery_address_details?.delivery_person_name || order.user_name}</p>
            <p className="address-line">{order.delivery_address_details?.address || 'N/A'}</p>
            <p className="address-line">
              {order.delivery_address_details?.district || 'N/A'}, {order.delivery_address_details?.state || 'N/A'} {order.delivery_address_details?.postal_code || 'N/A'}
            </p>
            <p className="address-line">{order.delivery_address_details?.country || 'N/A'}</p>
            <p className="address-line">{order.delivery_address_details?.phone_number || 'N/A'}</p>
          </div>
        </div>

        <div className="grid-item payment-section">
          <div className="section-header">
            <FiCreditCard />
            <h3>Payment Information</h3>
          </div>
          <div className="section-content">
            <div className="detail-row">
              <span className="detail-label">Payment Status</span>
              <span className="detail-value">{getPaymentBadge(order.payment_status)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment ID</span>
              <span className="detail-value">{order.payment_order_id || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{order.payment_method || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="grid-item summary-section">
          <div className="section-header">
            <FiPackage />
            <h3>Order Summary</h3>
          </div>
          <div className="section-content">
            <div className="detail-row">
              <span className="detail-label">Subtotal</span>
              <span className="detail-value">₹{Number(order.price_before_tax).toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Discount</span>
              <span className="detail-value">₹{Number(order.total_discount).toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Tax</span>
              <span className="detail-value">₹{Number(order.total_tax).toFixed(2)}</span>
            </div>
            <div className="detail-row total-row">
              <span className="detail-label">Total</span>
              <span className="detail-value">₹{Number(order.total_price).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-full-width">
        <div className="section-header">
          <FiPackage />
          <h3>Order Items</h3>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="product-col">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((item) => (
                <tr key={item.id}>
                  <td className="product-col">
                    <div className="product-info">
                      <div className="product-image">
                        <img src="https://www.pngmart.com/files/23/Gaming-Pc-PNG.png" alt={item.product_name} />
                      </div>
                      <div className="product-details">
                        <span className="product-name">{item.product_name}</span>
                        <span className="product-id">SKU: {item.product_id || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(Number(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-actions">
        <button className="btn btn-secondary">Print Invoice</button>
        <button className="btn btn-primary">Update Status</button>
      </div>
    </div>
  );
}

export default Order;