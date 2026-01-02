import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { saveAuth } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await registerUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      // Save JWT + user
      saveAuth(res.data.token, res.data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
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
          Create your account
        </h1>
        <p className="text-slate-500 mb-8">
          Plan what happens to your digital life — securely
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

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
              placeholder="Minimum 8 characters"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Re-enter password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account securely →"}
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
            Privacy-first by design
          </span>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
