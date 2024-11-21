import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    //Have to configure mail server

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: "<h1>Click on the link to verify your email</h1>",
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    mailResponse;
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
