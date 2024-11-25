"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import ImageOverlay from "../imageOverlay";
import { useRouter } from "next/navigation";

interface tempProfileProps {
  displayName?: string;
  userName?: string;
  bio?: string;
  profilePicture?: string;
  bannerPicture?: string;
  isProfile?: boolean;
}

export default function TempProfile({
  displayName,
  userName,
  bio,
  profilePicture,
  bannerPicture,
  isProfile,
}: tempProfileProps) {
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      {showImageOverlay && (
        <div
          className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay src={overlayImage!} />
        </div>
      )}
      <div className="w-full h-full relative flex flex-col ">
        {!isProfile && (
          <svg
            className="absolute top-4 left-4 z-50"
            onClick={() => {
              router.push("/");
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#CACA8F"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
          </svg>
        )}
        <div className="flex flex-col border-2 border-[#1f2029] bg-[rgba(143,143,202,0.1)] h-[35%] relative bg-no-repeat bg-center bg-cover">
          <Image
            onClick={() => {
              setShowImageOverlay(true);
              setOverlayImage(bannerPicture!);
            }}
            className="w-full h-full object-cover"
            src={bannerPicture! || "/banner.jpg"}
            height={150}
            width={150}
            alt="banner"
          />
          <div className="flex gap-4 w-full px-4 py-2 bg-transparent"> </div>
          <div className="flex grow"></div>
          <div className="justify-end w-full flex  px-4 py-2"></div>
          <Image
            className="rounded-full aspect-square absolute bottom-[-40%] left-4 border-[6px] z-20 border-[#191a22] "
            onClick={() => {
              setShowImageOverlay(true);
              setOverlayImage(profilePicture!);
            }}
            src={profilePicture! || "/profile.png"}
            height={150}
            width={150}
            alt="ProfilePicture"
          />
        </div>
        <div className="flex justify-end p-8 gap-10 h-[15%] "></div>
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
        </div>
      </div>
    </>
  );
}
