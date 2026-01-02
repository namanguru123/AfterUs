import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssetById, updateAsset } from "../../services/assetService";

export default function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAssetById(id).then((data) => {
      setForm({
        title: data.title,
        category: data.category,
        assetType: data.assetType,
        data: data.data,
      });
    });
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updateAsset(id, form);
    navigate(`/dashboard/assets/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Edit Asset</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full mb-4 border p-3 rounded"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full mb-4 border p-3 rounded"
      >
        <option>Email</option>
        <option>Finance</option>
        <option>Social</option>
        <option>Documents</option>
      </select>

      <select
        name="assetType"
        value={form.assetType}
        onChange={handleChange}
        className="w-full mb-4 border p-3 rounded"
      >
        <option>Account</option>
        <option>File</option>
        <option>Note</option>
      </select>

      <textarea
        name="data"
        value={form.data}
        onChange={handleChange}
        rows={4}
        className="w-full mb-4 border p-3 rounded"
      />

      <button
        disabled={loading}
        className="bg-slate-900 text-white px-6 py-3 rounded"
      >
        {loading ? "Updating..." : "Update Asset"}
      </button>
    </form>
  );
}
