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
  openChat: (chatId: string) => void;
}

function FrndList({
  message,
  conversations,
  loading,
  fetchConversations,
  openChat,
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

  return (
    <>
      {loading ? (
        <div className="flex items-center space-x-2 text-gray-700 justify-center h-full">
          <div className="w-5 h-5 border-4 border-t-transparent border-[#8f8fca] rounded-full animate-spin"></div>
          <div>Loading</div>
        </div>
      ) : (
        <ul className="h-full px-4 py-2 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          {/* {message && (
            <div className="h-full items-center justify-center flex flex-col gap-3">
              <p>{message}</p>
              <p>Click On the Search Icon to Start a Conversation</p>
            </div>
          )} */}
          {conversations && conversations.length > 0 ? (
            (console.log("Conversations:", conversations),
            conversations.map((chat) => (
              <Friendsmsg
                removeChat={() => removeChat(chat._id)}
                key={chat._id}
                chatId={chat._id}
                name={chat.participantDetails?.[1]?.displayName || "known User"}
                message={
                  chat.messages[0]?.content ||
                  "No messages yet, start the conversation!"
                }
                avatar={chat.participantDetails?.[1]?.profilePicture}
                username={chat.participantDetails?.[1]?.username || "knownUser"}
                openChat={(chatId) => openChat(chatId)}
              />
            )))
          ) : (
            <div>No conversations found.</div>
          )}
        </ul>
      )}
    </>
  );
}

export default FrndList;
