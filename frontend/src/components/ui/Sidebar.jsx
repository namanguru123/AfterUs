import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Users,
  Clock,
  Activity,
  Settings,
  ShieldCheck,
  X
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

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside 
      className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-80 min-h-screen flex-shrink-0 text-white flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} 
      style={{background: 'linear-gradient(160deg, #0A1F33 0%, #0d2a44 100%)'}}
    >
      
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#5BC4B1'}}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AfterUs</h1>
            <p className="text-xs text-white/60">Digital Continuity</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden text-white/60 hover:text-white transition-colors p-1"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/dashboard"}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 h-10 md:h-8 px-4 mx-1 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#5DB7E8]/25 text-[#5DB7E8] shadow-[0_2px_8px_rgba(93,183,232,0.2)]'
                    : 'text-white/65 hover:text-white hover:bg-white/5'
                }`
              }
            >

            <Icon size={18} />
            <span className="text-sm font-medium">{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Security Card */}
      <div className="px-4 pb-6 mt-auto">
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
