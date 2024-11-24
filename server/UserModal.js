import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isProfile: {
      type: Boolean,
      default: true,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "Hey there! I'm using this app.",
      maxlength: [150, "Bio cannot exceed 150 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/236x/5c/1d/59/5c1d5950a659acdb5bda51edbb490c68.jpg",
    },
    banner: {
      type: String,
      default:
        "https://i.pinimg.com/originals/7e/4d/32/7e4d32670b1c82c23820e96c6070a39f.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique indexes for email and username
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
