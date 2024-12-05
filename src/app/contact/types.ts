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
  _v: number;
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
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  deleted: boolean;
}
