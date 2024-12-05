"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Conversation } from "./contact/types";

interface ChatContextType {
  activeChat: Conversation | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

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

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
