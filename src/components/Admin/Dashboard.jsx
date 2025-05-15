import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaBars, 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaShoppingBag, 
  FaUsers, 
  FaCogs, 
  FaSignOutAlt, 
  FaBullseye, 
  FaStar,
  FaMoneyBillWave,
  FaChartLine
} from 'react-icons/fa';
import { Ticket } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import SideBar from './Sidebar';

// Constants for colors and mock data
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const STATUS_COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

const revenueData = [
  { name: 'Jan', value: 18400 },
  { name: 'Feb', value: 19800 },
  { name: 'Mar', value: 24580 },
  { name: 'Apr', value: 23000 },
  { name: 'May', value: 28500 },
  { name: 'Jun', value: 27300 },
];

const userActivityData = [
  { name: 'Mon', active: 120, new: 30 },
  { name: 'Tue', active: 132, new: 25 },
  { name: 'Wed', active: 145, new: 40 },
  { name: 'Thu', active: 155, new: 35 },
  { name: 'Fri', active: 170, new: 45 },
  { name: 'Sat', active: 190, new: 50 },
  { name: 'Sun', active: 185, new: 55 },
];

const salesByCategory = [
  { name: 'Electronics', value: 45 },
  { name: 'Clothing', value: 25 },
  { name: 'Home', value: 15 },
  { name: 'Accessories', value: 15 },
];

const orderStatusData = [
  { name: 'Completed', value: 63 },
  { name: 'Processing', value: 22 },
  { name: 'Pending', value: 12 },
  { name: 'Cancelled', value: 3 },
];

// Mock customer analytics data
const mockCustomerAnalytics = [
  { purchase_frequency_days: 7, user_name: "John Doe", days_since_last_order: 2, total_spent: 1250, is_active: true },
  { purchase_frequency_days: 14, user_name: "Jane Smith", days_since_last_order: 5, total_spent: 980, is_active: true },
  { purchase_frequency_days: 30, user_name: "Alex Johnson", days_since_last_order: 12, total_spent: 450, is_active: false },
  { purchase_frequency_days: 3, user_name: "Sarah Wilson", days_since_last_order: 1, total_spent: 2340, is_active: true },
];

// Tooltip style configuration
const tooltipStyle = {
  contentStyle: { 
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderRadius: '0.5rem'
  }
};

// Sidebar Component
const Sidebar = ({ isExpanded, toggleSidebar }) => {

  <SideBar/>
 
};

// Stats Card Component
const StatCard = ({ icon: Icon, title, value, trend, isPositive, bgColor }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-start">
    <div className={`bg-${bgColor}-600 p-2 rounded-full mr-3`}>
      <Icon className="text-white text-lg" />
    </div>
    <div>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-xl font-bold my-1">{value || '--'}</p>
      <p className={`text-${isPositive ? 'green' : 'red'}-400 text-xs font-medium`}>
        {trend}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [customerAnalytics, setCustomerAnalytics] = useState(mockCustomerAnalytics);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarExpanded(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      {(isSidebarExpanded || !isMobile) && (
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            {/* {isMobile && (
              <button 
                onClick={toggleSidebar} 
                className="mr-4 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white"
              >
                <FaBars className="text-lg" />
              </button>
            )} */}
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-700" />
            <span className="font-medium hidden sm:block">Admin User</span>
          </div>
        </header>

        {/* Dashboard Content - Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              icon={FaUsers} 
              title="Active Customers" 
              value="1,249" 
              trend="+12% from last month" 
              isPositive 
              bgColor="blue" 
            />
            <StatCard 
              icon={FaShoppingBag} 
              title="Average Orders" 
              value="$85.20" 
              trend="+8% from last month" 
              isPositive 
              bgColor="purple" 
            />
            <StatCard 
              icon={FaMoneyBillWave} 
              title="Revenue" 
              value="$24,780" 
              trend="+15% from last month" 
              isPositive 
              bgColor="green" 
            />
            <StatCard 
              icon={FaChartLine} 
              title="Period Days" 
              value="30" 
              trend="-3% from last month" 
              isPositive={false} 
              bgColor="yellow" 
            />
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Trend */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#b3b3b3" />
                    <YAxis stroke="#b3b3b3" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Activity */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">User Activity</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#b3b3b3" />
                    <YAxis stroke="#b3b3b3" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <Tooltip {...tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="active" stroke="#00C49F" activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="new" stroke="#0088FE" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales by Category */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderStatusData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#b3b3b3" />
                    <YAxis stroke="#b3b3b3" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="value">
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Orders and Popular Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Frequency</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Order</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-red-400">Error loading data</td>
                      </tr>
                    ) : (
                      customerAnalytics.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-700">
                          <td className="px-3 py-2 whitespace-nowrap font-medium">{order.purchase_frequency_days} days</td>
                          <td className="px-3 py-2 whitespace-nowrap">{order.user_name}</td>
                          <td className="px-3 py-2 whitespace-nowrap">{order.days_since_last_order} days ago</td>
                          <td className="px-3 py-2 whitespace-nowrap">₹{order.total_spent}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              order.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                            }`}>
                              {order.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Products */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                    <div className="w-full h-24 bg-gray-600 rounded mb-2"></div>
                    <h3 className="font-medium">Product {item}</h3>
                    <p className="text-gray-400">${(item * 50 + 29.99).toFixed(2)}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-300">{item * 30 + 50} sales</span>
                      <span className="text-yellow-400">
                        {'★'.repeat(5 - Math.floor(item / 3)) + '☆'.repeat(Math.floor(item / 3))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;