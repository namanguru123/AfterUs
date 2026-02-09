import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getConditionById,
  updateConditionAssets,
  updateConditionTrustedPeople,
  getConditionStatus
} from "../../services/conditionService";
import { getAssets } from "../../services/assetService";
import { getTrustedPeople } from "../../services/trustedPeopleService";
import api from "../../services/api";

export default function ConditionDetails() {
  const { id } = useParams();

  const [condition, setCondition] = useState(null);
  const [assets, setAssets] = useState([]);
  const [trustedPeople, setTrustedPeople] = useState([]);

  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedTrustedPeople, setSelectedTrustedPeople] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingAssets, setSavingAssets] = useState(false);
  const [savingPeople, setSavingPeople] = useState(false);

  const [statusData, setStatusData] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  // ✅ EXTRACTED FUNCTION (this was missing earlier)
  const fetchConditionDetails = async () => {
    setLoading(true);

    const conditionRes = await getConditionById(id);
    const assetsRes = await getAssets();
    const peopleRes = await getTrustedPeople();

    setCondition(conditionRes);
    setAssets(Array.isArray(assetsRes) ? assetsRes : []);
    setTrustedPeople(Array.isArray(peopleRes) ? peopleRes : []);

    setSelectedAssets(
      (conditionRes.linkedAssets || [])
        .map(a => a?._id?.toString())
        .filter(Boolean)
    );

    setSelectedTrustedPeople(
      (conditionRes.trustedPeople || [])
        .map(p => p?._id?.toString())
        .filter(Boolean)
    );

    setLoading(false);
  };

  // ✅ useEffect now calls the same function
  useEffect(() => {
    fetchConditionDetails();
  }, [id]);

  


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getConditionStatus(id);
        setStatusData(data)
      } catch (err) {
        console.error("Failed to load condition status", err);
      } finally {
        setStatusLoading(false);
      }
    };

    fetchStatus();
  }, [id]);

  const effectiveStatus =
  condition && condition.executionStatus === "FULFILLED"
    ? {
        status: "TRIGGERED",
        daysRemaining: 0,
        triggeredAt: condition.fulfilledAt,
      }
    : statusData;


  // ✅ Trigger condition (now works correctly)
  const handleTriggerCondition = async () => {
    try {
      await api.post(`/conditions/${condition._id}/trigger`);
      alert("Condition triggered successfully");
      fetchConditionDetails(); // ✅ now defined
    } catch (error) {
      console.error(error);
      alert("Failed to trigger condition");
    }
  };

  


  if (loading) return <p>Loading...</p>;
  if (!condition) return <p>Condition not found</p>;

  return (
    <div className="space-y-6" >
      <h1 className="text-2xl font-semibold">Condition Details</h1>

      {statusLoading ? (
            <p className="text-sm text-gray-500">Checking condition status…</p>
          ) : (
            <ConditionStatusBanner statusData={effectiveStatus} />
          )}

      <div className="bg-white border rounded-xl p-5 space-y-2">
        <p><strong>Type:</strong> {condition.type}</p>
        <p><strong>Status:</strong> {condition.executionStatus}</p>
        <p><strong>Inactivity Days:</strong> {condition.config?.inactivityDays}</p>
        

        
        

        {condition.executionStatus !== "FULFILLED" && (
          <button
            onClick={handleTriggerCondition}
            className="bg-red-600 text-white px-4 py-2 rounded mt-4"
          >
            Trigger Condition
          </button>
        )}

      </div>

      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Linked Digital Assets</h2>

        {assets.map(asset => {
          const assetId = asset.id.toString();

          return (
            <label
              key={assetId}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <input
                type="checkbox"
                checked={selectedAssets.includes(assetId)}
                onChange={() =>
                  setSelectedAssets(prev =>
                    prev.includes(assetId)
                      ? prev.filter(id => id !== assetId)
                      : [...prev, assetId]
                  )
                }
              />
              <span>{asset.title}</span>
            </label>
          );
        })}


        <button
          disabled={savingAssets}
          onClick={async () => {
            setSavingAssets(true);
            await updateConditionAssets(condition._id, selectedAssets);
            setSavingAssets(false);
          }}
          className="mt-4 bg-primary btn-primary text-white px-5 py-2 rounded"
        >
          {savingAssets ? "Saving..." : "Save Assets"}
        </button>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Trusted People Access</h2>

        {trustedPeople.map(person => {
          const pid = person._id.toString();

          return (
            <label
              key={pid}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <input
                type="checkbox"
                checked={selectedTrustedPeople.includes(pid)}
                onChange={() =>
                  setSelectedTrustedPeople(prev =>
                    prev.includes(pid)
                      ? prev.filter(id => id !== pid)
                      : [...prev, pid]
                  )
                }
              />
              <span>{person.name}</span>
            </label>
          );
        })}

        <button
          disabled={savingPeople}
          onClick={async () => {
            setSavingPeople(true);
            await updateConditionTrustedPeople(
              condition._id,
              selectedTrustedPeople
            );
            setSavingPeople(false);
          }}
          className="mt-4 bg-primary btn-primary text-white px-5 py-2 rounded"
        >
          {savingPeople ? "Saving..." : "Save Trusted People"}
        </button>
      </div>
    </div>
  );
}



const ConditionStatusBanner = ({ statusData }) => {
  if (!statusData) return null;

  const { status, daysRemaining } = statusData;

  const styles = {
    SAFE: "bg-green-100 text-green-700 border-green-300",
    WARNING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    TRIGGERED: "bg-red-100 text-red-700 border-red-300",
  };

  const messages = {
    SAFE: "Everything is safe. No action needed.",
    WARNING: `Condition may trigger in ${daysRemaining} day(s).`,
    TRIGGERED: "Condition is eligible for execution.",
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${styles[status]}`}
    >
      <h4 className="font-semibold mb-1">
        Condition Status: {status}
      </h4>
      <p className="text-sm">{messages[status]}</p>
    </div>
  );
};
