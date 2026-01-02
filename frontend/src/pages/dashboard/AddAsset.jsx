import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAsset } from "../../services/assetService";

export default function AddAsset() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Email",
    type: "Account",
    data: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await createAsset({
      title: form.title,
      category: form.category,
      assetType: form.type, 
      data: form.data,
    });

    navigate("/dashboard/assets");
  } catch (err) {
    setError("Failed to create asset");
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
            placeholder="Primary Email Account"
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
            <option>Email</option>
            <option>Finance</option>
            <option>Social</option>
            <option>Documents</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Asset Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300"
          >
            <option>Account</option>
            <option>File</option>
            <option>Note</option>
          </select>
        </div>

        {/* Sensitive Data */}
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
            placeholder="Username, password, recovery info…"
          />
          <p className="text-xs text-slate-500 mt-1">
            This information will be encrypted before storage.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
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
