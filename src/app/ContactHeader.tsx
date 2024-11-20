import React from "react";
import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function ContactHeader() {
  return (
    <div
      className={`flex items-center justify-start  font-semibold  gap-6 p-4 `}
    >
      <span className={`${kanit.className} text-5xl flex gap-3 text-[#CACA8F]`}>
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
      <span className="grow"></span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#8F8FCA"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#8F8FCA"
        >
          <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </span>
    </div>
  );
}

export default ContactHeader;
