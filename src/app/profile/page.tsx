"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function ProfileSetup() {
  const router = useRouter();

  const [info, setinfo] = useState(""); //remove this later

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.post("/api/users/me");
        console.log("User Data", response.data.data._id);
        setinfo(response.data.data._id); //and this
        router.push(`/profile/${response.data.data._id}`);
        {
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getuser();
  }, []);

  // Handle file input changes

  return (
    <div className="flex h-screen items-center justify-center">
      {" "}
      <div
        className={`${kanit.className} text-xl  text-[#CACA8F] tracking-widest`}
      >
        Loading.... {info}
      </div>
    </div>
  );
}
export default ProfileSetup;
