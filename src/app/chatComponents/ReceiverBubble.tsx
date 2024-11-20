"use client";
import React from "react";
import Image from "next/image";

function ReceiverBubble() {
  return (
    <div className="flex gap-1 justify-end ">
      <div className="border h-fit px-4 py-1 rounded-xl rounded-tl-md mt-2  chatBox-receiver ">
        Yo ! i am making this amazing chat app
      </div>
      <div>
        <Image
          className="rounded-full aspect-square"
          src={"https://avatars.githubusercontent.com/u/118107697?v=4&size=64"}
          height={30}
          width={30}
          alt="Receiver Profile Picture"
        />
      </div>
    </div>
  );
}

export default ReceiverBubble;
