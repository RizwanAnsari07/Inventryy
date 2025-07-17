import { useState } from "react";
import ProductPage from "./ProductPage";
import Sidebar from "./Sidebar";

const ProductPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ProductPage isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default ProductPageLayout
