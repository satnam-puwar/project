import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";

const socket = io("http://localhost:4000");

function App() {
  const [userName, setUserName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinChat = () => {
    if (userName !== "") {
      socket.emit("newUser", userName);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleJoinChat}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} />
      )}
    </div>
  );
}

export default App;
