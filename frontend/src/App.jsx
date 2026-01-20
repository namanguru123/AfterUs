import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import VerifyEmail from "./pages/VerifyEmail";

import DashboardLayout from "./components/layout/DashboardLayout";
import DHome from "./pages/dashboard/DHome";
import Assets from "./pages/dashboard/Assets";
import AddAsset from "./pages/dashboard/AddAsset";
import AssetDetails from "./pages/dashboard/AssetDetails";
import EditAsset from "./pages/dashboard/EditAsset";
import TrustedPeople from "./pages/dashboard/TrustedPeople";
import Conditions from "./pages/dashboard/Conditions";
import ActivityLogs from "./pages/dashboard/ActivityLogs";
import Settings from "./pages/dashboard/Settings";
import VerifyTrusted from "./pages/dashboard/VerifyTrusted";
import ConditionDetails from "./pages/dashboard/ConditionDetails";

import SharedWithMe from "./pages/SharedWithMe";
import SharedAssetView from "./pages/SharedAssetView";

import ProtectedRoute from "./context/ProtectedRoute";

import "./styles/buttons.css";

export default function App() {
  const [summary, setSummary] = useState({
    assets: 0,
    trustedPeople: 0,
    activeConditions: 0,
  });

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<DHome summary={summary} />} />

          {/* Assets */}
          <Route path="assets" element={<Assets />} />
          <Route path="assets/new" element={<AddAsset />} />
          <Route path="assets/:id" element={<AssetDetails />} />
          <Route path="assets/:id/edit" element={<EditAsset />} />

          {/* Trusted People */}
          <Route path="people" element={<TrustedPeople />} />
          <Route path="verify-trusted" element={<VerifyTrusted />} />

          {/* Conditions */}
          <Route path="conditions" element={<Conditions />} />
          <Route path="conditions/:id" element={<ConditionDetails />} />

          {/* Activity & Settings */}
          <Route path="activity" element={<ActivityLogs />} />
          <Route path="settings" element={<Settings />} />

          {/* Shared Access */}
          <Route path="shared-with-me" element={<SharedWithMe />} />
          <Route path="shared/:id" element={<SharedAssetView />} />
        </Route>

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>
    </BrowserRouter>
  );
}
