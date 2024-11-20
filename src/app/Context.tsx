"use client";
import { ReactNode, useState, useContext, createContext } from "react";

interface ContextProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const LoginContext = createContext<ContextProps | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
