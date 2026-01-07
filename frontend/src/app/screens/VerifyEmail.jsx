import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader } from "lucide-react";

export function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 text-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Verify your email
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-5 py-10">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100">
            <Mail className="h-8 w-8 text-indigo-600" />
          </div>

          {/* Text */}
          <p className="text-lg font-semibold">
            Check your inbox 📩
          </p>

          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            We’ve sent a verification link to your email address.  
            Please click the link in the email to verify your account.
          </p>

          {/* Loader (optional UX touch) */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Loader className="h-4 w-4 animate-spin" />
            Waiting for email verification...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
