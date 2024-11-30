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

  try {
    // Fetch all unclosed conversations involving the current user
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

    // Extract conversation IDs
    const conversationIds = conversations.map((conv) => conv._id);

    // Aggregate to join participant data with user collection
    const result = await Conversation.aggregate([
      { $match: { _id: { $in: conversationIds } } },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "participants", // Field in Conversation (array of IDs)
          foreignField: "_id", // Field in Users
          as: "participantDetails", // Output array with matched user details
        },
      },
    ]);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error fetching conversations:", err);
    return NextResponse.json(
      { message: "Error fetching conversations" },
      { status: 500 }
    );
  }
}
