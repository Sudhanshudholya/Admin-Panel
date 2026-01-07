import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../features/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

 

  // ✅ Send OTP
  const handleSendOtpHandler = async () => {
    if (!email) return toast.error("Please enter email");

    try {
      setLoading(true);
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
      // setStep(2);
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
