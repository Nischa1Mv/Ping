"use client";
import Chat from "./chatComponents/chat";
import axios from "axios";
import { useEffect, useState } from "react";
import { useChat } from "./Context";

export default function Home() {
  interface User {
    _id: string;
    username: string;
    displayName: string;
    bio: string;
    profilePicture: string;
    banner: string;
    isVerified: boolean;
    isAdmin: boolean;
  }

  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    displayName: "",
    bio: "",
    profilePicture: "",
    banner: "",
    isVerified: false,
    isAdmin: false,
  });

  const [loadingConversations, setLoadingConversations] = useState(true);
  const { conversations } = useChat();

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/users/me`);
      const user: User = response.data.data;
      setUser(user);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUser();

    if (conversations) {
      setLoadingConversations(false);
    }
  }, []);

  return (
    <div className="relative">
      {loadingConversations && user ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}
