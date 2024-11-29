import { NextRequest, NextResponse } from "next/server";
import Conversation from "server/MessageSchema";
import { connectDB } from "server/server";
import { getTokenData } from "src/app/helper/getTokenData";
connectDB();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const userId = getTokenData(request);
  const { friendId } = requestBody;
  if (!userId || !friendId) {
    return NextResponse.json(
      { message: "user Id or FriendId not found" },
      { status: 400 }
    );
  }
  try {
    const participants = [userId, friendId].sort();

    // Check if a conversation already exists between these two users
    const existingConversation = await Conversation.findOne({
      participants: { $all: participants },
    });
    //if existing then return the conversation

    if (existingConversation) {
      existingConversation.closed = false;
      await existingConversation.save();
      return NextResponse.json(
        { message: "conversation already exists" },
        { status: 200 }
      );
    }

    //create new conversation
    const conversation = new Conversation({
      participants,
    });

    await conversation.save();
    return NextResponse.json(
      { message: "conversation created" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "conversation not created" },
      { status: 400 }
    );
  }
}
