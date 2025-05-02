import React, { useState } from 'react';
import AdminSideBar from '../../components/Admin/Sidebar';

function Home({ children }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-rajdhani">
      <AdminSideBar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? 
          'md:ml-64 ml-20' : // Expanded: 64 on desktop, 20 on mobile
          'md:ml-20 ml-16'    // Collapsed: 20 on desktop, 16 on mobile
      }`}>
        <main className="p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Home;