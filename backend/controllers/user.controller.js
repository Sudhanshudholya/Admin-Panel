import { emailVerification } from "../email/emailVerification.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailOtp } from "../utils/emailOtp.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_KEY, {
      expiresIn: "7d",
    });

    res.cookie("emailVerifyToken", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    emailVerification(token, email);

    newUser.token = token;

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("eee", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const verificationEmail = async (req, res) => {
  try {
    const token = req.cookies?.emailVerifyToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Verification token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    user.isVerified = true;
    user.token = null;

    res.clearCookie("emailVerifyToken", {
      httpOnly: true,
      sameSite: "lax",
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Email is not found",
      });
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({
        success: false,
        message: "Password not match",
      });
    }

    if (user.isVerified !== true) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account than login",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // prod me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error, "dj");
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // ✅ Optional: DB logout flag
    if (req.user?.id) {
      await User.findByIdAndUpdate(req.user.id, {
        isLoggedIn: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    const otp = Math.floor(Math.random() * 900000 + 100000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await emailOtp(email, otp);

    return res.status(200).json({
      success: true,
      message: `OTP successfully sent to your email ${email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "server error",
    });
  }
};

export const verificationOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    
    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }
    
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });


    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(401).json({
        success: false,
        message: "OTP not generate or already verified",
      });
    }

    // 3️⃣ Expiry check
    if (user.otpExpiry.getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired, please request a new one",
      });
    }

    // 4️⃣ OTP match
    if (Number(otp) !== Number(user.otp)) {
      return res.status(400).json({
        success: false,
        mesage: "Invalid OTP, please try again",
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are requires",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password do not match",
      });
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashPassword;
    user.isOtpVerified = false; // reset flag
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "server error",
    });
  }
};
