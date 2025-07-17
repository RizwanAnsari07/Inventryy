import { useState } from "react";
import LatestProducts from "./LatestProducts";
import Sidebar from "./Sidebar";

const LatestProductLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <LatestProducts isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default LatestProductLayout