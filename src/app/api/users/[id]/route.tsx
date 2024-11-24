import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../server/server";
import User from "server/UserModal";
connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
