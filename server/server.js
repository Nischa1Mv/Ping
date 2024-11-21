import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Specify the path to .env.local in the root folder
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const app = express();
const mongoDBUrl = process.env.MONGODB_URL;

// Create an async function for MongoDB connection
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Start the express server after successful DB connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the async function to start the server
startServer();
