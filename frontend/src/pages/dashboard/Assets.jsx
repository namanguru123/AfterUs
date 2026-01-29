import { useEffect, useState } from "react";
import { getAssets } from "../../services/assetService";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function DigitalAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.error("Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading assets…</p>;
  }

  if (assets.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
        <div className="flex items-center justify-between">
          
          <button
            onClick={() => navigate("/dashboard/assets/new")}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800"
          >
            + Add Asset
          </button>
        </div>

        <Lock className="mx-auto text-slate-400 mb-4" size={32} />
        <h2 className="text-lg font-semibold text-slate-900">
          No digital assets yet
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Start by adding your first secure digital asset.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
     
      <div className="flex items-center justify-between">
          

          <button
            onClick={() => navigate("/dashboard/assets/new")}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800"
          >
            + Add Asset
          </button>

          
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white border border-slate-200 rounded-xl p-6"
            onClick={() => navigate(`/dashboard/assets/${asset.id}`)}

          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">
                {asset.title}
              </h3>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Encrypted
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              {asset.category} • {asset.type}
            </p>

            <p className="text-xs text-slate-400 mt-4">
              Added on {new Date(asset.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
