"use client";

import AddFrnd from "./AddFrnd";
import ContactHeader from "./ContactHeader";
import Status from "./Status";

export default function Contacts() {
  return (
    <>
      <div
        className={` w-[35%]    border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
      >
        <ContactHeader />
        <AddFrnd />
        <Status />
      </div>
    </>
  );
}
