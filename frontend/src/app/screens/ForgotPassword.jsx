import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../features/forgotPasswordSlice";
import { useVerifyOtpMutation } from "../features/verifyOtpSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate()

  const otpRefs = useRef([]);

  // Clear OTP
  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);

    // focus first input
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  };

  // ✅ Send OTP
  const handleSendOtpHandler = async () => {
    if (!email) return toast.error("Please enter email");

    clearOtp();

    try {
      setLoading(true);
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
      setStep(2);
    } catch (err) {
      toast.error(err?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ OTP Change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  //  BACKSPACE SUPPORT
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Enter valid 6 digit OTP");
    }
    try {
      setLoading(true); // 🔥 loader ON
      const res = await verifyOtp({ email, otp: otpValue }).unwrap();
      console.log(res, "FORGOT")
      toast.success(res.message || "OTP verified successfully ✅");
      // setStep(3);
      navigate("/reset-password",  {
  state: { email }, // 🔥 MOST IMPORTANT
})
    } catch (error) {
      console.log(error ,"EFP")
      toast.error(error?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false); // 🔥 loader OFF
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                className="w-full cursor-pointer"
                onClick={handleSendOtpHandler}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground text-center">
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
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              <Button
                className="w-full mt-4"
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
                className="text-sm text-indigo-600 hover:underline w-full text-center mt-2 cursor-pointer"
                onClick={handleSendOtpHandler}
              >
                Resend OTP
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
