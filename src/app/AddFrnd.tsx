import React from "react";

function AddFrnd() {
  return (
    <div className=" cursor-pointer hover:bg-[#8F8FCA] text-[#8F8FCA]  hover:text-[#191A22] font-semibold flex justify-center items-center border-[#8F8FCA] border rounded-xl mx-auto min-w-fit w-[80%] py-1 gap-4">
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
  );
}

export default AddFrnd;
