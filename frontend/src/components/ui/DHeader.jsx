import { Bell, ShieldCheck, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DHeader = ({ title = "Dashboard" }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    // 1️⃣ Clear token
    localStorage.removeItem("token");

    // 2️⃣ Clear auth state
    setUser(null);

    // 3️⃣ Redirect to login
    navigate("/login", { replace: true });
  };

  const displayName =
    user.name ||
    user.username ||
    user.email?.split("@")[0] ||
    "User";

  return (
    <header className="h-20 w-full bg-white border-b border-slate-200 px-8 grid grid-cols-[auto_1fr_auto] items-center">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-slate-900">
        {title}
      </h1>

      <div />

      {/* Right actions */}
      <div className="flex items-center gap-4">

        {/* Plan */}
        <div className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">
          Free Plan
        </div>

        {/* Encrypted */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-sm border border-slate-200">
          <ShieldCheck size={16} />
          Encrypted
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* User + Logout */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
            {displayName[0]?.toUpperCase()}
          </div>

          <span className="text-sm font-medium text-slate-700">
            {displayName}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-50 text-red-600"
            title="Logout"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>
    </header>
  );
};

export default DHeader;
