"use client";
import Chat from "./chatComponents/chat";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  interface User {
    username: string;
    displayName: string;
    bio: string;
    profilePicture: string;
    banner: string;
    isVerified: boolean;
    isAdmin: boolean;
  }
  const [user, setUser] = useState<User>({
    username: "",
    displayName: "",
    bio: "",
    profilePicture: "",
    banner: "",
    isVerified: false,
    isAdmin: false,
  });
  const getUser = async () => {
    try {
      const response = await axios.get(`/api/users/me`);
      console.log(response.data.data);
      const user: User = response.data.data;
      setUser(user);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {" "}
      <div className="relative">
        <Chat user={user} />
      </div>
    </>
  );
}
