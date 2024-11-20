"use client";
import { useEffect, useState } from "react";
import Chat from "./chatComponents/chat";
import ImageOverlay from "./imageOverlay";
import { useRouter } from "next/navigation";
import { useLogin } from "./Context";

export default function Home() {
  const ProfilePicture =
    "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/379619630_6949750128379753_6172259427711619252_n.jpg?ccb=11-4&oh=01_Q5AaIO2kBGB6JkOO1GOwTcvG9XIDmY-5Vitx5Oo9Mv7P_lPp&oe=674A8A31&_nc_sid=5e03e0&_nc_cat=108";

  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const router = useRouter();
  const { isLogin, setIsLogin } = useLogin();
  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  return (
    <>
      <div className="relative">
        {showImageOverlay && (
          <div
            className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
            onClick={() => {
              setShowImageOverlay(false);
            }}
          >
            <ImageOverlay src={ProfilePicture} />
          </div>
        )}
        <Chat setShowImageOverlay={setShowImageOverlay} />
      </div>
    </>
  );
}
