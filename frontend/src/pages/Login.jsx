import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);


        window.location.href = "/dashboard";

    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";

      setError(message);
      setShowResend(message.toLowerCase().includes("verify"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await api.post("/auth/resend-verification", {
        email: form.email,
      });
      setResendMessage("Verification email sent. Please check your inbox.");
    } catch {
      setResendMessage("Failed to resend verification email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        <h1 className="text-3xl font-serif mb-2">Welcome back</h1>
        <p className="text-slate-500 mb-6">
          Sign in to manage your digital legacy
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {showResend && (
            <button
              type="button"
              onClick={handleResendVerification}
              className="text-sm text-indigo-600 underline"
            >
              Resend verification email
            </button>
          )}

          {resendMessage && (
            <p className="text-sm text-green-600">{resendMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
