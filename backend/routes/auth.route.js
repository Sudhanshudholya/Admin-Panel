import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { auth } from "../middleware/auth.js";

const router = express.Router();

//Step-1 Redirect to google login

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))

router.get("/google/callback", 
    passport.authenticate("google", {session: false}),

    (req, res) =>{
        try {
            const token = jwt.sign({id: req.user._id, email: req.user.email}, process.env.JWT_ACCESS_KEY, {expiresIn: "7d"} )

            res.redirect(`${process.env.CLIENT_URI}/auth-success?token=${token}`)
        } catch (error) {
            console.log("Google login failed", error)
            res.redirect(`${process.env.CLIENT_URI}/login?error=google_failed`)
        }
    }

)

router.get("/me", auth, (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
})

export default router