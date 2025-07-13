import React from "react";
import { FaScroll } from "react-icons/fa";

const ClaimHistory = ({ history = [] }) => {
  if (!history.length) return null;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md max-h-64 overflow-y-auto border border-gray-100">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
        <FaScroll className="text-purple-500" /> Claim History
      </h2>

      {/* History List */}
      <ul className="space-y-2 text-sm">
        {history.map((item, idx) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg px-3 py-2 shadow-sm"
          >
            {/* Left: Claim message */}
            <div className="text-gray-700">
              <span className="font-semibold">{item.userId.name}</span>{" "}
              claimed{" "}
              <span className="font-bold text-green-600">
                {item.points}
              </span>{" "}
              points
            </div>

            {/* Right: Timestamp */}
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              |{" "}
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimHistory;
