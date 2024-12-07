"use client";
import React, { useEffect, useState } from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    try {
      if (user.email.length === 0 || user.password.length === 0) {
        setError(true);
        toast.error("Email or Password is empty");
        throw new Error("Email or Password is empty");
      }
      setError(false);
      setIsDisabled(true);
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.user.isProfile === true) {
        router.push("/profile");
        toast.success("User Needs to Complete Profile");
        return;
      }
      console.log("LoggedIn", response.data);
      router.push("/");
      toast.success("User Is Logged In");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status == 400) {
          console.log("Please fill all the fields");
          toast.error("Please fill all the fields");
          setIsLoading(false);
        } else if (error.response.status == 404) {
          console.log("User with the email was not found");
          toast.error("User not found");
          setIsLoading(false);
        } else if (error.response.status == 401) {
          console.log("Invalid password");
          toast.error("Invalid password");
          setIsLoading(false);
        }
      } else {
        setError(true);
        console.log("coudnt sign up", error.message);
        toast.error("Something went wrong");
      }
    } finally {
      setIsDisabled(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(false);
    //if email and password are not empty, enable the button
    if (user.email.length > 0 && user.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen bg-[#191a22] flex justify-center items-center">
      {isLoading && !error ? (
        <>
          {" "}
          <div
            className={`${kanit.className} text-xl  text-[#CACA8F] tracking-widest`}
          >
            Loading....
          </div>
        </>
      ) : (
        <form className="flex flex-col justify-center items-center gap-7 md:w-[70%] md:h-[80%] lg:w-[40%] lg:h-[70%] h-screen  py-10  rounded-lg bg-[#21222e] border-[#1E1E1E] w-full">
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
              required
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              className="w-[250px] bg-transparent border-b-2 tracking-wide focus:outline-none focus:border-b-2 border-[#dedfeb] focus:border-b-[#CACA8F] text-white px-2 pt-2 placeholder:text-{#dedfeb]"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              required
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="w-[250px] bg-transparent border-b-2 tracking-wide focus:outline-none focus:border-b-2 focus:border-b-[#CACA8F] text-white px-2 pt-2 placeholder:text-{#dedfeb]"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="text-xs flex gap-1 text-[#dedfeb] ">
            Dont Have an Account ?{" "}
            <Link
              className="text-[#CACA8F] cursor-pointer font-semibold"
              href={`/signup`}
            >
              SignUp
            </Link>
          </div>
          <div className="transition-transform duration-150 active:scale-95">
            <input
              disabled={isDisabled}
              className="bg-transparent font-medium text-md cursor-pointer tracking-wider bg-[#383a46] focus:outline-none hover:bg-[#8F8FCA] hover:text-[#383a46] text-[#fff] px-6 py-1 rounded-lg login-box"
              type="submit"
              value="Login"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
