import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  points: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("History", historySchema);
