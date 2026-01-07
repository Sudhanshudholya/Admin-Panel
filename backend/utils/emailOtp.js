import nodemailer from "nodemailer"
import "dotenv/config"
import { emailOTPTemplate } from "./emailOtpTemplate.js"

export const emailOtp = async (email, otp) => {
    const transport =  nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
    })

    const otpConfigurations = {
        from : process.env.MAIL_USER,
        to: email,
        subject: "OTP For reset password",
        html: emailOTPTemplate(otp)
    }

     await transport.sendMail(otpConfigurations, function(error, info){
        if(error){
            console.error("❌ Email send failed", error);
            // throw new Error(error)
        }
    })
}