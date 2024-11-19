"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "./Contacts";
import ChatBody from "./ChatBody";

function Chat() {
  return (
    <>
      <div className="bg-[#191A22] w-screen h-screen flex  p-4">
        {/* Left Side */}
        <Contacts />
        {/* Right Side */}

        <div className="grow flex flex-col  border-4 border-l-2 border-[#1E1E1E]">
          <ChatHeader />
          <ChatBody />
          <ChatInput />
        </div>
      </div>
    </>
  );
}

export default Chat;
