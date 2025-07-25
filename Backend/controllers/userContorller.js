import userModel from "../models/userModel.js";
import historyModel from "../models/historyModel.js";


export const getUsers = async (req, res) => {
  const users = await userModel.find().sort({ totalPoints: -1 });;
  res.json(users);
};

export const addUser = async (req, res) => {
  const name = req.body.name ?? "";

  if (!name)
    return res.status(400).json({ message: "Name is required" });

  const existingUser = await userModel.findOne({ name });

  if (existingUser) {
    return res.status(400).json({ message: "User with this name already exists" });
  }

  const user = new userModel({ name });
  await user.save();
  res.status(201).json(user);
};



export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await userModel.findByIdAndUpdate(
    userId,
    { $inc: { totalPoints: randomPoints } },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  //  Save history
  const history = new historyModel({ userId, points: randomPoints });
  await history.save();

  //  Return fully updated data
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
