import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveAuth } from "../utils/auth";
import api from "../api/axios";


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

   
    navigate("/dashboard", { replace: true });
  } catch (err) {
      const message =
      err.response?.data?.message || "Invalid email or password";

      setError(message);

     
      if (message.toLowerCase().includes("verify")) {
        setShowResend(true);
      } else {
        setShowResend(false);
      }
    }finally {
    setLoading(false);
  }
};


const handleResendVerification = async () => {
  try {
    await api.post("/auth/resend-verification", {
      email: form.email,
    });

    setResendMessage("Verification email sent. Please check your inbox.");
  } catch (err) {
    setResendMessage("Failed to resend verification email.");
  }
};


  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        {/* Logo */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-semibold text-slate-900">
              AfterUs
            </span>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-serif text-slate-900 mb-2">
          Welcome back
        </h1>
        <p className="text-slate-500 mb-8">
          Sign in to manage your digital legacy
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {showResend && (
            <div className="mt-2 text-sm">
              <button
                type="button"
                onClick={handleResendVerification}
                className="text-indigo-600 hover:underline"
              >
                Resend verification email
              </button>

              {resendMessage && (
                <p className="mt-1 text-green-600">
                  {resendMessage}
                </p>
              )}
            </div>
          )}


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in securely →"}
          </button>
        </form>

        {/* Trust indicators */}
        <div className="mt-6 flex gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            End-to-end encrypted
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Zero-knowledge
          </span>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
