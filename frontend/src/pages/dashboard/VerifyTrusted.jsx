import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";

export default function VerifyTrusted() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/trusted-people/verify?token=${token}`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 text-center">
        {status === "loading" && (
          <p className="text-slate-600">Verifying access…</p>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold text-green-600 mb-2">
              Verification Successful
            </h1>
            <p className="text-slate-600">
              You have been verified as a trusted person on AfterUs.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold text-red-600 mb-2">
              Verification Failed
            </h1>
            <p className="text-slate-600">
              This verification link is invalid or has expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
