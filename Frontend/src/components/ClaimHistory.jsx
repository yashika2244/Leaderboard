import React from "react";
import { FaScroll } from "react-icons/fa";

const ClaimHistory = ({ history = [] }) => {
  if (!history.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md  overflow-y-auto    h-[60vh]  xl:h-screen hide-scrollbar border border-gray-100">
      <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2 sticky top-0 bg-white z-10 px-5 py-3 ">
        <FaScroll className="text-purple-500" /> Claim History
      </h2>
      {/* Scrollable List */}
      <ul className="space-y-2 text-sm">
        {history.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg px-3 py-2 shadow-sm"
          >
            <div className="text-gray-700">
              <span className="font-semibold">{item.userId.name}</span> claimed{" "}
              <span className="font-bold text-green-600">{item.points}</span>{" "}
              points
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              | {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimHistory;
