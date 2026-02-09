import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssetById, deleteAsset, downloadAssetFile } from "../../services/assetService";


export default function AssetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [showData, setShowData] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  useEffect(() => {
    getAssetById(id).then(setAsset);
  }, [id]);

  // Load image preview for IMAGE assets
  useEffect(() => {
    if (asset?.assetType === "IMAGE") {
      downloadAssetFile(asset.id)
        .then((imageBlob) => {
          const url = URL.createObjectURL(imageBlob);
          setImagePreview(url);
        })
        .catch((err) => {
          console.error("Failed to load image:", err);
        });
    }
  }, [asset]);

  // const assetId = asset._id || asset.id;

  if (!asset) {
    return <p className="text-slate-500">Loading asset...</p>;
  }

  // ✅ Reveal allowed for TEXT & LINK
  const canReveal =
    asset.assetType === "TEXT" || asset.assetType === "LINK";

  const handleReveal = () => {
    setShowData(true);
    setTimeout(() => setShowData(false), 30000);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    await deleteAsset(asset.id);
    navigate("/dashboard/assets");
  };

 

    const handleOpenPdf = async () => {
      try {
        const fileBlob = await downloadAssetFile(asset.id);

        const fileURL = window.URL.createObjectURL(fileBlob);

        const link = document.createElement("a");
        link.href = fileURL;
        link.target = "_blank"; // open in new tab
        link.click();

        window.URL.revokeObjectURL(fileURL);
      } catch (err) {
        console.error("DOWNLOAD ERROR:", err);
        alert("Unable to download file");
      }
    };




  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">
        {asset.title}
      </h2>

      <p className="text-sm text-slate-500 mb-6">
        {asset.category} • {asset.assetType}
      </p>

      {(asset.assetType === "TEXT" || asset.assetType === "LINK") && (
        <div className="mb-6">
          <label className="text-sm text-slate-600 block mb-1">
            {asset.assetType === "LINK"
              ? "Secure Link / Account Info"
              : "Sensitive Data"}
          </label>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm break-all">
            {showData
              ? asset.data || ""
              : "••••••••••••••••"}
          </div>
        </div>
      )}

      {/* IMAGE Preview */}
        {asset.assetType === "IMAGE" && (
          <div className="mb-6">
            <label className="text-sm text-slate-600 block mb-2">
              Image Preview
            </label>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt={asset.title}
                className="max-h-96 rounded-lg border"
              />
            ) : (
              <p className="text-slate-500">Loading image...</p>
            )}
          </div>
        )}

      {/* PDF Download / Open */}
      {asset.assetType === "PDF" && (
        <div className="mb-6">
          <label className="text-sm text-slate-600 block mb-2">
            Document
          </label>

           <button
              onClick={handleOpenPdf}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
            >
              Open / Download PDF
            </button>
        </div>
      )}


      <div className="flex items-center gap-4">
        {canReveal && (
          <>
          <button
            onClick={handleReveal}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800"
          >
            Reveal for 30 seconds
          </button>

          <button
          onClick={() => navigate(`/dashboard/assets/${asset.id}/edit`)}
          className="text-accent"
        >
          Edit
        </button>
          </>
          
        )}

        

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
