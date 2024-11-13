import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555; // Use environment PORT or default to 5555 if not set
const mongoDBURL = process.env.MONGO_DB_URL;
const NODE_ENV = process.env.NODE_ENV || "development"; // Use 'development' by default

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
if (NODE_ENV === "development") {
  console.log("CORS: Allowing all origins (Development Mode)");
  app.use(cors());
} else {
  console.log("CORS: Restricting origins (Production Mode)");
  const allowedOrigins = ['https://etona-hrhn.vercel.app'];

  const corsOptions = {
    origin: function (origin, callback) {
      console.log(`CORS Request Origin: ${origin}`); // Log each request's origin
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS policy'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200 // For older browsers that need a successful status for preflight requests
  };

  // Apply CORS middleware using the defined options
  app.use(cors(corsOptions));
}

// Test API endpoint
app.get("/", (request, response) => {
  return response.status(200).send("Welcome to the API!");
});

// Register routes
app.use("/webnovel", booksRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
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
