import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    //decoding the token id from the cookie
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
    //id is returned
  } catch (error: any) {
    throw new Error(error.message);
  }
};
