import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });

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
    return NextResponse.json(
      {
        message: "User logged in successfully",
        success: true,
        //have to return the jwt token insted of User
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle server errors
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
