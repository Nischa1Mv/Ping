import Image from "next/image";
import React from "react";
interface FriendSearchProps {
  username: string;
  profilePicture: string;
  id: string;
  startChat: (id: string) => void;
}

function FriendSearch({
  username,
  profilePicture,
  id,
  startChat,
}: FriendSearchProps) {
  console.log(id);
  return (
    <div
      className=" pl-4 px-2 py-1 flex gap-4 items-center hover:text-[#caca8f] text-[#8F8FCA] cursor-pointer border-2 border-gray-600  hover:border-[#caca8f]  "
      style={{
        // background: "rgba(31, 38, 135, 0.1)",
        boxShadow: "0 0px 10px 0 rgba(31, 38, 135, 0.2)",
        backdropFilter: "blur(3px)",
        // Vendor prefix for Safari
        borderRadius: "10px",
      }}
    >
      <Image
        src={profilePicture || "/images/default_profile.png"}
        width={30}
        height={30}
        className="rounded-full"
        alt="profile picture"
      />
      <span className="font-medium tracking-widest  text-sm text-white cursor-pointer">
        @{username}
      </span>
      <span className="flex grow"></span>
      <svg
        onClick={() => {
          startChat(id);
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 -960 960 960"
        width="18px"
        fill="currentColor"
      >
        <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
      </svg>
    </div>
  );
}

export default FriendSearch;
