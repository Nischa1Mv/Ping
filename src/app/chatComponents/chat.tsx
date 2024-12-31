"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import Profile from "./../profile";
import { useEffect, useState } from "react";
import { useChat } from "../Context";
import { useSocket } from "../SocketContext";
// import toast from "react-hot-toast";

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
  const { activeChat } = useChat();
  const socket = useSocket();
  const { conversations } = useChat();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notUser, setNotUser] = useState(false);

  const profile = (user: boolean) => {
    if (user) {
      setNotUser(false);
      setIsProfileOpen(true);
    } else {
      setNotUser(true);
      setIsProfileOpen(true);
    }
  };
  // useEffect(() => {
  //   openChat(activeChat?._id!);
  // }, [activeChat]);

  useEffect(() => {
    console.log("changed");
    //await this make this work after the socket is conneetd
    if (socket?.connected) {
      console.log("Socket is connected.");
      console.log("this is the array abject", conversations);
    }
  }, [socket?.connected]);
  const { setActiveChat } = useChat();

  const openChat = async (chatId: string) => {
    if (chatId === activeChat?._id) return;
    console.log(conversations);
    const currentChat = conversations.filter((chat) => chat._id === chatId)[0];
    setActiveChat(currentChat);
    // toast.success(currentChat._id);
    setIsProfileOpen(false);
  };

  return (
    <>
      <div className="bg-[#191A22] w-screen h-screen flex p-4">
        {/* Left Side */}
        <Contacts
          user={user}
          socket={socket}
          profile={profile}
          setIsProfileOpen={setIsProfileOpen}
          openChat={openChat}
        />

        {/* Right Side */}
        <div className="grow flex flex-col border-l-2 border-[#1E1E1E]">
          {isProfileOpen && (
            <Profile
              user={
                notUser
                  ? activeChat?.participantDetails?.find(
                      (participant) => participant._id !== user._id
                    )
                  : user
              }
              setIsProfileOpen={setIsProfileOpen}
              notUser={notUser}
            />
          )}
          {!isProfileOpen &&
          activeChat &&
          activeChat.participantDetails[0]?.username ? (
            <>
              <ChatHeader
                profile={profile}
                displayName={activeChat.participantDetails[1].displayName}
                username={activeChat.participantDetails[1].username}
                profilePicture={activeChat.participantDetails[1].profilePicture}
              />
              <ChatBody
                socket={socket}
                conversationId={activeChat.conversationId}
                user={user}
              />
              <ChatInput socket={socket} user={user} />
            </>
          ) : (
            !isProfileOpen && (
              <div className="flex items-center justify-center grow flex-col text-gray-500">
                Select a conversation to start chatting.
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
