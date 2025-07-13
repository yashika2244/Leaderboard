import React from "react";
import { FaUserAlt } from "react-icons/fa";

const UserSelector = ({ users = [], onSelect }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="user-select"
        className=" text-sm font-semibold text-gray-700 mb-2 flex gap-1 items-center"
      >
        <FaUserAlt /> Select User
      </label>
      <select
        id="user-select"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
      >
        <option value="" disabled>
          -- Choose a user --
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
