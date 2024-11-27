import axios from "axios";
import Image from "next/image";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import { getTokenData } from "../helper/getTokenData";
import { set } from "mongoose";
import toast from "react-hot-toast";

function AddFrnd() {
  const [query, setQuery] = useState(""); // State for search query
  const [users, setUsers] = useState([
    { username: "", profilePicture: "", _id: "" },
  ]); // State for storing user search results
  const [isSearch, setIsSearch] = useState(false); // State to toggle search visibility

  // Function to search users based on query
  const searchUser = async () => {
    setUsers([{ username: "", profilePicture: "", _id: "" }]); // Clear previous results
    try {
      const response = await axios.get(`/api/users/search`, {
        params: { query }, // Send query as parameter
      });
      setUsers(response.data); // Set fetched users
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
    }
  };

  // Trigger search when query changes
  useEffect(() => {
    if (query) {
      searchUser();
    } else {
      setUsers([{ username: "", profilePicture: "", _id: "" }]); // Clear users if query is empty
    }
  }, [query]);

  const sendRequest = async (receiverId: string) => {
    try {
      if (!receiverId) {
        console.error("Receiver not found");
        return;
      }
      const response = await axios.post("/api/friend/request", { receiverId });
      console.log("Friend request sent:", response.data);
      toast.success("Friend request sent");
    } catch (error: any) {
      if (error.response.data.error === "Friend request already sent.") {
        toast.error("Friend request already sent");
        return;
      }
      console.error("Error sending friend request:", error.message);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsSearch(!isSearch)} // Toggle search input visibility
        className="cursor-pointer hover:bg-[#8F8FCA] text-[#8F8FCA] hover:text-[#191A22] font-semibold flex justify-center items-center border-[#8F8FCA] border rounded-xl mx-auto min-w-fit w-[80%] py-1 gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentcolor"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        <span>
          Find a Friend to <span className="italic">Ping</span>
        </span>
      </div>

      {isSearch && (
        <>
          {/* Search Input Field */}
          <div className="flex gap-5 mt-2 w-full items-center justify-center relative">
            <input
              type="search"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query on input change
              className="border-b-2 px-2 bg-transparent focus:outline-none border-[#CACA8F]"
            />
          </div>

          {/* Render Search Results */}
          {query && users[0]?.username !== "" && (
            <div className="w-full flex flex-col items-center justify-center relative ">
              <ul className="absolute top-0 bg-[#21222e] p-4 flex flex-col gap-4 rounded-lg">
                {users.length > 0 &&
                  users.map((user, index) => (
                    <li
                      key={index}
                      className="flex gap-4 hover:text-[#caca8f]  cursor-pointer bg-[#313244] hover:bg-[#474862] px-4 rounded-xl py-2 items-center font-semibold tracking-wider text-sm"
                    >
                      <Image
                        className="rounded-full aspect-square"
                        src={user.profilePicture}
                        height={25}
                        width={25}
                        alt="profilePicture"
                      />
                      @ {user.username}
                      <div className="flex grow"></div>
                      <div className="hover:text-[#caca8f] ">
                        <svg
                          onClick={() => {
                            sendRequest(user._id);
                          }} // Placeholder for sending friend request
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="currentcolor"
                        >
                          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AddFrnd;
