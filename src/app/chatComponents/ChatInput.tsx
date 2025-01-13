"use client";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useChat } from "../Context";
import toast from "react-hot-toast";
import { set } from "mongoose";

interface ChatInputProps {
  user: {
    _id: String;
    username: string;
    displayName: string;
    bio: string;
    profilePicture: string;
    banner: string;
    isVerified: boolean;
    isAdmin: boolean;
  };
  socket: Socket | null;
  setRecordMsg: React.Dispatch<React.SetStateAction<boolean>>;
  recordMsg: boolean;
  input: string;
}

function ChatInput({
  user,
  socket,
  setRecordMsg,
  recordMsg,
  input,
}: ChatInputProps) {
  const { activeChat } = useChat();

  const [messageContent, setMessageContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);

  useEffect(() => {
    if (activeChat?.participants) {
      const receiver = activeChat.participants.find(
        (participant) => participant.userId !== user._id
      );
      if (receiver) {
        setReceiverId(receiver.userId);
      }
    }
  }, [activeChat, user._id]);
  // getting the sender id from active chat
  const sendMessage = () => {
    try {
      if (messageContent.trim() && socket) {
        const message = {
          sender: user._id,
          content: messageContent,
        };

        // Emit the message to the server
        // sending both receiver and sender ids to the server

        socket.emit("message:send", {
          conversationId: activeChat?.conversationId,
          receiver: receiverId,
          sender: user._id,
          content: message.content,
        });

        // Clear the input after sending the message
        setMessageContent("");
      } else {
        console.log("No active chat selected");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Error sending message");
      setError("Error sending message");
    } finally {
      setMessageContent("");
    }
  };
  useEffect(() => {
    setMessageContent(input);
  }, [input]);

  return (
    <div
      className=" px-6 py-2 pt-4 flex  items-center gap-6  "
      style={{
        background: "rgba(143, 143, 202, 0.1)",
        backdropFilter: "blur(2.5px)",
        WebkitBackdropFilter: "blur(2.5px)",
      }}
    >
      <input
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        type="text"
        className="w-full px-4 py-2  bg-transpaSrnt text-[#dedfeb] font-medium  focus:outline-none rounded-xl"
        placeholder="Message"
        style={{
          background: "rgba(143, 143, 202, 0.005)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderRadius: "10px",
        }}
      />
      <svg
        onClick={() => setRecordMsg(!recordMsg)}
        className="bg-[#191A22] rounded-full p-1 cursor-pointer hover:bg-[#8f8fca] hover:text-black text-[#8f8fca] "
        xmlns="http://www.w3.org/2000/svg"
        height="35px"
        viewBox="0 -960 960 960"
        width="35px"
        fill="currentColor"
      >
        <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
      </svg>
      <div>
        <svg
          onClick={sendMessage}
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
