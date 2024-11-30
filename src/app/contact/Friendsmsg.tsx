import Image from "next/image";
import React from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});
interface FriendsmsgProps {
  name: string;
  message?: string;
  avatar?: string;
  username?: string;
}

function Friendsmsg({ name, message, avatar, username }: FriendsmsgProps) {
  return (
    <li className=" cursor-pointer rounded-lg py-2 px-4 bg-[#1f2029] flex gap-4 items-center hover:bg-[#444479] ">
      <div className="min-w-[55px] aspect-square">
        <Image
          src={avatar || "/avatar.jpg"}
          width={55}
          height={55}
          alt="Friend avatar"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col ">
        <h4
          className={`text-lg font-semibold ${kanit.className} text-[#CACA8F]`}
        >
          {name}
          <span className="text-xs font-light text-gray-500">@{username}</span>
        </h4>
        <p className="text-[0.65rem] tracking-wide line-clamp-2 text-gray-300 overflow-hidden text-ellipsis max-h-[50px]">
          {message}
        </p>
      </div>
    </li>
  );
}

export default Friendsmsg;
