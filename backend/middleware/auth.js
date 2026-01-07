import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req?.cookies?.accessToken;


    // ❌ token nahi mila
    if (!token) {
      return res.status(409).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isLoggedIn) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("first", error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
