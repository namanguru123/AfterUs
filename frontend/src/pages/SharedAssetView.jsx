import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function SharedAssetView() {
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sensitiveData, setSensitiveData] = useState(null);
  const [revealLoading, setRevealLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/access-rules/${id}`);

        setAsset(res.data.asset);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const revealSensitiveData = async () => {
    try {
      setRevealLoading(true);

      const res = await api.post(
        `/access/reveal/${asset._id}`
      );

      setSensitiveData(res.data.value);

      // auto-hide after 30 seconds
      setTimeout(() => {
        setSensitiveData(null);
      }, 30000);

    } catch (err) {
      alert("You are not allowed to view sensitive data");
    } finally {
      setRevealLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{asset.title}</h1>

      <p className="text-gray-600">{asset.description}</p>

      <p>
        <strong>Type:</strong> {asset.assetType}
      </p>

      <p className="text-sm text-gray-500">
        Shared on {new Date(asset.createdAt).toLocaleDateString()}
      </p>

      {/* 🔐 Reveal Section */}
      <div className="mt-6 p-4 border rounded bg-yellow-50 text-yellow-800">
        <p className="mb-3">
          This asset is shared in read-only mode.
        </p>

        {/* <button
          onClick={revealSensitiveData}
          disabled={revealLoading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {revealLoading ? "Revealing..." : "Reveal Sensitive Data"}
        </button> */}

        <button
          onClick={revealSensitiveData}
          disabled={!!sensitiveData}
          className={`mt-4 px-4 py-2 rounded ${
            sensitiveData
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          {revealLoading ? "Revealing..." : "Reveal Sensitive Data"}
        </button>
        <p className="mt-4">You can only view the sensitive data 3 times.</p>
      </div>

      {/* 🔓 Sensitive Data */}
      {sensitiveData && (
        <div className="mt-4 p-4 border rounded bg-red-50">
          <h3 className="font-semibold mb-2">🔐 Sensitive Data</h3>
          <p className="break-all">{sensitiveData}</p>
          <p className="text-xs text-gray-500 mt-2">
            This data will hide automatically for your security.
          </p>
        </div>
      )}
    </div>
  );
}
