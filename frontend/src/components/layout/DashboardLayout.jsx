import Sidebar from "../ui/Sidebar";
import Header from "../ui/DHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/assets": "Digital Assets",
  "/dashboard/people": "Trusted People",
  "/dashboard/conditions": "Conditions",
  "/dashboard/activity": "Activity Log",
  "/dashboard/settings": "Settings",
  "/dashboard/shared-with-me": "Shared With Me",
};

const DashboardLayout = () => {
  const location = useLocation();
  console.log("Current path:", location.pathname);
  const title = pageTitles[location.pathname];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 h-screen" style={{background: '#F4F7FA'}}>
        
        {/* Header */}
        <Header title={title} onMenuToggle={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 no-scrollbar">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
