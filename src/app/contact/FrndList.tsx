import React, { useEffect, useState } from "react";
import axios from "axios";
import Friendsmsg from "./Friendsmsg";

function FrndList() {
  const [conversations, setConversations] = useState([
    {
      _id: "",
      participants: [],
    },
  ]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/conversation/current");
        console.log("Conversations:", response.data);
        setConversations(response.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };

    if (conversations.length === 0) {
    }
    fetchConversations();
  }, []);

  return (
    <ul className=" h-full px-4 py-2 flex flex-col gap-3 overflow-y-auto scrollbar-hide ">
      {conversations.map((chat) => (
        <Friendsmsg key={chat._id} name={chat.participants[1]} />
      ))}
    </ul>
  );
}

export default FrndList;
