import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "server/UserModal";
import { verificationHTML } from "./verificationLink";
import { resetPasswordHTML } from "./ResetPassword";

const MailTrapUser = process.env.MailTrapUser;
const MailTrapPass = process.env.MailTrapPass;
const domain = process.env.DOMAIN;

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

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: MailTrapUser,
        pass: MailTrapPass,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? verificationHTML(`${domain}/verifyemail?token=${hashToken}`)
          : resetPasswordHTML(`${domain}/resetpassword?token=${hashToken}`),
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    mailResponse;
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};