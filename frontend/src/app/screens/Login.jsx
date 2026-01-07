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
import { Eye, EyeOff, Mail, Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/loginSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../services/userSlice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(formData).unwrap();

      if (res) {
        dispatch(setUser(res.user)); // 🔥 Redux update
        toast.success("Login successful 🎉");
        navigate("/");
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error", error);

      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Invalid email or password");
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
            Login to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
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

          {/* Password */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="password">Password</Label>

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

          {/* ✅ Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-11 text-base mt-6 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
