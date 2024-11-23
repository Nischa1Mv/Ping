import { connectDB } from "server/server";
import { NextRequest, NextResponse } from "next/server";
import User from "server/UserModal";
import bcryptjs from "bcryptjs";
import { sendMail } from "../../../helper/mail";
import { faker } from "@faker-js/faker";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log(requestBody);

    //if user already exists, then why signup
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const randomUsername = `${firstName}${lastName}${Math.floor(
      Math.random() * 10000
    )}`;

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //saving user to database
    const newUser = new User({
      email,
      username: randomUsername,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verfication mail
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    //resopnse json is sent
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
