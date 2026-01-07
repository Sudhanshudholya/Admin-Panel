import nodemailer from "nodemailer";
import "dotenv/config";
import { emailTemplate } from "./emailTemplate.js";

export const emailVerification = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, // 👈 APP PASSWORD
      },
    });

  

    const verifyLink = `${process.env.CLIENT_URI}/verify-email-link`;

    await transporter.sendMail({
      from: `"My App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      html: emailTemplate(verifyLink),
    });

  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error; // IMPORTANT
  }
};
