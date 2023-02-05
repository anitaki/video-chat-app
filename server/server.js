const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;

// create an Http server, needed for socket.io to connect
const server = http.createServer(app);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, SHA Hackers");
});

// create a new instance of the class Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//listen when a user connects to our socket server by listening to connection event
io.on("connection", (socket) => {
  // listen for an event "join_room" and join the room you receive from the frontend
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // listen for a sent message and then emit it to everyone in our room
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // listen for a sent message and then emit it to everyone in our socket server except ourselvess
    // socket.broadcast.emit("receive_message", data);
  });
});

// server listening
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
