import express from "express"
import {forgotPassword, loginUser, logoutUser, registerUser, resetPassword, verificationEmail, verificationOTP } from "../controllers/user.controller.js"
import { userSchema, validateUser } from "../validation/user.validation.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", validateUser(userSchema), registerUser)
router.post("/verify-email", verificationEmail)
router.post("/login", loginUser)
router.post("/logout",auth , logoutUser)
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verificationOTP)
router.post("/reset-password" , resetPassword)

export default router