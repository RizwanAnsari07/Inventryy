import { useState } from 'react';
import SalesPage from './SalesPage';
import Sidebar from "./Sidebar";

const SalesPageLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
        const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
      };
      
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <SalesPage isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default SalesPageLayout