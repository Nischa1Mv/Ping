import { connectDB } from "server/server";
import { NextRequest, NextResponse } from "next/server";
import Conversation from "server/MessageSchema";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { conversationId } = requestBody;
  const userId = await getTokenData(request);

  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  if (!conversationId) {
    return NextResponse.json(
      { message: "conversation Id not found" },
      { status: 400 }
    );
  }
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { message: "conversation not found" },
        { status: 404 }
      );
    }
    const participantIndex = conversation.participants.findIndex(
      (participant: any) => participant.userId.toString() === userId
    );
    if (participantIndex === -1) {
      return NextResponse.json(
        { message: "User not in conversation" },
        { status: 400 }
      );
    }
    conversation.participants[participantIndex].status = "closed";

    await conversation.save();
    return NextResponse.json(
      { message: "conversation removed" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "conversation not removed" },
      { status: 400 }
    );
  }
}
