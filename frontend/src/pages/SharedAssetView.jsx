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

  console.log(asset);

  const revealSensitiveData = async () => {
    try {
      setRevealLoading(true);

      const res = await api.post(
        `/access/reveal/${asset._id}`
      );

      // Handle FILE type (PDF/IMAGE)
      if (res.data.type === "FILE") {
        // Download the file
        try {
          const fileRes = await api.get(`/access/download/${asset._id}`, {
            responseType: "blob",
          });

          const fileBlob = fileRes.data;
          const fileURL = window.URL.createObjectURL(fileBlob);

          const link = document.createElement("a");
          link.href = fileURL;
          link.download = asset.title;
          link.click();

          window.URL.revokeObjectURL(fileURL);

          alert(`File "${asset.title}" downloaded successfully!`);
        } catch (downloadErr) {
          console.error("Download error:", downloadErr);
          alert("Failed to download file");
        }
      } else {
        // Handle TEXT/LINK type - reveal sensitive data
        setSensitiveData(res.data.value);

        // auto-hide after 30 seconds
        setTimeout(() => {
          setSensitiveData(null);
        }, 30000);
      }
    } catch (err) {
      console.error("Reveal error:", err);
      alert("You are not allowed to view this asset");
    } finally {
      setRevealLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{asset.title}</h1>


      <p>
        <strong>Type:</strong> {asset.type}
      </p>

      <p className="text-sm text-gray-500">
        Owned by{" "}
        <span className="font-medium text-gray-800">
          {asset.owner.name}
        </span>
        <br />
        {asset.owner.email}
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
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {revealLoading ? "Revealing..." : "Reveal Sensitive Data"}
        </button> */}

        <button
          onClick={revealSensitiveData}
          disabled={!!sensitiveData}
          className={`mt-4 px-4 py-2 rounded ${
            sensitiveData
              ? "bg-neutral cursor-not-allowed"
              : "bg-primary text-white"
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
