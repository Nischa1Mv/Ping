"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import Profile from "./../profile";
import { act, useEffect, useState } from "react";
import { useChat } from "../Context";
import { useSocket } from "../SocketContext";
import { Message } from "../contact/types";
import { profile } from "console";

interface ChatProps {
  user: {
    _id: string;
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
  const socket = useSocket();
  const { conversations } = useChat();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    console.log("changed");
    //await this make this work after the socket is conneetd
    if (socket?.connected) {
      console.log("Socket is connected.");
      console.log("this is the array abject", conversations);
    }
  }, [socket?.connected]);

  return (
    <>
      <div className="bg-[#191A22] w-screen h-screen flex p-4">
        {/* Left Side */}
        <Contacts socket={socket} />

        {/* Right Side */}
        <div className="grow flex flex-col border-l-2 border-[#1E1E1E]">
          {isProfileOpen && activeChat?.participantDetails[0] ? (
            <Profile
              user={activeChat?.participantDetails[0]}
              setIsProfileOpen={setIsProfileOpen}
              notUser={true}
            />
          ) : activeChat && activeChat.participantDetails[0]?.username ? (
            <>
              <ChatHeader
                setIsProfileOpen={setIsProfileOpen}
                displayName={activeChat.participantDetails[0].displayName}
                username={activeChat.participantDetails[0].username}
                profilePicture={activeChat.participantDetails[0].profilePicture}
              />
              <ChatBody
                socket={socket}
                conversationId={activeChat.conversationId}
                user={user}
              />
              <ChatInput socket={socket} user={user} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
