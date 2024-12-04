import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import Conversation from "./MessageSchema.js";
import { connectDB } from "./server.js";
export async function SocketServer() {
  connectDB();
  const app = express();
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Correct the protocol to match the frontend
      methods: ["GET", "POST"],
      credentials: true, // Allow cookies and headers if needed
    },
  });
  if (!io) {
    console.log("Error starting socket server");
    return;
  } else {
    console.log("Socket server started");
  }

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    //to join a conversation

    socket.on("conversation:join", async ({ conversationId }) => {
      console.log("User joined conversation", conversationId);
      socket.join(conversationId);
    });

    //to send message in a conversation

    socket.on("message:send", async ({ conversationId, sender, content }) => {
      try {
        const message = {
          sender,
          content,
          timestamp: new Date(),
        };

        const conversation = await Conversation.findOneAndUpdate(
          { conversationId },
          {
            $push: { messages: { $each: [message], $position: 0 } },
            $set: { lastMessage: content },
          },
          { new: true, upsert: true }
        );

        if (!conversation) {
          socket.emit("error", "Conversation not found");
          return;
        }
        // Broadcast the message to the room (conversation)

        //to receive message in a conversation
        io.emit("message:receive", message);
        console.log("Message stored and broadcasted:", message);
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", "Error saving message");
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
  server.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
}

async function startServer() {
  try {
    // Call the SocketServer function after DB connection
    await SocketServer();
  } catch (error) {
    console.error(
      "Failed to connect to the database or start the server:",
      error
    );
  }
}

startServer();
