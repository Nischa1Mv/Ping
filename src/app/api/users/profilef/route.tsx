import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "server/server";
import User from "server/UserModal";
import { getTokenData } from "src/app/helper/getTokenData";
connectDB();

export async function POST(request: NextRequest) {
  const userId = await getTokenData(request);
  const user = await User.findById({ _id: userId }).select("-password");
  console.log(userId);
  return NextResponse.json({ message: "User Found", data: user });
}
