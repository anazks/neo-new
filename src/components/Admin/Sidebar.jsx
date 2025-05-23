import { Ticket } from 'lucide-react';
import { 
  FaBars, 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaShoppingBag, 
  FaUsers, 
  FaChartPie, 
  FaCogs, 
  FaSignOutAlt, 
  FaBullseye,
  FaStar,
  FaSync
} from 'react-icons/fa';

function Sidebar({ isExpanded, toggleSidebar }) {
  return (
    <div className={`fixed h-full bg-gray-800 text-gray-100 transition-all duration-300 z-50 font-rajdhani 
      ${isExpanded ? 'w-64' : 'w-16 md:w-20'}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isExpanded && <h2 className="text-xl font-bold whitespace-nowrap">Admin Panel</h2>}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white"
          aria-label="Toggle sidebar"
        >
          <FaBars className="text-lg" />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="mt-4">
        <li>
          <a 
            href="/admin/dashboard" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaTachometerAlt className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Dashboard</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/products" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaBoxOpen className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Products</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/featured" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaStar className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Featured Products</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/driver/update" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaSync className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Driver Update</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/order-list" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaShoppingBag className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Orders</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/viewUsers" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaUsers className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Users</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/tickets" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <Ticket className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Tickets</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/settings" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaCogs className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Settings</span>}
          </a>
        </li>
        <li>
          <a 
            href="/admin/overview" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaBullseye className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Overview</span>}
          </a>
        </li>
        <li className="border-t border-gray-700 mt-4">
          <a 
            href="/" 
            className="flex items-center p-3 md:p-4 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="text-xl min-w-[24px]" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Logout</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;