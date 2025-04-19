import React, { useState } from 'react'
import './home.css'
import AdminSideBar  from '../../components/Admin/Sidebar'
function Home({ children }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
   <>
   <div className='admin-layout'>
   <AdminSideBar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
   <div className={`main-content ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
         { children }
      </div>
    </div>
   </>
  )
}

export default Home
