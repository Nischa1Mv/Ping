import { NextRequest, NextResponse } from "next/server";
import FriendRequest from "server/FriendReq";
import { connectDB } from "server/server";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function GET(request: NextRequest) {
  const userId = getTokenData(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await FriendRequest.find({ receiver: userId });
    if (response.length === 0) {
      return NextResponse.json(
        { message: "No friend request received" },
        { status: 404 }
      );
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
