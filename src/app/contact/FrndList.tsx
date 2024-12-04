import React from "react";
import axios from "axios";
import Friendsmsg from "./Friendsmsg";
import { Conversation } from "./types";
import toast from "react-hot-toast";
import { useChat } from "../Context";

interface FrndListProps {
  conversations: Conversation[];
  loading: boolean;
  fetchConversations: () => void;
  message: string;
}

function FrndList({
  message,
  conversations,
  loading,
  fetchConversations,
}: FrndListProps) {
  const removeChat = async (chatId: string) => {
    try {
      const response = await axios.post("/api/conversation/remove", {
        conversationId: chatId,
      });
      console.log("Chat deleted", response.data);
      fetchConversations();
      toast.success("Chat deleted successfully");
      setActiveChat(null);
    } catch (err) {
      console.error("Error deleting chat:", err);
      toast.error("Error deleting chat");
    }
  };
  const { setActiveChat } = useChat();

  const openChat = async (chatId: string) => {
    console.log(conversations);
    const activeChat = conversations.filter((chat) => chat._id === chatId)[0];
    setActiveChat(activeChat);
    toast.success(activeChat._id);
  };

  return (
    <ul className="h-full px-4 py-2 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
      {message && (
        <div className="h-full items-center justify-center flex flex-col gap-3">
          <p>{message}</p>
          <p>Click On the Search Icon to Start a Conversation</p>
        </div>
      )}
      {conversations.map((chat) => (
        <Friendsmsg
          removeChat={() => removeChat(chat._id)}
          key={chat._id}
          chatId={chat._id}
          name={chat.participantDetails[0]?.displayName || "known User"}
          message={
            chat.messages[0]?.content ||
            "No messages yet, start the conversation!"
          }
          avatar={chat.participantDetails[0]?.profilePicture}
          username={chat.participantDetails[0]?.username || "knownUser"}
          openChat={(chatId) => openChat(chatId)}
        />
      ))}
    </ul>
  );
}

export default FrndList;
