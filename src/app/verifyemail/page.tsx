"use client";
import React, { useEffect, useState } from "react";
import { Kanit } from "next/font/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function Page() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(5);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
      toast.success("Email verified successfully");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast.error("Email verification failed");
    }
  };

  // Handle the token from the URL query only once (on page load)
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (verified && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      router.push("/"); // Redirect to the home page when timer reaches 0
    }

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [verified, timer, router]);

  return (
    <div className="bg-[#191A22] w-screen h-screen flex flex-col p-4">
      <div className="flex w-full">
        <span
          className={`${kanit.className} text-5xl flex gap-3 py-2 px-10 text-[#CACA8F]`}
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
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[50%] h-[70%] flex items-center bg-[#21222e] rounded-xl gap-10 flex-col py-4">
          <h1 className="text-4xl font-bold py-4 text-[#9696cd]">
            Email Verification
          </h1>
          <p className="text-lg px-20 text-center">
            Please click below to confirm your email address and activate your
            account.
          </p>
          <div className="">
            <button
              onClick={verifyEmail} // Trigger the verification when clicked
              className="border rounded-xl px-4 py-2 font-medium login-box active:scale-95 transition-transform duration-150 active:bg-[#9696cd] active:font-medium"
            >
              CONFIRM EMAIL
            </button>
          </div>
          <p className="text-[#767b87]">
            If this was not requested by you, ignore this.
          </p>
          {verified && <div>Email is verified. Redirecting in {timer}...</div>}
        </div>
      </div>
    </div>
  );
}

export default Page;
