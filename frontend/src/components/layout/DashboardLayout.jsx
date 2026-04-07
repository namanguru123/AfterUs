import Sidebar from "../ui/Sidebar";
import Header from "../ui/DHeader";
import { Outlet, useLocation } from "react-router-dom";

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

  return (
    <div className="h-screen w-screen flex ">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 bg-gradient-to-br from-slate-50 to-white ">
        
        {/* Header */}
        <Header title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6 overflow-y-scroll no-scrollbar">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
