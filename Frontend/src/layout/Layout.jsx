import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getUsers,
  getLeaderboard,
  getHistory,
  claimPoints,
  addUser,
} from "../api";

import UserSelector from "../components/UserSelector";
import AddUserForm from "../components/AddUserForm";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";
import ClaimHistory from "../components/ClaimHistory";

function Layout() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastClaimed, setLastClaimed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  const fetchAll = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const [usersData, leaderboardData, historyData] = await Promise.all([
        getUsers(),
        getLeaderboard(),
        getHistory(),
      ]);
      setUsers(usersData);
      setLeaderboard(leaderboardData);
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return toast.warn("Please select a user first.");

    setIsClaiming(true);

    try {
      const result = await claimPoints(selectedUserId);
      setLastClaimed(result);
      toast.success(`🎉 ${result.user.name} claimed ${result.claimed} points!`);

      // Optimistically update leaderboard
      setLeaderboard((prev) =>
        prev.map((user) =>
          user._id === selectedUserId
            ? { ...user, totalPoints: user.totalPoints + result.claimed }
            : user
        )
      );

      await fetchAll(false); // fetch updated data without showing full loading screen
    } catch (err) {
      console.error("Error claiming points:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsClaiming(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await addUser(name);
      toast.success("✅ User added successfully!");
      await fetchAll(false);
    } catch (err) {
      toast.error("❌ Failed to add user.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center text-gray-700 space-y-2">
          <div className="text-3xl animate-bounce">⏳</div>
          <div className="text-lg font-semibold">Loading Leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Full Page Layout */}
      <div className="xl:h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:overflow-hidden">
        <div className="max-w-7xl mx-auto md:h-full flex flex-col space-y-4">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-600 text-center flex items-center justify-center gap-2 tracking-tight">
            <span className="text-4xl">🏆</span>
            <span className="drop-shadow-sm">Leaderboard System</span>
          </h1>

          {/* Main Content */}
          <div className="md:flex-1 flex flex-col md:flex-row gap-6 md:overflow-hidden">
            {/* Left Panel */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-xl shadow md:h-full   hide-scrollbar md:overflow-y-auto flex flex-col justify-start gap-4">
              <AddUserForm onAddUser={handleAddUser} />
              <UserSelector
                users={users}
                onSelect={setSelectedUserId}
                value={selectedUserId}
              />
              <ClaimButton
                onClaim={handleClaim}
                lastClaimed={lastClaimed}
                isClaiming={isClaiming}
              />
            </div>

            {/* Right Panel: Leaderboard + ClaimHistory */}
            <div className="w-full md:w-3/4 flex flex-col xl:flex-row gap-4 md:h-full md:overflow-hidden">
              {/* Leaderboard Section */}
              <div className="w-full xl:w-2/3  md:overflow-y-auto  hide-scrollbar">
                <Leaderboard leaderboard={leaderboard} />
              </div>

              {/* Claim History Section */}
              <div className="w-full xl:w-1/3 ">
                <ClaimHistory history={history} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
