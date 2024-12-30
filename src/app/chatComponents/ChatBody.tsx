"use client";
import { useEffect, useRef, useState } from "react";
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
  const { conversations } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<Message[] | null>(null);
  const [ReceiverProfilePicture, setReceiverProfilePicture] = useState<
    string | null
  >(null);
  useEffect(() => {
    if (!socket) return;
    if (!activeChat) {
      toast.error("Select a chat to start messaging");
    }
    socket.emit("joinConversation", conversationId);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message:receive", (message: Message) => {
      setMessage((prevMessages) => [...(prevMessages ?? []), message]);
    });
    return () => {
      socket.off("message:receive");
    };
  }, [socket]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `/api/conversation/message/?conversationId=${conversationId}`
      );

      if (!response.data) {
        toast.error("No messages found");
        setMessage([]);
        return;
      }

      // Successfully fetched messages
      setMessage(response.data);
      console.log("Messages fetched successfully");
      // toast.success("Messages fetched successfully");
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      toast.error("Error fetching messages");
      setMessage([]);
    } finally {
    }
  };

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the initial render
      isInitialRender.current = false;
    } else {
      // Call your function when activeChat changes
      fetchMessages();
      const conversationIndex = conversations.findIndex(
        (conversation) => conversation.conversationId === conversationId
      );

      if (conversationIndex !== -1) {
        const selectedConversation = conversations[conversationIndex];
        const ReceiverProfilePicture =
          selectedConversation.participantDetails[0].profilePicture;
        if (ReceiverProfilePicture)
          setReceiverProfilePicture(ReceiverProfilePicture);
      } else {
        console.log("Conversation not found");
      }
    }
  }, [activeChat]);

  useEffect(() => {
    // Scroll to the bottom whenever a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div
      ref={chatContainerRef}
      className="flex grow relative flex-col p-4 gap-0 h-full overflow-y-auto scrollbar-hide "
    >
      {activeChat && !message ? (
        <div className="w-full flex items-center justify-center text-[#8f8fca] italic border border-gray-700 py-1 ">
          Be the first to Ping⚡
        </div> // Show message if there are no messages
      ) : activeChat ? (
        message?.map((msg) =>
          msg.sender === user._id ? (
            <SenderBubble
              key={msg.timestamp}
              message={msg.content}
              profilePicture={user.profilePicture}
            />
          ) : (
            <ReceiverBubble
              key={msg.timestamp}
              message={msg.content}
              profilePicture={ReceiverProfilePicture || "defaultProfilePicUrl"}
            />
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
