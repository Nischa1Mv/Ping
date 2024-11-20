"use client";
import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useLogin } from "../Context";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function Login() {
  const router = useRouter();
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin(true);
    router.push("/");
  };
  const { isLogin, setIsLogin } = useLogin();
  return (
    <div className="h-screen bg-[#191a22] flex justify-center items-center">
      <form className="flex flex-col justify-center items-center gap-7 w-[35%] py-10 rounded-lg bg-[#21222e] border-[#1E1E1E]">
        <span
          className={`${kanit.className} text-6xl gap-1 flex text-[#CACA8F]`}
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

        <div className="text-xl font-bold text-[#8F8FCA] italic px-4 gap-2 items-center flex">
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8F8FCA"
          >
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg>
        </div>

        <div>
          <input
            className="w-[250px] bg-transparent border-b-2 tracking-wide focus:outline-none focus:border-b-2 border-[#dedfeb] focus:border-b-[#CACA8F] text-white px-2 pt-2 placeholder:text-{#dedfeb]"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="w-[250px] bg-transparent border-b-2 tracking-wide focus:outline-none focus:border-b-2 focus:border-b-[#CACA8F] text-white px-2 pt-2 placeholder:text-{#dedfeb]"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            className="w-[250px] bg-transparent border-b-2 tracking-wide focus:outline-none focus:border-b-2 focus:border-b-[#CACA8F] text-white px-2 pt-2 placeholder:text-{#dedfeb]"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="flex gap-3">
          <input type="checkbox" />
          <label htmlFor="checkbox" className="text-sm">
            I accept the Terms and Conditions
          </label>
        </div>
        <div className="text-xs flex gap-1 text-[#dedfeb] ">
          Dont Have an Account ?{" "}
          <span className="text-[#CACA8F] cursor-pointer font-semibold">
            SignUp
          </span>
        </div>
        <div className="transition-transform duration-150 active:scale-95">
          <input
            className="bg-transparent font-medium text-md cursor-pointer tracking-wider bg-[#383a46] focus:outline-none hover:bg-[#8F8FCA] hover:text-[#383a46] text-[#fff] px-6 py-1 rounded-lg login-box"
            type="submit"
            value="Login"
            onClick={(e) => {
              handleLogin(e);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
