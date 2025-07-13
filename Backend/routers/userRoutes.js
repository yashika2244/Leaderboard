// /routes/userRoutes.js
import express from "express";
import { addUser, claimPoints, getHistory, getLeaderboard, getUsers } from "../controllers/userContorller.js";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", addUser);
userRoutes.post("/claim", claimPoints);
userRoutes.get("/leaderboard", getLeaderboard);
userRoutes.get("/history", getHistory);

export default userRoutes;
