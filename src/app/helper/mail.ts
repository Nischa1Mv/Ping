import bcryptjs from "bcryptjs";

import nodemailer from "nodemailer";
import User from "server/UserModal";
import { verificationHTML } from "./verificationLink";
import { resetPasswordHTML } from "./ResetPassword";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpires: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "2abe58ba1e257b",
        pass: "********1ca9",
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? verificationHTML(
              `${process.env.DOMAIN}/verifyemail?token=${hashToken}`
            )
          : resetPasswordHTML(
              `${process.env.DOMAIN}/resetpassword?token=${hashToken}`
            ),
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    mailResponse;
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
