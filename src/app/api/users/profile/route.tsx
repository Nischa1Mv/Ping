import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findById({ _id: userId }).select("-password");
    const requestBody = await request.json();

    const { displayName, username, profilePicture, banner, bio } = requestBody;
    if (!displayName || !username || !bio) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    user.displayName = displayName;
    user.username = username;

    if (profilePicture) user.profilePicture = profilePicture;
    if (banner) user.banner = banner;
    user.bio = bio;
    if (user.isProfile === true) {
      user.isProfile = false;
      console.log("isProfileis set it undefned");
    }

    await user.save();
    return NextResponse.json(
      { message: "Profile is completed", Success: true, user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
