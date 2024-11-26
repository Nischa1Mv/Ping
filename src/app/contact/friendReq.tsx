import Image from "next/image";
import React from "react";
interface friendReqProps {
  profilePicture: string;
  sent: boolean;
  username: string;
}

function FriendReq({ profilePicture, sent, username }: friendReqProps) {
  return (
    <div className="flex flex-col w-[85%] bg-[#191a22] py-2 px-4 rounded-xl m-auto">
      <li className="flex gap-4 hover:text-[#caca8f] py-2 cursor-pointer text-xs bg-[#191a22] hover:bg-[#1b1c29] px-4 rounded-lg  items-center font-semibold tracking-wider ">
        <Image
          className="rounded-full aspect-square"
          src={profilePicture || "/default-profile-picture.jpg"}
          height={25}
          width={25}
          alt="profilePicture"
        />
        @ {username}
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
