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
      { message: "User ID or Friend ID not found" },
      { status: 400 }
    );
  }

  try {
    const participants = [userId, friendId].sort();

    const existingConversation = await Conversation.findOne({
      $and: [
        { "participants.userId": participants[0] }, // the first userId
        { "participants.userId": participants[1] }, // the second friendId
      ],
    });

    if (existingConversation) {
      console.log("Updating conversation status");
      await Conversation.findOneAndUpdate(
        {
          conversationId: existingConversation.conversationId,
          "participants.userId": userId, // Match the participant by userId
        },
        {
          $set: {
            "participants.$.status": "active", // update the status field
          },
        }
      );
      return NextResponse.json(
        {
          message: "conversation already exists",
          conversation: existingConversation,
        },
        { status: 200 }
      );
    }

    // If no existing conversation, create a new conversation
    const conversation = new Conversation({
      participants: [
        { userId, status: "active" },
        { userId: friendId, status: "closed" },
      ],
    });

    await conversation.save();

    return NextResponse.json(
      { message: "Conversation created", conversation: conversation },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Error in creating or updating conversation",
        error: err.message,
      },
      { status: 400 }
    );
  }
}
