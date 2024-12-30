"use client";
import React from "react";
import Image from "next/image";

interface SenderBubbleProps {
  message: string;
  profilePicture: string;
}
function SenderBubble({ message, profilePicture }: SenderBubbleProps) {
  return (
    <div className="flex gap-3 justify-end ">
      <div className="border h-fit px-4 py-1 rounded-xl rounded-tl-md mt-2  chatBox-sender">
        {message}
      </div>
      <div>
        <Image
          className=" w-9 rounded-full aspect-square"
          src={
            profilePicture
              ? profilePicture
              : "./images/default-profile-picture.jpg"
          }
          height={500}
          width={500}
          alt="Receiver Profile Picture"
        />
      </div>
    </div>
  );
}

export default SenderBubble;
