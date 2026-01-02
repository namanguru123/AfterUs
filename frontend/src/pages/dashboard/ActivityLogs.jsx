import { useEffect, useState } from "react";
import { getActivityLogs } from "../../services/activityService";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getActivityLogs();
        setLogs(data);
      } catch (err) {
        console.error("Failed to load activity logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
  const fetchLogs = async () => {
    try {
      const data = await getActivityLogs();
      console.log("ACTIVITY LOGS FROM API:", data);
      setLogs(data);
    } catch (err) {
      console.error("Activity fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  fetchLogs();
}, []);


  if (loading) {
    return <p className="text-slate-500">Loading activity...</p>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Activity
      </h2>

      {logs.length === 0 ? (
        <p className="text-slate-500">No activity yet</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log._id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {log.message}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
