"use client";
import Image from "next/image";
import React from "react";

interface ReceiverBubbleProps {
  message: string;
  profilePicture: string;
}

function ReceiverBubble({ message, profilePicture }: ReceiverBubbleProps) {
  return (
    <div className="flex gap-3 justify-start ">
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
          alt="Sender Profile Picture"
        />
      </div>
      <div className="border h-fit px-4 py-1 rounded-xl rounded-tl-md mt-2    chatBox-receiver ">
        {message}
      </div>
    </div>
  );
}

export default ReceiverBubble;
