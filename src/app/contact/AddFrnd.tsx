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
      if (
        error.response.data.error === "A Pending Friend request already Exists"
      ) {
        toast.error("Pending Friend Request already exists");
        return;
      }
      if ((error.response.data.error = "Your are already friends")) {
        toast.error("You are already friends");
        return;
      }
      console.error("Error sending friend request:", error.message);
    }
  };

  return (
    <>
      <div
        // Toggle search input visibility
        className="cursor-pointer   text-[#8F8FCA] relative font-semibold flex  flex-col justify-center items-center border-[#8F8FCA] border rounded-xl mx-auto min-w-fit w-[80%] py-2 gap-4 "
      >
        <div className="flex gap-4" onClick={() => setIsSearch(!isSearch)}>
          <svg
            className={`${
              isSearch ? "rotate-45" : ""
            } transition-transform duration-200 ease-in-out`}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentcolor"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          <span>
            Add a Friend to <span className="italic">Ping</span>
          </span>
        </div>
        {isSearch && (
          <>
            {/* Search Input Field */}
            <div className="flex gap-5   items-center justify-center ">
              <input
                type="search"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query on input change
                className="text-white px-2 bg-transparent focus:outline-none font-medium tracking-wider border-b-2 border-[#8F8FCA]"
              />
            </div>

            {/* Render Search Results */}
            <div className="w-full flex gap-4 items-center justify-center scrollbar-thin  max-h-[150px] ">
              {query && users[0]?.username !== "" && (
                <ul className=" w-fit p-2 grid grid-cols-2 grid-rows-3 gap-2 rounded-lg py-4 ">
                  {users.length > 0 &&
                    users.map((user, index) => (
                      <li
                        key={index}
                        className="flex gap-2 hover:text-[#caca8f]  cursor-pointer bg-[#313244] hover:bg-[#474862] px-4 rounded-xl py-2 items-center font-semibold tracking-wider text-xs"
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
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AddFrnd;
