import React, { useState } from 'react';
import './Sidebar.css';
import { 
  FaBars, 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaShoppingBag, 
  FaUsers, 
  FaChartPie, 
  FaCogs, 
  FaSignOutAlt, 
  FaBullseye
} from 'react-icons/fa';

function Sidebar({ isExpanded, toggleSidebar }) {
  return (
    <div className={`Adminsidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="menu-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <h2 className="sidebar-title">{isExpanded && 'Admin Panel'}</h2>
      <ul>
        <li><a href="/admin/dashboard"><FaTachometerAlt className="icon" /> {isExpanded && 'Dashboard'}</a></li>
        <li><a href="/admin/products"><FaBoxOpen className="icon" /> {isExpanded && 'Products'}</a></li>
        <li><a href="/admin/orders"><FaShoppingBag className="icon" /> {isExpanded && 'Orders'}</a></li>
        <li><a href="/admin/viewUsers"><FaUsers className="icon" /> {isExpanded && 'Users'}</a></li>
        <li><a href="/analytics"><FaChartPie className="icon" /> {isExpanded && 'Analytics'}</a></li>
        <li><a href="/admin/settings"><FaCogs className="icon" /> {isExpanded && 'Settings'}</a></li>
        <li><a href="/admin/overview"><FaBullseye className="icon" /> {isExpanded && 'OverView'}</a></li>
        <li><a href="/logout"><FaSignOutAlt className="icon" /> {isExpanded && 'Logout'}</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;