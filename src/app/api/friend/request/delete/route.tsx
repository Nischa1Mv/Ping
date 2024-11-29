import { NextRequest, NextResponse } from "next/server";
import FriendRequest from "server/FriendReq";
import { connectDB } from "server/server";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { friendRequestId } = requestBody;
  if (!friendRequestId) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const userId = getTokenData(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const FriendReq = await FriendRequest.findById(friendRequestId);
    if (!FriendReq) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }
    if (FriendReq.sender.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await FriendRequest.findByIdAndDelete(friendRequestId);
    return NextResponse.json({ message: "Request deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting friend request:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
