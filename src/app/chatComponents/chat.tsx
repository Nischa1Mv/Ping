"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Contacts from "../contact/Contacts";
import ChatBody from "./ChatBody";
import Profile from "./../profile";
import { useEffect, useState } from "react";
import { useChat } from "../Context";
import { useSocket } from "../SocketContext";
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

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
  const [recordMsg, setRecordMsg] = useState(false);
  const [input, setInput] = useState("");

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
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");

  const recordMessage = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      setRecordMsg(false);
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      console.log("Recording started...");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      console.log("Transcript:", transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Error occurred in recognition:", event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
      console.log("Recording stopped.");
    };

    recognition.start();
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
        <div className="grow flex flex-col border-l-2 border-[#1E1E1E] relative">
          <div
            className={`absolute inset-0 z-10 transition-all duration-300 ${
              isProfileOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
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
          </div>

          {activeChat && activeChat.participantDetails[0]?.username ? (
            <div
              className={`flex flex-col h-full transition-opacity duration-300 ${
                isProfileOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              <ChatHeader
                profile={profile}
                displayName={
                  activeChat.participantDetails?.find(
                    (participant) => participant._id !== user._id
                  )?.displayName || "Unknown User"
                }
                username={
                  activeChat.participantDetails?.find(
                    (participant) => participant._id !== user._id
                  )?.username || "UnknownUser"
                }
                profilePicture={
                  activeChat.participantDetails?.find(
                    (participant) => participant._id !== user._id
                  )?.profilePicture
                }
              />

              <ChatBody
                socket={socket}
                conversationId={activeChat.conversationId}
                user={user}
              />
              <ChatInput
                input={input}
                setRecordMsg={setRecordMsg}
                recordMsg={recordMsg}
                socket={socket}
                user={user}
              />
            </div>
          ) : (
            !isProfileOpen && (
              <div className="flex items-center justify-center grow flex-col text-gray-500">
                Select a conversation to start chatting.
              </div>
            )
          )}
        </div>
      </div>
      {recordMsg && (
        <div
          onClick={() => {
            setRecordMsg(false);
          }}
          className="absolute bottom-0 right-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" bg-[rgba(255,255,255,0.9)] flex-col gap-10  w-[40%] aspect-video border items-center justify-center  flex p-4"
          >
            <p className="text-lg font-medium text-[#191A22]">
              {!isRecording ? (
                "Click on the mic to start Recording"
              ) : (
                <>
                  The mic is listening {"  "}
                  <span className="after:content-['.....'] after:animate-dots after:absolute after:ml-1"></span>
                </>
              )}
            </p>
            <svg
              className={` p-5 rounded-full aspect-square cursor-pointer ${
                isRecording
                  ? "text-[#8f8fca] bg-[#191a22] "
                  : "text-[#191A22] bg-[#8f8fca]"
              } `}
              onClick={(e) => {
                e.stopPropagation();
                recordMessage();
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="100px"
              viewBox="0 -960 960 960"
              width="100px"
              fill="currentColor"
            >
              <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
            </svg>
            <p className="mx-auto text-lg font-semibold text-[#191A22]">
              " {message} "
            </p>
            <button
              onClick={() => {
                setInput(message);
                setRecordMsg(false);
                setRecordMsg(false);
              }}
              className="px-4 py-1 bg-[#8f8fca] rounded-xl text-lg font-bold text-medium text-[#191A22]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
