"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import { Profile } from "../profile";
import { useState } from "react";

function Chat() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <>
      <div className="bg-[#191A22] w-screen h-screen flex  p-4">
        {/* Left Side */}
        <Contacts />
        {/* Right Side */}

        <div className="grow flex flex-col  border-4 border-l-2 border-[#1E1E1E] ">
          {isProfileOpen ? (
            <>
              <Profile setIsProfileOpen={setIsProfileOpen} />
            </>
          ) : (
            <>
              {" "}
              <ChatHeader setIsProfileOpen={setIsProfileOpen} />
              <ChatBody />
              <ChatInput />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
