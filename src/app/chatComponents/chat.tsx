"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import Profile from "./../profile";
import { useState } from "react";
import { useChat } from "../Context";

interface ChatProps {
  user: {
    username: string;
    displayName: string;
    bio: string;
    profilePicture: string;
    banner: string;
    isVerified: boolean;
    isAdmin: boolean;
  };
}

function Chat({ user }: ChatProps) {
  const { activeChat, setActiveChat } = useChat();

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
              <Profile user={user} setIsProfileOpen={setIsProfileOpen} />
            </>
          ) : (
            <>
              {" "}
              <ChatHeader
                setIsProfileOpen={setIsProfileOpen}
                displayName={activeChat?.participantDetails[0]?.displayName}
                username={activeChat?.participantDetails[0]?.username}
                profilePicture={
                  activeChat?.participantDetails[0]?.profilePicture
                }
              />
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
