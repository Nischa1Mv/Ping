import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for the conversation ID
      unique: true,
    },
    participants: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          //status of conversation closed or open for each participant
          status: {
            type: String,
            enum: ["active", "closed"],
            default: "closed", // Default status is 'active'
          },
        },
      ],
      validate: {
        validator: (v) => v.length === 2, // Ensure exactly two participants for one-to-one chat
        message: "A conversation must have exactly two participants.",
      },
    },
    participantDetails: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        isVerified: {
          type: Boolean,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          required: true,
        },
        isOnline: {
          type: Boolean,
          required: true,
        },
        bio: String,
        profilePicture: String,
        banner: String,
        lastLogin: {
          type: Date,
          required: true,
        },
        displayName: String,
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
        deleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    lastMessage: {
      type: String, // Store the content of the last message
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
  }
);

// Add index for participants to optimize queries
conversationSchema.index({ participants: 1 });

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
