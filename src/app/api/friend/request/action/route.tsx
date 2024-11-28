import { NextRequest, NextResponse } from "next/server";
import FriendRequest from "server/FriendReq";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function POST(request: NextRequest) {
  const requestbody = await request.json();
  const { friendRequestId, action } = requestbody;
  console.log(requestbody);
  if (!friendRequestId || !action)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const userId = getTokenData(request);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const response = await FriendRequest.findById(friendRequestId);
    if (!response)
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );

    if (
      response.sender.toString() !== userId &&
      response.receiver.toString() !== userId
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const sender = await User.findById(response.sender);
    const receiver = await User.findById(response.receiver);

    if (action == "accept") {
      // if already friends
      if (
        sender.friends.includes(receiver._id) ||
        receiver.friends.includes(sender._id)
      ) {
        await FriendRequest.findById(friendRequestId);
        return NextResponse.json(
          { message: "Already friends" },
          { status: 400 }
        );
      }

      await User.findByIdAndUpdate(response.sender, {
        $push: { friends: response.receiver },
      });

      await User.findByIdAndUpdate(response.receiver, {
        $push: { friends: response.sender },
      });

      await FriendRequest.findByIdAndDelete(friendRequestId);

      return NextResponse.json({ message: "Request accepted" });
    } else if (action == "reject") {
      await FriendRequest.findByIdAndDelete(friendRequestId);

      return NextResponse.json(
        { message: "Request Rejected" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
