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
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <div
        className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
      >
        <ContactHeader fetchConversations={fetchConversations} />
        <AddFrnd />
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
