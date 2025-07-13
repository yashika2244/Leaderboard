

import React from "react";

const getAvatar = (id) => `https://i.pravatar.cc/150?u=${id}`;

const Leaderboard = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) return null;

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="bg-orange-50 to-white p-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-lg font-semibold text-purple-700">⏰ Hourly Ranking</h1>
      </div>

      {/* Top 3 Podium */}
   <div className="flex justify-center gap-4 items-end mb-6">
  {/* 2nd Place */}
  {top3[1] && (
    <div className="flex flex-col items-center relative">
      <div className="relative bg-white rounded-xl p-2 shadow-md w-24">
        {/* Rank Medal on Top-Left */}
        <div className="absolute top-2 left-2 bg-gray-400 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
          2
        </div>
        <img
          src={getAvatar(top3[1]._id)}
          className="rounded-full border-2 border-gray-300 w-16 h-16 mx-auto"
          alt="2nd"
        />
        <div className="text-center text-xs font-semibold mt-1">
          {top3[1].name}
        </div>
        <div className="text-center text-orange-500 text-sm">
          🔥 {top3[1].totalPoints}
        </div>
        <div className="text-sm bg-gray-200 px-2 py-1 rounded-full shadow mt-1 text-center">
          🥈
        </div>
      </div>
    </div>
  )}

  {/* 1st Place */}
{top3[0] && (
  <div className="flex flex-col items-center -mt-6 relative">
    <div className="relative bg-yellow-100 border-2 border-yellow-400 rounded-xl p-2 shadow-xl w-28">

      {/* Rank Number Badge */}
      <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
        1
      </div>

    
      {/* Avatar */}
      <img
        src={getAvatar(top3[0]._id)}
        className="rounded-full border-2 border-yellow-500 w-20 h-20 mx-auto"
        alt="1st"
      />

      {/* Name */}
      <div className="text-center text-sm font-bold mt-1">
        {top3[0].name}
      </div>

      {/* Points */}
      <div className="text-center text-yellow-600 font-semibold text-base">
        🔥 {top3[0].totalPoints}
      </div>

      {/* Medal Emoji */}
      <div className="text-sm bg-yellow-400 px-2 py-1 rounded-full shadow mt-1 text-center">
        🥇
      </div>
    </div>
  </div>
)}

  {/* 3rd Place */}
  {top3[2] && (
    <div className="flex flex-col items-center mt-2 relative">
      <div className="relative bg-white rounded-xl p-2 shadow-md w-24">
        {/* Rank Medal */}
        <div className="absolute top-2 left-2 bg-rose-400 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
          3
        </div>
        <img
          src={getAvatar(top3[2]._id)}
          className="rounded-full border-2 border-rose-300 w-16 h-16 mx-auto"
          alt="3rd"
        />
        <div className="text-center text-xs font-semibold mt-1">
          {top3[2].name}
        </div>
        <div className="text-center text-orange-500 text-sm">
          🔥 {top3[2].totalPoints}
        </div>
        <div className="text-sm bg-rose-300 px-2 py-1 rounded-full shadow mt-1 text-center">
          🥉
        </div>
      </div>
    </div>
  )}
</div>

      {/* Rank 4+ Users */}
      <div className="space-y-1">
        {others.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow hover:shadow-md transition-all duration-200"
          >
            {/* Left: Rank, Avatar, Name */}
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div className="px-2 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600 shadow">
                #{index + 4}
              </div>
              <img
                src={getAvatar(user._id)}
                alt={user.name}
                className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                <span className="text-[11px] text-gray-400">ID: {user._id}</span>
              </div>
            </div>

            {/* Right: Points */}
            <div className="text-sm font-bold text-orange-500 flex items-center gap-1">
              {user.totalPoints} <span className="text-lg">🔥</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
