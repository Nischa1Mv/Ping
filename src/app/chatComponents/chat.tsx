"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import Profile from "./../profile";
import { useEffect, useState } from "react";
import { useChat } from "../Context";
import { useSocket } from "../SocketContext";
import { Message } from "../contact/types";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const { conversations } = useChat();

  useEffect(() => {
    console.log("changed");
    //await this make this work after the socket is conneetd
    if (socket?.connected) {
      console.log("Socket is connected.");
      console.log("this is the array abject", conversations);
    }
  }, [socket?.connected]);
  // Join the conversation once the socket is available

  // socket.emit("joinConversation", activeChat._id);

  // Listen for incoming messages
  // socket.on("message:receive", (message: Message) => {
  //   setMessages((prevMessages) => [...prevMessages, message]);
  // });

  // Cleanup listeners on unmount

  return (
    <>
      <div className="bg-[#191A22] w-screen h-screen flex  p-4">
        {/* Left Side */}
        <Contacts socket={socket} />
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
              <ChatBody
                socket={socket}
                conversationId={activeChat?.conversationId}
                messages={messages}
                user={user}
              />
              <ChatInput socket={socket} user={user} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
