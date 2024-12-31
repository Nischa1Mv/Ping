"use client";
import AddFrnd from "./AddFrnd";
import ContactHeader from "./ContactHeader";
import FrndList from "./FrndList";
import Status from "./Status";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useChat } from "../Context";
import { Socket } from "socket.io-client";
import { Conversation } from "./types";

interface contactProps {
  socket: Socket | null;
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
  profile: (user: boolean) => void;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openChat: (chatId: string) => void;
}

export default function Contacts({
  socket,
  user,
  profile,
  setIsProfileOpen,
  openChat,
}: contactProps) {
  const [message, setMessage] = useState<string>("");
  const { setConversations, conversations } = useChat();
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/conversation/current");
      if (response.data.message)
        if (response.data.message === "No unclosed conversations found") {
          setMessage(response.data.message);
          setConversations([]);
          toast.success("No conversations found");
          return;
        }
      setMessage("");
      console.log("Conversations:", response.data);
      setConversations(response.data);
      console.log("Conversations fetched successfully");
      // toast.success("Conversations fetched successfully");
    } catch (err) {
      console.error("Error fetching conversations:", err);
      toast.error("Error fetching conversations");
    } finally {
      setLoading(false);
    }
  };

  const startChat = async (id: string) => {
    console.log(id);
    try {
      const chat = await axios.post("/api/conversation", { friendId: id }); //to get the conversation object

      if (chat.data.message === "conversation already exists") {
        // toast.success("Conversation already existed Opened");
        if (chat.data.conversation && chat.data.conversation._id) {
          // toast.success(chat.data.conversation._id);
          openChat(chat.data.conversation._id);
        } else {
          toast.error("Conversation data is missing.");
        }
        fetchConversations();
        return;
      }
      //the below two line if the profile is set to true
      //have to handle it
      setIsProfileOpen(false);
      fetchConversations();
      toast.success("Conversation Created");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to start conversation");
    }
  };

  useEffect(() => {
    //have to make a converastion array , to store all the conversations , instead of fetching all the time
    console.log("Conversations fetched successfully", conversations);
    if (socket?.connected) {
      fetchConversations();
      console.log("Socket connected");
    }
  }, [socket?.connected]);

  useEffect(() => {
    if (socket?.connected) {
      conversations.forEach((c) => {
        console.log(c.conversationId);
        socket.emit("conversation:join", { conversationId: c.conversationId });
      });
    }
  }, [conversations]);

  useEffect(() => {
    if (!socket) return;

    // Adding listener for conversation status update
    socket.on("conversation:status", (updatedConversation: Conversation) => {
      toast.success("Conversation status updated");
      console.log("this is the updated conversation", updatedConversation);
      console.log("Updated Conversation:", updatedConversation);
      console.log("Conversation ID:", updatedConversation._id);
      console.log("Participants:", updatedConversation.participants);
      console.log("Messages:", updatedConversation.messages);
      console.log(conversations);
      //the above working fine
      setConversations((prevConversations) => {
        // Ensure that prevConversations is always an array (handle edge cases)
        if (prevConversations.length == 0) {
          return [updatedConversation]; // In case prevConversations is undefined
        }

        // Find the index of the conversation with the matching conversationId
        const conversationIndex = prevConversations.findIndex(
          (conversation: Conversation) =>
            conversation.conversationId === updatedConversation.conversationId
        );

        // If conversation exists, replace it, otherwise, add the new conversation
        if (conversationIndex !== -1) {
          return prevConversations.map((conversation, index) =>
            index === conversationIndex ? updatedConversation : conversation
          );
        } else {
          return [...prevConversations, updatedConversation];
        }
      });
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("conversation:status");
    };
  }, [socket]);
  return (
    <>
      <div
        className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
      >
        <ContactHeader
          startChat={startChat}
          userPic={user.profilePicture}
          profile={profile}
        />{" "}
        <AddFrnd />
        <Status />
        <FrndList
          openChat={openChat}
          message={message}
          conversations={conversations}
          loading={loading}
          fetchConversations={fetchConversations}
        />
      </div>
    </>
  );
}
