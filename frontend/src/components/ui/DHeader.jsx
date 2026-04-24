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
    <header className="h-20 w-full border-b px-8 grid grid-cols-[auto_1fr_auto] items-center" style={{background: '#F4F7FA', borderColor: '#d0dce8'}}>

      {/* Title */}
      <h1 className="text-3xl font-semibold" style={{color: '#0A1F33'}}>
        {title}
      </h1>

      <div />

      {/* Right actions */}
      <div className="flex items-center gap-4">

        {/* Plan */}
        <div className="px-4 py-2 rounded-full text-sm font-medium border" style={{background: 'rgba(91,196,177,0.12)', color: '#3A4750', borderColor: 'rgba(91,196,177,0.4)'}}>
          Free Plan
        </div>

        {/* Encrypted */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border" style={{background: 'rgba(93,183,232,0.10)', color: '#3A4750', borderColor: 'rgba(93,183,232,0.3)'}}>
          <ShieldCheck size={16} />
          Encrypted
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full transition-colors" style={{}} onMouseEnter={e => e.currentTarget.style.background='rgba(93,183,232,0.12)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* User + Logout */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-semibold" style={{background: '#5DB7E8'}}>
            {displayName[0]?.toUpperCase()}
          </div>

          <span className="text-sm font-medium" style={{color: '#3A4750'}}>
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
