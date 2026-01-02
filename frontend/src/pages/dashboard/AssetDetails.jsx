import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssetById } from "../../services/assetService";
import { useNavigate } from "react-router-dom";
import { deleteAsset } from "../../services/assetService";




export default function AssetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    getAssetById(id).then(setAsset);
  }, [id]);

  if (!asset) {
    return <p className="text-slate-500">Loading asset...</p>;
  }

  const handleReveal = () => {
    setShowData(true);
    setTimeout(() => setShowData(false), 30000); // auto-hide in 30s
  };

  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this asset?")) return;

  await deleteAsset(asset.id);
  navigate("/dashboard");

  };

  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">
        {asset.title}
      </h2>

      <p className="text-sm text-slate-500 mb-6">
        {asset.category} • {asset.assetType}
      </p>

      <div className="mb-6">
        <label className="text-sm text-slate-600 block mb-1">
          Sensitive Data
        </label>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
          {showData ? asset.data : "••••••••••••••••"}
        </div>
      </div>

      <button
        onClick={handleReveal}
        className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800"
      >
        Reveal for 30 seconds
      </button>
      <button
        onClick={() => navigate(`/dashboard/assets/${asset.id}/edit`)}
        className="ml-4 text-indigo-600"
      >
        Edit
      </button>
    <button
  type="button"
  onClick={(e) => {
    e.stopPropagation(); // 🔥 VERY IMPORTANT
    handleDelete();
  }}
  className="text-red-600"
>
  Delete
</button>



    </div>
  );
}
