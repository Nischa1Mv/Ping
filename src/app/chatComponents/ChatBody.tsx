"use client";
import { useEffect, useState } from "react";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import { useChat } from "../Context";
import toast from "react-hot-toast";
import { Message } from "../contact/types";
import { Socket } from "socket.io-client";
import axios from "axios";

interface ChatBodyProps {
  conversationId: string | undefined;

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

function ChatBody({ user, conversationId, socket }: ChatBodyProps) {
  const { activeChat } = useChat();
  const [message, setMessage] = useState<Message[] | null>(null);
  useEffect(() => {
    if (!socket) return;
    if (!activeChat) {
      toast.error("Select a chat to start messaging");
    }
    socket.emit("joinConversation", conversationId);

    ///have to fix this code
    socket.on("message:receive", (message: Message) => {
      setMessage((prevMessages) => [...(prevMessages ?? []), message]);
    });
  }, []);

  const fetchMessages = async () => {
    try {
      // Show loading state here
      // setLoading(true);

      // Fetch messages from API
      const response = await axios.get(
        `/api/conversation/message/?conversationId=${conversationId}`
      );

      // Check if messages exist in the response
      if (!response.data) {
        toast.error("No messages found");
        setMessage([]); // Clear any existing messages
        return;
      }

      // Successfully fetched messages
      setMessage(response.data);
      toast.success("Messages fetched successfully");
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      toast.error("Error fetching messages");
      setMessage([]); // Handle error by clearing messages
    } finally {
      // Hide loading state here
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (activeChat) fetchMessages();
  }, [activeChat]);

  return (
    <div className="flex grow relative flex-col p-4 gap-2 overflow-auto">
      {activeChat && !message ? (
        <div className="w-full flex items-center justify-center text-[#8f8fca] italic border border-gray-700 py-1">
          Be the first to Ping⚡
        </div> // Show message if there are no messages
      ) : activeChat ? (
        message?.map((msg) =>
          msg.sender === user._id ? (
            <ReceiverBubble key={msg.timestamp} message={msg.content} />
          ) : (
            <SenderBubble key={msg.timestamp} message={msg.content} />
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
