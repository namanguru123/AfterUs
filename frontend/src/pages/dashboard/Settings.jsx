import { getUserDetails, deleteUser } from "../../services/userService";
import { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUserDetails().then(setUserDetails);
  }, []);

  console.log(userDetails);



  const handleDeleteAccount = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete your account?\n\nThis action is irreversible."
      );

      if (!confirmed) return;

      await deleteUser();
      setUserDetails(null);

      alert("Your account has been deleted.");
      navigate("/", { replace : true })

      
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account and security preferences
        </p>
      </div>

      {/* Account Settings */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Account</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name</span>
            <span className="font-medium">{userDetails?.fullName || "Loading..."}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-medium">{userDetails?.email || "Loading..."}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Plan</span>
            <span className="font-medium text-green-600">{userDetails?.plan || "Loading..."}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Verified</span>
            <span className="font-medium text-green-600">{userDetails?.isVerified ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3">Security</h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">End-to-End Encryption</p>
              <p className="text-gray-500">
                Your sensitive data is encrypted before storage using AES-256 Encryption.
              </p>
            </div>
            <span className="text-green-600 font-semibold">Enabled</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">JWT Authentication</p>
              <p className="text-gray-500">
                Secure session-based authentication
              </p>
            </div>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Danger Zone
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          These actions are irreversible. Proceed with caution.
        </p>

        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 text-sm bg-red-500 text-white-400 rounded-lg"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
