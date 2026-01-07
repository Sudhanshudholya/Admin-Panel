import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../features/resetPasswordSlice";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ email from route state
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
  if (!email) {
    navigate("/login");
  }
}, [email, navigate]);


  const resendPasswordHandler = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await resetPassword({
        email,
        newPassword,
        confirmPassword,
      }).unwrap();

      toast.success(res?.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Create a new password for your account
        </p>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 pr-10 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 pr-10 border rounded-lg"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          onClick={resendPasswordHandler}
          disabled={loading}
          className="w-full text-white py-2 rounded-lg cursor-pointer"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
