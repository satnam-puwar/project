import React, { useState, useEffect } from "react";

function Chat({ socket, userName }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    return () => {
      socket.off("messageResponse");
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      text: message,
      name: userName,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    };
    socket.emit("message", messageData);
    setMessage("");
  };

  return (
    <div className="chatContainer bg-gray-100 h-screen flex flex-col justify-between p-4">
    <div className="messages flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-md shadow-sm">
      {messageList.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.socketID === socket.id
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
          } max-w-xs p-3 rounded-lg shadow-md`}
        >
          <p className="font-semibold">{msg.name}:</p>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  
    <form onSubmit={handleSendMessage} className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Send
      </button>
    </form>
  </div>
  
  );
}

export default Chat;



