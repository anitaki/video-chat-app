const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const authRouter = require("./routers/authRouter");
const chatRouter = require("./routers/chatRouter");
const User = require("./modules/userModule");
const ObjectId = require("mongodb").ObjectId;

// create an Http server, needed for socket.io to connect
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

let users = [];

// create a new instance of the class Server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// listen when a user connects to our socket server by listening to connection event
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // listen for a sent message and then emit it to everyone in our room
  socket.on("send_message", (data) => {
    // listen for a sent message and then emit it to everyone in our socket server except ourselvess
    io.sockets.emit("receive_message", data); // OR socket.to(data.room).emit("receive_message", data);
  });

  // listens when a new user joins the server
  socket.on("newUser", async (data) => {
    // listens when a new user joins the server
    let user = await User.find({ username: data.username });
    user.socketID = data.socketID;
    users.push(user);
    console.log(users);
    io.sockets.emit("newUserResponse", users);
  });

  // listen for request for private chat
  socket.on("start_private_room", (userId) => {
    // Save the sockets for the sender
    const senderSocketId = socket.id;

    // Find and save the socket for the receiver
    let receiverSocketId;

    const result = users.find(
      (user) => ObjectId(user[0]._id).toString() === userId
    );

    if (result) {
      receiverSocketId = result.socketID;
      console.log(`The socketID for ${userId} is ${receiverSocketId}`);
    } else {
      console.log(`No item found with _id ${userId}`);
    }

    // Create a unique room name for the private chat session
    const roomName = `${senderSocketId}-${receiverSocketId}`;

    // Emit a "join room" event for both the sender and the receiver
    socket.join(roomName);``
    io.to(targetUserId).emit("join room", roomName);
  });

  // listens for an the event when a user leaves the room
  socket.on("leave room", (roomName) => {
    socket.leave(roomName);
  });

  // listens when a user disconnects
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    // Updates the list of users
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    io.sockets.emit("newUserResponse", users);
    socket.disconnect;
  });
});

// server listening
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

// socket.emit("me", socket.id);

// socket.on("disconnect", () => {
//   socket.broadcast.emit("Call ended...");
// });

// socket.on("call_user", ({userToCall, signalData, from, name}) => {
//   io.to(userToCall).emit("call_user", {signal: signalData, from, name})
// })

// socket.on("answer_call", (data) => {
//   io.to(data.to).emit("Call accepted...", data.signal)
// })

// // listen for an event "join_room" and join the room you receive from the frontend
// socket.on("join_room", (data) => {
//   socket.join(data);
// });
