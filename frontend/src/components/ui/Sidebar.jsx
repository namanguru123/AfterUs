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
  { name: "Shared With Me", path: "/dashboard/shared-with-me", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="w-80 min-h-screen flex-shrink-1 text-white flex flex-col" style={{background: 'linear-gradient(160deg, #0A1F33 0%, #0d2a44 100%)'}}>
      
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#5BC4B1'}}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AfterUs</h1>
            <p className="text-xs text-white/60">Digital Continuity</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 flex-col">
        {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/dashboard"}
              className="flex items-center gap-3 h-8 px-4 mx-1 rounded-xl whitespace-nowrap transition-all"
              style={({ isActive }) =>
                isActive
                  ? { background: 'rgba(93,183,232,0.25)', color: '#5DB7E8', boxShadow: '0 2px 8px rgba(93,183,232,0.2)' }
                  : { color: 'rgba(255,255,255,0.65)' }
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
          <div className="flex items-center gap-2 text-sm font-medium" style={{color: '#5BC4B1'}}>
            <span className="w-2 h-2 rounded-full" style={{background: '#5BC4B1'}}></span>
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
