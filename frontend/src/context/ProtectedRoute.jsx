import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthSkeleton from "../components/skeletons/AuthSkeleton";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("AUTH STATE:", { user, loading });

  // ⏳ Wait for auth check to finish
  if (loading) {
    return <AuthSkeleton />;
  }

  // 🔐 Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated
  return children;
};

export default ProtectedRoute;
