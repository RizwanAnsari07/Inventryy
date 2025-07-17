import { useState } from "react";
import Sidebar from "./Sidebar";
import SignupPage from "./SignupPage";

const SignupPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <SignupPage isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default SignupPageLayout
