"use client";
import { useEffect } from "react";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import { useChat } from "../Context";
import toast from "react-hot-toast";
import { useSocket } from "../SocketContext";
import { Message } from "../contact/types";
import { Socket } from "socket.io-client";

interface ChatBodyProps {
  conversationId: string | undefined;
  messages: Message[];
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
  socket: Socket | null;
}

function ChatBody({ messages, user, conversationId, socket }: ChatBodyProps) {
  const { activeChat } = useChat();
  useEffect(() => {
    if (!socket) return;
    if (!activeChat) {
      toast.error("Select a chat to start messaging");
    }
    socket.emit("joinConversation", conversationId);
    socket.on("message:receive", (message: Message) => {
      messages.push(message);
    });
  }, [activeChat]);
  return (
    <div className="flex grow relative flex-col p-4 gap-2">
      {activeChat && messages.length === 0 ? (
        <div className="w-full flex items-center justify-center text-[#8f8fca] italic border border-gray-700 py-1">
          Be the first to Ping⚡
        </div> // Show message if there are no messages
      ) : activeChat ? (
        messages.map((message: Message) =>
          message.sender === user._id ? (
            <SenderBubble key={message.timestamp} message={message.content} />
          ) : (
            <ReceiverBubble key={message.timestamp} message={message.content} />
          )
        )
      ) : (
        <div className="flex items-center justify-center h-full flex-col gap-3">
          <p>Click on a chat to start messaging</p>
          <p>Click on the search icon to start a conversation</p>
        </div>
      )}
    </div>
  );
}

export default ChatBody;
