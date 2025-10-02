import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import helper from '../../assets/helper.svg'
import userIcon from '../../assets/userIcon.svg'
import uploadArea from '../../assets/uploadArea.svg'
import sendButton from '../../assets/sendButton.svg'
import { ChatContext } from '../../Context/ChatContext';
import { AuthContext } from '../../Context/AuthContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function ChatSection() {
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const nav = useNavigate();
  const { messages, selectedUser, getMessage, sendMessage } = useContext(ChatContext);
  const { user, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();
  const fileInput = useRef();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "" && !image) return;

    const formData = new FormData();
    formData.append("text", input.trim());
    if (image) formData.append("image", image);

    await sendMessage(formData);
    setInput("");
    setImage(null);

    if (fileInput.current) fileInput.current.value = "";
  };

  useEffect(() => {
    if (selectedUser) getMessage(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex w-full h-screen bg-black text-white justify-center items-center">
        <h1>Start a new Chat</h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white">
  {/* Header */}
  <div className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow-md">
    <div className="flex items-center space-x-3">
      <img
        onClick={() => nav("/profile", { state: { messages } })}
        className="w-10 h-10 rounded-full cursor-pointer"
        src={selectedUser.profile || userIcon}
        alt="profile"
      />
      <div>
        <p className="text-lg font-medium truncate">{selectedUser.name}</p>
        <span
          className={`text-sm ${
            onlineUsers.includes(selectedUser._id) ? "text-green-400" : "text-gray-400"
          }`}
        >
          {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
        </span>
      </div>
    </div>
    <img src={helper} className="w-6 h-6" alt="helper icon" />
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
    {messages.map((message, index) => {
      const isMine = message.senderId === user._id;
      return (
        <div
          key={index}
          className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
        >
          {!isMine && (
            <img
              src={selectedUser.profile || userIcon}
              className="w-8 h-8 rounded-full hidden sm:block"
              alt="avatar"
            />
          )}

          <div className="max-w-xs sm:max-w-md break-words">
            {message.image ? (
              <img
                src={message.image}
                alt="chat-img"
                className="rounded-lg border border-gray-600 max-w-full"
              />
            ) : (
              <p
                className={`px-3 py-2 rounded-lg text-sm ${
                  isMine ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                }`}
              >
                {message.text}
              </p>
            )}
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {isMine && (
            <img src={user.profile || userIcon} className="w-8 h-8 rounded-full" alt="me" />
          )}
        </div>
      );
    })}
    <div ref={scrollEnd}></div>
  </div>

  {/* Input */}
  <form
    onSubmit={handleSendMessage}
    className="flex items-center gap-3 p-3 bg-gray-800"
    encType="multipart/form-data"
  >
    <div className="flex items-center bg-gray-900 w-full rounded-full px-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Send a message"
        className="flex-1 bg-transparent outline-none p-2 text-sm text-white"
      />
      <input
        type="file"
        ref={fileInput}
        onChange={(e) => setImage(e.target.files[0])}
        id="image"
        name="image"
        className="hidden"
      />
      <label htmlFor="image" className="cursor-pointer">
        <img src={uploadArea} className="w-6 h-6" alt="upload" />
      </label>
    </div>
    <button type="submit">
      <img src={sendButton} className="w-8 h-8" alt="send" />
    </button>
  </form>
</div>

  );
}

export default ChatSection;
