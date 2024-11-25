import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // User who sent the request
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // User who receives the request
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"], // Status of the request
      default: "pending", // Default is 'pending'
    },
    sentAt: {
      type: Date,
      default: Date.now, // Timestamp for when the request was sent
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for when the request status was last updated
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Index to ensure that a user can send only one friend request to another user
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const FriendRequest =
  mongoose.models.FriendRequests ||
  mongoose.model("FriendRequests", friendRequestSchema);

export default FriendRequest;
