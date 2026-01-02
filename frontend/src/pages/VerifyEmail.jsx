import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    api
      .get(`/auth/verify-email/${token}`)
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl border max-w-md text-center">
        {status === "verifying" && <p>Verifying your email…</p>}
        {status === "success" && (
          <p className="text-green-600">
            Email verified! Redirecting to login…
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600">
            Verification link is invalid or expired.
          </p>
        )}
      </div>
    </div>
  );
}
