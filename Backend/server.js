// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from  "./config/db.js"
import userRoutes from "./routers/userRoutes.js";

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin:[ "http://localhost:5173", "https://leaderboard-zeta-ten.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
