import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyOtpMutation } from "../features/verifyOtpSlice";
import { useForgotPasswordMutation } from "../features/forgotPasswordSlice";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [verifyOtp] = useVerifyOtpMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  // 🔒 Safety check
  if (!email) {
    toast.error("Email missing, please try again");
    navigate("/forgot-password");
    return null;
  }

  // 🔥 Clear OTP
  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    try {
      clearOtp();
      setLoading(true);
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP resent successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP Change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Backspace support
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Enter valid 6 digit OTP");
    }

    try {
      setLoading(true);
      const res = await verifyOtp({ email, otp: otpValue }).unwrap();
      toast.success(res.message || "OTP verified successfully");

      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-center text-muted-foreground">
            Enter the 6-digit OTP sent to
            <span className="font-medium text-foreground"> {email}</span>
          </p>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>

          <Button
            className="w-full"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying OTP...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>

          <button
            onClick={handleResendOtp}
            disabled={loading}
            className="text-sm text-indigo-600 hover:underline w-full text-center"
          >
            Resend OTP
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
