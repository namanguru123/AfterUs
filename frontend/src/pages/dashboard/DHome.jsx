import {
  FileText,
  Users,
  Clock,
  Activity,
  Lock,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardSummary } from "../../services/dashboardService";
import { getActivityLogs } from "../../services/activityService";

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [activities, setActivities] = useState([]);
  const [lastActivityTime, setLastActivityTime] = useState(null);
  const [lastActivityType, setLastActivityType] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivityLogs();

        setActivities(data.slice(0, 3));

        if (data.length > 0) {
          setLastActivityTime(data[0].createdAt);
          setLastActivityType(data[0].type);
        }
      } catch {
        console.error("Failed to load dashboard activity");
      }
    };

    fetchActivity();
  }, []);

  const navigate = useNavigate();

  const formatTimeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "ASSET_CREATED":
        return "bg-emerald-100 text-emerald-600";
      case "ASSET_UPDATED":
        return "bg-blue-100 text-blue-600";
      case "ASSET_DELETED":
        return "bg-red-100 text-red-600";
      case "TRUSTED_PERSON":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getActivityTitle = (type) => {
    switch (type) {
      case "ASSET_CREATED":
        return "New digital asset added";
      case "ASSET_UPDATED":
        return "Digital asset updated";
      case "ASSET_DELETED":
        return "Digital asset deleted";
      case "TRUSTED_PERSON":
        return "Trusted person verified";
      default:
        return "Activity";
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Lock className="text-emerald-600" size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold text-emerald-800">
              Plan Active and Monitored
            </p>
            <p className="text-sm text-emerald-700">
              Your digital continuity plan is secure and all conditions are being monitored
            </p>
          </div>
        </div>
        <span className="w-3 h-3 bg-emerald-500 rounded-full" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            icon={<FileText />}
            value={summary?.assets ?? 0}
            label="Total Digital Assets"
            sub="+ this month"
          />

          <Card
            icon={<Users />}
            value={summary?.trustedPeople ?? 0}
            label="Trusted People"
            sub="All verified"
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />

          <Card
            icon={<Clock />}
            value={summary?.activeConditions ?? 0}
            label="Active Conditions"
            sub="All monitored"
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />

          <Card
            icon={<Activity />}
            value={lastActivityTime ? formatTimeAgo(lastActivityTime) : "—"}
            label="Last Activity"
            sub={lastActivityType ? getActivityTitle(lastActivityType) : "—"}
            iconColor="text-slate-700"
            iconBg="bg-slate-100"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Activity
          </h2>
          <button className="text-sm text-indigo-600 hover:underline" onClick={() => navigate("/dashboard/activity")}>
            View all
          </button>
        </div>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-slate-500">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <ActivityItem
                key={activity._id}
                color={getActivityColor(activity.type)}
                title={getActivityTitle(activity.type)}
                desc={activity.message}
                time={formatTimeAgo(activity.createdAt)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  value,
  label,
  sub,
  iconColor = "text-indigo-600",
  iconBg = "bg-indigo-100",
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="text-4xl font-bold text-slate-900 mb-1">
        {value}
      </div>
      <div className="text-sm font-medium text-slate-700">
        {label}
      </div>
      <div className="text-xs text-slate-500 mt-1">
        {sub}
      </div>
    </div>
  );
}

function ActivityItem({ color, title, desc, time }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <Activity size={14} />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-900">
            {title}
          </div>
          <div className="text-xs text-slate-500">
            {desc}
          </div>
        </div>
      </div>
      <span className="text-xs text-slate-400">
        {time}
      </span>
    </div>
  );
}
