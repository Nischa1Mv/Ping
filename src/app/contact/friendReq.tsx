import Image, { StaticImageData } from "next/image";
import React from "react";
interface friendReqProps {
  profilePicture: StaticImageData;
}

function FriendReq({ profilePicture }: friendReqProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#191a22] py-4 px-4 rounded-xl">
      <li className="flex gap-4 hover:text-[#caca8f]  cursor-pointer bg-[#191a22] hover:bg-[#1b1c29] px-4 rounded-lg py-2 items-center font-semibold tracking-wider text-sm">
        <Image
          className="rounded-full aspect-square"
          src={profilePicture}
          height={25}
          width={25}
          alt="profilePicture"
        />
        @ user.username
      </li>
      <div className="flex gap-4 text-sm">
        <div
          onClick={() => {}}
          className="w-full bg-green-500 text-black flex items-center justify-center rounded-lg cursor-pointer"
        >
          Accept
        </div>{" "}
        <div
          onClick={() => {}}
          className="w-full bg-red-400 text-black flex items-center justify-center rounded-lg cursor-pointer"
        >
          Reject
        </div>
      </div>
    </div>
  );
}

export default FriendReq;
