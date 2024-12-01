"use client";
import { createContext, ReactNode, useContext, useState } from "react";

import { Conversation } from "./contact/types";

// Define the context type for ChatContext
interface ChatContextType {
  activeChat: Conversation | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

// Create the ChatContext
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define the type for ChatProvider props
interface ChatProviderProps {
  children: ReactNode;
}

// ChatProvider component to manage and provide the activeChat state
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
