import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //request data from the json body
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { error: "User with the email was not found" },
        { status: 404 }
      );
    }
    // Validate password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    // Login successful

    // Create a JWT token
    const tokenPayload = {
      id: user._id,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    //token is created with respect to the payload data

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    });

    // token is sent in the cookies
    //httpsOnly is so that the token is not accessible by user or js but only by the server
    response.cookies.set("token", token, { httpOnly: true });
    return response;

    //response is sent and user is logged in
  } catch (error: any) {
    //boom error!
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
