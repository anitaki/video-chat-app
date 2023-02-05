const express = require ('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, SHA Hackers");
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
}
)

// server listening
server.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

