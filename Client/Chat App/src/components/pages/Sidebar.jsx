

import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgimage from "../../assets/bgimage.png";
import searchicon from "../../assets/searchicon.svg";

function Sidebar() {
  const { users, getUsers, setSelectedUser } = useContext(ChatContext);
  const { logOut, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="flex flex-col  w-screen h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full  flex justify-between items-center px-4 py-3 bg-gray-800 z-10">
        <img src={bgimage} className="h-10 sm:h-12 object-contain" alt="logo" />
        <div className="relative">
          <svg
            onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 cursor-pointer"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
          </svg>

          {open && (
            <div className="absolute right-0 mt-10 bg-white text-black rounded-lg p-2 shadow-lg">
              <p onClick={logOut} className="font-bold cursor-pointer">LogOut</p>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col mt-20 overflow-y-auto px-4">
        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center  bg-gray-700 rounded-2xl px-3 py-2">
            <img src={searchicon} className="w-5 h-5 mr-2" alt="search" />
            <input
              type="text"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1  bg-transparent outline-none text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Users list */}
        <div className="flex-1 space-y-3 pb-4">
          {filteredUsers.map((userItem, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedUser(userItem);
                nav("/chatbox");
              }}
              className="flex w-full items-center cursor-pointer hover:bg-gray-800 rounded-lg px-2 py-2"
            >
              {/* Avatar */}
              <img
                src={userItem.profile}
                className="w-12 h-12 rounded-full flex-shrink-0"
                alt={userItem.name}
              />

              {/* User info takes full width */}
              <div className="flex-1 flex flex-col ml-3 min-w-0">
                <p className="truncate font-medium">{userItem.name}</p>
                <p className={onlineUsers.includes(userItem._id) ? "text-green-500 text-sm" : "text-gray-400 text-sm"}>
                  {onlineUsers.includes(userItem._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
