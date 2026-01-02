import Sidebar from "../ui/Sidebar";
import Header from "../ui/DHeader";
import { Outlet, useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/assets": "Digital Assets",
  "/people": "Trusted People",
  "/conditions": "Conditions",
  "/activity": "Activity Log",
  "/settings": "Settings",
};

const DashboardLayout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="h-screen w-screen flex ">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 bg-gradient-to-br from-slate-50 to-white">
        
        {/* Header */}
        <Header title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
