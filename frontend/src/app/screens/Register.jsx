import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Loader } from "lucide-react";
import { useRegisterMutation } from "../features/registerSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [register] = useRegisterMutation();

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(formData).unwrap();
      console.log(res, "shbdhbd")
      if (res) {
        toast.success("Account created successfully 🎉");
        navigate("/verify-email");
      }
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error", error);

      // 👇 USER ALREADY EXISTS
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-600 to-gray-600 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Creating your account
          </CardTitle>
          {/* <CardDescription>Login to continue to your dashboard</CardDescription> */}
        </CardHeader>

        <CardContent>
          {/* Full name  */}
          <div className="space-y-2">
            <Label htmlFor="full name">Full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="full name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <br />

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                required
              />
            </div>
          </div>

           <br />

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot Password
                </button> */}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

           <br />

          {/* Login Button */}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-11 text-base cursor-pointer"
          >
            {loading ? (
              <>
                <Loader className="min-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline" onClick={()=>navigate("/login")}>
              Login
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
