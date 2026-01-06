import { useEffect, useState } from "react";
import {
  getConditions,
  toggleCondition,
  deleteCondition,
  createInactivityCondition,
} from "../../services/conditionService";

import { Link } from "react-router-dom";

export default function Conditions() {
  const [conditions, setConditions] = useState([]);
  const [days, setDays] = useState("");

  const load = async () => {
    const data = await getConditions();
    setConditions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!days || Number(days) < 1) {
      alert("Enter valid inactivity days");
      return;
    }

    await createInactivityCondition(Number(days));
    setDays("");
    load(); 
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Conditions</h1>

      {conditions.length === 0 && (
        <p className="text-slate-500">No conditions created yet</p>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="font-medium text-slate-900 mb-2">
          Create inactivity condition
        </p>

        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Days of inactivity"
            className="border rounded px-3 py-2 w-48"
          />

          <button
            onClick={handleCreate}
            className="bg-slate-900 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>

      {conditions.map((c) => (
        <div
          key={c._id}
          className="bg-white border rounded-xl p-5 flex justify-between items-center"
        >
          <div>
            

            <Link
              to={`/dashboard/conditions/${c._id}`}
              className="font-medium text-indigo-600 hover:underline"
            >
              {c.type.replace("_", " ")}
            </Link>

            <p className="text-sm text-slate-500">
              Status: {c.status}
            </p>
          </div>

          

          <div className="flex gap-3">
            <button
              onClick={async () => {
                await toggleCondition(c._id);
                load();
              }}
              className="text-sm px-3 py-1 rounded bg-slate-100"
            >
              {c.status === "ACTIVE" ? "Pause" : "Activate"}
            </button>

            <button
              onClick={async () => {
                await deleteCondition(c._id);
                load();
              }}
              className="text-sm px-3 py-1 rounded text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
