import Image from "next/image";
import React from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});
interface FriendsmsgProps {
  chatId: string;
  name: string;
  message?: string[];
  avatar?: string;
  username?: string;
  removeChat: () => void;
  openChat: (chatId: string) => void;
}

function Friendsmsg({
  name,
  message,
  avatar,
  username,
  removeChat,
  openChat,
  chatId,
}: FriendsmsgProps) {
  return (
    <li
      className=" cursor-pointer rounded-lg  pl-4 bg-[#1f2029] flex gap-4 items-center hover:bg-[#444479]  "
      onClick={() => {
        openChat(chatId);
      }}
    >
      <div className="min-w-[55px] aspect-square py-2">
        <Image
          src={avatar || "/avatar.jpg"}
          width={55}
          height={55}
          alt="Friend avatar"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden pb-2 ">
        <h4
          className={` relative text-lg font-semibold ${kanit.className} text-[#CACA8F]`}
        >
          {name}
          <span className="text-xs font-light text-gray-500 justify-end absolute right-0 top-0 bottom-0 ">
            @{username}
          </span>
        </h4>
        <p className="text-[0.65rem] tracking-wide line-clamp-2 text-gray-300 overflow-hidden text-ellipsis max-h-[50px] break-words">
          {message}
        </p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          removeChat();
        }}
        className="relative px-1 rounded-r-lg rounded-l-sm flex text-red-300 h-full items-center justify-center bg-transparent hover:bg-red-600 transition-all duration-300 ease-out transform"
      >
        <div className="absolute inset-0 bg-red-300 transform scale-x-0 origin-right hover:scale-x-100 transition-all duration-500 "></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="currentColor"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </div>
    </li>
  );
}

export default Friendsmsg;
