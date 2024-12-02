export interface ParticipantDetails {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  isOnline: boolean;
  bio?: string;
  profilePicture?: string;
  banner?: string;
  status: string;
  lastLogin: string;
  displayName?: string;
}

export interface Conversation {
  _id: string;
  participants: string[];
  closed: boolean;
  conversationId: string;
  messages: any[];
  createdAt: string;
  updatedAt: string;
  participantDetails: ParticipantDetails[];
}
export interface Message {
  sender: string; // The sender's identifier (user's ID)
  content: string; // The message content
  timestamp: string; // Timestamp when the message was sent
  read: boolean; // Whether the message has been read
  deleted: boolean; // Whether the message has been deleted
}
