const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (username) => {
    console.log(username + " joined the chat");
    socket.broadcast.emit("user joined", username);
  });

  socket.on("message", (data) => {
    console.log(data.username + ": " + data.message);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(` user disconnected`);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
