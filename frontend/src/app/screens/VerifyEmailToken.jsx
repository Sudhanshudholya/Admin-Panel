import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../features/verifyEmailSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyEmailToken = () => {
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();

  const [status, setStatus] = useState("loading"); 
  // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail().unwrap();
        setStatus("success");
        setMessage(res.message || "Email verified successfully");

        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err?.data?.message || "Verification failed");
      }
    };

    verify();
  }, [verifyEmail, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md text-center shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 py-8">
          {/* Loading */}
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
              <p className="text-sm text-muted-foreground">{message}</p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <CheckCircle2 className="h-14 w-14 text-green-500" />
              <p className="text-green-600 font-medium">{message}</p>
              <p className="text-sm text-muted-foreground">
                Redirecting to login page...
              </p>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <XCircle className="h-14 w-14 text-red-500" />
              <p className="text-red-600 font-medium">{message}</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 text-sm text-indigo-600 hover:underline"
              >
                Go to Login
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailToken;
