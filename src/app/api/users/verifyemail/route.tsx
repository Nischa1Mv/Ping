import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
connectDB();

export async function POST(request: NextRequest) {
  try {
    //get token from request body
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    //find user with token and cheack if its expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    //if user not found or token expired
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    console.log(user);

    //once verifised remove token and expiry from the model and set isVerified to true
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    //save the data in the database
    await user.save();

    //return response
    return NextResponse.json(
      { message: "Email verified Succesfully", Success: true },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
