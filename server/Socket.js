import { connectDB } from "./server.js";
import { Server } from "socket.io";

export async function SocketServer() {
  try {
    await connectDB();

    const io = new Server(server, {
      cors: {
        origin: "https://localhost:3001",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected", scoket.id);

      //to join a conversation

      socket.on("conversation:join", (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined conversation ${conversationId}`);
      });

      //to send message in a conversation

      socket.on("message:send", async ({ conversationId, sender, content }) => {
        try {
          const message = {
            sender,
            content,
            timestamps: new Date(),
          };

          const conversation = await Conversation.findOneAndUpdate(
            { conversationId },
            { $push: { messages: message } },
            { new: true, upsert: true }
          );

          if (!conversation) {
            socket.emit("error", "Conversation not found");
            return;
          }

          // Broadcast message to room participants
          io.to(conversationId).emit("message:receive", message);
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
  } catch (error) {
    console.log("Error starting server", error);
  }
}
socketServer();
