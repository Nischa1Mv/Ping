import React from "react";
import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function page() {
  return (
    <div className="bg-[#191A22] w-screen h-screen  flex flex-col  p-4">
      <div className="flex w-full">
        <span
          className={`${kanit.className} text-5xl flex gap-3 py-2 px-10   text-[#CACA8F]  `}
        >
          Ping
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
          </svg>
        </span>
      </div>
      <div className="flex justify-center items-center   w-full h-full ">
        <div className="w-[50%] h-[70%]  flex items-center bg-[#21222e] rounded-xl gap-10 flex-col py-4">
          <h1 className="text-4xl font-bold py-4 text-[#9696cd]">
            Email Verification{" "}
          </h1>
          <p className=" text-lg px-20 text-center  ">
            {" "}
            Please Click on the below to confirm your email address and activate
            your account
          </p>
          <div className=""></div>
          <button className="border rounded-xl px-4 py-2 font-medium login-box active:scale-95 transition-transform duration-150 active:bg-[#9696cd] active:font-medium ">
            CONFIRM EMAIL
          </button>
          <div className=""></div>
          <p className="text-[#767b87]">
            if this is not requsted by you , ignore this{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
