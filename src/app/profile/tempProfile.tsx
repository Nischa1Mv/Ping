"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageOverlay from "../imageOverlay";
import placeholderPFP from "../../../public/placeholderPfp.jpeg";

interface tempProfileProps {
  setIsProfileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  displayName?: string;
  userName?: string;
  bio?: string;
  profilePicture?: string;
  bannerPicture?: string;
}

export default function TempProfile({
  setIsProfileOpen,
  displayName,
  userName,
  bio,
  profilePicture,
  bannerPicture,
}: tempProfileProps) {
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const placeholderBanner =
    "https://i.pinimg.com/originals/7e/4d/32/7e4d32670b1c82c23820e96c6070a39f.jpg";

  return (
    <>
      {showImageOverlay && (
        <div
          className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay
            src={profilePicture ? profilePicture : placeholderPFP}
          />
        </div>
      )}
      <div className="w-full h-full relative flex flex-col ">
        <div
          className="flex flex-col border-2 border-[#1f2029] bg-[rgba(143,143,202,0.1)] h-[35%] relative bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              bannerPicture ? bannerPicture : placeholderBanner
            })`, // Ternary for backgroundImage
          }}
        >
          <div className="flex gap-4 w-full px-4 py-2 bg-transparent"></div>
          <div className="flex grow"></div>
          <div className="justify-end w-full flex  px-4 py-2"></div>
          <Image
            className="rounded-full aspect-square absolute bottom-[-40%] left-4 border-[6px] z-20 border-[#191a22] "
            onClick={() => {
              setShowImageOverlay(true);
            }}
            src={profilePicture ? profilePicture : placeholderPFP}
            height={150}
            width={150}
            alt="ProfilePicture"
          />
        </div>
        <div className="flex justify-end p-8 mt-7 gap-10"></div>
        <div className="font-bold  text-2xl flex gap-4 text-[#CACA8F] items-center pl-4 mt-4 ">
          <label
            className="focus:outline-none bg-transparent text-[#CACA8F] font-bold
          text-xl"
          />
          {displayName ? displayName : "Your Name"}

          <label />
        </div>

        <div className="pl-8 flex flex-col gap-5 grow  ">
          <div className="text-xs  text-[#adaeb7] ">
            @{userName ? userName : "yourUserName"}{" "}
          </div>
          <div className="  flex flex-col gap-2  h-full  ">
            <div className="text-[#8888d5] text-lg font-semibold">
              Description
            </div>
            <div className=" text-sm font-medium  px-5  py-5 w-[90%] h-[40%]   text-[#adaeb7] bg-[#1f212b] text-pretty">
              {bio}
            </div>
          </div>
          {/* <div className="flex gap-4 flex-col">
            <h3 className="text-[#8888d5] text-lg font-semibold">Profiles</h3>
            <ul className="flex flex-col gap-5 px-4 text-md text-[#adaeb7]">
              <li className="">
                Github:{" "}
                <a
                  target="_blank"
                  className={`hover:underline text-sm  tracking-widest text-[#8888d5]`}
                  href="https://github.com/Nischa1Mv"
                >
                  Nischa1Mv
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  target="_blank"
                  className=" text-sm hover:underline tracking-widest text-[#8888d5]"
                  href="https://www.linkedin.com/in/nischalmantri/"
                >
                  Nischal Mantri
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}
