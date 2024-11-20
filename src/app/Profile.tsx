import React, { useState } from "react";
import ImageOverlay from "./imageOverlay";
import Image from "next/image";

interface ProfileProps {
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile({ setIsProfileOpen }: ProfileProps) {
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const ProfilePicture =
    "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/379619630_6949750128379753_6172259427711619252_n.jpg?ccb=11-4&oh=01_Q5AaIO2kBGB6JkOO1GOwTcvG9XIDmY-5Vitx5Oo9Mv7P_lPp&oe=674A8A31&_nc_sid=5e03e0&_nc_cat=108";
  return (
    <>
      {showImageOverlay && (
        <div
          className="w-screen h-screen bg-[rgba(25,26,34,0.6)] Z-50 fixed inset-0  flex justify-center items-center"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay src={ProfilePicture} />
        </div>
      )}
      <div className="w-full border  ">
        <div className="flex gap-4">
          <svg
            onClick={() => {
              setIsProfileOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
          </svg>
          <Image
            onClick={() => {
              setShowImageOverlay(true);
            }}
            src={ProfilePicture}
            height={40}
            width={40}
            alt="ProfilePicture"
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
