import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAsset } from "../../services/assetService";

export default function AddAsset() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Documents",
    assetType: "TEXT",
    data: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TEXT & LINK → JSON request
      if (form.assetType === "TEXT" || form.assetType === "LINK") {
        await createAsset({
          title: form.title,
          category: form.category,
          assetType: form.assetType,
          data: form.data,
        });
      }

      // PDF & IMAGE → multipart/form-data
      if (form.assetType === "PDF" || form.assetType === "IMAGE") {
        if (!form.file) {
          throw new Error("File is required");
        }

        const formData = new FormData();
        formData.append("file", form.file);
        formData.append("title", form.title);
        formData.append("category", form.category);
        formData.append("assetType", form.assetType);

        await createAsset(formData);
      }

      navigate("/dashboard/assets");
    } catch (err) {
      setError(err.message || "Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Add Digital Asset
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Asset Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300"
            placeholder="Important Document / Account"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300"
          >
            <option value="Documents">Documents</option>
            <option value="Financial">Financial</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Asset Type */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Asset Type
          </label>
          <select
            name="assetType"
            value={form.assetType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300"
          >
            <option value="TEXT">TEXT</option>
            <option value="LINK">LINK</option>
            <option value="PDF">PDF</option>
            <option value="IMAGE">IMAGE</option>
          </select>
        </div>

        {/* TEXT / LINK Data */}
        {(form.assetType === "TEXT" || form.assetType === "LINK") && (
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Sensitive Data
            </label>
            <textarea
              name="data"
              value={form.data}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300"
              placeholder="Credentials, instructions, notes…"
            />
            <p className="text-xs text-slate-500 mt-1">
              This data is encrypted and visible only to you.
            </p>
          </div>
        )}

        {/* FILE Upload */}
        {(form.assetType === "PDF" || form.assetType === "IMAGE") && (
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Upload File
            </label>
            <input
              type="file"
              name="file"
              accept={
                form.assetType === "PDF"
                  ? "application/pdf"
                  : "image/*"
              }
              onChange={handleChange}
              required
              className="w-full"
            />
            <p className="text-xs text-slate-500 mt-1">
              File will be stored securely and accessible only to you.
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Asset"}
        </button>
      </form>
    </div>
  );
}
