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

interface contactProps {
  socket: Socket | null;
}

export default function Contacts({ socket }: contactProps) {
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

      toast.success("Conversations fetched successfully");
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
      const chat = await axios.post("/api/conversation", { friendId: id });
      if (chat.data.message === "conversation already exists") {
        toast.success("Conversation Opened");
        fetchConversations();
        return;
      }
      fetchConversations();
      toast.success("Conversation Created");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to start conversation");
    }
  };

  useEffect(() => {
    console.log("Conversations fetched successfully", conversations);
    if (socket?.connected) {
      fetchConversations();
      console.log("Socket connecfasdfasted");
      // socket?.emit(
      //   "conversation:join",
      //   conversations.map((c) => c.conversationId)
      // );
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

  return (
    <>
      <div
        className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
      >
        <ContactHeader startChat={startChat} /> <AddFrnd />
        <Status />
        <FrndList
          message={message}
          conversations={conversations}
          loading={loading}
          fetchConversations={fetchConversations}
        />
      </div>
    </>
  );
}
