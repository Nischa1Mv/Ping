"use client";
import { useEffect } from "react";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import { useChat } from "../Context";
import toast from "react-hot-toast";

function ChatBody() {
  const { activeChat, setActiveChat } = useChat();
  useEffect(() => {
    if (!activeChat) {
      toast.error("Select a chat to start messaging");
    }
  }, [activeChat]);
  return (
    <div className="flex grow relative flex-col p-4 gap-2">
      {activeChat && activeChat.messages.length === 0 ? (
        <div className="w-full flex items-center justify-center text-[#8f8fca] italic border border-gray-700 py-1">
          Be the first to Ping⚡
        </div> // Show message if there are no messages
      ) : activeChat ? (
        activeChat.messages.map((message) =>
          message.sender === "me" ? (
            <SenderBubble key={message._id} message={message} />
          ) : (
            <ReceiverBubble key={message._id} message={message} />
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
