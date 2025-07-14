import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddUser(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className=" text-sm font-semibold text-gray-800 flex gap-1 items-center">
        <FaUserAlt />
        Add New User
      </label>

      <input
        type="text"
        placeholder="Enter user name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow font-medium transition-all duration-200 flex items-center justify-center gap-2"
      >
        <FaPlus className="text-sm" />
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
