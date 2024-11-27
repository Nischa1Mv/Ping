import React, { useState } from "react";
import { Kanit } from "next/font/google";
import profilePicture from "./../../../public/placeholderPfp.jpeg";
import FriendReq from "./friendReq";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function ContactHeader() {
  const [isSearch, setIsSearch] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div
      className={`flex items-center justify-start  font-semibold  gap-4 p-4 `}
    >
      <span
        className={`${kanit.className} text-5xl flex gap-3 text-[#CACA8F] `}
      >
        Ping
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
        </svg>
      </span>
      <span className="grow"></span>
      <span className="flex gap-2">
        {isSearch && (
          <input
            className={`  bg-transparent tracking-widest text-sm focus:outline-none border-b-2 border-[#CACA8F] text-[#CACA8F`}
            type="search"
            placeholder="Search Friends..."
          />
        )}
        <svg
          onClick={() => {
            setIsSearch(!isSearch);
          }}
          className={`${isSearch ? "text-[#CACA8F]" : "text-[#8F8FCA]"}
           hover:text-[#CACA8F]`}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </span>
      <span className="relative">
        <svg
          className="text-[#8F8FCA] hover:text-[#CACA8F]
          "
          onClick={() => {
            setShowFriends(!showFriends);
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
        </svg>
        {showFriends && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 
             h-[400px] w-[300px] overflow-x-hidden overflow-y-auto flex flex-col 
             gap-4 py-2 z-50 px-4 bg-[rgba(33,34,46,0.9)] rounded-xl scrollbar-default"
          >
            {" "}
            <FriendReq profilePicture={profilePicture} />
            <FriendReq profilePicture={profilePicture} />
            <FriendReq profilePicture={profilePicture} />
            <FriendReq profilePicture={profilePicture} />
            <FriendReq profilePicture={profilePicture} />
          </div>
        )}
      </span>
      <span>
        <svg
          className="text-[#8F8FCA] hover:text-[#CACA8F]"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </span>
    </div>
  );
}

export default ContactHeader;
