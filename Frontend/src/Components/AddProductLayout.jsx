import { useState } from 'react';
import AddProduct from './AddProduct';
import Sidebar from "./Sidebar";
const AddProductLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
        const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
      };
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <AddProduct isSidebarOpen={isSidebarOpen} />
    </>
  )
}

export default AddProductLayout
