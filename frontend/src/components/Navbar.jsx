import React from "react";
import { BookA, BookOpen, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/app/features/logoutSlice";
import { clearUser } from "@/app/services/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux se user
  const user = useSelector((state) => state.user.user); // replace with Redux state

  const [logout, {isLoading}] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      // dispatch any additional actions if needed
      dispatch(clearUser())
      toast.success("User logout successfully")
      navigate("/login");
    }catch (error) {
      console.error("Logout failed:", error);
    }
}

  return (
    <nav className="w-full h-16 bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <BookOpen className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-gray-800">NoteBook</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button
              onClick={() => navigate("/features")}
              className="hover:text-green-600"
            >
              Features
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="hover:text-green-600"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-green-600"
            >
              About
            </button>
          </div>

          {/* Auth Section */}
          {!user ? (
            <Button
              onClick={() => navigate("/login")}
              className="bg-green-600 hover:bg-green-500"
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.avatar}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/books")}>
                  <BookA className="h-4 w-4 mr-2" />
                  Book
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={logoutHandler}
                  className="text-red-600"
                    disabled={isLoading}
                >
                  <LogOut className="h-4 w-4 mr-2 " />
                 {isLoading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
