import Image from "next/image";
import React from "react";

interface friendReqProps {
  profilePicture: string;
  sent: boolean;
  username: string;
  id: string;
  handleAction: (action: string, id: string) => void;
}

function FriendReq({
  profilePicture,
  sent,
  username,
  id,
  handleAction,
}: friendReqProps) {
  return (
    <div
      className={` hover:text-[#caca8f] ${
        !sent ? " flex-col flex" : "flex items-center "
      }  w-[85%] bg-[#191a22] py-2 px-4 rounded-xl my-2 `}
    >
      <li className="flex gap-4 hover:text-[#caca8f] py-1 cursor-pointer text-xs bg-[#191a22] px-2 rounded-lg  items-center font-semibold tracking-wider ">
        <Image
          className="rounded-full aspect-square"
          src={profilePicture || "/default-profile-picture.jpg"}
          height={25}
          width={25}
          alt="profilePicture"
        />
        @ {username}
      </li>
      {!sent ? (
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => {
              handleAction("accept", id);
            }}
            className="w-full bg-green-500  text-black flex items-center justify-center rounded-lg cursor-pointer"
          >
            Accept
          </button>{" "}
          <div
            onClick={() => {
              handleAction("reject", id);
            }}
            className="w-full bg-red-400 text-black flex items-center justify-center rounded-lg cursor-pointer"
          >
            Reject
          </div>
        </div>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="#C14D3A"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </>
      )}
    </div>
  );
}

export default FriendReq;
