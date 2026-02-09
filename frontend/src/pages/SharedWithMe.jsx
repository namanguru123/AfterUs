import { useEffect, useState } from "react";
import { getSharedWithMe } from "../services/accessRuleService";
import { Link } from "react-router-dom";

export default function SharedWithMe() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);
  const[accessRule, setAccessRule] = useState(null);


  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSharedWithMe();
        setAssets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (assets.length === 0) {
    return <p>No assets shared with you.</p>;
  }

  assets.map(a => {
    
  })

  
  console.log(assets[0]);
  

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Shared With Me</h1>

      {assets.length === 0 && (
        <div className="mt-10 text-center text-sm text-gray-500">
          No assets have been shared with you yet.
        </div>
      )}


      {assets.map(asset => (
        <div
          key={asset.accessRuleId}
          className="border rounded-lg p-4 bg-white"
        >


          <h2 className="font-medium">{asset.title}</h2>

          <p className="text-sm text-gray-500 mt-2">
            Owned by{" "}
            <span className="font-medium text-gray-800">
              {asset.owner.name}  {" <"}{asset.owner.email}{">" }
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Shared on: {new Date(asset.createdAt).toLocaleDateString()}
          </p>

          
          <Link
                to={`/dashboard/shared/${asset.accessRuleId}`}
                className="mt-3 inline-block text-sm px-3 py-1 rounded bg-slate-900 text-white"
                >
                View (Read-Only)
                </Link>

        </div>
      ))}
    </div>
  );
}
