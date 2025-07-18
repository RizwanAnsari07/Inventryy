import { useState } from "react";
import LessStock from "./LessStock";
import Sidebar from "./Sidebar";

const LessStockLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <LessStock isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default LessStockLayout