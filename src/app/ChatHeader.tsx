import Image from "next/image";
import React from "react";

interface ChatHeaderProps {
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ChatHeader({ setIsProfileOpen }: ChatHeaderProps) {
  return (
    <>
      {/* Chat Header */}
      <div
        className=" px-6 py-2  flex  items-center gap-6 "
        style={{
          background: "rgba(143, 143, 202, 0.07)",
          //   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(2.5px)",
          WebkitBackdropFilter: "blur(2.5px)", // Vendor prefix for Safari
          //   borderRadius: "10px",
          //   border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <Image
          onClick={() => {
            setIsProfileOpen(true);
          }}
          className=" rounded-full aspect-square   "
          src="https://avatars.githubusercontent.com/u/118107697?v=4&size=64"
          alt="Profile Picture"
          width={50}
          height={50}
        />
        <div className="flex-col flex ">
          <span className="font-semibold text-xl flex gap-2 text-[#CACA8F] ">
            Nischal_Mantri {/* if Online : green offline black dnd */}
            <span className="text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="currentColor"
              >
                <path d="M480-480Zm0 280q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Z" />
              </svg>
            </span>
          </span>
          <span className="text-xs text-green-500 shadow-sm">Online</span>
        </div>
        <div className="grow"> </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
