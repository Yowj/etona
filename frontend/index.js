import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
import dotenv from "dotenv";

// Load environment variables from .env file in local environment
dotenv.config();

const app = express();
const PORT = 5555;
const mongoDBURL = process.env.MONGO_DB_URL;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Test API endpoint
app.get("/", (request, response) => {
  return response.status(200).send("Welcome to the API!");
});

// Register routes
app.use("/webnovel", booksRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with a failure code
  });
