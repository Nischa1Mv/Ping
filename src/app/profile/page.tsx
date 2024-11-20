"use client";
import React from "react";
import Image from "next/image";

interface ProfileProps {
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowImageOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function Profile({ setIsProfileOpen, setShowImageOverlay }: ProfileProps) {
  const ProfilePicture =
    "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/379619630_6949750128379753_6172259427711619252_n.jpg?ccb=11-4&oh=01_Q5AaIO2kBGB6JkOO1GOwTcvG9XIDmY-5Vitx5Oo9Mv7P_lPp&oe=674A8A31&_nc_sid=5e03e0&_nc_cat=108";
  const BannerPic =
    "https://media.licdn.com/dms/image/v2/D4D16AQGiuVbiEdaPAg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1711031992791?e=1737590400&v=beta&t=L6veoyCxeddYWy2STt-4ABQGsbXWvZzwMzWNluS7xok";
  return (
    <>
      <div className="w-full h-full relative  ">
        <div
          className="flex flex-col border-2 border-[#1f2029] bg-[rgba(143,143,202,0.1)] h-[35%] relative bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${BannerPic})`,
          }}
        >
          <div className="flex gap-4 w-full px-4 py-2 bg-transparent">
            <svg
              onClick={() => {
                setIsProfileOpen(false);
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
          <div className="justify-end w-full flex  px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#CACA8F"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </div>
          <Image
            className="rounded-full  absolute bottom-[-40%] left-4 border-[6px] z-20 border-[#191a22] "
            onClick={() => {
              setShowImageOverlay(true);
            }}
            src={ProfilePicture}
            height={150}
            width={150}
            alt="ProfilePicture"
          />
        </div>
        <div className="flex justify-end p-8 gap-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
        </div>
        <div className="font-bold  text-xl flex gap-4 text-[#CACA8F] items-center px-8 mt-4">
          Nischal_Mantri{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#8F8FCA"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </div>
        <div className="pl-8 flex flex-col gap-5 ">
          <div className="text-xs  text-[#adaeb7] ">@nischal_mantri </div>
          <div className="  flex flex-col gap-2   ">
            <div className="text-[#8888d5] text-lg font-semibold">Bio</div>
            <div className="text-xs font-medium  text-[#adaeb7]">
              Life is like riding a bicycle. To keep your balance, you must keep
              moving.
            </div>
          </div>
          <div className="flex gap-4 flex-col">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
