import React from 'react';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  // Sample data for charts
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const orderStatusData = [
    { name: 'Completed', value: 63 },
    { name: 'Processing', value: 22 },
    { name: 'Pending', value: 12 },
    { name: 'Cancelled', value: 3 },
  ];

  const STATUS_COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-rajdhani">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-3">
          <img src="/api/placeholder/40/40" alt="Admin" className="w-10 h-10 rounded-full bg-gray-700" />
          <span className="font-medium">Admin User</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gray-800 rounded-lg p-6 flex items-start">
          <div className="bg-blue-600 p-3 rounded-full mr-4">
            <FaUsers className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold my-1">1,254</p>
            <p className="text-green-400 text-sm font-medium">+12% from last month</p>
          </div>
        </div>

        {/* New Orders */}
        <div className="bg-gray-800 rounded-lg p-6 flex items-start">
          <div className="bg-purple-600 p-3 rounded-full mr-4">
            <FaShoppingCart className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">New Orders</h3>
            <p className="text-2xl font-bold my-1">342</p>
            <p className="text-green-400 text-sm font-medium">+8% from last month</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gray-800 rounded-lg p-6 flex items-start">
          <div className="bg-green-600 p-3 rounded-full mr-4">
            <FaMoneyBillWave className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Revenue</h3>
            <p className="text-2xl font-bold my-1">$24,580</p>
            <p className="text-green-400 text-sm font-medium">+15% from last month</p>
          </div>
        </div>

        {/* Growth */}
        <div className="bg-gray-800 rounded-lg p-6 flex items-start">
          <div className="bg-yellow-600 p-3 rounded-full mr-4">
            <FaChartLine className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Growth</h3>
            <p className="text-2xl font-bold my-1">27%</p>
            <p className="text-red-400 text-sm font-medium">-3% from last month</p>
          </div>
        </div>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    fontFamily: 'Rajdhani'
                  }}
                  itemStyle={{ fontFamily: 'Rajdhani' }}
                />
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    fontFamily: 'Rajdhani'
                  }}
                  itemStyle={{ fontFamily: 'Rajdhani' }}
                />
                <Legend 
                  wrapperStyle={{ fontFamily: 'Rajdhani', paddingTop: '20px' }}
                />
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    fontFamily: 'Rajdhani'
                  }}
                  itemStyle={{ fontFamily: 'Rajdhani' }}
                />
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    fontFamily: 'Rajdhani'
                  }}
                  itemStyle={{ fontFamily: 'Rajdhani' }}
                />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#ORD-1234</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 28, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">$120.50</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#ORD-1235</td>
                  <td className="px-6 py-4 whitespace-nowrap">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 27, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">$285.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Processing</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#ORD-1236</td>
                  <td className="px-6 py-4 whitespace-nowrap">Michael Davis</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 26, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">$95.20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">Pending</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#ORD-1237</td>
                  <td className="px-6 py-4 whitespace-nowrap">Emily Wilson</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 25, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">$345.75</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#ORD-1238</td>
                  <td className="px-6 py-4 whitespace-nowrap">Robert Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 24, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">$78.60</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">Cancelled</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
              <h3 className="font-medium">Wireless Headphones</h3>
              <p className="text-gray-400">$129.99</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-300">132 sales</span>
                <span className="text-yellow-400">★★★★☆</span>
              </div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
              <h3 className="font-medium">Smart Watch</h3>
              <p className="text-gray-400">$249.99</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-300">98 sales</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
              <h3 className="font-medium">Bluetooth Speaker</h3>
              <p className="text-gray-400">$79.99</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-300">87 sales</span>
                <span className="text-yellow-400">★★★★☆</span>
              </div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
              <h3 className="font-medium">Wireless Charger</h3>
              <p className="text-gray-400">$45.99</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-300">76 sales</span>
                <span className="text-yellow-400">★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;