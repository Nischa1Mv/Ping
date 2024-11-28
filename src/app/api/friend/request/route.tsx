import { NextRequest, NextResponse } from "next/server";
import FriendRequest from "server/FriendReq";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";
connectDB();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { receiverId } = requestBody;
  const senderId = getTokenData(request);
  if (!receiverId || !senderId) {
    return NextResponse.json(
      { error: "Receiver or Sender not found" },
      { status: 400 }
    );
  }
  try {
    //if already exits then return error
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    if (existingRequest) {
      return NextResponse.json(
        { error: "A Pending Friend request already Exists" },
        { status: 400 }
      );
    }
    //store the data of the req like sender and receiver in friend request collection
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    //store the id of the friend request  in the senderRquests of sender
    await User.findByIdAndUpdate(senderId, {
      $push: { sentRequests: friendRequest._id },
    });

    //store the id of the friend request  in the receiverRequests of receiver
    await User.findByIdAndUpdate(receiverId, {
      $push: { receivedRequests: friendRequest._id },
    });

    return NextResponse.json(friendRequest, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
