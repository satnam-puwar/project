// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let users = [];

// Handle new user connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newUser", (userName) => {
    users.push({ id: socket.id, userName });
    io.emit("users", users);
    console.log(`${userName} joined the chat`);
  });

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("users", users);
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
