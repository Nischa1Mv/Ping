"use client";
import { Conversation } from "./../contact/types";
import AddFrnd from "./AddFrnd";
import ContactHeader from "./ContactHeader";
import FrndList from "./FrndList";
import Status from "./Status";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Contacts() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Conversation[]>(
        "/api/conversation/current"
      );
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
    fetchConversations();
  }, []);

  return (
    <>
      <div
        className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
      >
        <ContactHeader startChat={startChat} /> <AddFrnd />
        <Status />
        <FrndList
          conversations={conversations}
          loading={loading}
          fetchConversations={fetchConversations}
        />
      </div>
    </>
  );
}
