"use client";
import React, { useState } from "react";
import ImageOverlay from "../imageOverlay";
import { useRouter } from "next/navigation";
import Contacts from "../contact/Contacts";
import { Profile } from "../profile";
import ContactHeader from "../contact/ContactHeader";

function ProfileSetup() {
  const router = useRouter();
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const ProfilePicture =
    "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/379619630_6949750128379753_6172259427711619252_n.jpg?ccb=11-4&oh=01_Q5AaIO2kBGB6JkOO1GOwTcvG9XIDmY-5Vitx5Oo9Mv7P_lPp&oe=674A8A31&_nc_sid=5e03e0&_nc_cat=108";
  const BannerPic =
    "https://media.licdn.com/dms/image/v2/D4D16AQGiuVbiEdaPAg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1711031992791?e=1737590400&v=beta&t=L6veoyCxeddYWy2STt-4ABQGsbXWvZzwMzWNluS7xok";
  return (
    <>
      {showImageOverlay && (
        <div
          className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay src={ProfilePicture} />
        </div>
      )}
      <div className="w-screen h-screen p-4 flex  bg-[#191a22]">
        <div
          className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
        >
          <ContactHeader />

          <div className="flex flex-col gap-10 items-center px-10 justify-center h-full">
            <div className="w-full  flex items-center justify-center text-2xl font-semibold">
              Please Create Your Profile
            </div>
            {/* input for DisplayName */}
            <div className="flex gap-4 w-full">
              <label
                className="w-[50%] text-[#9696cd] font-semibold px-2"
                htmlFor=""
              >
                Display Name
              </label>
              <input
                type="text"
                className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2"
                placeholder="Enter Display Name"
              />
            </div>
            {/* input for UserName */}
            <div className="flex gap-4 w-full">
              <label
                className="w-[50%] text-[#9696cd] font-semibold px-2"
                htmlFor=""
              >
                User Name
              </label>
              <input
                type="text "
                className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2"
                placeholder="Enter User Name"
              />
            </div>
            {/* input for Bio */}
            <div className="flex gap-4 w-full">
              <label
                className="w-[50%] text-[#9696cd] font-semibold px-2 flex item-center"
                htmlFor=""
              >
                Bio
              </label>
              <textarea
                placeholder="Enter The Bio Details"
                className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2"
              />
            </div>
            {/* profile picture input */}
            <div className="flex gap-4 w-full">
              <label
                className="w-[50%] text-[#9696cd] font-semibold px-2"
                htmlFor=""
              >
                Profile Picture
              </label>
              <input
                type="file"
                className="bg-transparent w-[50%] "
                placeholder="Enter User Name"
                accept="image/png"
              />
            </div>
            {/* banner picture input */}
            <div className="flex gap-4 w-full">
              <label
                className="w-[50%] text-[#9696cd] font-semibold px-2"
                htmlFor=""
              >
                Banner
              </label>
              <input
                type="file"
                className="bg-transparent w-[50%] "
                placeholder="Enter User Name"
                accept="image/png"
              />
            </div>
          </div>
        </div>
        <div className="grow flex flex-col  border-4 border-l-2 border-[#1E1E1E] ">
          <Profile setIsProfileOpen={setIsProfileOpen} />
        </div>
      </div>
    </>
  );
}
export default ProfileSetup;
