import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Parse URL to get search parameters
  const query = searchParams.get("query");
  const userId = await getTokenData(request);
  console.log("before token data");
  console.log(userId);
  console.log("after token data");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required in headers" },
      { status: 400 }
    );
  }
  if (!query || query.trim() === "") {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  try {
    const users = await User.find({
      _id: { $ne: userId },
      username: { $regex: query, $options: "i" },
      isProfile: false,
      friends: { $ne: [userId] },
    });
    return NextResponse.json(users, { status: 200 }); //users is an array of obj , acess it will users[0].username
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
