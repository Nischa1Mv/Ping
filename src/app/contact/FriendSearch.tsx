import Image from "next/image";
import React from "react";
interface FriendSearchProps {
  username: string;
  profilePicture: string;
  id: string;
}

function FriendSearch({ username, profilePicture, id }: FriendSearchProps) {
  return (
    <div
      className=" pl-4 px-2 py-1 flex gap-4 items-center hover:text-[#caca8f] cursor-pointer border-2 border-gray-600  hover:border-[#caca8f] "
      style={{
        // background: "rgba(31, 38, 135, 0.1)",
        boxShadow: "0 0px 10px 0 rgba(31, 38, 135, 0.2)",
        backdropFilter: "blur(3px)",
        // Vendor prefix for Safari
        borderRadius: "6px",
      }}
    >
      <Image
        src={profilePicture || "/images/default_profile.png"}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile picture"
      />
      <span className="font-medium tracking-wider  text-white cursor-pointer">
        @ {username}
      </span>
    </div>
  );
}

export default FriendSearch;
