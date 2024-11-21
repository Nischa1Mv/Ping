import { connectDB } from "server/server";
import { NextRequest, NextResponse } from "next/server";
import User from "server/UserModal";
import bcryptjs from "bcryptjs";
import { sendMail } from "../../../helper/mail";
connectDB();

export async function post(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    console.log(requestBody);

    //if user already exists, then why signup
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //saving user to database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verfication mail
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
