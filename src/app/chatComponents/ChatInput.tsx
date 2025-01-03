"use client";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useChat } from "../Context";
import toast from "react-hot-toast";

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
}

function ChatInput({ user, socket }: ChatInputProps) {
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
