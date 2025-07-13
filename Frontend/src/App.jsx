import React, { useEffect, useState } from "react";
import {
  getUsers,
  getLeaderboard,
  getHistory,
  claimPoints,
  addUser,
} from "./api";

import UserSelector from "./components/UserSelector";
import AddUserForm from "./components/AddUserForm";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastClaimed, setLastClaimed] = useState(null);

  const fetchAll = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return alert("Please select a user first.");
    const result = await claimPoints(selectedUserId);
    setLastClaimed(result);
    await fetchAll()
  };

  const handleAddUser = async (name) => {
    await addUser(name);
    await fetchAll(); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
     <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-600 text-center flex items-center justify-center gap-2 tracking-tight">
  <span className="text-4xl">🏆</span>
  <span className="drop-shadow-sm">Leaderboard System</span>
</h1>


        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Panel */}
          <div className="w-full md:w-1/3 space-y-4 bg-white p-4 rounded-xl shadow">
            <UserSelector users={users} onSelect={setSelectedUserId} />
            <AddUserForm onAddUser={handleAddUser} />
            <ClaimButton onClaim={handleClaim} lastClaimed={lastClaimed} />
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-2/3 space-y-4">
            <Leaderboard leaderboard={leaderboard} />
            <ClaimHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
