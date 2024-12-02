"use client";
import Image from "next/image";
import React from "react";

function SenderBubble({ message }: { message: any }) {
  return (
    <div className="flex gap-1 ">
      <div>
        <Image
          className="rounded-full aspect-square"
          src={"https://avatars.githubusercontent.com/u/118107697?v=4&size=64"}
          height={30}
          width={30}
          alt="Sender Profile Picture"
        />
      </div>
      <div className="border h-fit px-4 py-1 rounded-xl rounded-tl-md mt-2  chatBox-sender ">
        {message}
      </div>
    </div>
  );
}

export default SenderBubble;
