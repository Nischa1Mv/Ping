import { connectDB } from "server/server";
import { NextRequest, NextResponse } from "next/server";
import Conversation from "server/MessageSchema";

connectDB();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { conversationId } = requestBody;
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
    if (conversation.closed) {
      return NextResponse.json(
        { message: "conversation already closed" },
        { status: 400 }
      );
    }
    conversation.closed = true;
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
