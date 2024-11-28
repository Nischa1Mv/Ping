import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const userId = await getTokenData(request);

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required in headers" },
      { status: 400 }
    );
  }
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).populate("friends", "username profilePicture");
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
