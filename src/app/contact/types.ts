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
  lastLogin: string;
  displayName?: string;
}

export interface Participant {
  userId: string; // Reference to the User's ID
  status: "active" | "closed"; // Status of the conversation for this participant
}

export interface Conversation {
  _v: number;
  _id: string;
  participants: Participant[];
  conversationId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  participantDetails: ParticipantDetails[];
}
export interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  deleted: boolean;
}
