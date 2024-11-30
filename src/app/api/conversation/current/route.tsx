import { NextRequest, NextResponse } from "next/server";
import Conversation from "server/MessageSchema";
import { connectDB } from "server/server";
import { getTokenData } from "src/app/helper/getTokenData";

connectDB();

export async function GET(request: NextRequest) {
  const userId = await getTokenData(request);
  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  console.log(userId);
  try {
    const conversations = await Conversation.find({
      participants: userId,
      closed: false,
    });

    if (conversations.length === 0) {
      return NextResponse.json(
        { message: "No unclosed conversations found" },
        { status: 200 }
      );
    }

    return NextResponse.json(conversations, { status: 200 });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json(
      { message: "conversation not found" },
      { status: 400 }
    );
  }
}
