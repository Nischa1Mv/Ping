import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";

connectDB();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Parse URL to get search parameters
  const query = searchParams.get("query");
  if (!query || query.trim() === "") {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    });
    if (users.length === 0)
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    return NextResponse.json(users, { status: 200 }); //users is an array of obj , acess it will users[0].username
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
