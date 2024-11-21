import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Specify the path to .env.local in the root folder
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const app = express();
const mongoDBUrl = process.env.MONGODB_URL;

const User = mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("Connected to MongoDB");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
