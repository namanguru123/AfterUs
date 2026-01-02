import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Users,
  Clock,
  Activity,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { name: "Digital Assets", path: "/dashboard/assets", icon: FileText },
  { name: "Trusted People", path: "/dashboard/people", icon: Users },
  { name: "Conditions", path: "/dashboard/conditions", icon: Clock },
  { name: "Activity Log", path: "/dashboard/activity", icon: Activity },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-80 min-h-screen flex-shrink-0 bg-gradient-to-b from-[#0B1220] to-[#060B16] text-white flex flex-col">
      
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AfterUs</h1>
            <p className="text-xs text-white/60">Digital Continuity</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 flex-col">
        {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 h-10 px-4 mx-1 rounded-xl whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >

            <Icon size={18} />
            <span className="text-sm font-medium">{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Security Card */}
      <div className="px-4 pb-6">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Secure
          </div>
          <p className="text-xs text-white/60 mt-1">
            End-to-end encrypted
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
