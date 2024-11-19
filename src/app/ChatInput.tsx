"use client";
import React from "react";

function ChatInput() {
  return (
    <div
      className=" px-6 py-2 pt-4 flex  items-center gap-6  "
      style={{
        background: "rgba(143, 143, 202, 0.1)",
        //   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(2.5px)",
        WebkitBackdropFilter: "blur(2.5px)", // Vendor prefix for Safari
        //   borderRadius: "10px",
        //   border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <input
        type="text"
        className="w-full px-4 py-2  bg-transpaSrnt text-[#dedfeb] font-medium  focus:outline-none rounded-xl"
        placeholder="Message"
        style={{
          background: "rgba(143, 143, 202, 0.005)",
          // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)", // Safari-specific property
          borderRadius: "10px",
          // border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="35px"
          fill="#CACA8F"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </div>
    </div>
  );
}

export default ChatInput;
