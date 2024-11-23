import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { displayName, username, profilePicture, banner, bio } = requestBody;

    const userId = await getTokenData(request);
    const user = await User.findById({ _id: userId }).select("-password");

    user.displayName = displayName;
    user.username = username;
    user.profilePicture = profilePicture;
    user.banner = banner;
    user.bio = bio;

    await user.save();
    return NextResponse.json(
      { message: "Profile is completed", Success: true },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
