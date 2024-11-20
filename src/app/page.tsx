"use client";
import { useEffect, useState } from "react";
import Chat from "./chatComponents/chat";

import { useRouter } from "next/navigation";
import { useLogin } from "./Context";

export default function Home() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useLogin();
  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  return (
    <>
      <div className="relative">
        <Chat />
      </div>
    </>
  );
}
