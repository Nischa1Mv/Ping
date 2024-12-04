"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageOverlay from "./imageOverlay";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ParticipantDetails } from "./contact/types";

interface ProfileProps {
  user: ParticipantDetails;
  notUser?: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  setIsProfileOpen,
  notUser,
}) => {
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const Logout = async () => {
    setIsDisabled(true);
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("User Is Logged Out");
      router.push("/login");
      setIsDisabled(false);
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleEdit = () => {
    router.push("/profile");
  };

  return (
    <>
      {showImageOverlay && (
        <div
          className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay src={user.profilePicture || "/nothing"} />
        </div>
      )}
      <div className="w-full h-full relative flex flex-col ">
        <div
          className="flex flex-col border-2 border-[#1f2029] bg-[rgba(143,143,202,0.1)] h-[35%] relative bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${user.banner})`, // Ternary for backgroundImage
          }}
        >
          <div className="flex gap-4 w-full px-4 py-2 bg-transparent">
            <svg
              onClick={() => {
                if (setIsProfileOpen) {
                  setIsProfileOpen(false);
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#CACA8F"
            >
              <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
            </svg>
          </div>
          <div className="flex grow"></div>
          {!notUser && (
            <div className="justify-end w-full flex  px-4 py-2">
              <svg
                onClick={handleEdit}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#CACA8F"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </div>
          )}
          <Image
            className="rounded-full aspect-square absolute bottom-[-40%] left-4 border-[6px] z-20 border-[#191a22] "
            onClick={() => {
              setShowImageOverlay(true);
            }}
            src={user.profilePicture || "/avatar.jpg"}
            height={150}
            width={150}
            alt="ProfilePicture"
          />
        </div>
        <div className="flex justify-end  gap-10 items-center grow">
          {!notUser && (
            <>
              <svg
                onClick={handleEdit}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#8F8FCA"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
              <svg
                onClick={handleEdit}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#8F8FCA"
              >
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
              </svg>
            </>
          )}
        </div>

        <div className="font-bold w-full tracking-widest pl-8   text-3xl flex gap-3 text-[#CACA8F] items-center mt-4 ">
          {user.displayName}
          {!notUser && (
            <svg
              onClick={handleEdit}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#8F8FCA"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          )}
        </div>

        <div className="pl-8 flex flex-col gap-5 grow  ">
          <div className="text-xs  text-[#adaeb7] tracking-widest ">
            @{user.username}{" "}
          </div>
          <div className="  flex flex-col gap-2  h-full  ">
            <div className="text-[#8888d5] text-lg font-semibold">
              Description
            </div>
            <div className=" text-sm font-medium  px-5  py-5 w-[90%] h-[40%]   text-[#adaeb7] bg-[#1f212b] text-pretty">
              {user.bio}
            </div>
          </div>
          <div className="w-full flex justify-end px-4 py-4  ">
            <button
              disabled={isDisabled}
              onClick={() => {
                Logout();
              }}
              value="logout"
              className={`bg-transparent tracking-wider cursor-pointer focus:outline-none text-[#fff] px-6 py-1 rounded-lg login-box transition-transform duration-150 
    
         hover:font-bold hover:bg-[#8F8FCA] hover:text-[#383a46] active:scale-95 active:bg-[#9696cd]`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
