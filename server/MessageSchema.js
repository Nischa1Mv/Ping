const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversations", // The conversation the message belongs to
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // The user who sent the message
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "audio", "video", "image", "file"], // Type of message
      required: true,
    },
    content: {
      type: String, // For text messages or the URL for media (audio, video, etc.)
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now, // Timestamp for when the message was sent
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for when the message was last updated
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Index to quickly find messages for a specific conversation
messageSchema.index({ conversationId: 1, sentAt: 1 });

const Message =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);

export default Message;
