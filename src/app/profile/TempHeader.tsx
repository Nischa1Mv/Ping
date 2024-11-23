import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function TempHeader() {
  return (
    <div
      className={`flex items-center justify-start  font-semibold  gap-6 p-4 `}
    >
      <span
        className={`${kanit.className} text-5xl flex gap-3 text-[#CACA8F] `}
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
      <span className="flex grow justify-center items-center text-[#CACA8F] ">
        Where Conversation Sparks⚡
      </span>
    </div>
  );
}

export default TempHeader;
