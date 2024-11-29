import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Conversation from "./MessageSchema.js";

// Specify the path to .env.local in the root folder
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const mongoDBUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

export async function connectDB() {
  try {
    mongoose.connect(mongoDBUrl);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection failed", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
}

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Socket.io Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join conversation room
  socket.on("conversation:join", (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation ${conversationId}`);
  });

  // Handle message sending
  socket.on("message:send", async (data) => {
    if (
      !data.conversationId ||
      !data.message ||
      !data.message.content ||
      !data.message.sender
    ) {
      return console.error("Missing required fields in message:", data);
    }
    try {
      const conversation = await Conversation.findOneAndUpdate(
        { conversationId: data.conversationId },
        { $push: { messages: data.message } },
        { new: true, upsert: true }
      );

      // Broadcast message to room participants
      io.to(data.conversationId).emit("message:receive", data.message);
      console.log("Message stored and broadcasted:", data.message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
(async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
