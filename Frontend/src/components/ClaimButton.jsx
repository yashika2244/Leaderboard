import React from "react";

const ClaimButton = ({ onClaim, lastClaimed ,isClaiming}) => {
  return (
    <div className="space-y-4">
      {/* Claim Action Button */}
        <button
        onClick={onClaim}
        disabled={isClaiming}
        className={`w-full cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 text-white py-3 px-4 rounded-xl shadow-md text-sm sm:text-base font-semibold tracking-wide ${
          isClaiming ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isClaiming ? "⏳ Claiming..." : "🎯 Claim Random Points"}
      </button>

      {/* Last Claimed Info */}
      {lastClaimed && (
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-sm sm:text-base">
          <span className="font-medium text-gray-700">
            ✅{" "}
            <strong className="text-purple-700">{lastClaimed.user.name}</strong>{" "}
            claimed{" "}
            <strong className="text-green-600">{lastClaimed.claimed}</strong>{" "}
            points!
          </span>
        </div>
      )}
    </div>
  );
};

export default ClaimButton;
