import React from "react";
import axios from "axios";
import Friendsmsg from "./Friendsmsg";
import { Conversation } from "./types";
import toast from "react-hot-toast";

interface FrndListProps {
  conversations: Conversation[];
  loading: boolean;
  fetchConversations: () => void;
}

function FrndList({
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
    } catch (err) {
      console.error("Error deleting chat:", err);
      toast.error("Error deleting chat");
    }
  };

  // Handle "no conversations" condition directly in the render
  if (conversations.message === "No unclosed conversations found") {
    return (
      <div className="h-full items-center  justify-center  px-4 py-2 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
        <p>Click On the Search Icon to Start Conversation</p>
      </div>
    );
  }

  return (
    <ul className="h-full px-4 py-2 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
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
        />
      ))}
    </ul>
  );
}

export default FrndList;
