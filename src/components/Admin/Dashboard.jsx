import React, { useEffect, useState, useCallback } from 'react';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getAnalytics, getinsights, getDashBoard } from '../../Services/Settings';

// Constants for colors and data that don't change
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

// Tooltip style configuration
const tooltipStyle = {
  contentStyle: { 
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderRadius: '0.5rem',
    fontFamily: 'Rajdhani'
  },
  itemStyle: { fontFamily: 'Rajdhani' }
};

function Dashboard() {
  const [customerAnalytics, setCustomerAnalytics] = useState([]);
  const [insights, setInsights] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState({
    analytics: true,
    insights: true,
    dashboard: true
  });
  const [error, setError] = useState({
    analytics: null,
    insights: null,
    dashboard: null
  });

  // Memoized fetch functions
  const fetchData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, analytics: true }));
      const analyticsResponse = await getAnalytics();
      setCustomerAnalytics(analyticsResponse.data || []); // Make sure to access .data if needed
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(prev => ({ ...prev, analytics: err }));
    } finally {
      setLoading(prev => ({ ...prev, analytics: false }));
    }
  
    try {
      setLoading(prev => ({ ...prev, insights: true }));
      const insightsResponse = await getinsights();
      console.log("Insights Response:", insightsResponse); // Debug log
      // Access the data directly or through .data based on your API structure
      setInsights(insightsResponse.data);
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError(prev => ({ ...prev, insights: err }));
    } finally {
      setLoading(prev => ({ ...prev, insights: false }));
    }
  
    try {
      setLoading(prev => ({ ...prev, dashboard: true }));
      const dashboardResponse = await getDashBoard();
      console.log("Dashboard Response:", dashboardResponse); // Debug log
      // Access the data directly or through .data based on your API structure
      setDashboard(dashboardResponse.data || dashboardResponse || {});
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError(prev => ({ ...prev, dashboard: err }));
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Stats Card Component to reduce duplication
  const StatCard = ({ icon: Icon, title, value, trend, isPositive, bgColor }) => (
    <div className="bg-gray-800 rounded-lg p-6 flex items-start">
      <div className={`bg-${bgColor}-600 p-3 rounded-full mr-4`}>
        <Icon className="text-white text-xl" />
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold my-1">{value || '--'}</p>
        <p className={`text-${isPositive ? 'green' : 'red'}-400 text-sm font-medium`}>
          {trend}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-rajdhani">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700" />
          <span className="font-medium">Admin User</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={FaUsers} 
          title="Active Customers" 
          value={insights.active_customers_count} 
          trend="+12% from last month" 
          isPositive 
          bgColor="blue" 
        />
        <StatCard 
          icon={FaShoppingCart} 
          title="Average Orders" 
          value={insights.average_order_value} 
          trend="+8% from last month" 
          isPositive 
          bgColor="purple" 
        />
        <StatCard 
          icon={FaMoneyBillWave} 
          title="Revenue" 
          value={dashboard.revenue} 
          trend="+15% from last month" 
          isPositive 
          bgColor="green" 
        />
        <StatCard 
          icon={FaChartLine} 
          title="Period Days" 
          value={dashboard.period_days} 
          trend="-3% from last month" 
          isPositive={false} 
          bgColor="yellow" 
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#b3b3b3" />
                <YAxis stroke="#b3b3b3" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontFamily: 'Rajdhani', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="active" stroke="#00C49F" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="new" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales by Category */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
          <div className="h-64">
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Frequency Of Purchase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Days Since Last Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading.analytics ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Loading...</td>
                  </tr>
                ) : error.analytics ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-400">Error loading data</td>
                  </tr>
                ) : (
                  customerAnalytics.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{order.purchase_frequency_days}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.user_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.days_since_last_order}</td>
                      <td className="px-6 py-4 whitespace-nowrap">INR.{order.total_spent}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
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
  );
}

export default Dashboard;