import React from 'react';
import './Dashboard.css';
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
    <div className="dashboard-container dark-mode">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-profile">
          <img src="/api/placeholder/40/40" alt="Admin" className="avatar" />
          <span>Admin User</span>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>Total Users</h3>
            <p className="stat-number">1,254</p>
            <p className="stat-change positive">+12% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-details">
            <h3>New Orders</h3>
            <p className="stat-number">342</p>
            <p className="stat-change positive">+8% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="stat-details">
            <h3>Revenue</h3>
            <p className="stat-number">$24,580</p>
            <p className="stat-change positive">+15% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon growth">
            <FaChartLine />
          </div>
          <div className="stat-details">
            <h3>Growth</h3>
            <p className="stat-number">27%</p>
            <p className="stat-change negative">-3% from last month</p>
          </div>
        </div>
      </div>

      <div className="dashboard-analytics">
        <div className="chart-section">
          <h2>Revenue Trend</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
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
                <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h2>User Activity</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#b3b3b3" />
                <YAxis stroke="#b3b3b3" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#00C49F" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="new" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard-analytics secondary-charts">
        <div className="chart-section">
          <h2>Sales by Category</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
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
                <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h2>Order Status</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orderStatusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#b3b3b3" />
                <YAxis stroke="#b3b3b3" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} />
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

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Recent Orders</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-1234</td>
                <td>John Smith</td>
                <td>Mar 28, 2025</td>
                <td>$120.50</td>
                <td><span className="status-badge completed">Completed</span></td>
              </tr>
              <tr>
                <td>#ORD-1235</td>
                <td>Sarah Johnson</td>
                <td>Mar 27, 2025</td>
                <td>$285.00</td>
                <td><span className="status-badge processing">Processing</span></td>
              </tr>
              <tr>
                <td>#ORD-1236</td>
                <td>Michael Davis</td>
                <td>Mar 26, 2025</td>
                <td>$95.20</td>
                <td><span className="status-badge pending">Pending</span></td>
              </tr>
              <tr>
                <td>#ORD-1237</td>
                <td>Emily Wilson</td>
                <td>Mar 25, 2025</td>
                <td>$345.75</td>
                <td><span className="status-badge completed">Completed</span></td>
              </tr>
              <tr>
                <td>#ORD-1238</td>
                <td>Robert Brown</td>
                <td>Mar 24, 2025</td>
                <td>$78.60</td>
                <td><span className="status-badge cancelled">Cancelled</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="content-section">
          <h2>Popular Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-image" style={{backgroundColor: "#243040"}}></div>
              <h3>Wireless Headphones</h3>
              <p>$129.99</p>
              <div className="product-stats">
                <span>132 sales</span>
                <span>★★★★☆</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image" style={{backgroundColor: "#353028"}}></div>
              <h3>Smart Watch</h3>
              <p>$249.99</p>
              <div className="product-stats">
                <span>98 sales</span>
                <span>★★★★★</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image" style={{backgroundColor: "#293830"}}></div>
              <h3>Bluetooth Speaker</h3>
              <p>$79.99</p>
              <div className="product-stats">
                <span>87 sales</span>
                <span>★★★★☆</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image" style={{backgroundColor: "#332e38"}}></div>
              <h3>Wireless Charger</h3>
              <p>$45.99</p>
              <div className="product-stats">
                <span>76 sales</span>
                <span>★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;