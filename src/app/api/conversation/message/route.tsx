import { connectDB } from "server/server";
import { NextRequest, NextResponse } from "next/server";
import Conversation from "server/MessageSchema";

connectDB();

export async function GET(request: NextRequest) {
  try {
    // Use query parameters to extract the `conversationId`
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { message: "conversationId not found" },
        { status: 400 }
      );
    }

    const Messages = await Conversation.findOne({ conversationId });
    if (!Messages) {
      return NextResponse.json(
        { message: "No messages found" },
        { status: 404 }
      );
    }

    return NextResponse.json(Messages.messages, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
