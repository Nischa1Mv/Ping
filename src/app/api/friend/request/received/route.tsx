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
    // Find friend requests where the user is the receiver
    const response = await FriendRequest.find({ receiver: userId }).populate(
      "sender",
      "username profilePicture"
    ); // Populate sender's info

    if (response.length === 0) {
      return NextResponse.json(
        { message: "No friend request received" },
        { status: 404 }
      );
    }

    // Map over the response and extract the necessary fields
    const receivedRequests = response.map((friendRequest) => ({
      id: friendRequest._id,
      username: friendRequest.sender.username, // Extract sender's username
      profilePicture: friendRequest.sender.profilePicture, // Extract sender's profile picture
    }));

    return NextResponse.json(receivedRequests, { status: 200 });
  } catch (error: any) {
    // Error handling
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
