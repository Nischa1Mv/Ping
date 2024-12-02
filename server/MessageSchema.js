const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: {
        validator: (v) => v.length === 2, // Ensure exactly two participants for one-to-one chat
        message: "A conversation must have exactly two participants.",
      },
    },
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
    closed: {
      type: Boolean,
      default: false, // Initially, conversations are open
    },
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

module.exports = Conversation;
