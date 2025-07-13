import userModel from "../models/userModel.js";
import historyModel from "../models/historyModel.js";


export const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

export const addUser = async (req, res) => {
  const { name } = req.body;
  const user = new userModel({ name });
  await user.save();
  res.json(user);
};

export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalPoints += randomPoints;
  await user.save();

  const history = new historyModel({ userId, points: randomPoints });
  await history.save();

  res.json({ user, claimed: randomPoints });
};

export const getLeaderboard = async (req, res) => {
  const leaderboard = await userModel.find().sort({ totalPoints: -1 });
  res.json(leaderboard);
};

export const getHistory = async (req, res) => {
  const history = await historyModel.find().populate("userId").sort({ timestamp: -1 });
  res.json(history);
};
