const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for the conversation ID
      unique: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
