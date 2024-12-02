"use client";
import Chat from "./chatComponents/chat";
import axios from "axios";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

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
  // useEffect(() => {
  //   const socket = io("http://localhost:3001");
  // }, []);

  return (
    <>
      {" "}
      <div className="relative">
        <Chat user={user} />
      </div>
    </>
  );
}
