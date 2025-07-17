import { useState } from "react";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";

const LoginPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <LoginPage isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default LoginPageLayout
