"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Conversation } from "./contact/types";

// Define the context type for ChatContext
interface ChatContextType {
  activeChat: Conversation | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

// Create the ChatContext
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define the type for ChatProvider props
interface ChatProviderProps {
  children: ReactNode;
}

// ChatProvider component to manage and provide the activeChat and conversations state
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  return (
    <ChatContext.Provider
      value={{ activeChat, setActiveChat, conversations, setConversations }}
    >
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
