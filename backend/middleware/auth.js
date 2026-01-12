// import jwt from "jsonwebtoken";
// import "dotenv/config";
// import { User } from "../models/user.model.js";

// export const auth = async (req, res, next) => {
//   try {
//     const token = req?.cookies?.accessToken;


//     // ❌ token nahi mila
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, token missing",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("first", error)
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };


import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Token from Authorization header (Google flow)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ Token from cookie (normal login flow)
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
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

    // ❌ REMOVE THIS FOR GOOGLE LOGIN
    // if (!user.isLoggedIn) { ... }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
